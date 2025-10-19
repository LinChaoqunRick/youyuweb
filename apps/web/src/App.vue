<template>
  <transition-group name="app-mask-fade">
    <div v-if="routeStatus !== RouteStatus.Resolved" class="first-loading-mask">
      <div v-if="routeStatus === RouteStatus.Pending">
        <span class="blinking">加载中...</span>
        <div class="loader" />
      </div>
      <div v-if="routeStatus === RouteStatus.Rejected">
        <svg aria-hidden="true">
          <use xlink:href="#icon-jiazaishibai" />
        </svg>
        <span>加载失败，请稍后再试</span>
      </div>
    </div>
  </transition-group>
  <a-config-provider :theme="{ algorithm: getTheme() }">
    <div id="youyu-app" class="app">
      <a-config-provider :locale="zhCN">
        <div id="header" class="header">
          <YHeader />
        </div>
        <div v-if="isRouterAlive" id="main-app" class="main-app">
          <router-view />
        </div>
        <YFooter />
      </a-config-provider>
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { nextTick, ref, provide, computed, watch } from 'vue';

import { theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { useStore } from 'vuex';

import YFooter from '@/components/common/footer/YFooter.vue';
import YHeader from '@/components/common/header/YHeader.vue';
import { RouteStatus } from '@/store/system/login/login';

const { getters } = useStore();

const routeStatus = computed(() => getters['getRouteStatus']);
const isRouterAlive = ref<boolean>(true);
const currentTheme = computed(() => getters.currentTheme);
const isLogin = computed(() => getters['isLogin']);

/**
 * 获取主题配置算法
 */
function getTheme() {
  return currentTheme.value === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;
}

/**
 * reload 重新渲染
 */
function reload() {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  });
}

/**
 * 用户登录后刷新页面
 */
watch(
  () => isLogin.value,
  newVal => newVal && reload(),
);

provide('reload', reload);
</script>

<style lang="scss" scoped>
/* 定义动画的关键帧 */
@keyframes blink {
  0% {
    opacity: 1; /* 开始时完全不透明 */
  }

  50% {
    opacity: 0; /* 中间时完全透明 */
  }

  100% {
    opacity: 1; /* 结束时又回到完全不透明 */
  }
}

.first-loading-mask {
  @keyframes l6 {
    100% {
      inset: 0;
    }
  }

  position: fixed;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--youyu-background1);

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loader {
    position: relative;
    width: 120px;
    height: 22px;
    margin-top: 8px;
    color: skyblue;
    border: 2px solid;
    border-radius: 20px;
  }

  .loader::before {
    position: absolute;
    inset: 0 100% 0 0;
    margin: 2px;
    background: currentcolor;
    border-radius: inherit;
    content: '';
    animation: l6 2s 1 forwards;
  }
}

.app {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding-top: 60px;

  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    height: 60px;
  }

  .main-app {
    position: relative;
    height: 100%;
    min-height: calc(100vh - 100px);
  }
}

.app-mask-fade-enter-active,
.app-mask-fade-leave-active {
  transition: opacity 1s ease;
}

.app-mask-fade-enter-from,
.app-mask-fade-leave-to {
  opacity: 0;
}

/* 应用动画到元素 */
.blinking {
  animation-name: blink;
  animation-duration: 2s; /* 动画持续时间 */
  animation-timing-function: ease-in-out; /* 控制动画速度曲线 */
  animation-iteration-count: infinite; /* 无限循环 */
}
</style>
