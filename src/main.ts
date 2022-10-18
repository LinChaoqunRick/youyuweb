import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import Antd from 'ant-design-vue';
import {install} from '@icon-park/vue-next/es/all';

// directives
import aside from "@/libs/directives/aside.js";
import aside2 from "@/libs/directives/aside2.js";

// css
import './assets/main.scss';
import 'ant-design-vue/dist/antd.css';
import './assets/css/theme/dark.scss';
import './assets/css/theme/default.scss';
import '@icon-park/vue-next/styles/index.css'; //icon-park

const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(store);

app.directive("aside", aside);
app.directive("aside2", aside2);

// Install
install(app); // use default prefix 'icon', eg: icon is People, name is icon-people.
install(app, 'i'); // use custom prefix 'i', eg: icon is People, name is i-people.

app.mount('#app');
