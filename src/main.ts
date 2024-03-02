import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import Antd from 'ant-design-vue';
import RelativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import IconPark from "@/libs/plugins/iconpark";
import MarkExtension from 'markdown-it-mark';
import {config} from 'md-editor-v3';
import {lineNumbers} from '@codemirror/view';
import ImageFiguresPlugin from 'markdown-it-image-figures';
import anchor from 'markdown-it-anchor';

import aside from "@/libs/directives/aside.js";
import aside2 from "@/libs/directives/aside2.js";
import aside3 from "@/libs/directives/aside3.js";
import aside4 from "@/libs/directives/aside4.js";
import login from "@/libs/directives/login";
import slideIn from "@/libs/directives/vSlideIn";
import slideInLeft from "@/libs/directives/vSlideInLeft";
import scrollToEl from "@/libs/directives/scrollToEl.js";
import row from "@/libs/directives/row";
import focus from "@/libs/directives/focus";
import zhcn from 'dayjs/locale/zh-cn';

import './assets/main.scss';
import './assets/css/theme/dark.scss';
import './assets/css/theme/light.scss';
import '@icon-park/vue-next/styles/index.css'; //icon-park
import 'md-editor-v3/lib/style.css';
import 'animate.css';


const app = createApp(App);

app.use(router).use(Antd).use(store);
IconPark(app);

app.directive("aside", aside);
app.directive("aside2", aside2);
app.directive("aside3", aside3);
app.directive("aside4", aside4);
app.directive("scroll-to-el", scrollToEl);
app.directive("row", row);
app.directive("focus", focus);
app.directive("login", login);
app.directive("slideIn", slideIn);
app.directive("slideInLeft", slideInLeft);

dayjs.extend(RelativeTime)
app.config.globalProperties.$dayjs = dayjs;


dayjs.locale('zh-cn') // use loaded locale globally

config({
  markdownItConfig(md) {
    md.use(MarkExtension);
    md.use(ImageFiguresPlugin, {dataType: true, figcaption: "alt", lazy: true, async: true})
    md.use(anchor, {permalink: true})
  },
  codeMirrorExtensions(theme, extensions) {
    return [...extensions, lineNumbers()];
  },
  editorExtensions: {
    highlight: {
      css: {
        atom: {
          light:
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
          dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
        }
      }
    }
  }
});

window._AMapSecurityConfig = {
  securityJsCode: '77d3241f7557a36fc3a1f64f967277b3',
};

app.mount('#app');
