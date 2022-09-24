import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import Antd from 'ant-design-vue';
import {install} from '@icon-park/vue-next/es/all';

// css
import './assets/main.css';
import 'ant-design-vue/dist/antd.css';
import './assets/css/theme/dark.scss';
import './assets/css/theme/default.scss';
import '@icon-park/vue-next/styles/index.css'; //icon-park

const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(store);

// Install
install(app); // use default prefix 'icon', eg: icon is People, name is icon-people.
install(app, 'i'); // use custom prefix 'i', eg: icon is People, name is i-people.

app.mount('#app');
