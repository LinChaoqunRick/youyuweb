import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';
import AuthMenu from '@/components/menu/AuthMenu';
import Logo from '@/components/menu/Logo';

import './css/bacisLayout.css';

function BasicLayout() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="main-container">
      <div className="main-menu">
        <Logo />
        <AuthMenu />
      </div>
      <div className="view-wrapper">
        <Header onRefresh={handleRefresh} />
        <div className="view-content" key={refreshKey}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
