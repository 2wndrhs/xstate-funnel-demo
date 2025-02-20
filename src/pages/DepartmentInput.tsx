import * as Popover from '@radix-ui/react-popover';
import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const departments = [
  '차세대반도체학과',
  'AI융합학부',
  '글로벌미디어학부',
  '미디어경영학과',
  '소프트웨어학부',
  '전자정보공학부 IT융합전공',
  '전자정보공학부 전자공학전공',
  '정보보호학과',
  '컴퓨터학부',
] as const;

const DepartmentInput = () => {
  const [department, setDepartment] = useState('');
  const [matchingDepartments, setMatchingDepartments] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setDepartment(value);

    const matches = departments.filter(
      (dept) => value !== '' && dept.toLowerCase().includes(value.toLowerCase()),
    );
    setMatchingDepartments(matches);
  };

  const handleDepartmentSelect = (department: string) => {
    setDepartment(department);
    setMatchingDepartments([]);
  };

  const handleNextClick = () => {
    navigate('/admissionYear');
  };

  return (
    <div className="mt-6 flex flex-1 flex-col items-center">
      <h2 className="text-[28px] font-semibold">사용자님에 대해 알려주세요!</h2>
      <span className="mt-1 font-light">시간표를 만들기 위한 학과 정보가 필요해요.</span>
      <div className="my-8 flex w-full flex-1 flex-col px-12">
        <div>
          <label className="mb-1.5 block text-sm">학과</label>

          <Popover.Root open={matchingDepartments.length > 0}>
            <Popover.Trigger asChild>
              <input
                type="text"
                value={department}
                onChange={handleInputChange}
                className="bg-basic-light text-primary focus-visible:outline-ring placeholder-placeholder w-full rounded-xl px-4 py-3 text-lg font-semibold"
                placeholder="학과"
              />
            </Popover.Trigger>

            <AnimatePresence>
              {matchingDepartments.length > 0 && (
                <Popover.Content
                  asChild
                  sideOffset={5}
                  forceMount
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <motion.ul
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-basic-light z-10 max-h-44 w-[var(--radix-popover-trigger-width)] overflow-y-auto rounded-xl border border-gray-200 shadow-sm"
                  >
                    {matchingDepartments.map((dept) => (
                      <li key={dept}>
                        <button
                          type="button"
                          className="text-list focus-visible:outline-ring flex w-full items-center justify-between rounded-xl px-4 py-2 text-lg font-semibold hover:bg-gray-100 focus-visible:-outline-offset-1"
                          onClick={() => handleDepartmentSelect(dept)}
                        >
                          {dept}
                          {department === dept && <Check className="size-4 text-green-500" />}
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

export default DepartmentInput;
