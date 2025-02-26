import { motion } from 'motion/react';
import AppBar from '../components/AppBar';
import { useStateMachineFunnel } from '../hooks/useStateMachineFunnel';
import { studentMachine } from '../machines/studentMachine';
import AdmissionYearInput from '../pages/AdmissionYearInput';
import DepartmentInput from '../pages/DepartmentInput';
import GradeInput from '../pages/GradeInput';
import TimetablePage from '../pages/TimetablePage';

const progressMap: Record<string, number> = {
  학과입력: 25,
  입학년도입력: 50,
  학년입력: 75,
  시간표추천: 100,
};

const Layout = () => {
  const [render, state] = useStateMachineFunnel(studentMachine);

  const progress = progressMap[state];

  return (
    <div className="font-pretendard flex min-h-dvh flex-col py-6">
      <AppBar progress={progress} />
      <motion.div
        key={state}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-1 flex-col"
      >
        {render({
          학과입력: ({ send }) => (
            <DepartmentInput
              onNext={(department) => send({ type: '학과입력완료', payload: { department } })}
            />
          ),
          입학년도입력: ({ send }) => (
            <AdmissionYearInput
              onNext={(admissionYear) =>
                send({ type: '입학년도입력완료', payload: { admissionYear } })
              }
            />
          ),
          학년입력: ({ send }) => (
            <GradeInput onNext={(grade) => send({ type: '학년입력완료', payload: { grade } })} />
          ),
          시간표추천: () => <TimetablePage />,
        })}
      </motion.div>
    </div>
  );
};

export default Layout;
