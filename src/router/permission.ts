import home from "./modules/home";
import create from "./modules/create";
import magazine from "./modules/magazine";
import album from "./modules/album";
import about from "./modules/about";
import article from "./modules/article";
import moment from "./modules/moment";
import lab from "./modules/lab"

const routes = [
  ...home,
  ...article,
  ...magazine,
  ...moment,
  ...album,
  ...create,
  ...lab,
  ...about,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]

export default routes;
