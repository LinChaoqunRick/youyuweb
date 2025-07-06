import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Outlet />
    </div>
  );
}

export default Dashboard;
