<template>
  <div class="user-info-panel">
    <slot name="basic">
      <div class="basic-info">
        <div class="user-avatar-nickname">
          <div class="user-avatar">
            <img :src="user.avatar"/>
            <div class="user-gender" v-if="user.sex!==undefined">
              <i-female v-if="user.sex == 1" theme="outline" size="14" fill="#ffc0cb"/>
              <i-male v-else theme="outline" size="14" fill="#00CFF3"/>
            </div>
          </div>
          <div class="user-nickname">
            <div class="nickname">{{user.nickname}}</div>
            <div class="uid">uid: {{user.id}}</div>
          </div>
        </div>
        <div class="user-statistics">
          <div class="statis-data" v-for="item in dataItems" @click="handleClickStat(item)">
            <div class="data-value">{{user.extraInfo?.[item.value]}}</div>
            <div class="data-label">{{item.label}}</div>
          </div>
        </div>
        <div class="user-signature">
          <div class="sign-title">描述：</div>
          <p>{{user.signature}}</p>
        </div>
        <div class="user-operation">
          <a-button type="primary" @click="handleProfile">Ta的主页</a-button>
          <a-button>私信</a-button>
          <a-button type="primary" danger>关注</a-button>
        </div>
      </div>
    </slot>
    <div class="hot-posts">
      <a-card title="热门文章" style="width: 100%">
        <div class="post-list">
          <ul>
            <li v-for="item in hotPosts">
              <router-link :to="{name:'postDetail',params:{postId:item.id}}" v-html="item.title"></router-link>
            </li>
          </ul>
        </div>
      </a-card>
    </div>
    <div class="new-posts">
      <a-card title="最新文章" style="width: 100%">
        <div class="post-list">
          <ul>
            <li v-for="item in newPosts">
              <router-link :to="{name:'postDetail',params:{postId:item.id}}" v-html="item.title"></router-link>
            </li>
          </ul>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {inject, ref, watch} from 'vue';
  import {useStore} from 'vuex';
  import {useRoute, useRouter} from 'vue-router';
  import {Modal} from 'ant-design-vue';

  interface statData {
    value: string | number,
    label: string
  }

  const route = useRoute();
  const router = useRouter();

  const {dispatch} = useStore();

  const props = defineProps({
    id: {
      type: [String, Number],
      // required: true
    }
  })

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

  const user = ref({});
  const hotPosts = ref([]);
  const newPosts = ref([]);

  function handleClickStat(item: statData) {
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

  function handleProfile() {
    router.push({path: `/user/${user.value.id}`})
  }

  watch(() => props.id, (val) => {
    if (!props.id) return;
    dispatch("getUserById", {userId: val}).then(res => {
      user.value = res.data;
    });

    dispatch("getLimitPost", {userId: val, orderBy: 'view_count', orderType: 'desc'}).then(res => {
      hotPosts.value = res.data;
    })

    dispatch("getLimitPost", {userId: val, orderBy: 'create_time'}).then(res => {
      newPosts.value = res.data;
    })
  }, {immediate: true});

  defineExpose({
    user
  })
</script>

<style lang="scss" scoped>
  .user-info-panel {
    .basic-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 8px;
      background-color: var(--youyu-body-background2);

      .user-avatar-nickname {
        display: flex;
        justify-content: center;
        align-items: center;

        .user-avatar {
          width: 80px;
          height: 80px;
          position: relative;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50px;
            border: 6px solid var(--youyu-border-color);
            overflow: hidden;
          }

          .user-gender {
            height: 22px;
            width: 22px;
            position: absolute;
            top: 3px;
            right: 3px;
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

      .user-operation {
        width: 100%;
        padding: 0 10px;
        display: flex;
        justify-content: space-around;

        button {
          flex: 1;
          margin: 0 3px;
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
        list-style: none;
        padding-left: 0 !important;

        li {
          margin-bottom: 6px;
          cursor: pointer;
          transition: .3s;

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

    ::v-deep(.ant-card-body) {
      padding: 16px 24px;
    }
  }
</style>
