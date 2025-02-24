import { create } from 'zustand';

interface StudentState {
  department: string;
  admissionYear: number;
  grade: number;
  setDepartment: (department: string) => void;
  setAdmissionYear: (year: number) => void;
  setGrade: (grade: number) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  department: '',
  admissionYear: 0,
  grade: 0,
  setDepartment: (department) => set({ department }),
  setAdmissionYear: (admissionYear) => set({ admissionYear }),
  setGrade: (grade) => set({ grade }),
}));
