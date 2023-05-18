<template>
  <!--UserInfo{{userInfo}}-->
  <div class="user-info-container">
    <a-popover placement="bottom"
               overlayClassName="user-info-popover">
      <template #content>
        <div v-for="item in menuList" class="ope-list">
          <div class="ope-list-separator" v-if="item.type === 'separator'"></div>
          <RouterLink v-else-if="item.path" :to="item.path" v-slot="{isActive, isExactActive, navigate}">
            <div class="ope-list-item"
                 :class="{'router-link-active':isActive, 'router-link-exact-active':item.exact?isExactActive:isActive}">
              <component :is="item.icon" theme="outline" size="18"/>
              <div class="ope-item-label">
                {{item.label}}
              </div>
            </div>
          </RouterLink>
          <div v-else class="ope-list-item" @click="handleClick(item)">
            <component :is="item.icon" theme="outline" size="18"/>
            <div class="ope-item-label">
              {{item.label}}
            </div>
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
  import {computed} from "vue";
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
      type: 'separator'
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
    {
      type: 'separator'
    },
    {
      label: "帮助",
      icon: "i-help",
      path: '/help'
    },
    {
      label: "退出",
      icon: "i-logout"
    },
  ];

  function handleClick(item) {
    switch (item.label) {
      case "退出":
        showConfirm();
        break;
    }
  }

  const showConfirm = () => {
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

        img {
          height: 100%;
          width: 100%;
          border-radius: 50%;
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
    .ope-list-separator {
      border-bottom: 2px solid var(--youyu-border-color2);
    }

    .ope-list-item {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 7px 8px;
      color: var(--youyu-body-text1) !important;
      font-weight: normal;
      transition: .3s;

      &:hover {
        color: #1890ff !important;
      }

      &.router-link-exact-active {
        color: #1890ff !important;
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
