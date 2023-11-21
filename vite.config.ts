import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {autoComplete, Plugin as importToCDN} from 'vite-plugin-cdn-import';
import {visualizer} from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    visualizer({open: true}),
    importToCDN({
      modules: [
        // autoComplete("vue"),
        // autoComplete("lodash"),
        // autoComplete("axios"),
        // {
        //   name: "ant-design-vue",
        //   var: "Antd", // 根据main.ts中定义的来
        //   path: "https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.17/dist/antd.min.js",
        //   css: [
        //     "https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.17/dist/antd.css",
        //     "https://cdn.jsdelivr.net/npm/ant-design-vue@3.2.17/dist/antd.dark.css"
        //   ],
        // },
      ],
    })
  ],
  build: {
    // 开启sourcemap
    sourcemap: true,
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
        // target: "http://localhost:8090",
        target: "https://v2.youyul.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/plat/, '')
      },
      /*'/api': {
        target: "https://116.62.114.102:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }*/
    }
  },
})
