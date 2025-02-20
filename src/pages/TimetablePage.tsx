import Timetable, { Timetable as TimetableType } from '../components/Timetable';

const timetable: TimetableType = {
  timetableId: 1,
  courses: [
    {
      courseName: '컴퓨터수학1',
      professorName: '최종선',
      classification: 'MAJOR_REQUIRED',
      credit: 3,
      courseTime: [
        {
          week: '월',
          start: '13:30',
          end: '14:45',
          classroom: '정보과학관 21203',
        },
        {
          week: '수',
          start: '13:30',
          end: '14:45',
          classroom: '정보과학관 21203',
        },
      ],
    },
    {
      courseName: '프로그래밍1및실습',
      professorName: '김익수',
      classification: 'MAJOR_REQUIRED',
      credit: 3,
      courseTime: [
        {
          week: '화',
          start: '10:00',
          end: '10:50',
          classroom: '정보과학관 21205',
        },
        {
          week: '화',
          start: '11:00',
          end: '11:50',
          classroom: '정보과학관 21205',
        },
        {
          week: '금',
          start: '13:00',
          end: '13:50',
          classroom: '정보과학관 21205',
        },
        {
          week: '금',
          start: '14:00',
          end: '14:50',
          classroom: '정보과학관 21205',
        },
      ],
    },
    {
      courseName: '컴퓨터미적분활용',
      professorName: '김미미',
      classification: 'MAJOR_ELECTIVE',
      credit: 3,
      courseTime: [
        {
          week: '수',
          start: '09:00',
          end: '10:15',
          classroom: '정보과학관 21601',
        },
        {
          week: '목',
          start: '12:00',
          end: '13:15',
          classroom: '정보과학관 21304',
        },
      ],
    },
    {
      courseName: '컴퓨터학개론',
      professorName: '차영화',
      classification: 'MAJOR_ELECTIVE',
      credit: 3,
      courseTime: [
        {
          week: '월',
          start: '15:00',
          end: '16:15',
          classroom: '미래관 20401',
        },
        {
          week: '목',
          start: '13:30',
          end: '14:45',
          classroom: '정보과학관 21601',
        },
      ],
    },
    {
      courseName: 'AI입문',
      professorName: '문지욱',
      classification: 'GENERAL_ELECTIVE',
      credit: 3,
      courseTime: [
        {
          week: '수',
          start: '16:30',
          end: '17:45',
          classroom: '조만식기념관 12330',
        },
      ],
    },
    {
      courseName: 'Global Issues',
      professorName: 'Gregory Dawson',
      classification: 'GENERAL_ELECTIVE',
      credit: 3,
      courseTime: [
        {
          week: '화',
          start: '15:00',
          end: '16:15',
          classroom: '진리관 11522',
        },
        {
          week: '화',
          start: '16:30',
          end: '17:45',
          classroom: '진리관 11522',
        },
      ],
    },
  ],
};

const TimetablePage = () => {
  return (
    <div className="mt-6 flex flex-1 flex-col items-center">
      <h2 className="text-center text-[28px] font-semibold whitespace-pre-wrap">
        {`사용자님을 위한\n시간표를 가져왔어요!`}
      </h2>
      <div className="mt-6 flex w-full flex-1 flex-col px-10">
        <Timetable timetable={timetable} />
      </div>
      <div className="sticky bottom-6 flex w-full justify-center">
        <button
          type="button"
          className={`bg-primary mt-4 w-50 rounded-2xl py-3.5 font-semibold text-white`}
        >
          이 시간표가 좋아요
        </button>
      </div>
    </div>
  );
};

export default TimetablePage;
