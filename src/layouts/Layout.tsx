import { motion } from 'motion/react';
import { useState } from 'react';
import AppBar from '../components/AppBar';
import AdmissionYearInput from '../pages/AdmissionYearInput';
import DepartmentInput from '../pages/DepartmentInput';
import GradeInput from '../pages/GradeInput';
import TimetablePage from '../pages/TimetablePage';

interface StudentState {
  department: string;
  admissionYear: number;
  grade: number;
}

type StudentStep = '학과입력' | '입학년도입력' | '학년입력' | '시간표추천';

const progressMap: Record<StudentStep, number> = {
  학과입력: 25,
  입학년도입력: 50,
  학년입력: 75,
  시간표추천: 100,
};

const Layout = () => {
  const [student, setStudent] = useState<StudentState>({
    department: '',
    admissionYear: 0,
    grade: 0,
  });
  const [step, setStep] = useState<StudentStep>('학과입력');
  const progress = progressMap[step];

  return (
    <div className="font-pretendard flex min-h-dvh flex-col py-6">
      <AppBar progress={progress} />
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-1 flex-col"
      >
        {step === '학과입력' && (
          <DepartmentInput
            onNext={(department) => {
              setStudent((prev) => ({ ...prev, department }));
              setStep('입학년도입력');
            }}
          />
        )}
        {step === '입학년도입력' && (
          <AdmissionYearInput
            onNext={(admissionYear) => {
              setStudent((prev) => ({ ...prev, admissionYear }));
              setStep('학년입력');
            }}
          />
        )}
        {step === '학년입력' && (
          <GradeInput
            onNext={(grade) => {
              setStudent((prev) => ({ ...prev, grade }));
              console.log(student);
              setStep('시간표추천');
            }}
          />
        )}
        {step === '시간표추천' && <TimetablePage />}
      </motion.div>
    </div>
  );
};

export default Layout;
