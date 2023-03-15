<template>
  <div class="user-profile">
    <div class="user-main">
      <div class="user-left">
        <UserInfoPanel v-aside2 :id="userId" @onLoaded="onLoaded" ref="UserInfoRef"></UserInfoPanel>
      </div>
      <div class="user-content" id="aside-right">
        <div class="user-menu-content">
          <div class="content-menu">
            <router-link v-for="item in menuItems.filter(i=>i.show!==false)" :to="item.path" custom
                         v-slot="{isActive, isExactActive, navigate}">
            <span :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
                  @click="handleNavigate(isActive,isExactActive,navigate)" class="menu-item">{{item.title}}</span>
            </router-link>
          </div>
          <div class="content-component">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component"/>
              </keep-alive>
            </router-view>
          </div>
        </div>
        <div class="user-extra-info">
          <div class="user-achievement">
            <div v-for="item in 20">
              12312312312
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import MomentList from "./moment/MomentList.vue";
  import PostList from "./post/PostList.vue";
  import SpecialColumn from "./column/SpecialColumn.vue";
  import CollectList from "./collection/CollectList.vue";
  import SubscribeList from "./subscribe/SubscribeList.vue";

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
  import {ref, onMounted, provide} from "vue";
  import {useRouter} from "vue-router";
  import UserInfoPanel from "@/views/post/detail/child/UserInfoPanel.vue";
  import type {userType, statType} from "@/types/user";
  import {Modal} from "ant-design-vue";

  const UserInfoRef = ref(null)
  const router = useRouter();
  const user = ref({});
  const current = ref<string[]>(['MomentList']);

  provide('user', user);

  const userId = router.currentRoute.value.params.userId;
  const menuItems = [
    {title: "动态", path: 'moment'},
    {title: "文章", path: 'post'},
    {title: "专栏", path: 'column'},
    {title: "收藏", path: 'collection'},
    {title: "关注", path: 'subscribe'},
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
  }

  function handleNavigate(isActive, isExactActive, navigate) {
    if (!isExactActive) {
      navigate();
    }
  }
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
        display: flex;
        width: 75%;
        margin-left: 8px;
        padding-top: 90px;

        .user-menu-content {
          width: 75%;
          overflow: hidden;

          .content-menu {
            padding: 0 10px;
            display: flex;
            background-color: var(--youyu-body-background2);
            border-bottom: 1px solid #e4e6eb;

            .menu-item {
              cursor: pointer;
              padding-bottom: 4px;
              margin: 10px 10px 0px 10px;
              transition: 0s;

              &.router-link-active {
                border-bottom: 2px solid #1890ff;
              }
            }
          }

          .content-component {
            padding: 6px 10px;
            background-color: var(--youyu-body-background2);
          }
        }

        .user-extra-info {
          width: 25%;
          margin-left: 8px;

          .user-achievement {
            background-color: var(--youyu-body-background2);
            position: sticky;
            top: 68px;
          }
        }
      }
    }
  }
</style>
