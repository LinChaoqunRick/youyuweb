import { Outlet } from 'react-router-dom';

function OutletLayout() {
  return (
    <div className="sub-view-wrapper">
      <Outlet />
    </div>
  );
}

export default OutletLayout;
