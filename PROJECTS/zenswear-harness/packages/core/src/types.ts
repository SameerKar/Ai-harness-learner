// Agent lifecycle states
export type AgentState = 'IDLE' | 'ROUTING' | 'EXECUTING' | 'WAITING_APPROVAL' | 'ERROR';

// Event types supported across the harness
export type AgentEventType =
  | 'agent:start'
  | 'agent:end'
  | 'agent:state_change'
  | 'tool:call'
  | 'tool:result'
  | 'memory:write'
  | 'memory:read'
  | 'ui:update'
  | 'error'
  | 'fallback:triggered'
  | 'approval:requested'
  | 'approval:resolved';

// Every event in the system follows this standard format
export interface AgentEvent<T = unknown> {
  id: string;
  timestamp: string;
  type: AgentEventType;
  source: string;       // Which module emitted this
  payload: T;           // Event-specific data
}

// State change payload
export interface StateChangePayload {
  from: AgentState;
  to: AgentState;
  reason?: string;
  context?: Record<string, unknown>;
}

// Standard tool I/O — every tool follows this contract
export interface ToolPayload {
  toolName: string;
  parameters: Record<string, unknown>;
}

export interface ToolResult {
  success: boolean;
  data?: unknown;
  error?: string;
  durationMs: number;
}

// Minimal JSON Schema definition for tool inputs
export interface JSONSchema {
  type: string;
  description?: string;
  properties?: Record<string, JSONSchema>;
  required?: string[];
  items?: JSONSchema;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: JSONSchema;
}

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
}

// LLM inference contract
export interface InferencePayload {
  systemPrompt: string;
  userMessage: string;
  tools?: ToolDefinition[];
  outputSchema?: JSONSchema;
  maxTokens?: number;
  temperature?: number;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  cacheHitTokens?: number;    // Cache specific (e.g. DeepSeek / Anthropic)
  cacheMissTokens?: number;
  estimatedCostUSD: number;
}

export interface InferenceResult {
  content: string;
  toolCalls?: ToolCall[];
  usage: TokenUsage;
  model: string;
  wasFallback: boolean;
}
