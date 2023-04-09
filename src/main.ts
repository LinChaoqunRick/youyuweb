import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store";
import Antd from 'ant-design-vue';
import MdEditor from 'md-editor-v3';
import {install} from '@icon-park/vue-next/es/all';
import animated from 'animate.css'

// directives
import aside from "@/libs/directives/aside.js";
import aside2 from "@/libs/directives/aside2.js";
import aside3 from "@/libs/directives/aside3.js";
import aside4 from "@/libs/directives/aside4.js";
import scrollToEl from "@/libs/directives/scrollToEl.js";
import row from "@/libs/directives/row.ts";
import focus from "@/libs/directives/focus";


import RelativeTime from "dayjs/plugin/relativeTime";

// js
import MarkExtension from "@/libs/marked/marked-mark";
import dayjs from "dayjs";
import zhcn from 'dayjs/locale/zh-cn';

// css
import './assets/main.scss';
import './assets/css/theme/dark.scss';
import './assets/css/theme/default.scss';
import '@icon-park/vue-next/styles/index.css'; //icon-park
import 'md-editor-v3/lib/style.css';

const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(store);

app.directive("aside", aside);
app.directive("aside2", aside2);
app.directive("aside3", aside3);
app.directive("aside4", aside4);
app.directive("scroll-to-el", scrollToEl);
app.directive("row", row);
app.directive("focus", focus);

dayjs.extend(RelativeTime)
app.config.globalProperties.$dayjs = dayjs;

dayjs.locale('zh-cn') // use loaded locale globally

// Install
// install(app); // use default prefix 'icon', eg: icon is People, name is icon-people.
install(app, 'i'); // use custom prefix 'i', eg: icon is People, name is i-people.

MdEditor.config({
  markedExtensions: [MarkExtension],
  markedRenderer(renderer) {
    renderer.heading = (text, level, _r, _s, _index, headingId) => {
      return `<h${level} id="${headingId}"><a href="#${headingId}">${text}</a></h${level}>`;
    };

    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
    };

    return renderer;
  },
  editorConfig: {},
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

app.mount('#app');
