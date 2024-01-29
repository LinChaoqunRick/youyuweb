import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {Plugin as importToCDN} from 'vite-plugin-cdn-import';
import {visualizer} from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,     // 开启/关闭sourcemap
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    host: '0.0.0.0', //ip地址
    port: 3000, //端口号
    open: false, //启动后是否自动打开浏览器,
    proxy: {
      /*'/plat': {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/plat/, '')
      },*/
      '/plat': {
        target: "https://v2.youyul.com/",
        changeOrigin: true,
      },
      /*'/api': {
        target: "https://116.62.114.102:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }*/
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    visualizer({open: true}),
    importToCDN({
      // prodUrl: '//unpkg.com/{name}@{version}/{path}',
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3.4.15/dist/vue.global.prod.js',
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'https://unpkg.com/vue-demi@0.14.6',
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.2.5/dist/vue-router.global.prod.js',
        },
        {
          name: 'vuex',
          var: 'Vuex',
          path: 'https://unpkg.com/vuex@4.1.0/dist/vuex.global.prod.js',
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://unpkg.com/axios@0.26.1/dist/axios.min.js',
        },
        {
          name: 'lodash',
          var: '_',
          path: 'https://unpkg.com/lodash@4.17.21/lodash.min.js',
        },
        {
          name: 'relativeTime',
          var: 'RelativeTime',
          path: 'https://unpkg.com/dayjs@1.11.10/plugin/relativeTime.js',
        },
        // 因为ant-design-vue使用了dayjs插件，需要配置dayjs
        {
          name: 'dayjs',
          var: 'dayjs',
          path: [
            'https://unpkg.com/dayjs@1.11.10/dayjs.min.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/customParseFormat.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/weekday.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/localeData.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/weekOfYear.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/weekYear.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/advancedFormat.js',
            'https://unpkg.com/dayjs@1.11.10/plugin/quarterOfYear.js',
          ],
        },
        {
          name: 'ant-design-vue',
          var: 'antd',
          path: 'https://unpkg.com/ant-design-vue@3.2.20/dist/antd.min.js',
          css: ['https://unpkg.com/ant-design-vue@3.2.20/dist/antd.min.css', 'https://unpkg.com/ant-design-vue@3.2.20/dist/antd.dark.min.css']
        },
      ],
    })
  ],
})
