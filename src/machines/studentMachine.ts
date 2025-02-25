import { assign, setup } from 'xstate';

export const studentMachine = setup({
  types: {
    context: {} as {
      department: string;
      admissionYear: number;
      grade: number;
    },
    events: {} as
      | { type: '학과입력완료'; department: string }
      | { type: '입학년도입력완료'; admissionYear: number }
      | { type: '학년입력완료'; grade: number },
  },
}).createMachine({
  id: 'student',
  initial: '학과입력',
  context: {
    department: '',
    admissionYear: 0,
    grade: 0,
  },
  states: {
    학과입력: {
      on: {
        학과입력완료: {
          target: '입학년도입력',
          actions: assign({ department: ({ event }) => event.department }),
        },
      },
    },
    입학년도입력: {
      on: {
        입학년도입력완료: {
          target: '학년입력',
          actions: assign({ admissionYear: ({ event }) => event.admissionYear }),
        },
      },
    },
    학년입력: {
      on: {
        학년입력완료: {
          target: '시간표추천',
          actions: assign({ grade: ({ event }) => event.grade }),
        },
      },
    },
    시간표추천: {
      type: 'final',
    },
  },
});
