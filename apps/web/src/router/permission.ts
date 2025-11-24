import about from './modules/about';
import album from './modules/album';
import column from './modules/column';
import create from './modules/create';
import home from './modules/home';
import lab from './modules/lab';
import links from './modules/links';
import message from './modules/message';
import moment from './modules/moment';
import note from './modules/note';
import post from './modules/post';

import search from './modules/search';
import user from './modules/user';

const routes = [
  ...home,
  ...post,
  ...moment,
  ...note,
  ...album,
  ...lab,
  ...links,
  ...message,
  ...about,

  ...create,
  ...user,
  ...search,
  ...column,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

export default routes;
