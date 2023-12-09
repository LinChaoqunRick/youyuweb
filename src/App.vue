<template>
  <div class="app" id="youyu-app">
    <!--<button @click="count++">count++</button>
    <div v-for="item of count">{{item}}</div>-->
    <a-config-provider :locale="zhCN">
      <div class="header" id="header">
        <YHeader/>
      </div>
      <div class="main-app" id="main-app" v-if="isRouterAlive">
        <router-view/>
      </div>
      <YFooter/>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref, provide, computed, watch} from 'vue';
import {useStore} from "vuex";

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import YHeader from '@/components/common/header/YHeader.vue';
import YFooter from "@/components/common/footer/YFooter.vue";
import {message} from "ant-design-vue";

const {getters, commit, dispatch} = useStore();

const isRouterAlive = ref<boolean>(true);
const count = ref<number>(1);

const isLogin = computed(() => getters['isLogin']);

function reload() {
  isRouterAlive.value = false;
  nextTick(function () {
    isRouterAlive.value = true;
  })
}

/**
 * 用户登录后刷新页面
 */
watch(() => isLogin.value, (newVal) => {
  if (newVal) {
    reload();
  }
})

provide('reload', reload);

</script>

<style lang="scss" scoped>
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
</style>
