const MINUTES_PER_SLOT = 5;
export const SLOT_HEIGHT = 3.5;
const TIME_TABLE_COLOR = [
  '#D497EE',
  '#9E86E1',
  '#7AA5E9',
  '#7CD1C1',
  '#77CA88',
  '#A7C970',
  '#ECC369',
  '#fcaa67',
  '#f08676',
];

type CourseTime = {
  end: string;
  start: string;
  week: string;
  classroom: string;
};

type Course = {
  courseName: string;
  professorName: string;
  classification: 'MAJOR_REQUIRED' | 'MAJOR_ELECTIVE' | 'GENERAL_REQUIRED' | 'GENERAL_ELECTIVE';
  credit: number;
  courseTime: CourseTime[];
};

export type Timetable = {
  timetableId: number;
  courses: Course[];
};

export const getTotalCredit = (courses: Course[]): number => {
  return courses.reduce((acc, course) => acc + course.credit, 0);
};

export const getMajorCredit = (courses: Course[]): number => {
  return courses.reduce((acc, course) => {
    if (course.classification === 'MAJOR_REQUIRED' || course.classification === 'MAJOR_ELECTIVE') {
      return acc + course.credit;
    }

    return acc;
  }, 0);
};

const getDays = (courses: Course[]): string[] => {
  const hasWeekend = courses.some((course) => course.courseTime.some((time) => time.week === '토'));

  const baseDays = ['월', '화', '수', '목', '금'];
  return hasWeekend ? [...baseDays, '토'] : baseDays;
};

const getTimeRange = (courses: Course[]): number[] => {
  const earliestHour = 9;
  let latestHour = 0;

  courses.forEach((course) => {
    course.courseTime.forEach((time) => {
      const endHour = Number(time.end.split(':')[0]);

      latestHour = Math.max(latestHour, endHour);
    });
  });

  return Array.from({ length: latestHour - earliestHour + 1 }, (_, i) => i + earliestHour);
};

export const getGridTemplateCols = (length: number): string => {
  return `1fr repeat(${length}, 3fr)`;
};

export const getGridTemplateRows = (length: number): string => {
  const headerHeight = SLOT_HEIGHT * 6;
  return `${headerHeight}px repeat(${length}, ${SLOT_HEIGHT * 12}px)`;
};

const getCoursePosition = (courseTime: CourseTime): { top: number; height: number } => {
  const [startHour, startMinute] = courseTime.start.split(':').map(Number);
  const [endHour, endMinute] = courseTime.end.split(':').map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  const top = (startMinute / MINUTES_PER_SLOT) * SLOT_HEIGHT;
  const height = ((end - start) / MINUTES_PER_SLOT) * SLOT_HEIGHT;

  return { top, height };
};

const getLineClamp = (courseTime: CourseTime): number => {
  const [startHour, startMinute] = courseTime.start.split(':').map(Number);
  const [endHour, endMinute] = courseTime.end.split(':').map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  // 50분 이하 2줄 제한
  if (end - start <= 50) {
    return 2;
  }
  // 1시간 15분 이하 3줄 제한
  else if (end - start <= 75) {
    return 3;
  } else {
    return 4;
  }
};

const Timetable = ({ timetable }: { timetable: Timetable }) => {
  const courses = timetable.courses;

  const totalCredit = getTotalCredit(courses);
  const days = getDays(courses);
  const timeRange = getTimeRange(courses);

  return (
    <div className={`border-primary w-full overflow-hidden rounded-xl border-2`}>
      {/* Timetable Header */}
      <div className={`bg-primary flex items-center justify-between py-2.5 pr-2.5 pl-5 text-white`}>
        <h3 className="text-sm font-semibold">🤔 뭔가 좋아보이는 시간표</h3>
        <button
          className="text-primary bg-credit-chip rounded-lg px-2 py-1 text-xs font-semibold"
          disabled
        >
          {totalCredit}학점
        </button>
      </div>

      <div
        className="divide-placeholder grid"
        style={{
          gridTemplateColumns: getGridTemplateCols(days.length),
          gridTemplateRows: getGridTemplateRows(timeRange.length),
        }}
      >
        {/* Header row */}
        <div className="border-placeholder col-span-full grid grid-cols-subgrid border-b-1">
          <div className="border-placeholder border-r-1"></div>
          {days.map((day) => (
            <div
              key={`${timetable.timetableId}-${day}`}
              className="border-placeholder flex items-center justify-center border-r-1 text-xs font-light last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Time rows */}
        {timeRange.map((tableTime) => (
          <div
            key={`${timetable.timetableId}-${tableTime}`}
            className="border-placeholder col-span-full grid grid-cols-subgrid border-b-1 last:border-b-0"
          >
            <div className="border-placeholder flex justify-end border-r-1 p-0.5 text-xs font-light">
              {tableTime}
            </div>
            {days.map((tableDay) => (
              <div
                key={`${timetable.timetableId}-${tableTime}-${tableDay}`}
                className="border-placeholder relative border-r-1 last:border-r-0"
              >
                {courses.map((course) => {
                  const courseTime = course.courseTime.find(
                    (time) =>
                      time.week === tableDay && Number(time.start.split(':')[0]) === tableTime,
                  );
                  if (courseTime) {
                    const { top, height } = getCoursePosition(courseTime);
                    const bgColor =
                      TIME_TABLE_COLOR[course.courseName.length % TIME_TABLE_COLOR.length];

                    return (
                      <div
                        key={`${timetable.timetableId}-${course.courseName}-${courseTime.start}`}
                        className="absolute w-full p-0.5 text-xs font-bold text-white"
                        style={{
                          backgroundColor: bgColor,
                          borderColor: bgColor,
                          top: `${top}px`,
                          height: `${height}px`,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: getLineClamp(courseTime),
                          overflow: 'hidden',
                        }}
                      >
                        {course.courseName}
                      </div>
                    );
                  }
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timetable;
