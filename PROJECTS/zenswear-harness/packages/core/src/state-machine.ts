import { AgentState, StateChangePayload, ToolPayload } from './types.js';
import { EventRouter } from './event-router.js';

export interface StateMachineConfig {
  maxIterations?: number;
  maxTokensPerExecution?: number;
}

export interface ActionRecord {
  toolName: string;
  fingerprint: string;
  iteration: number;
}

/**
 * AgentStateMachine is the brain's traffic controller and execution supervisor.
 * It enforces hard safety limits:
 *  - Maximum iteration cap (default 5)
 *  - Duplicate/repeated action detection (infinite loop circuit breaker)
 *  - Token budget boundaries
 *  - Human-in-the-loop mutative approval gating
 */
export class AgentStateMachine {
  private currentState: AgentState = 'IDLE';
  private router: EventRouter;
  private maxIterations: number;
  private maxTokens: number;

  private currentIteration = 0;
  private accumulatedTokens = 0;
  private actionHistory: ActionRecord[] = [];
  private pendingMutativeAction: ToolPayload | null = null;

  constructor(router: EventRouter, config: StateMachineConfig = {}) {
    this.router = router;
    this.maxIterations = config.maxIterations ?? 5;
    this.maxTokens = config.maxTokensPerExecution ?? 50000;
  }

  public getState(): AgentState {
    return this.currentState;
  }

  public getIteration(): number {
    return this.currentIteration;
  }

  public getAccumulatedTokens(): number {
    return this.accumulatedTokens;
  }

  public getPendingApproval(): ToolPayload | null {
    return this.pendingMutativeAction;
  }

  /**
   * Internal transition handler that validates transitions and emits events.
   */
  private transitionTo(nextState: AgentState, reason?: string, context?: Record<string, unknown>): void {
    const from = this.currentState;
    this.currentState = nextState;

    const payload: StateChangePayload = {
      from,
      to: nextState,
      reason,
      context,
    };

    this.router.emit<StateChangePayload>('agent:state_change', 'state-machine', payload);
  }

  /**
   * Start a new task execution cycle. Transitions IDLE -> ROUTING.
   */
  public startTask(taskDescription: string): void {
    if (this.currentState !== 'IDLE') {
      throw new Error(`Cannot start task from state ${this.currentState}. Reset to IDLE first.`);
    }

    this.currentIteration = 0;
    this.accumulatedTokens = 0;
    this.actionHistory = [];
    this.pendingMutativeAction = null;

    this.transitionTo('ROUTING', 'Task initiated', { taskDescription });
  }

  /**
   * Transition ROUTING -> EXECUTING when a route/intent is confirmed.
   */
  public confirmRouting(targetPipelineOrSubagent: string): void {
    if (this.currentState !== 'ROUTING') {
      throw new Error(`Cannot confirm routing while in state ${this.currentState}`);
    }

    this.transitionTo('EXECUTING', `Routing confirmed to: ${targetPipelineOrSubagent}`);
  }

  /**
   * Evaluates the next tool call / action before it is executed.
   * Checks for loop detection, max iterations, and mutative gates.
   */
  public stepAction(action: ToolPayload, isMutative = false): { proceed: boolean; state: AgentState } {
    if (this.currentState !== 'EXECUTING') {
      throw new Error(`Cannot execute step in state ${this.currentState}`);
    }

    this.currentIteration += 1;

    // 1. Guardrail: Max iterations exceeded
    if (this.currentIteration > this.maxIterations) {
      const errMsg = `Max iteration limit (${this.maxIterations}) exceeded. Halting loop to prevent runaway agent.`;
      this.router.emit('error', 'state-machine', { error: errMsg, iteration: this.currentIteration });
      this.transitionTo('ERROR', errMsg);
      return { proceed: false, state: 'ERROR' };
    }

    // 2. Guardrail: Repeated consecutive action detection
    const fingerprint = `${action.toolName}::${JSON.stringify(action.parameters)}`;
    const lastAction = this.actionHistory[this.actionHistory.length - 1];

    if (lastAction && lastAction.fingerprint === fingerprint) {
      const errMsg = `Repeated identical action detected for tool "${action.toolName}". Halting infinite loop.`;
      this.router.emit('error', 'state-machine', { error: errMsg, fingerprint });
      this.transitionTo('ERROR', errMsg);
      return { proceed: false, state: 'ERROR' };
    }

    this.actionHistory.push({
      toolName: action.toolName,
      fingerprint,
      iteration: this.currentIteration,
    });

    // 3. Guardrail: Mutative action approval gate
    if (isMutative) {
      this.pendingMutativeAction = action;
      this.router.emit('approval:requested', 'state-machine', {
        action,
        iteration: this.currentIteration,
      });
      this.transitionTo('WAITING_APPROVAL', `Mutative action requires confirmation: ${action.toolName}`);
      return { proceed: false, state: 'WAITING_APPROVAL' };
    }

    return { proceed: true, state: 'EXECUTING' };
  }

  /**
   * Track token expenditure and trigger circuit breaker if exceeded.
   */
  public trackTokens(tokens: number): void {
    this.accumulatedTokens += tokens;
    if (this.accumulatedTokens > this.maxTokens) {
      const errMsg = `Token budget exceeded (${this.accumulatedTokens}/${this.maxTokens}). Circuit breaker tripped.`;
      this.router.emit('error', 'state-machine', { error: errMsg, tokens: this.accumulatedTokens });
      this.transitionTo('ERROR', errMsg);
    }
  }

  /**
   * Resolve human approval.
   */
  public resolveApproval(approved: boolean, reason?: string): void {
    if (this.currentState !== 'WAITING_APPROVAL') {
      throw new Error(`Cannot resolve approval in state ${this.currentState}`);
    }

    this.router.emit('approval:resolved', 'state-machine', {
      approved,
      action: this.pendingMutativeAction,
      reason,
    });

    if (approved) {
      this.pendingMutativeAction = null;
      this.transitionTo('EXECUTING', 'Action approved by user');
    } else {
      this.pendingMutativeAction = null;
      this.transitionTo('IDLE', `Action denied by user: ${reason || 'Denied'}`);
    }
  }

  /**
   * Mark execution complete successfully and return to IDLE.
   */
  public completeTask(resultSummary?: string): void {
    if (this.currentState !== 'EXECUTING') {
      throw new Error(`Cannot complete task from state ${this.currentState}`);
    }

    this.transitionTo('IDLE', 'Task finished successfully', { resultSummary });
    this.router.emit('agent:end', 'state-machine', {
      totalIterations: this.currentIteration,
      totalTokens: this.accumulatedTokens,
      resultSummary,
    });
  }

  /**
   * Force reset back to IDLE (e.g. after reviewing error or manual interrupt).
   */
  public reset(reason = 'Manual reset'): void {
    this.currentIteration = 0;
    this.accumulatedTokens = 0;
    this.actionHistory = [];
    this.pendingMutativeAction = null;
    this.transitionTo('IDLE', reason);
  }
}
