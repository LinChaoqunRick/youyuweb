import home from "./modules/home";
import create from "./modules/create";
import magazine from "./modules/magazine";
import album from "./modules/album";
import about from "./modules/about";
import post from "./modules/post";
import moment from "./modules/moment";
import lab from "./modules/lab";
import note from "./modules/note";
import user from "./modules/user";
import search from "./modules/search";

const routes = [
  ...home,
  ...post,
  ...moment,
  ...note,
  ...magazine,
  ...album,
  ...create,
  ...lab,
  ...about,
  ...user,
  ...search,
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]

export default routes;
