<template>
  <div class="app" id="youyu-app">
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
  import Cookies from "js-cookie";

  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import YHeader from '@/components/common/header/YHeader.vue';
  import YFooter from "@/components/common/footer/YFooter.vue";
  import {message} from "ant-design-vue";

  const {getters, commit, dispatch} = useStore();

  const isRouterAlive = ref<boolean>(true);

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

  /**
   * fix: #12
   * 1. 如果token存在，则更新用户数据。
   * 2. 如果token不存在
   *   2.1 如果用户数据存在，清空用户数据并提示过期
   *   2.2 如果用户数据不存在，用户信息设置为初始值
   */
  const checkTokenValid = () => {
    const token = Cookies.get("token");
    if (token) {
      dispatch('getCurrentUser').then(res => {
        commit("changeUser", res.data);
      })
    } else {
      if (isLogin.value) {
        message.warning('登录凭证已过期，请重新登录！');
        commit("changeUser", {});
        setTimeout(() => {
          location.reload();
        }, 1500)
      } else {
        commit("changeUser", {});
      }
    }
  }

  checkTokenValid();
</script>

<style lang="scss" scoped>
  .app {
    background-color: var(--youyu-body-background);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-top: 60px;

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
