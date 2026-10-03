export * from './types.js';
export * from './event-router.js';
export * from './logger.js';
export * from './state-machine.js';

import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EventRouter } from './event-router.js';
import { StructuredJsonlLogger } from './logger.js';
import { AgentStateMachine } from './state-machine.js';

/**
 * Initializes and bootstraps the Zenswear Core Engine.
 */
export function createZenswearEngine(options: { logDir?: string; sessionName?: string } = {}) {
  const router = new EventRouter();
  const logger = new StructuredJsonlLogger(router, options);
  const stateMachine = new AgentStateMachine(router);

  router.emit('agent:start', 'core', {
    version: '1.0.0',
    mode: 'development',
    logFile: logger.getLogPath(),
  });

  return {
    router,
    logger,
    stateMachine,
  };
}

// Check if running directly via CLI (e.g. tsx src/index.ts)
const isDirectRun = Boolean(
  process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1])
);

if (isDirectRun) {
  console.log('🔴 Zenswear Harness Core Engine — Starting...');
  const engine = createZenswearEngine();

  console.log(`📡 Event Router online.`);
  console.log(`📝 Flight Recorder logging to: ${engine.logger.getLogPath()}`);
  console.log(`🤖 State Machine initialized in: [${engine.stateMachine.getState()}]`);

  // Demonstrate simple state change
  engine.stateMachine.startTask('Initial system boot check');
  engine.stateMachine.confirmRouting('system:diagnostics');
  engine.stateMachine.stepAction({ toolName: 'check_subsystems', parameters: { checks: ['events', 'logger', 'fsm'] } });
  engine.stateMachine.completeTask('All core subsystems operational.');

  console.log(`✅ Core boot cycle finished in state: [${engine.stateMachine.getState()}]`);
}
