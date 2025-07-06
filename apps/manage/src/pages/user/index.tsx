import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div className="dashboard-wrapper">
      <Outlet />
    </div>
  );
}

export default UserLayout;
