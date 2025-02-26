import { useMachine } from '@xstate/react';
import { ReactNode } from 'react';
import { AnyStateMachine, EventFrom, SnapshotFrom } from 'xstate';

export const useStateMachineFunnel = <TMachine extends AnyStateMachine>(machine: TMachine) => {
  const [snapshot, send] = useMachine(machine);

  type MachineSnapshot = SnapshotFrom<TMachine>;
  type MachineEvent = EventFrom<TMachine>;

  type Component = (props: {
    dispatch: (event: MachineEvent) => void;
    context: MachineSnapshot['context'];
  }) => ReactNode;

  const render = (components: Record<MachineSnapshot['value'], Component>) => {
    return components[snapshot.value as MachineSnapshot['value']]({
      dispatch: send,
      context: snapshot.context,
    });
  };

  return [render, snapshot.value as MachineSnapshot['value']] as const;
};
