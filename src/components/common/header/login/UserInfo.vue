<template>
  <div class="user-info-container">
    <a-popover v-model:visible="visible"
               placement="bottomRight"
               trigger="click"
               overlayClassName="user-info-popover">
      <template #content>
        <div class="user-info">
          <div class="avatar">
            <RouterLink :to="`/user/${userInfo.id}`">
              <img :src="userInfo.avatar"/>
            </RouterLink>
          </div>
          <div class="nickname-uid">
            <RouterLink :to="`/user/${userInfo.id}`">
              <div class="nickname">{{userInfo.nickname}}</div>
            </RouterLink>
            <div class="uid">uid: {{userInfo.id}}</div>
          </div>
        </div>
        <div class="action-notice">
          <div class="an-item">
            <i-list theme="outline" size="18" fill="currentColor"/>
            <span class="item-text">TODO</span>
            <a-badge count="2"
                     :number-style="{
                       backgroundColor: '#1890ff',
                     }"/>
          </div>
          <div class="an-item">
            <i-remind theme="outline" size="18" fill="currentColor"/>
            <span class="item-text">通知</span>
            <a-badge count="6"/>
          </div>
        </div>
        <div class="menu-list">
          <div v-for="item in menuList" class="menu-item" @click="onItemClick">
            <RouterLink :to="item.path" v-slot="{isActive, isExactActive, navigate}">
              <div class="ope-list-item"
                   :class="{'router-link-active':isActive, 'router-link-exact-active':item.exact?isExactActive:isActive}">
                <component :is="item.icon" theme="outline" size="18"/>
                <div class="ope-item-label">
                  {{item.label}}
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
        <div class="bottom-action">
          <div class="action-item">
            <i-help theme="outline" size="13" fill="currentColor"/>
            <span>帮助</span>
          </div>
          <div class="action-item" @click="showLogoutConfirm">
            <i-logout theme="outline" size="13" fill="currentColor"/>
            <span>退出</span>
          </div>
        </div>
      </template>
      <div class="user-info">
        <div class="avatar">
          <img :src="userInfo.avatar"/>
        </div>
        <div class="nickname">
          <span>{{userInfo.nickname}}</span>
        </div>
      </div>
    </a-popover>
  </div>
</template>

<script setup>
  import {ref, computed} from "vue";
  import {useStore} from "vuex";
  import Cookies from "js-cookie";
  import store from "@/store";
  import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
  import {createVNode} from 'vue';
  import {Modal, message} from 'ant-design-vue';
  import {useRouter, RouterLink} from 'vue-router';
  import {cleanCookieLocalStorage} from "@/assets/utils/utils";

  const {getters, dispatch} = useStore();
  let userInfo = computed(() => getters['userInfo']);
  const router = useRouter();
  const visible = ref(false);

  const menuList = [
    {
      label: "我的主页",
      icon: "i-home",
      path: `/user/${userInfo.value.id}`,
      exact: true
    },
    {
      label: "管理文章",
      icon: "i-pencil",
      path: `/user/${userInfo.value.id}/post`
    },
    {
      label: "我的时刻",
      icon: "i-ulikecam",
      path: `/user/${userInfo.value.id}/moment`
    },
    {
      label: "我的关注",
      icon: "i-like",
      path: `/user/${userInfo.value.id}/follow`
    },
    {
      label: "我的收藏",
      icon: "i-star",
      path: `/user/${userInfo.value.id}/collection`
    },
    {
      label: "个人中心",
      icon: "i-user",
      path: '/user/center/profile'
    },
    {
      label: "消息通知",
      icon: "i-remind",
      path: '/user/center/message'
    },
    {
      label: "账号设置",
      icon: "i-setting-one",
      path: '/user/center/account'
    },
  ];

  function onItemClick() {
    visible.value = false;
  }

  const showLogoutConfirm = () => {
    visible.value = false;
    Modal.confirm({
      title: '您确定要退出当前账号?',
      icon: createVNode(ExclamationCircleOutlined),
      // content: createVNode('div', { style: 'color:red;' }, 'Some descriptions'),
      onOk() {
        handleLogout();
      },
      onCancel() {
        // console.log('Cancel');
      },
      class: 'test',
    });
  };

  function handleLogout() {
    dispatch("logout").then(res => {
      cleanCookieLocalStorage();
      message.success('注销成功!');
      // 刷新页面
      location.reload();
    })
  }
</script>

<style lang="scss" scoped>
  .user-info-container {

    .user-info {
      display: flex;
      align-items: center;

      .avatar {
        height: 42px;
        width: 42px;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }

      .nickname {
        display: flex;
        align-items: center;
        color: var(--youyu-body-text);
        margin-left: 10px;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="scss">
  .user-info-popover {
    .user-info {
      width: 224px;
      display: flex;
      align-items: center;
      padding-bottom: 6px;

      .avatar {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .nickname-uid {
        margin-left: 12px;

        .nickname {
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--youyu-text);
        }

        .uid {
          font-size: 12px;
          color: var(--youyu-text1);
        }
      }
    }

    .action-notice {
      display: flex;
      border-top: 1px solid var(--youyu-border-color2);
      padding: 8px 0;

      .an-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        border-radius: 4px;
        border: 1px solid var(--youyu-border-color2);
        color: var(--youyu-text1);
        cursor: pointer;

        &:hover {
          background-color: var(--youyu-background2);
          color: var(--youyu-text2);
        }

        &:nth-child(n+2) {
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
      border-width: 1px 0 1px 0;
      border-style: solid;
      border-color: var(--youyu-border-color2);
      padding: 8px 0;

      .menu-item {
        width: 112px;
        /*background-color: skyblue;*/
        border-radius: 4px;

        &.menu-item-separator {
          grid-column-start: span 2;

          .ope-list-item {
            padding: 0;
            /*height: 1px;*/
            /*background-color: var(--youyu-border-color);*/
          }
        }
      }
    }

    .bottom-action {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: var(--youyu-text1);
      padding-top: 8px;

      .action-item {
        cursor: pointer;
        transition: .3s;

        &:hover {
          color: #1890ff;
        }

        span {
          margin-left: 4px;
        }
      }
    }

    .ope-list-separator {
      /*border-bottom: 2px solid var(--youyu-border-color2);*/
    }

    .ope-list-item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 7px 0;
      color: var(--youyu-body-text1) !important;
      font-weight: normal;
      transition: .3s;
      border-radius: 4px;

      &:hover {
        color: #1890ff !important;
        background-color: var(--youyu-background2);
      }

      &.router-link-exact-active {
        color: #1890ff !important;
        background-color: var(--youyu-background2);
        font-weight: bold;
      }

      .i-icon {
        fill: #637792;
      }

      &:hover {
        /*background-color: var(--youyu-body-background-ligth);*/
        color: #1890ff;
        /*font-weight: bold;*/

        .i-icon {
          fill: #1890ff;
        }
      }

      &:nth-child(n+2) {
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
