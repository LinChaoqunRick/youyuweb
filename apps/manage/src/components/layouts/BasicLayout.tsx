import { Outlet } from 'react-router-dom';

import AuthMenu from '@/components/menu/AuthMenu';
import Logo from '@/components/menu/Logo';

import './css/bacisLayout.css';

function BasicLayout() {
  return (
    <div className="main-container">
      <div className="main-menu">
        <Logo />
        <AuthMenu />
      </div>
      <div className="view-content">
        <Outlet />
      </div>
    </div>
  );
}

export default BasicLayout;
