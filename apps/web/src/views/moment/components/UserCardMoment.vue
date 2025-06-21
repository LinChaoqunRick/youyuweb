<template>
  <div class="user-card">
    <div class="user-info-banner">
      <div class="user-info">
        <RouterLink :to="`/user/${user.id}/moment`">
          <div class="user-avatar-wrapper">
            <img class="user-avatar" :src="user.avatar" alt="" />
            <div class="user-gender">
              <i-female v-if="user.sex == 1" theme="outline" size="12" fill="#ffc0cb" />
              <i-male v-else theme="outline" size="12" fill="#00CFF3" />
            </div>
          </div>
        </RouterLink>
        <div class="user-info-basic">
          <RouterLink :to="`/user/${user.id}/moment`">
            <div class="user-nickname">
              {{ user.nickname }}
            </div>
          </RouterLink>
          <div class="user-info-data">
            <span>时刻:{{ user.extraInfo?.momentCount }}</span>
            <span>粉丝:{{ user.extraInfo?.fansCount }}</span>
            <span>点赞:{{ user.extraInfo?.likeCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="user-info-body">
      <div class="user-signature">
        <span style="font-weight: bold">简介：</span>{{ user.signature }}
      </div>
      <div class="user-signature">
        <span style="font-weight: bold">主页：</span>
        <a v-if="user.homepage" :href="user.homepage" target="_blank">
          {{ user.homepage }}
        </a>
      </div>
      <!--      <div class="action-button" v-if="!isOwn">
              <a-button type="primary" size="small" v-login="onMessage">Ta的主页</a-button>
              <a-button type="primary" size="small" v-login="onFollow" :ghost="user.follow" :loading="followLoading">
                {{ user.follow ? '已关注' : '关注' }}
              </a-button>
              <a-button type="primary" size="small" danger v-login="onMessage">访问Ta</a-button>
            </div>-->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserCardMoment',
};
</script>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter, RouterLink } from 'vue-router';
import { message, Modal } from 'ant-design-vue';
import { computed, ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const { getters, dispatch } = useStore();

const followLoading = ref<boolean>(false);
const userInfo = computed(() => getters['userInfo']);
const isOwn = computed(() => userInfo.value.id === props.user.id);

const dataItems = [
  {
    value: 'momentCount',
    label: '时刻',
  },
  {
    value: 'fansCount',
    label: '粉丝',
  },
];

function handleClickStat(item) {
  const { value } = item;
  switch (value) {
    case 'momentCount':
      router.push({ path: `/user/${props.user.id}/moment` });
      break;
    case 'fansCount':
      router.push({ path: `/user/${props.user.id}/fans` });
      break;
  }
}

const onFollow = () => {
  const isFollow = props.user.follow;
  if (isFollow == null) return;
  followLoading.value = true;
  dispatch(isFollow ? 'cancelUserFollow' : 'setUserFollow', {
    userId: userInfo.value.id,
    userIdTo: props.user.id,
  })
    .then(res => {
      props.user.follow = !props.user.follow;
      message.success(isFollow ? '已取消关注' : '已添加关注');
    })
    .finally(() => {
      followLoading.value = false;
    });
};

const onMessage = () => {
  message.info('功能未开放！');
};
</script>

<style lang="scss" scoped>
.user-card {
  width: 320px;

  .user-info-banner {
    background: url('https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/background/flower.jpg?x-oss-process=style/blur');
    //background-image: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84);
    height: 90px;
    background-size: cover;
    margin-bottom: 30px;
    border-radius: 4px 4px 0 0;
  }

  .user-info-body {
    padding: 8px 12px 12px 16px;

    .user-signature {
      word-break: break-all;
    }
  }

  .user-info {
    position: relative;
    top: 61px;
    padding-left: 12px;
    padding-bottom: 8px;

    .user-avatar-wrapper {
      position: relative;
      font-size: 0;
    }

    .user-avatar {
      height: 58px;
      width: 58px;
      border-radius: 50%;
      border: 2px solid whitesmoke;
    }

    .user-gender {
      height: 18px;
      width: 18px;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid var(--youyu-border-color);
      border-radius: 50%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--youyu-body-background2);
    }

    .user-info-basic {
      flex: 1;
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      a {
        color: inherit;
      }

      .user-nickname {
        flex: 1;
        font-weight: bold;
        cursor: pointer;
        font-size: 18px;
        color: black !important;
      }

      .user-info-data {
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--youyu-body-text2);
        font-size: 13px;

        span {
          position: relative;
          margin-right: 8px;

          &:nth-child(n + 2) {
            padding-left: 8px;

            &:before {
              content: '';
              display: block;
              height: 12px;
              position: absolute;
              bottom: 5px;
              left: 0;
              border-left: 1px solid var(--youyu-body-text1);
            }
          }
        }
      }
    }

    display: flex;
  }

  .action-button {
    display: flex;
    margin-bottom: 10px;

    button {
      flex: 1;

      &:nth-child(n + 2) {
        margin-left: 12px;
      }
    }
  }

  .user-data {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 8px 0 2px 0;
    border-top: var(--youyu-border);

    .statis-data {
      flex: 1;
      position: relative;
      text-align: center;
      cursor: pointer;

      &:nth-child(n + 2) {
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
}
</style>
