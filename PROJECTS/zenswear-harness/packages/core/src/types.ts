// Agent lifecycle states
export type AgentState = 'IDLE' | 'ROUTING' | 'EXECUTING' | 'WAITING_APPROVAL' | 'ERROR';

// Every event in the system is one of these
export type AgentEvent = {
  id: string;
  timestamp: string;
  type: 
    | 'agent:start' 
    | 'agent:end' 
    | 'tool:call' 
    | 'tool:result' 
    | 'memory:write' 
    | 'memory:read' 
    | 'ui:update' 
    | 'error'
    | 'fallback:triggered' 
    | 'approval:requested' 
    | 'approval:resolved';
  source: string;       // Which module emitted this
  payload: any;         // Event-specific data
};

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
  cacheHitTokens?: number;    // DeepSeek specific
  cacheMissTokens?: number;   // DeepSeek specific
  estimatedCostUSD: number;
}

export interface InferenceResult {
  content: string;
  toolCalls?: ToolCall[];
  usage: TokenUsage;
  model: string;
  wasFallback: boolean;
}
