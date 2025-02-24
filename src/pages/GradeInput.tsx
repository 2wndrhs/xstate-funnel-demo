import * as Popover from '@radix-ui/react-popover';
import { Check, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStudentStore } from '../stores';

type Grade = 0 | 1 | 2 | 3 | 4;

const grades = [1, 2, 3, 4] as const;

const GradeInput = () => {
  const { department, admissionYear, grade, setGrade } = useStudentStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleGradeSelect = (grade: Grade) => {
    setGrade(grade);
    setShowDropdown(false);
  };

  const handleNextClick = () => {
    console.log('student', {
      department,
      admissionYear,
      grade,
    });

    // Some API Call
    // fetch('https://api.example.com/student', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     department,
    //     admissionYear,
    //     grade,
    //   }),
    // });

    navigate('/timetable');
  };

  return (
    <div className="mt-6 flex flex-1 flex-col items-center">
      <h2 className="text-[28px] font-semibold">사용자님에 대해 알려주세요!</h2>
      <span className="mt-1 font-light">시간표를 만들기 위한 학년 정보가 필요해요.</span>
      <div className="my-8 flex w-full flex-1 flex-col px-12">
        <div>
          <label className="mb-1.5 block text-sm">학년</label>

          <Popover.Root open={showDropdown} onOpenChange={setShowDropdown}>
            <Popover.Trigger asChild>
              <button
                type="button"
                className={`bg-basic-light focus-visible:outline-ring flex w-full items-center justify-between rounded-xl px-4 py-3 text-lg font-semibold ${grade === 0 ? 'text-placeholder' : 'text-primary'}`}
              >
                {grade === 0 ? '학년' : grade}
                <ChevronDown className="text-text size-4" />
              </button>
            </Popover.Trigger>

            <AnimatePresence>
              {showDropdown && (
                <Popover.Content asChild sideOffset={5} forceMount>
                  <motion.ul
                    className="bg-basic-light z-10 w-[var(--radix-popover-trigger-width)] rounded-xl border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    {grades.map((gradeOption) => (
                      <li key={gradeOption}>
                        <button
                          type="button"
                          className="text-list focus-visible:outline-ring flex w-full items-center justify-between rounded-xl px-4 py-2 text-lg font-semibold hover:bg-gray-100 focus-visible:-outline-offset-1"
                          onClick={() => {
                            handleGradeSelect(gradeOption);
                          }}
                        >
                          {gradeOption}
                          {grade === gradeOption && <Check className="size-4 text-green-500" />}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                </Popover.Content>
              )}
            </AnimatePresence>
          </Popover.Root>
        </div>
      </div>
      <button
        type="button"
        className="bg-primary mt-4 w-50 rounded-2xl py-3.5 font-semibold text-white"
        onClick={handleNextClick}
      >
        다음
      </button>
    </div>
  );
};

export default GradeInput;
