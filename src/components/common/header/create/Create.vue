<template>
  <a-dropdown-button type="primary" :trigger="['click']" class="create" overlayClassName="create-container">
    创作中心
    <template #overlay>
      <a-menu>
        <router-link v-for="(item, index) in menu" :to="item.path">
          <a-menu-item :key="index">
            <component :is="item.icon"/>
            {{item.label}}
          </a-menu-item>
        </router-link>
      </a-menu>
    </template>
    <template #icon>
      <icon-down/>
    </template>
  </a-dropdown-button>
</template>

<script setup lang="ts">
  import {ref} from 'vue';

  const menu = ref([
    {
      label: "写博客",
      path: "/create/post",
      icon: "icon-write"
    },
    {
      label: "发动态",
      path: "/create/moment",
      icon: "icon-notes"
    },
    {
      label: "草稿箱",
      path: "/draft",
      icon: "icon-newspaper-folding"
    }
  ])
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
          color: #515767;
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
          margin-right: 10px;
        }
      }
    }
  }
</style>
