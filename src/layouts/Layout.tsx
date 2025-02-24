import { motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router';
import AppBar from '../components/AppBar';

const progressMap: Record<string, number> = {
  '/': 25,
  '/admissionYear': 50,
  '/grade': 75,
  '/timetable': 100,
};

const Layout = () => {
  const location = useLocation();
  const progress = progressMap[location.pathname];

  return (
    <div className="font-pretendard flex min-h-dvh flex-col py-6">
      <AppBar progress={progress} />
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-1 flex-col"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Layout;
