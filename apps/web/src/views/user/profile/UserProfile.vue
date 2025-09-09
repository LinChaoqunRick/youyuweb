<template>
  <div class="user-profile">
    <div class="user-main">
      <div class="user-left">
        <UserInfoPanel
          :id="userId"
          ref="UserInfoRef"
          v-side-fixed
          @on-loaded="onLoaded"
        />
      </div>
      <div class="user-content">
        <div class="user-menu-content">
          <div class="content-menu">
            <nav-link v-for="item in showMenuItems" :key="item.path" :route="item">
              {{ item.title }}
              <div v-if="item.hide" class="lock">
                <i-protect theme="filled" size="10" fill="#1890ff" />
              </div>
            </nav-link>
            <div class="menu-right">
              <div v-if="isOwn" class="menu-setting">
                <i-setting-two
                  theme="outline"
                  size="18"
                  fill="currentColor"
                  title="设置"
                  @click="onSetting"
                />
              </div>
            </div>
          </div>
          <div class="content-component">
            <EmptyPage v-if="user && pathPermit" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, inject, computed } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import NavLink from '@/components/common/header/menu/child/NavLink.vue';
import EmptyPage from '@/components/common/system/EmptyPage.vue';
import openModal from '@/libs/tools/openModal';
import type { User, statType } from '@/types/user';
import UserInfoPanel from '@/views/post/detail/child/UserInfoPanel.vue';
import type { MenuItem } from '@/views/user/profile/types';
import MenuSetting from './components/menu/MenuSetting.vue';

const { getters, dispatch } = useStore();
const reload = inject('reload');
const UserInfoRef = ref(null);
const route = useRoute();
const router = useRouter();
const user = ref<User | null>(null);
const userInfo = computed(() => getters['userInfo']);
const isOwn = computed(() => userInfo.value.id && userInfo.value.id === user.value?.id);
const pathPermit = ref<boolean>(false);

provide('user', user);

const {userId} = router.currentRoute.value.params;
const menuItems = ref<Array<MenuItem>>([]);
const showMenuItems = ref<Array<MenuItem>>([]); // 做展示用的
const menuPermit = ref({});

async function getProfileMenu() {
  await dispatch('getProfileMenu', { userId }).then(res => {
    menuPermit.value = res.data;
    handlePathPermit();
  });
}

const handlePathPermit = () => {
  // 判读该用户是否开通了这个目录
  const {name} = route.matched[2];
  if (isOwn.value) {
    return (pathPermit.value = true);
  }
  const nameMap = {
    userHome: 'showHome',
    userMoment: 'showMoment',
    userPost: 'showPost',
    userNote: 'showNote',
    userColumn: 'showColumn',
    userAlbum: 'showAlbum',
    userFavorites: 'showFavorites',
    userFollow: 'showFollow',
    userFans: 'showFans',
  };
  pathPermit.value = Object.keys(menuPermit).length && menuPermit.value[nameMap[name]];
  if (!pathPermit.value) {
    message.error('无权访问！');
  }
};

async function onLoaded(userData: User) {
  user.value = userData;
  await getProfileMenu();
  menuItems.value = [
    { title: '动态', path: `/user/${user.value.id}`, exact: true, value: 'showHome' },
    { title: '时刻', path: `/user/${user.value.id}/moment`, value: 'showMoment' },
    { title: '文章', path: `/user/${user.value.id}/post`, value: 'showPost' },
    // { title: '笔记', path: `/user/${user.value.id}/note`, value: 'showNote' },
    { title: '专栏', path: `/user/${user.value.id}/column`, value: 'showColumn' },
    { title: '相册', path: `/user/${user.value.id}/album`, value: 'showAlbum' },
    { title: '收藏', path: `/user/${user.value.id}/favorites`, value: 'showFavorites' },
    { title: '关注', path: `/user/${user.value.id}/follow`, value: 'showFollow' },
    { title: '粉丝', path: `/user/${user.value.id}/fans`, value: 'showFans' },
  ];
  handlePermit();
  // document.title = userData.nickname + '的主页'
}

function handlePermit() {
  if (isOwn.value) {
    showMenuItems.value = menuItems.value.map((item, index) => {
      item.hide = !menuPermit.value[item.value];
      return item;
    });
  } else {
    showMenuItems.value = menuItems.value.filter(item => !!menuPermit.value[item.value]);
  }
}

function handleClickStat(item: statType) {
  const { value } = item;
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
      userId,
    },
  })
    .then(res => {
      getProfileMenu().then(res => {
        handlePermit();
      });
    })
    .catch(console.log);
}

watch(
  () => route.params.userId,
  () => {
    reload();
  }
);
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
        padding: 60px 16px 8px;
        background-color: var(--youyu-body-background2);

        .user-avatar-nickname {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          .user-avatar {
            width: 140px;
            height: 140px;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
              overflow: hidden;
              border: 6px solid var(--youyu-border-color);
              border-radius: 50%;
            }

            .user-gender {
              position: absolute;
              top: 9px;
              right: 7px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 30px;
              height: 30px;
              text-align: center;
              background-color: var(--youyu-body-background2);
              border: 3px solid var(--youyu-border-color);
              border-radius: 50%;
            }
          }

          .user-nickname {
            width: 120px;
            height: 100%;
            margin-left: 10px;

            .nickname {
              width: 100%;
              overflow: hidden;
              font-size: 16px;
              font-weight: bold;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }

            .uid {
              font-size: 12px;
            }
          }
        }

        .user-statistics {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 16px 0;

          .statis-data {
            position: relative;
            flex: 1;
            text-align: center;
            cursor: pointer;

            &:nth-child(n + 2) {
              &::before {
                position: absolute;
                top: calc(60% - 10px);
                left: 0;
                height: 20px;
                border-left: 1px solid #ebebeb;
                content: '';
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
          display: flex;
          width: 100%;
          padding: 0 16px;

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
              width: 120px;
              height: 120px;
              vertical-align: middle;
              border-radius: 60px;
            }

            .user-gender {
              top: 2px;
              right: -25px;
              width: 26px;
              height: 26px;
            }
          }

          .user-nickname {
            .nickname {
              position: relative;
              top: -70px;
              left: 30px;
              font-size: 24px;
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
      width: 60%;
      max-width: 950px;
      padding-top: 90px;
      margin-left: 8px;

      .user-menu-content {
        width: 100%;
        overflow: hidden;

        .content-menu {
          position: relative;
          display: flex;
          height: 38px;
          padding: 0 10px;
          background-color: var(--youyu-body-background2);
          border-bottom: var(--youyu-border);

          ::v-deep(.nav-link) {
            position: relative;
            box-sizing: content-box;
            height: 100%;
            margin: 0 10px;
            font-weight: normal;
            color: var(--youyu-text2) !important;
            cursor: pointer;
            transition: 0s;

            .nav-link-item {
              display: flex;
              align-items: center;
              height: 100%;
              border-bottom: 2px solid transparent;
            }

            .router-link-exact-active {
              color: #1890ff !important;
              border-bottom: 2px solid #1890ff;
            }

            .lock {
              position: absolute;
              top: -5px;
              right: -8px;
            }
          }

          .menu-right {
            display: flex;
            align-items: center;
            margin-right: 4px;
            margin-left: auto;

            .menu-setting {
              line-height: 0;
              color: var(--youyu-text1);
              cursor: pointer;
              transition: 0.3s;

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
