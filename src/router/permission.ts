import home from "./modules/home";
import post from "./modules/post";
import moment from "./modules/moment";
import note from "./modules/note";
import magazine from "./modules/magazine";
import album from "./modules/album";
import lab from "./modules/lab";
import links from "./modules/links";
import message from "./modules/message";
import about from "./modules/about";

import create from "./modules/create";
import user from "./modules/user";
import search from "./modules/search";
import column from "./modules/column";

const routes = [
  ...home,
  ...post,
  ...moment,
  ...note,
  ...magazine,
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
]

export default routes;
