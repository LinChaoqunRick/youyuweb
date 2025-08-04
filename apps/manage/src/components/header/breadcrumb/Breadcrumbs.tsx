import { Breadcrumb } from 'antd';
import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { authRoutes } from '@/router';

function itemRender(currentRoute: any, params: any, items: any, paths: any) {
  const { path, meta } = currentRoute;
  const { icon, title } = meta;
  const isLast = path === items[items.length - 1]?.path;
  return isLast
    ? (
      <span>
        {icon}
        {title}
      </span>
    )
    : (
      <Link to={`/${paths.join('/')}`}>
        {icon}
        {title}
      </Link>
    );
}

function Breadcrumbs() {
  const location = useLocation();
  const matches = matchRoutes(authRoutes[0].children!, location);
  const items = matches?.map(item => item.route);

  return (
    <Breadcrumb
      className="header-breadcrumbs"
      itemRender={itemRender}
      items={items}
    />
  );
}

export default Breadcrumbs;
