<template>
  <a-dropdown-button type="primary" :trigger="['click']" class="create" overlayClassName="create-container">
    创作中心
    <template #overlay>
      <a-menu>
        <router-link v-for="(item, index) in menu" :to="item.path" custom v-slot="{isActive, isExactActive, navigate}">
          <a-menu-item :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}" :key="index"
                       @click="handleNavigate(isActive,isExactActive,navigate)">
            <component :is="item.icon"/>
            {{item.label}}
          </a-menu-item>
        </router-link>
      </a-menu>
    </template>
    <template #icon>
      <i-down-one theme="filled"/>
    </template>
  </a-dropdown-button>
</template>

<script setup lang="ts">
  import {computed, ref} from 'vue';
  import {useStore} from "vuex";

  const {getters, commit} = useStore();

  const isLogin = computed(() => getters['isLogin']);

  const menu = ref([
    {
      label: "写博客",
      path: "/create/post",
      icon: "i-write"
    },
    {
      label: "发动态",
      path: "/create/moment",
      icon: "i-notes"
    },
    {
      label: "草稿箱",
      path: "/draft",
      icon: "i-newspaper-folding"
    }
  ]);

  function handleNavigate(isActive, isExactActive, navigate) {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
    if (!isExactActive) {
      navigate();
    }
  }
</script>

<style lang="scss">
  .create-container {

    .ant-dropdown-content {
      width: 105px !important;

      .ant-dropdown-menu {
        border-radius: 6px;
        padding: 4px 6px;
        /*background-color: var(--youyu-body-background);*/

        .ant-dropdown-menu-title-content {
          color: #909090;
        }

        .router-link-active {
          .ant-dropdown-menu-title-content {
            color: #1890ff !important;
            font-weight: bold;
          }
        }
      }

      .ant-dropdown-menu-title-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .i-icon {
          font-size: 16px;
          margin-right: 6px;
        }
      }
    }
  }
</style>
