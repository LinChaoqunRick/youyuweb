import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import Antd from 'ant-design-vue';
import {IconPark} from "@/libs/plugins/iconpark";
import animated from 'animate.css';

// directives
import aside from "@/libs/directives/aside.js";
import aside2 from "@/libs/directives/aside2.js";
import aside3 from "@/libs/directives/aside3.js";
import aside4 from "@/libs/directives/aside4.js";
import login from "@/libs/directives/login";
import scrollToEl from "@/libs/directives/scrollToEl.js";
import row from "@/libs/directives/row";
import focus from "@/libs/directives/focus";


import RelativeTime from "dayjs/plugin/relativeTime";

// js
import dayjs from "dayjs";
import zhcn from 'dayjs/locale/zh-cn';

// css
import './assets/main.scss';
import './assets/css/theme/dark.css';
import './assets/css/theme/light.css';
import '@icon-park/vue-next/styles/index.css'; //icon-park
import 'md-editor-v3/lib/style.css';

const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(store);
IconPark(app);

app.directive("aside", aside);
app.directive("aside2", aside2);
app.directive("aside3", aside3);
app.directive("aside4", aside4);
app.directive("scroll-to-el", scrollToEl);
app.directive("row", row);
app.directive("focus", focus);
app.directive("login", login);

dayjs.extend(RelativeTime)
app.config.globalProperties.$dayjs = dayjs;

dayjs.locale('zh-cn') // use loaded locale globally

app.mount('#app');
