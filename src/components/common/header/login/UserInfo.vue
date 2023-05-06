<template>
  <!--UserInfo{{userInfo}}-->
  <div class="user-info-container">
    <a-popover placement="bottom"
               overlayClassName="user-info-popover">
      <template #content>
        <div v-for="item in menuList" class="ope-list">
          <div class="ope-list-separator" v-if="item.type === 'separator'"></div>
          <div class="ope-list-item ope-list1" v-else @click="handleClick(item)">
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
  import {useRouter} from 'vue-router';
  import {cleanCookieLocalStorage} from "@/assets/utils/utils";

  const {getters, dispatch} = useStore();
  let userInfo = computed(() => getters['userInfo']);
  const router = useRouter();

  const menuList = [
    {
      label: "我的主页",
      icon: "i-home"
    },
    {
      label: "管理文章",
      icon: "i-pencil"
    },
    {
      label: "我的时刻",
      icon: "i-ulikecam"
    },
    {
      label: "我的关注",
      icon: "i-like"
    },
    {
      label: "我的收藏",
      icon: "i-star"
    },
    {
      type: 'separator'
    },
    {
      label: "个人中心",
      icon: "i-user"
    },
    {
      label: "消息通知",
      icon: "i-remind"
    },
    {
      label: "账号设置",
      icon: "i-setting-one"
    },
    {
      type: 'separator'
    },
    {
      label: "帮助",
      icon: "i-help"
    },
    {
      label: "退出",
      icon: "i-logout"
    },
  ];

  function handleClick(item) {
    switch (item.label) {
      case "我的关注":
        router.push(`/user/${userInfo.value.id}/follow`)
        break;
      case "我的收藏":
        router.push(`/user/${userInfo.value.id}/collection`)
        break;
      case "我的时刻":
        router.push(`/user/${userInfo.value.id}/moment`)
            break;
      case "我的主页":
        router.push(`/user/${userInfo.value.id}`)
        break;
      case "管理文章":
        router.push(`/user/${userInfo.value.id}/post`)
        break;
      case "个人中心":
        router.push(`/user/center/profile`)
        break;
      case "账号设置":
        router.push(`/user/center/account`)
        break;
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
      border-bottom: 2px solid #e7e7e7;
    }

    .ope-list-item {
      transition: .3s;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 7px 8px;
      color: rgb(96, 98, 102);

      .i-icon {
        fill: #637792;
      }

      &:hover {
        background-color: #f5f5f5;
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
