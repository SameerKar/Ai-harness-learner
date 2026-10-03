import { EventRouter } from './event-router.js';
import { StructuredJsonlLogger } from './logger.js';
import { AgentStateMachine } from './state-machine.js';
import { AgentEvent } from './types.js';

async function runAcceptanceTests() {
  console.log('🧪 Starting Phase 1 Foundation Acceptance Tests...\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // --- Test S03: Event Router ---
  console.log('📌 Testing S03: Event Router...');
  const router = new EventRouter();
  let receivedToolCall: AgentEvent | null = null;
  let wildcardCount = 0;

  router.on('tool:call', (event) => {
    receivedToolCall = event;
  });

  router.onAny(() => {
    wildcardCount++;
  });

  router.emit('agent:start', 'test-runner', { message: 'Engine initializing' });
  router.emit('tool:call', 'test-runner', { toolName: 'parse_inventory', parameters: { sku: 'ZEN-001' } });

  assert(receivedToolCall !== null, 'Typed listener received tool:call event');
  assert(wildcardCount === 2, 'Wildcard listener received both events');

  // --- Test S04: Structured JSONL Logger ---
  console.log('\n📌 Testing S04: Structured JSONL Logger...');
  const logger = new StructuredJsonlLogger(router, { sessionName: 'test_session' });
  
  router.emit('ui:update', 'test-runner', { view: 'dashboard' });
  router.emit('memory:read', 'test-runner', { key: 'previous_session' });
  router.emit('memory:write', 'test-runner', { key: 'last_sku', value: 'ZEN-001' });

  // Give short tick for file write stream flush
  await new Promise((resolve) => setTimeout(resolve, 150));

  const recentEvents = await logger.readLastN(3);
  assert(recentEvents.length === 3, `readLastN returned 3 events (got ${recentEvents.length})`);
  assert(recentEvents[recentEvents.length - 1].type === 'memory:write', 'Last logged event matches latest emission');

  // --- Test S05: Agent State Machine (FSM) & Safety Guardrails ---
  console.log('\n📌 Testing S05: Agent State Machine & Safety Guardrails...');
  const fsm = new AgentStateMachine(router, { maxIterations: 5 });

  assert(fsm.getState() === 'IDLE', 'FSM initial state is IDLE');

  fsm.startTask('Ingest supplier inventory list');
  assert(fsm.getState() === 'ROUTING', 'Task start transitions IDLE -> ROUTING');

  fsm.confirmRouting('pipeline:ingestion');
  assert(fsm.getState() === 'EXECUTING', 'Routing confirmation transitions ROUTING -> EXECUTING');

  // Step 1: Normal action
  const step1 = fsm.stepAction({ toolName: 'read_inbox', parameters: { dir: '_inbox' } }, false);
  assert(step1.proceed === true && fsm.getState() === 'EXECUTING', 'Normal action permitted in EXECUTING state');

  // Step 2: Mutative action triggers approval
  const step2 = fsm.stepAction({ toolName: 'write_ledger', parameters: { sku: 'ZEN-001' } }, true);
  assert(step2.proceed === false && fsm.getState() === 'WAITING_APPROVAL', 'Mutative action triggers WAITING_APPROVAL');
  assert(fsm.getPendingApproval()?.toolName === 'write_ledger', 'Pending approval captured correctly');

  // Resolve approval
  fsm.resolveApproval(true, 'User confirmed via TUI');
  assert(fsm.getState() === 'EXECUTING', 'Approval resolution returns to EXECUTING');

  // Step 3 & 4: Infinite loop repeated action detection
  fsm.stepAction({ toolName: 'fetch_status', parameters: { id: 1 } }, false);
  const repeated = fsm.stepAction({ toolName: 'fetch_status', parameters: { id: 1 } }, false);
  assert(repeated.proceed === false && fsm.getState() === 'ERROR', 'Repeated identical action trips circuit breaker to ERROR');

  // Reset and test max iterations cap
  fsm.reset();
  assert(fsm.getState() === 'IDLE', 'Reset returns to IDLE');

  fsm.startTask('Multi-step deep search');
  fsm.confirmRouting('search');
  for (let i = 1; i <= 5; i++) {
    fsm.stepAction({ toolName: `step_${i}`, parameters: { i } }, false);
  }
  const sixth = fsm.stepAction({ toolName: 'step_6', parameters: { i: 6 } }, false);
  assert(sixth.proceed === false && fsm.getState() === 'ERROR', '6th iteration halts loop (Max 5 exceeded)');

  await logger.close();

  console.log(`\n🏁 Test Results: ${passed} passed, ${failed} failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runAcceptanceTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
