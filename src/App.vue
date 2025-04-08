<template>
  <transition-group name="app-mask-fade" mode="out-in">
    <div class="first-loading-mask" v-if="routeStatus !== RouteStatus.Resolved">
      <div v-if="routeStatus === RouteStatus.Pending">
        <span class="blinking">加载中...</span>
        <div class="loader"></div>
      </div>
      <div v-if="routeStatus === RouteStatus.Rejected">
        <svg aria-hidden="true">
          <use xlink:href="#icon-jiazaishibai"></use>
        </svg>
        <span>加载失败，请稍后再试</span>
      </div>
    </div>
  </transition-group>
  <a-cofig-provider :theme="{ algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }">
    <div class="app" id="youyu-app">
      <a-config-provider :locale="zhCN">
        <div class="header" id="header">
          <YHeader />
        </div>
        <div class="main-app" id="main-app" v-if="isRouterAlive">
          <router-view />
        </div>
        <YFooter />
      </a-config-provider>
    </div>
  </a-cofig-provider>
</template>

<script setup lang="ts">
import { nextTick, ref, provide, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import YHeader from '@/components/common/header/YHeader.vue';
import YFooter from '@/components/common/footer/YFooter.vue';
import { RouteStatus } from '@/store/system/login/login';

const { getters } = useStore();

const routeStatus = computed(() => getters['getRouteStatus']);
const isRouterAlive = ref<boolean>(true);
const currentTheme = computed(() => getters.currentTheme);
const isLogin = computed(() => getters['isLogin']);

function reload() {
  isRouterAlive.value = false;
  nextTick(function() {
    isRouterAlive.value = true;
  });
}

/**
 * 用户登录后刷新页面
 */
watch(
  () => isLogin.value,
  newVal => {
    if (newVal) {
      reload();
    }
  }
);

provide('reload', reload);
</script>

<style lang="scss" scoped>
.first-loading-mask {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: var(--youyu-background1);
  z-index: 999999;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loader {
    width: 120px;
    height: 22px;
    border-radius: 20px;
    color: skyblue;
    border: 2px solid;
    position: relative;
    margin-top: 8px;
  }

  .loader::before {
    content: '';
    position: absolute;
    margin: 2px;
    inset: 0 100% 0 0;
    border-radius: inherit;
    background: currentColor;
    animation: l6 2s 1 forwards;
  }

  @keyframes l6 {
    100% {
      inset: 0;
    }
  }
}

.app {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  background-color: var(--youyu-body-background);

  .header {
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .main-app {
    height: 100%;
    min-height: calc(100vh - 100px);
    position: relative;
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

/* 应用动画到元素 */
.blinking {
  animation-name: blink;
  animation-duration: 2s; /* 动画持续时间 */
  animation-iteration-count: infinite; /* 无限循环 */
  animation-timing-function: ease-in-out; /* 控制动画速度曲线 */
}
</style>
