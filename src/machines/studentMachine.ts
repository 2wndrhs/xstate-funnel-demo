import { assign, setup } from 'xstate';

export const studentMachine = setup({
  types: {
    context: {} as {
      department: string;
      admissionYear: number;
      grade: number;
    },
    events: {} as
      | { type: '학과입력완료'; payload: { department: string } }
      | { type: '입학년도입력완료'; payload: { admissionYear: number } }
      | { type: '학년입력완료'; payload: { grade: number } },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4FcJgHYoHSE1VwH5rBQ8cFIOgYiLMBExwGY6BtABgF1FQAHAe1gEsUfOWNiAAeiAIwAWAOy4AnIwBsAJhmMArOvEAORtoA0IAJ6Jt43JLlW5y8cvWTlu9QF8Xh1Bmx5i+QCKNgCPNZOS+gTQMLMJcvPyCwmIIjoy4ioxyAMzSWuq6StqKhiYIZhbWNnYOThpuHuiYOAR+wf7hTKxIINF8AkIdCYoZuOnKjOlSyori6ulphabmlta29o7Obu4gWJyY8B2e9ShR3N1xfYgAtAXGF4o1IPveBCSkRzE98YiOcwjijJLy0kUmiykkkaUYejuDwaoSCLw6XVivVACSc2lwWWkZjBEy04ik31+-zkgIcOVUQPKULqjxa8I4xyRHwQOVkkikSmkI0U6XUjGUhL+AKBAwmvJGckk1K8DUAO0OAEBrADorgBTZwA5M68TsjRKZ0v9xNIdGZlMN8nZBekMbitMNJLytLd1kA */
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
          actions: assign({ department: ({ event }) => event.payload.department }),
        },
      },
    },
    입학년도입력: {
      on: {
        입학년도입력완료: {
          target: '학년입력',
          actions: assign({ admissionYear: ({ event }) => event.payload.admissionYear }),
        },
      },
    },
    학년입력: {
      on: {
        학년입력완료: {
          target: '시간표추천',
          actions: assign({ grade: ({ event }) => event.payload.grade }),
        },
      },
    },
    시간표추천: {
      type: 'final',
    },
  },
});
