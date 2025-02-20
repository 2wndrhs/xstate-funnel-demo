import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './index.css';
import Layout from './layouts/Layout.tsx';
import AdmissionYearInput from './pages/AdmissionYearInput.tsx';
import DepartmentInput from './pages/DepartmentInput.tsx';
import GradeInput from './pages/GradeInput.tsx';
import TimetablePage from './pages/TimetablePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DepartmentInput />} />
          <Route path="admissionYear" element={<AdmissionYearInput />} />
          <Route path="grade" element={<GradeInput />} />
          <Route path="timetable" element={<TimetablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
