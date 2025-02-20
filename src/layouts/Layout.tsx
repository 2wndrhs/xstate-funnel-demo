import { motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router';
import AppBar from '../components/AppBar';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="font-pretendard flex min-h-dvh flex-col py-6">
      <AppBar progress={50} />
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
