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
import {nextTick, ref, provide, computed, watch, onMounted} from 'vue';
import {useStore} from "vuex";
import {useRoute} from "vue-router";

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import YHeader from '@/components/common/header/YHeader.vue';
import YFooter from "@/components/common/footer/YFooter.vue";
import {message} from "ant-design-vue";
import Cookies from "js-cookie";
import {generateAuthRoutes} from "@/router/config/useGenerateRoutes";

const {getters, commit, dispatch} = useStore();
const route = useRoute();

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

const stopQueryStateWatch = watch(() => route.query.state, (newVal) => {
  connectLogin();
})

provide('reload', reload);

const connectLogin = () => {
  if (isLogin.value) {
    return;
  }
  const {code, state} = route.query;
  if (!!code && !!state) {
    dispatch('token', {
      grant_type: 'password', // oauth认证方式
      authType: 'github', // 校验方式设置成对应模式
      code
    }).then(res => {
      const {userInfo, access_token, refresh_token} = res.data;
      message.success(`欢迎回来，${userInfo.nickname}`);
      commit("changeLogin", false);
      commit("changeUser", userInfo);
      Cookies.set("access_token", access_token, {expires: 7});
      Cookies.set("refresh_token", refresh_token, {expires: 30});
      // 生成权限路由
      generateAuthRoutes();
      stopQueryStateWatch();
    })
  }
}
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
