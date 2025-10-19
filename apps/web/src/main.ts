import { createApp } from 'vue';

import { lineNumbers } from '@codemirror/view';
import row from '@youyu/shared/directives/row';
import Antd from 'ant-design-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { config } from 'md-editor-v3';
import '@/libs/handlers/event-bus-handler';

import focus from '@/libs/directives/focus';
import login from '@/libs/directives/login';
import scrollToEl from '@/libs/directives/scrollToEl.js';
import slideIn from '@/libs/directives/vSlideIn';
import IconPark from '@/libs/plugins/iconpark';
import store from '@/store';

import App from './App.vue';
import vSideFixed from './libs/directives/vSideFixed';
import router from './router';

import './assets/css/main.scss';
import './assets/css/theme/dark.scss';
import './assets/css/theme/light.scss';
import '@icon-park/vue-next/styles/index.css'; //icon-park
import 'md-editor-v3/lib/style.css';
import 'animate.css';
import '@youyu/shared/assets/css/shared-base.css';

const app = createApp(App);

app.use(router).use(Antd).use(store);
IconPark(app);

app.directive('side-fixed', vSideFixed);
app.directive('scroll-to-el', scrollToEl);
app.directive('row', row);
app.directive('focus', focus);
app.directive('login', login);
app.directive('slideIn', slideIn);

dayjs.extend(RelativeTime);
app.config.globalProperties.$dayjs = dayjs;

dayjs.locale('zh-cn'); // use loaded locale globally

config({
  markdownItConfig(md) {
    // some config ...
  },
  codeMirrorExtensions(theme, extensions) {
    return [...extensions, lineNumbers()];
  },
  editorExtensions: {
    highlight: {
      css: {
        atom: {
          light: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
          dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
        },
      },
    },
  },
});

//@ts-ignore
window._AMapSecurityConfig = {
  securityJsCode: '77d3241f7557a36fc3a1f64f967277b3',
};

app.mount('#app');
