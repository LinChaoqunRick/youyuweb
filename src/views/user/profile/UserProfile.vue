<template>
  <div class="user-profile">
    <div class="user-main">
      <div class="user-left">
        <UserInfoPanel v-aside2 :id="userId" @onLoaded="onLoaded" ref="UserInfoRef"></UserInfoPanel>
      </div>
      <div class="user-content">
        <div class="content-menu">
          <a-menu v-model:selectedKeys="current" mode="horizontal">
            <a-menu-item v-for="item in menuItems.filter(i=>i.show!==false)" :key="item.key">
              {{item.label}}
            </a-menu-item>
          </a-menu>
        </div>
        <div class="content-component">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import MomentList from "./child/MomentList.vue";
  import PostList from "./child/PostList.vue";
  import SpecialColumn from "./child/SpecialColumn.vue";
  import CollectList from "./child/CollectList.vue";
  import SubscribeList from "./child/SubscribeList.vue";

  export default {
    components: {
      MomentList,
      PostList,
      SpecialColumn,
      CollectList,
      SubscribeList,
    }
  }
</script>

<script setup lang="ts">
  import {ref, onMounted} from "vue";
  import {useRouter} from "vue-router";
  import UserInfoPanel from "@/views/post/detail/child/UserInfoPanel.vue";
  import type {userType, statType} from "@/types/user";
  import {Modal} from "ant-design-vue";

  const UserInfoRef = ref(null)
  const router = useRouter();
  const user = ref({});
  const current = ref<string[]>(['MomentList']);

  const userId = router.currentRoute.value.params.userId;
  const menuItems = [
    {label: "动态", key: 'MomentList'},
    {label: "文章", key: 'PostList'},
    {label: "专栏", key: 'SpecialColumn'},
    {label: "收藏", key: 'CollectList', show: true},
    {label: "关注", key: 'SubscribeList'},
  ]

  function onLoaded(userData: userType) {
    user.value = userData
    document.title = userData.nickname + '的主页'
  }

  function handleClickStat(item: statType) {
    const {value} = item;
    if (value === 'viewCount') {
      Modal.info({
        content: `Ta的文章已被阅读${user.value.extraInfo[item.value]}次`,
      });
    } else if (value === 'likeCount') {
      Modal.info({
        content: `Ta共收获了${user.value.extraInfo[item.value]}个点赞`,
      });
    }
  };
</script>

<style lang="scss" scoped>
  .user-profile {
    .user-main {
      max-width: 1300px;
      display: flex;
      margin: 8px auto;
      justify-content: center;

      .user-left {
        position: relative;
        width: 300px;

        .basic-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 16px 8px 16px;
          background-color: var(--youyu-body-background2);

          .user-avatar-nickname {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            .user-avatar {
              width: 140px;
              height: 140px;
              cursor: pointer;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 6px solid var(--youyu-border-color);
                overflow: hidden;
              }

              .user-gender {
                height: 30px;
                width: 30px;
                position: absolute;
                top: 9px;
                right: 7px;
                border: 3px solid var(--youyu-border-color);
                border-radius: 50%;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--youyu-body-background2);
              }
            }

            .user-nickname {
              width: 120px;
              height: 100%;
              margin-left: 10px;

              .nickname {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
              }

              .uid {
                font-size: 12px;
              }
            }
          }

          .user-statistics {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 16px 0;

            .statis-data {
              flex: 1;
              position: relative;
              text-align: center;
              cursor: pointer;

              &:nth-child(n+2) {
                &:before {
                  position: absolute;
                  content: '';
                  border-left: 1px solid #ebebeb;
                  height: 20px;
                  top: calc(60% - 10px);
                  left: 0;
                }
              }

              .data-value {
                font-size: 20px;
                font-weight: bold;
              }

              .data-label {
                font-size: 14px;
              }
            }
          }

          .user-signature {
            width: 100%;
            padding: 0 16px;
            display: flex;

            .sign-title {
              flex-shrink: 0;
            }
          }
        }

        ::v-deep(.user-info-panel) {
          padding-top: 90px;

          .user-avatar-nickname {
            height: 20px;

            .user-avatar {
              position: relative;
              top: -70px;
              cursor: auto;

              img {
                height: 120px;
                width: 120px;
                border-radius: 60px;
                vertical-align: middle;
              }

              .user-gender {
                height: 26px;
                width: 26px;
                top: 0;
                right: -27px;
              }
            }

            .user-nickname {
              .nickname {
                position: relative;
                font-size: 24px;
                top: -61px;
                left: 42px;
                cursor: auto;
              }

              .uid {
                display: none;
              }
            }
          }

          .user-operation {
            .home-button {
              display: none;
            }
          }
        }
      }

      .user-content {
        width: 75%;
        height: 2000px;
        margin-left: 8px;
        background-color: #fff;
        margin-top: 90px;

        .content-menu {
          padding: 0 10px;

          ::v-deep(.ant-menu) {
            .ant-menu-item {
              padding: 0 20px !important;

              &.ant-menu-item-selected {
                font-weight: bold;
              }

              &::after {
                right: 10px;
                left: 10px;
              }
            }
          }
        }

        .content-component {
          padding: 6px 10px;
        }
      }
    }
  }
</style>
