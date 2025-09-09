<template>
  <div class="user-info-panel">
    <slot name="basic" :user="user" :data-items="dataItems">
      <div class="basic-info ant-card-bordered">
        <div class="user-avatar-nickname">
          <div class="user-avatar">
            <RouterLink :to="`/user/${user.id}`">
              <img :src="user.avatar" alt="">
            </RouterLink>
            <div v-if="user.sex !== undefined" class="user-gender">
              <i-female
                v-if="user.sex == 1"
                theme="outline"
                size="14"
                fill="#ffc0cb"
              />
              <i-male
                v-else
                theme="outline"
                size="14"
                fill="#00CFF3"
              />
            </div>
          </div>
          <div class="user-nickname">
            <RouterLink :to="`/user/${user.id}`">
              <div class="nickname">
                {{ user.nickname }}
              </div>
            </RouterLink>
            <div class="uid">
              uid: {{ user.id }}
            </div>
          </div>
        </div>
        <div class="user-statistics">
          <div
            v-for="item in dataItems"
            :key="item.value"
            class="statis-data"
            @click="handleClickStat(item)"
          >
            <div class="data-value">
              {{ user.extraInfo?.[item.value] }}
            </div>
            <div class="data-label">
              {{ item.label }}
            </div>
          </div>
        </div>
        <div class="user-signature">
          <div class="sign-title">
            描述：
          </div>
          <div>{{ user.signature }}</div>
        </div>
        <div class="user-contact">
          <div class="contact-title">
            社交：
          </div>
          <div class="contact-list">
            <div class="contact-item">
              <!--<i-github theme="outline" size="20" fill="#909090"/>-->
            </div>
          </div>
        </div>
        <div class="user-operation">
          <a-button type="primary" class="home-button">
            <RouterLink :to="`/user/${user.id}`">
              <!--            <i-user theme="outline" size="14" fill="currentColor"/>-->
              Ta的主页
            </RouterLink>
          </a-button>
          <a-button v-if="!isOwn" @click="handleMessage">
            <!--            <i-mail theme="outline" size="14" fill="currentColor"/>-->
            私信
          </a-button>
          <a-button
            v-if="!isOwn"
            v-login="handleFollow"
            type="primary"
            danger
          >
            <!--            <i-remind theme="outline" size="14" fill="currentColor"/>-->
            {{ user.follow ? '取消关注' : '关注' }}
          </a-button>
        </div>
      </div>
    </slot>
    <Announcement class="mt-8" />
    <div class="column-list mt-8">
      <a-card title="Ta的专栏" style="width: 100%">
        <template #extra>
          <RouterLink :to="`/user/${user.id}/column`">
            更多
          </RouterLink>
        </template>
        <div v-if="columnList.length" class="column-list">
          <ColumnItemMini v-for="item in columnList" :key="item.id" :data="item" />
        </div>
        <div v-else class="no-data">
          暂无数据
        </div>
      </a-card>
    </div>
    <div class="new-posts">
      <a-card title="最新文章" style="width: 100%">
        <div class="post-list">
          <ul v-if="newPosts.length">
            <li v-for="item in newPosts" :key="item.id">
              <router-link :to="{ name: 'PostDetail', params: { postId: item.id } }">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
          <div v-else class="no-data">
            暂无数据
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useRouter, RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import Announcement from '@/components/common/share/announcement/index.vue';
import ColumnItemMini from '@/components/content/user/column/ColumnItemMini.vue';
import type { statType, User } from '@/types/user';

const router = useRouter();

const { getters, commit, dispatch } = useStore();

const props = defineProps({
  id: {
    type: [String, Number, undefined],
    required: true
  }
});

const userInfo = computed(() => getters['userInfo']);
const isLogin = computed(() => getters['isLogin']);
const emit = defineEmits(['onLoaded']);

const dataItems = [
  {
    value: 'postCount',
    label: '原创'
  },
  {
    value: 'viewCount',
    label: '阅读'
  },
  {
    value: 'likeCount',
    label: '点赞'
  },
  {
    value: 'fansCount',
    label: '粉丝'
  }
];

const isOwn = ref(true);
const user = ref<User | object>({});
const columnList = ref([]);
// const hotPosts = ref([]);
const newPosts = ref([]);

function handleClickStat(item: statType) {
  const { value } = item;
  if (value === 'viewCount') {
    Modal.info({
      content: `Ta的文章已被阅读${user.value.extraInfo[item.value]}次`
    });
  } else if (value === 'likeCount') {
    Modal.info({
      content: `Ta共收获了${user.value.extraInfo[item.value]}个点赞`
    });
  } else if (value === 'postCount') {
    router.push(`/user/${props.id}/post`);
  }
}

function handleMessage() {
  if (!isLogin.value) {
    commit('changeLogin', true);
    return;
  }
}

function handleFollow() {
  const isFollow = user.value.follow;
  dispatch(isFollow ? 'cancelUserFollow' : 'setUserFollow', {
    userId: userInfo.value.id,
    userIdTo: user.value.id
  }).then(res => {
    if (isFollow) {
      user.value.follow = false;
      message.success('已取消关注');
    } else {
      user.value.follow = true;
      message.success('已添加关注');
    }
  });
}

watch(
  () => props.id,
  val => {
    if (!props.id) return;
    dispatch('getPostUserById', { userId: val }).then(res => {
      if (!res.data) {
        router.replace('/404');
        return;
      }
      user.value = res.data;
      isOwn.value = user.value.id === userInfo.value.id;
      emit('onLoaded', user.value);
    });

    // dispatch('getLimitPost', { userId: val, orderBy: 'view_count', orderType: 'desc' }).then(res => {
    //   hotPosts.value = res.data;
    // });

    dispatch('getLimitPost', { userId: val, orderBy: 'create_time', orderType: 'desc' }).then(res => {
      newPosts.value = res.data;
    });

    dispatch('getColumnList', { userId: val, count: 5 }).then(res => {
      columnList.value = res.data;
    });
  },
  { immediate: true }
);

defineExpose({
  user
});
</script>

<style lang="scss" scoped>
.user-info-panel {
  width: 300px;

  .basic-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 26px 8px;
    background-color: var(--youyu-body-background2);
    border-radius: 4px;

    .user-avatar-nickname {
      display: flex;
      align-items: center;
      justify-content: center;

      .user-avatar {
        position: relative;
        width: 80px;
        height: 80px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 6px solid var(--youyu-border-color);
          border-radius: 50px;
        }

        .user-gender {
          position: absolute;
          top: 3px;
          right: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          text-align: center;
          background-color: var(--youyu-body-background2);
          border: 3px solid var(--youyu-border-color);
          border-radius: 50%;
        }
      }

      .user-nickname {
        width: 160px;
        height: 100%;
        margin-left: 20px;

        .nickname {
          width: 100%;
          overflow: hidden;
          font-size: 18px;
          font-weight: bold;
          color: var(--youyu-text) !important;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }

        .uid {
          font-size: 14px;
          color: var(--youyu-body-text1);
        }
      }
    }

    .user-statistics {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 10px 0;

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
      padding: 0 16px 10px;

      .sign-title {
        flex-shrink: 0;
      }
    }

    .user-contact {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0 16px 10px;

      .contact-list {
        display: flex;
        align-items: center;

        .contact-item {
          display: flex;
          align-items: center;
          height: 24px;
          cursor: pointer;
        }
      }
    }

    .user-operation {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 0 10px;

      button {
        flex: 1;
        margin: 0 3px;
      }
    }
  }

  .column-list {
    ::v-deep(.ant-card-body) {
      padding: 16px !important;
    }

    ::v-deep(.column-item-mini) {
      &:nth-child(n + 2) {
        margin-top: 8px;
      }
    }
  }

  .hot-posts {
    margin-top: 8px;
  }

  .new-posts {
    margin-top: 8px;
  }

  .post-list {
    ul {
      padding-left: 0 !important;
      margin: 0;
      list-style: none;

      li {
        margin-bottom: 6px;
        cursor: pointer;
        transition: 0.3s;

        a {
          font-weight: normal !important;
          color: var(--youyu-body-text) !important;

          &:hover {
            color: #1980ff !important;
          }
        }
      }
    }
  }

  ::v-deep(.ant-card) {
    .ant-card-head {
      /* position: sticky; */

      /* top: 60px; */

      /* background: var(--antd-background); */

      /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
    }

    .ant-card-body {
      padding: 16px 24px;
    }
  }
}
</style>
