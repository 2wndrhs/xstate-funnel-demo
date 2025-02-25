import { useMachine } from '@xstate/react';
import { ReactNode } from 'react';
import { EventFromLogic, SnapshotFrom } from 'xstate';
import { studentMachine } from '../machines/studentMachine';

type StudentState = SnapshotFrom<typeof studentMachine>;
type StudentEvent = EventFromLogic<typeof studentMachine>;

export const useStudentFunnel = () => {
  const [state, send] = useMachine(studentMachine);

  const render = (
    components: Record<
      StudentState['value'],
      (props: {
        dispatch: (event: StudentEvent) => void;
        context: StudentState['context'];
      }) => ReactNode
    >,
  ) => {
    return components[state.value]({ dispatch: send, context: state.context });
  };

  return [render, state.value] as const;
};
