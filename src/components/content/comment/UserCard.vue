<template>
  <div class="user-card">
    <div class="user-info">
      <RouterLink :to="`/user/${user.id}`">
        <img :src="user.avatar"/>
      </RouterLink>
      <div class="user-info-basic">
        <RouterLink :to="`/user/${user.id}`">
          <div class="user-nickname">{{user.nickname}}</div>
        </RouterLink>
        <div class="user-signature">{{user.signature}}</div>
      </div>
    </div>
    <div class="action-button" v-if="!isOwn">
      <a-button type="primary" v-login="onFollow" :ghost="user.follow" :loading="followLoading">
        {{user.follow?'已关注':'关注'}}
      </a-button>
      <a-button v-login="onMessage">
        私信
      </a-button>
    </div>
    <div class="user-data">
      <div class="statis-data" v-for="item in dataItems" @click="handleClickStat(item)">
        <div class="data-value">{{user.extraInfo?.[item.value]}}</div>
        <div class="data-label">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from "vue";
  import {useStore} from "vuex";
  import {useRouter, RouterLink} from "vue-router";
  import {message, Modal} from "ant-design-vue";

  const router = useRouter();
  const {getters, dispatch} = useStore();

  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  const followLoading = ref<boolean>(false);
  const userInfo = computed(() => getters['userInfo']);
  const isOwn = computed(() => userInfo.value.id === props.user.id);

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
  ]

  function handleClickStat(item) {
    const {value} = item;
    if (value === 'postCount') {
      handleProfile();
    } else if (value === 'viewCount') {
      // Modal.info({
      //   content: `Ta的文章已被阅读${props.user.extraInfo[item.value]}次`,
      // });
    } else if (value === 'likeCount') {
      // Modal.info({
      //   content: `Ta共收获了${props.user.extraInfo[item.value]}个点赞`,
      // });
    }
  }

  function handleProfile() {
    router.push({path: `/user/${props.user.id}/post`})
  }

  const onFollow = () => {
    const isFollow = props.user.follow;
    if (isFollow == null) return;
    followLoading.value = true;
    dispatch(isFollow ? 'cancelUserFollow' : 'setUserFollow', {
      userId: userInfo.value.id,
      userIdTo: props.user.id
    }).then(res => {
      props.user.follow = !props.user.follow;
      message.success(isFollow ? "已取消关注" : "已添加关注")
    }).finally(() => {
      followLoading.value = false;
    })
  }

  const onMessage = () => {
    message.info("功能未开放！");
  }
</script>

<style lang="scss" scoped>
  .user-card {
    width: 240px;

    .user-info {
      padding-bottom: 8px;

      img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
      }

      .user-info-basic {
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
        }

        .user-signature {
          flex: 1;
          font-size: 12px;
          color: #8f969c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      display: flex;
    }

    .action-button {
      display: flex;
      margin-bottom: 10px;

      button {
        flex: 1;

        &:nth-child(n+2) {
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
  }
</style>
