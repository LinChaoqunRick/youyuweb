import home from "./modules/home";
import create from "./modules/create";
import magazine from "./modules/magazine";
import album from "./modules/album";
import about from "./modules/about";
import article from "./modules/article";
import moment from "./modules/moment";

const routes = [
  ...home,
  ...article,
  ...magazine,
  ...moment,
  ...album,
  ...about,
  ...create,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]

export default routes;
