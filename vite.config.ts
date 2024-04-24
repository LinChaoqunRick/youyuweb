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
      '/plat': {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/plat/, '')
      },
      /*'/plat': {
        target: "https://v2.youyul.com/",
        changeOrigin: true,
      },*/
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
      prodUrl: '//unpkg.com/{name}@{version}/{path}',
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'dist/vue.global.prod.js',
        },
        {
          name: 'vue-demi',
          var: 'VueDemi',
          path: 'lib/index.iife.js',
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'dist/vue-router.global.prod.js',
        },
        {
          name: 'vuex',
          var: 'Vuex',
          path: 'dist/vuex.global.prod.js',
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'dist/axios.min.js',
        },
        {
          name: 'lodash',
          var: '_',
          path: 'lodash.min.js',
        },
        // 因为ant-design-vue使用了dayjs插件，需要配置dayjs
        {
          name: 'dayjs',
          var: 'dayjs',
          path: [
            'dayjs.min.js',
            'plugin/customParseFormat.js',
            'plugin/weekday.js',
            'plugin/localeData.js',
            'plugin/weekOfYear.js',
            'plugin/weekYear.js',
            'plugin/advancedFormat.js',
            'plugin/quarterOfYear.js',
            'plugin/relativeTime.js'
          ],
        },
        {
          name: 'ant-design-vue',
          var: 'antd',
          path: 'dist/antd.min.js',
          css: ['dist/antd.min.css', 'dist/antd.dark.min.css']
        },
        {
          name: 'md-editor-v3',
          var: 'MdEditorV3',
          path: 'lib/umd/index.js',
          css: ['lib/preview.css', 'lib/style.css']
        },
      ],
    })
  ],
})
