import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import { createZenswearEngine, AgentEvent, AgentState } from 'core';

interface TuiLogEntry {
  id: string;
  time: string;
  type: string;
  summary: string;
}

const App: React.FC = () => {
  const { exit } = useApp();
  const [engine] = useState(() => createZenswearEngine());
  const [state, setState] = useState<AgentState>(engine.stateMachine.getState());
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [logs, setLogs] = useState<TuiLogEntry[]>([]);
  const [inputBuffer, setInputBuffer] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('Type :help for commands, or press q to quit.');

  useEffect(() => {
    // Subscribe to state change events
    const unsubAny = engine.router.onAny((evt: AgentEvent) => {
      setEventsCount((prev) => prev + 1);
      const time = new Date(evt.timestamp).toLocaleTimeString();
      let summary = '';

      if (evt.type === 'agent:state_change') {
        const payload = evt.payload as { to: AgentState; reason?: string };
        setState(payload.to);
        summary = `State -> [${payload.to}] (${payload.reason || ''})`;
      } else if (evt.type === 'tool:call') {
        const p = evt.payload as { toolName?: string };
        summary = `Tool invoked: ${p?.toolName || 'unknown'}`;
      } else if (evt.type === 'error') {
        const p = evt.payload as { error?: string };
        summary = `ALERT: ${p?.error || 'Unknown error'}`;
      } else if (evt.type === 'approval:requested') {
        summary = `APPROVAL REQUIRED for mutative action. Type :approve or :deny`;
      } else {
        summary = JSON.stringify(evt.payload).slice(0, 48);
      }

      setLogs((prev) => [...prev.slice(-6), { id: evt.id, time, type: evt.type, summary }]);
    });

    // Boot event
    engine.router.emit('ui:update', 'tui', { status: 'TUI connected' });

    return () => {
      unsubAny();
    };
  }, [engine]);

  useInput((input, key) => {
    if (key.return) {
      const command = inputBuffer.trim();
      setInputBuffer('');

      if (!command) return;

      if (command === ':quit' || command === ':q') {
        exit();
        return;
      }

      if (command === ':help' || command === ':h') {
        setFeedback('Commands: :task <name>, :step <tool>, :mutative, :approve, :deny, :reset, :quit');
        return;
      }

      if (command.startsWith(':task ')) {
        const taskName = command.replace(':task ', '');
        try {
          engine.stateMachine.startTask(taskName);
          engine.stateMachine.confirmRouting('pipeline:manual');
          setFeedback(`Started task: "${taskName}"`);
        } catch (err: any) {
          setFeedback(`Error: ${err.message}`);
        }
        return;
      }

      if (command.startsWith(':step ')) {
        const toolName = command.replace(':step ', '');
        try {
          const res = engine.stateMachine.stepAction({ toolName, parameters: { manual: true } }, false);
          engine.router.emit('tool:call', 'tui-user', { toolName });
          setFeedback(`Executed step: ${toolName} (state: ${res.state})`);
        } catch (err: any) {
          setFeedback(`Error: ${err.message}`);
        }
        return;
      }

      if (command === ':mutative') {
        try {
          engine.stateMachine.stepAction({ toolName: 'delete_ledger_entry', parameters: { id: 1 } }, true);
          setFeedback('Mutative action proposed. Approval required.');
        } catch (err: any) {
          setFeedback(`Error: ${err.message}`);
        }
        return;
      }

      if (command === ':approve') {
        try {
          engine.stateMachine.resolveApproval(true, 'Approved by operator in TUI');
          setFeedback('Action approved.');
        } catch (err: any) {
          setFeedback(`Error: ${err.message}`);
        }
        return;
      }

      if (command === ':deny') {
        try {
          engine.stateMachine.resolveApproval(false, 'Denied by operator in TUI');
          setFeedback('Action denied.');
        } catch (err: any) {
          setFeedback(`Error: ${err.message}`);
        }
        return;
      }

      if (command === ':reset') {
        engine.stateMachine.reset('User requested reset');
        setFeedback('FSM reset to IDLE.');
        return;
      }

      setFeedback(`Unknown command "${command}". Type :help for list.`);
      return;
    }

    if (key.backspace || key.delete) {
      setInputBuffer((prev) => prev.slice(0, -1));
      return;
    }

    if (key.ctrl && input === 'c') {
      exit();
      return;
    }

    // Regular char input
    setInputBuffer((prev) => prev + input);
  });

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="red" paddingX={1} width={78}>
      {/* Header */}
      <Box justifyContent="space-between" marginBottom={1}>
        <Text bold color="red">
          🔴 ZENSWEAR HARNESS
        </Text>
        <Box gap={2}>
          <Text>
            State:{' '}
            <Text bold color={state === 'ERROR' ? 'red' : state === 'WAITING_APPROVAL' ? 'yellow' : 'green'}>
              {state}
            </Text>
          </Text>
          <Text color="gray">|</Text>
          <Text>
            Events: <Text bold color="cyan">{eventsCount}</Text>
          </Text>
        </Box>
      </Box>

      {/* Divider */}
      <Box borderStyle="single" borderColor="gray" borderTop={false} borderLeft={false} borderRight={false} marginBottom={1} />

      {/* Event Stream Log */}
      <Box flexDirection="column" minHeight={8} marginBottom={1}>
        <Text bold color="gray">
          📡 Live Event Stream (Flight Recorder Active):
        </Text>
        {logs.map((log) => (
          <Box key={log.id} gap={1}>
            <Text color="gray">[{log.time}]</Text>
            <Text bold color="yellow">
              {log.type.padEnd(18, ' ')}
            </Text>
            <Text>{log.summary}</Text>
          </Box>
        ))}
        {logs.length === 0 && <Text color="gray">No events emitted yet.</Text>}
      </Box>

      {/* Divider */}
      <Box borderStyle="single" borderColor="gray" borderTop={false} borderLeft={false} borderRight={false} marginBottom={1} />

      {/* Status Feedback */}
      <Box marginBottom={1}>
        <Text italic color="magenta">
          ℹ️ {feedback}
        </Text>
      </Box>

      {/* Interactive Command Prompt */}
      <Box>
        <Text bold color="red">
          &gt;{' '}
        </Text>
        <Text>{inputBuffer}</Text>
        <Text color="red">█</Text>
      </Box>
    </Box>
  );
};

// Start Ink App
render(<App />);
