<template>
  <!--UserInfo{{userInfo}}-->
  <div class="user-info-container">
    <a-popover placement="bottom"
               overlayClassName="user-info-popover">
      <template #content>
        <div class="ope-list ope-list1">
          <div v-for="item in list1" class="ope-list-item">
            <component :is="item.icon" theme="filled" size="21" fill="#637792"/>
            <div class="ope-item-label">
              {{item.label}}
            </div>
          </div>
        </div>
        <div class="ope-list-separator"></div>
        <div class="ope-list ope-list1">
          <div v-for="item in list2" class="ope-list-item">
            <component :is="item.icon" theme="filled" size="21" fill="#637792"/>
            <div class="ope-item-label">
              {{item.label}}
            </div>
          </div>
        </div>
        <div class="ope-list-separator"></div>
        <div class="ope-list ope-list1">
          <div v-for="item in list3" class="ope-list-item">
            <component :is="item.icon" theme="filled" size="21" fill="#637792"/>
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

  let {getters} = useStore();

  let userInfo = computed(() => getters['userInfo']);

  const list1 = [
    {
      label: "我的关注",
      icon: "i-like"
    },
    {
      label: "我的收藏",
      icon: "i-star"
    },
    {
      label: "消息通知",
      icon: "i-star"
    },
    {
      label: "个人中心",
      icon: "i-star"
    },
    {
      label: "账号设置",
      icon: "i-star"
    },
  ];
  const list2 = [
    {
      label: "我的主页",
      icon: "i-like"
    },
    {
      label: "管理文章",
      icon: "i-star"
    },
  ];
  const list3 = [
    {
      label: "帮助",
      icon: "i-like"
    },
    {
      label: "退出",
      icon: "i-star"
    },
  ];
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
      padding: 6px 8px;
      color: rgb(96, 98, 102);

      &:hover {
        background-color: #f5f5f5;
        color: #1890ff;
        font-weight: bold;

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
        margin-left: 6px;
      }
    }
  }
</style>
