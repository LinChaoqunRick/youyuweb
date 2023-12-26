<template>
  <div class="user-profile">
    <div class="user-main">
      <div class="user-left">
        <UserInfoPanel v-aside3 :id="userId" @onLoaded="onLoaded" ref="UserInfoRef"></UserInfoPanel>
      </div>
      <div class="user-content">
        <div class="user-menu-content">
          <div class="content-menu">
            <RouterLink v-for="item in showMenuItems" :to="item.path"
                        v-slot="{isActive, isExactActive, navigate}">
              <div
                :class="{'router-link-active':isActive, 'router-link-exact-active':item.exact?isExactActive:isActive}"
                class="menu-item">{{item.title}}
                <div class="lock" v-if="item.hide">
                  <i-protect theme="filled" size="10" fill="#1890ff"/>
                </div>
              </div>
            </RouterLink>
            <div class="menu-right">
              <div class="menu-setting" v-if="isOwn">
                <i-setting-two theme="outline" size="18" fill="currentColor" title="设置" @click="onSetting"/>
              </div>
            </div>
          </div>
          <div class="content-component">
            <EmptyPage v-if="user && isPermit($route.name)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch, provide, inject, computed} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import {useStore} from "vuex";
  import UserInfoPanel from "@/views/post/detail/child/UserInfoPanel.vue";
  import type {userType, statType} from "@/types/user";
  import {message, Modal} from "ant-design-vue";
  import openModal from "@/libs/tools/openModal";
  import EmptyPage from "@/components/common/system/EmptyPage.vue";
  import MenuSetting from "./components/menu/MenuSetting.vue"

  const {getters, dispatch} = useStore();
  const reload = inject('reload')
  const UserInfoRef = ref(null)
  const route = useRoute();
  const router = useRouter();
  const user = ref(null)
  const current = ref<string[]>(['MomentList']);
  const userInfo = computed(() => getters['userInfo']);
  const isOwn = computed(() => userInfo.value.id === user.value?.id);

  provide('user', user);

  const userId = router.currentRoute.value.params.userId;
  const menuItems = ref([]);
  const showMenuItems = ref([]); // 做展示用的
  const menuPermit = ref({});

  async function getProfileMenu() {
    await dispatch("getProfileMenu", {userId}).then(res => {
      menuPermit.value = res.data;
    })
  }

  function isPermit(name) { // 判读该用户是否开通了这个目录
    if (isOwn.value) return true;
    const nameMap = {
      userHome: 'showHome',
      userMoment: 'showMoment',
      userPost: 'showPost',
      userNote: 'showNote',
      userColumn: 'showColumn',
      userCollection: 'showCollect',
      userFollow: 'showFollow',
      userFans: 'showFans',
    }
    const isPermit = !!menuPermit.value[nameMap[name]];
    if (!isPermit) {
      message.error("无权访问！")
    }
    return isPermit;
  }

  async function onLoaded(userData: userType) {
    await getProfileMenu();
    user.value = userData;
    menuItems.value = [
      {title: "动态", path: `/user/${user.value.id}`, exact: true, value: 'showHome'},
      {title: "时刻", path: `/user/${user.value.id}/moment`, value: 'showMoment'},
      {title: "文章", path: `/user/${user.value.id}/post`, value: 'showPost'},
      {title: "笔记", path: `/user/${user.value.id}/note`, value: 'showNote'},
      {title: "专栏", path: `/user/${user.value.id}/column`, value: 'showColumn'},
      {title: "收藏", path: `/user/${user.value.id}/collection`, value: 'showCollect'},
      {title: "关注", path: `/user/${user.value.id}/follow`, value: 'showFollow'},
      {title: "粉丝", path: `/user/${user.value.id}/fans`, value: 'showFans'},
    ]
    handlePermit();
    // document.title = userData.nickname + '的主页'
  }

  function handlePermit() {
    if (isOwn.value) {
      showMenuItems.value = menuItems.value.map(item => {
        item.hide = !menuPermit.value[item.value];
        return item;
      })
    } else {
      showMenuItems.value = menuItems.value.filter(item => !!menuPermit.value[item.value])
    }
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

  function onSetting() {
    openModal({
      component: MenuSetting,
      width: '520px',
      title: '设置',
      componentProps: {
        menuItems: menuItems.value,
        userId
      }
    }).then(res => {
      getProfileMenu().then(res => {
        handlePermit();
      })
    }).catch(console.log)
  }

  watch(() => route.params.userId, (() => {
    reload();
  }))
</script>

<style lang="scss" scoped>
  .user-profile {
    padding: 8px 0;

    .user-main {
      display: flex;
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
                top: 2px;
                right: -25px;
              }
            }

            .user-nickname {
              .nickname {
                position: relative;
                font-size: 24px;
                top: -61px;
                left: 30px;
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
        max-width: 850px;
        width: 50%;
        margin-left: 8px;
        padding-top: 90px;

        .user-menu-content {
          width: 100%;
          overflow: hidden;

          .content-menu {
            height: 38px;
            position: relative;
            padding: 0 10px;
            display: flex;
            background-color: var(--youyu-body-background2);
            border-bottom: 1px solid var(--youyu-border-color);

            .menu-item {
              position: relative;
              display: flex;
              align-items: center;
              height: calc(100% - 1px);
              box-sizing: content-box;
              cursor: pointer;
              transition: 0s;
              margin: 0 10px;
              color: var(--youyu-text2) !important;
              font-weight: normal;

              &.router-link-exact-active {
                border-bottom: 2px solid #1890ff;
                color: #1890ff !important;
                font-weight: bold;
              }

              .lock {
                position: absolute;
                top: -5px;
                right: -8px;
              }
            }

            .menu-right {
              margin-left: auto;
              margin-right: 4px;
              display: flex;
              align-items: center;

              .menu-setting {
                color: var(--youyu-text1);
                cursor: pointer;
                transition: .3s;
                line-height: 0;

                &:hover {
                  color: var(--youyu-text2);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
