import { Breadcrumb } from 'antd';
import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { authRoutes } from '@/router';

function itemRender(currentRoute: any, params: any, items: any, paths: any) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;
  return isLast
    ? (<span>{currentRoute.meta.title}</span>)
    : (<Link to={`/${paths.join('/')}`}>{currentRoute.meta.title}</Link>);
}

function Breadcrumbs() {
  const location = useLocation();
  const matches = matchRoutes(authRoutes[0].children!, location);
  const items = matches?.map(item => item.route);

  return <Breadcrumb itemRender={itemRender} items={items} />;
}

export default Breadcrumbs;
