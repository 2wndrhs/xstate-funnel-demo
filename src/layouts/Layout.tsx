import { useMachine } from '@xstate/react';
import { motion } from 'motion/react';
import AppBar from '../components/AppBar';
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
  const [snapshot, send] = useMachine(studentMachine);
  const progress = progressMap[snapshot.value];

  return (
    <div className="font-pretendard flex min-h-dvh flex-col py-6">
      <AppBar progress={progress} />
      <motion.div
        key={snapshot.value}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-1 flex-col"
      >
        {snapshot.matches('학과입력') && (
          <DepartmentInput onNext={(department) => send({ type: '학과입력완료', department })} />
        )}
        {snapshot.matches('입학년도입력') && (
          <AdmissionYearInput
            onNext={(admissionYear) => send({ type: '입학년도입력완료', admissionYear })}
          />
        )}

        {snapshot.matches('학년입력') && (
          <GradeInput onNext={(grade) => send({ type: '학년입력완료', grade })} />
        )}
        {snapshot.matches('시간표추천') && <TimetablePage />}
      </motion.div>
    </div>
  );
};

export default Layout;
