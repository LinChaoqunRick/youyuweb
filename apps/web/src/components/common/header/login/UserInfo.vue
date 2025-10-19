<template>
  <div class="user-info-container">
    <a-popover
      v-model:open="visible"
      placement="bottomRight"
      trigger="click"
      overlay-class-name="user-info-popover"
      :get-popup-container="triggerNode => triggerNode.parentNode"
    >
      <template #content>
        <div class="user-info">
          <div class="avatar">
            <RouterLink :to="`/user/${userInfo.id}`">
              <img :src="userInfo.avatar">
            </RouterLink>
          </div>
          <div class="info-right">
            <RouterLink :to="`/user/${userInfo.id}`">
              <div class="nickname">
                {{ userInfo.nickname }}
              </div>
            </RouterLink>
            <div class="info-data">
              <div v-if="userInfo.adname" class="adname">
                IP：{{ userInfo.adname }}
              </div>
            </div>
          </div>
        </div>
        <div class="action-notice">
          <div class="an-item">
            <i-list theme="outline" size="18" fill="currentColor" />
            <span class="item-text">待办</span>
            <a-badge
              count="2"
              :number-style="{
                backgroundColor: '#1890ff',
              }"
            />
          </div>
          <div class="an-item">
            <i-remind theme="outline" size="18" fill="currentColor" />
            <span class="item-text">通知</span>
            <a-badge count="6" />
          </div>
        </div>
        <div class="menu-list">
          <div
            v-for="item in menuList"
            :key="item.path"
            class="menu-item"
            @click="onItemClick"
          >
            <RouterLink v-slot="{ isActive, isExactActive }" :to="item.path">
              <div
                class="ope-list-item"
                :class="{
                  'router-link-active': isActive,
                  'router-link-exact-active': item.exact ? isExactActive : isActive,
                }"
              >
                <component :is="item.icon" theme="outline" size="18" />
                <div class="ope-item-label">
                  {{ item.label }}
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="bottom-action">
          <div class="action-item">
            <i-help theme="outline" size="13" fill="currentColor" />
            <span>帮助</span>
          </div>
          <div class="action-item" @click="showLogoutConfirm">
            <i-logout theme="outline" size="13" fill="currentColor" />
            <span>退出</span>
          </div>
        </div>
      </template>
      <div class="user-info-simple">
        <div class="avatar">
          <img :src="userInfo.avatar">
        </div>
        <div class="nickname">
          {{ userInfo.nickname }}
        </div>
      </div>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { cleanCookieLocalStorage } from '@youyu/shared/utils';
import { Modal, message } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import openSpin from '@/libs/tools/openSpin';

let closeSpin: Function;
const { getters, dispatch } = useStore();
let userInfo = computed(() => getters['userInfo']);
const visible = ref(false);

const menuList = [
  {
    label: '我的主页',
    icon: 'i-home',
    path: `/user/${userInfo.value.id}`,
    exact: true,
  },
  {
    label: '个人中心',
    icon: 'i-user',
    path: '/user/center/profile',
  },
  {
    label: '管理文章',
    icon: 'i-pencil',
    path: `/user/${userInfo.value.id}/post`,
  },
  {
    label: '我的时刻',
    icon: 'i-ulikecam',
    path: `/user/${userInfo.value.id}/moment`,
  },
  {
    label: '我的关注',
    icon: 'i-like',
    path: `/user/${userInfo.value.id}/follow`,
  },
  {
    label: '我的收藏',
    icon: 'i-star',
    path: `/user/${userInfo.value.id}/favorites`,
  },
  {
    label: '我的相册',
    icon: 'i-picture-album',
    path: '/album/list/mine/page',
  },
  {
    label: '账号设置',
    icon: 'i-setting-one',
    path: '/user/center/account',
  },
];

function onItemClick() {
  visible.value = false;
}

const showLogoutConfirm = () => {
  visible.value = false;
  Modal.confirm({
    title: '您确定要退出当前账号?',
    icon: '',
    onOk() {
      closeSpin = openSpin({
        componentProps: {
          tip: '正在登出账号...',
        },
      });
      handleLogout();
    },
    onCancel() {
      // console.log('Cancel');
    },
    class: 'test',
  });
};

function handleLogout() {
  dispatch('logout')
    .then(res => {
      cleanCookieLocalStorage();
      message.success('登出成功!');
      // 刷新页面
      setTimeout(() => {
        location.reload();
      }, 800);
    })
    .finally(() => {
      closeSpin();
    });
}
</script>

<style lang="scss" scoped>
.user-info-container {
  .user-info-simple {
    display: flex;
    align-items: center;

    .avatar {
      width: 36px;
      height: 36px;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .nickname {
      align-items: center;
      max-width: 100px;
      margin-left: 8px;
      overflow: hidden;
      font-weight: bold;
      color: var(--youyu-body-text);
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.user-info-popover {
  .user-info {
    display: flex;
    align-items: center;
    width: 224px;
    padding-bottom: 6px;

    .avatar {
      width: 48px;
      height: 48px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info-right {
      flex: 1;
      margin-left: 12px;

      .nickname {
        width: 100%;
        margin-left: 0;
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
        color: var(--youyu-text);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .info-data {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: var(--youyu-text1);

        .adname {
          padding: 2px 6px;
          margin-right: 6px;
          color: #fff;
          background-color: var(--primary-color);
          border-radius: 4px;
        }
      }
    }
  }

  .action-notice {
    display: flex;
    padding: 8px 0;
    border-top: 1px solid var(--youyu-border-color2);

    .an-item {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      height: 50px;
      color: var(--youyu-text1);
      border: 1px solid var(--youyu-border-color2);
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        color: var(--youyu-text2);
        background-color: var(--youyu-background2);
      }

      &:nth-child(n + 2) {
        margin-left: 8px;
      }

      .item-text {
        margin: 0 4px;
      }
    }
  }

  .menu-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 4px;
    width: 100%;
    padding: 8px 0;
    border-color: var(--youyu-border-color2);
    border-style: solid;
    border-width: 1px 0;

    .menu-item {
      width: 112px;

      /* background-color: skyblue; */
      border-radius: 4px;

      /* border: 1px solid var(--youyu-border-color2); */

      &.menu-item-separator {
        grid-column-start: span 2;

        .ope-list-item {
          padding: 0;

          /* height: 1px; */

          /* background-color: var(--youyu-border-color); */
        }
      }
    }
  }

  .bottom-action {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    font-size: 13px;
    color: var(--youyu-text1);

    .action-item {
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: #1890ff;
      }

      span {
        margin-left: 4px;
      }
    }
  }

  .ope-list-separator {
    /* border-bottom: 2px solid var(--youyu-border-color2); */
  }

  .ope-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 0;
    font-weight: normal;
    color: var(--youyu-body-text1) !important;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #1890ff !important;
      background-color: var(--youyu-background2);
    }

    &.router-link-exact-active {
      font-weight: bold;
      color: #1890ff !important;
      background-color: var(--youyu-background2);
    }

    .i-icon {
      margin-right: 4px;
      fill: #637792;
    }

    &:hover {
      /* background-color: var(--youyu-body-background-ligth); */
      color: #1890ff;

      /* font-weight: bold; */

      .i-icon {
        fill: #1890ff;
      }
    }

    &:nth-child(n + 2) {
      margin: 4px 0;
    }

    &:last-child {
      margin-bottom: 0 !important;
    }

    .ope-item-label {
      margin-left: 3px;
    }
  }
}
</style>
