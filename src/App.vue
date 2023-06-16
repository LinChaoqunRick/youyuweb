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

  const {getters, commit} = useStore();

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
   * 如果localStorage存在user信息但是Cookie中的token失效，那么清空localStorage中的user信息
   */
  const checkTokenValid = () => {
    const token = Cookies.get("token");
    if (!token && isLogin.value) {
      message.warning('登录凭证已过期，请重新登录！');
      commit("changeUser", {});
      setTimeout(() => {
        location.reload();
      }, 1500)
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
