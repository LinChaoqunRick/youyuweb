<template>
  <div class="user-info-panel">
    <slot name="basic" :user="user" :dataItems="dataItems">
      <div class="basic-info">
        <div class="user-avatar-nickname">
          <div class="user-avatar">
            <img :src="user.avatar" @click="handleProfile"/>
            <div class="user-gender" v-if="user.sex!==undefined">
              <i-female v-if="user.sex == 1" theme="outline" size="14" fill="#ffc0cb"/>
              <i-male v-else theme="outline" size="14" fill="#00CFF3"/>
            </div>
          </div>
          <div class="user-nickname">
            <div class="nickname" @click="handleProfile">{{user.nickname}}</div>
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
        <!--        <div class="user-contact">-->
        <!--          <div class="contact-title">社交：</div>-->
        <!--          <div class="contact-list">-->
        <!--            <div class="contact-item">-->
        <!--              <i-github theme="outline" size="20" fill="#909090"/>-->
        <!--            </div>-->
        <!--            <div class="contact-item">-->
        <!--              <i-international theme="outline" size="20" fill="#333"/>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="user-operation">
          <a-button type="primary" @click="handleProfile" class="home-button">
            <!--            <i-user theme="outline" size="14" fill="currentColor"/>-->
            Ta的主页
          </a-button>
          <a-button @click="handleMessage" v-if="!isOwn">
            <!--            <i-mail theme="outline" size="14" fill="currentColor"/>-->
            私信
          </a-button>
          <a-button type="primary" danger @click="handleFollow" v-if="!isOwn">
            <!--            <i-remind theme="outline" size="14" fill="currentColor"/>-->
            {{user.follow?'取消关注':'关注'}}
          </a-button>
        </div>
      </div>
    </slot>
    <div class="column-list mt-8">
      <a-card title="Ta的专栏" style="width: 100%">
        <div class="column-list" v-if="columnList.length">
          <ColumnItemMini v-for="item in columnList" :data="item"/>
        </div>
        <div v-else class="no-data">暂无数据</div>
      </a-card>
    </div>
    <div class="hot-posts">
      <a-card title="热门文章" style="width: 100%">
        <div class="post-list">
          <ul v-if="hotPosts.length">
            <li v-for="item in hotPosts">
              <router-link :to="{name:'postDetail',params:{postId:item.id}}" v-html="item.title"></router-link>
            </li>
          </ul>
          <div v-else class="no-data">暂无数据</div>
        </div>
      </a-card>
    </div>
    <div class="new-posts">
      <a-card title="最新文章" style="width: 100%">
        <div class="post-list">
          <ul v-if="newPosts.length">
            <li v-for="item in newPosts">
              <router-link :to="{name:'postDetail',params:{postId:item.id}}" v-html="item.title"></router-link>
            </li>
          </ul>
          <div v-else class="no-data">暂无数据</div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {computed, inject, ref, watch} from 'vue';
  import {useStore} from 'vuex';
  import {useRoute, useRouter} from 'vue-router';
  import {message, Modal} from 'ant-design-vue';
  import type {statType} from "@/types/user";
  import ColumnItemMini from '@/components/content/user/column/ColumnItemMini.vue';

  const route = useRoute();
  const router = useRouter();

  const {getters, commit, dispatch} = useStore();

  const props = defineProps({
    id: {
      type: [String, Number],
      // required: true
    }
  });

  const userInfo = computed(() => getters['userInfo']);
  const isLogin = computed(() => getters['isLogin']);
  const emit = defineEmits(['onLoaded'])

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

  const isOwn = ref(true);
  const user = ref({});
  const columnList = ref([]);
  const hotPosts = ref([]);
  const newPosts = ref([]);

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

  function handleProfile() {
    router.push({path: `/user/${user.value.id}`})
  }

  function handleMessage() {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
  }

  function handleFollow() {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
    if (user.value.follow) { // 已经关注了，取消关注
      dispatch("cancelUserFollow", {
        userId: userInfo.value.id,
        userIdTo: user.value.id
      }).then(res => {
        user.value.follow = false;
        message.success("已取消关注")
      })
    } else { // 还没有关注，关注
      dispatch("setUserFollow", {
        userId: userInfo.value.id,
        userIdTo: user.value.id
      }).then(res => {
        user.value.follow = true;
        message.success("已添加关注")
      })
    }
  }

  watch(() => props.id, (val) => {
    if (!props.id) return;
    dispatch("getUserById", {userId: val}).then(res => {
      if (!res.data) {
        router.replace("/404")
        return;
      }
      user.value = res.data;
      isOwn.value = user.value.id === userInfo.value.id;
      emit('onLoaded', user.value);
    });

    dispatch("getLimitPost", {userId: val, orderBy: 'view_count', orderType: 'desc'}).then(res => {
      hotPosts.value = res.data;
    })

    dispatch("getLimitPost", {userId: val, orderBy: 'create_time'}).then(res => {
      newPosts.value = res.data;
    })

    dispatch('getColumnList', {userId: val}).then(res => {
      columnList.value = res.data;
    })
  }, {immediate: true});

  defineExpose({
    user
  })
</script>

<style lang="scss" scoped>
  .user-info-panel {
    width: 300px;

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
          width: 90px;
          height: 90px;
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
          margin-left: 20px;

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
            color: var(--youyu-body-text1);
          }
        }
      }

      .user-statistics {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 10px 0;

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
        padding: 0 16px 10px 16px;
        display: flex;

        .sign-title {
          flex-shrink: 0;
        }
      }

      .user-contact {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0 16px;

        .contact-list {
          display: flex;
          align-items: center;

          .contact-item {
            cursor: pointer;
            display: flex;
            align-items: center;
            height: 24px;
          }
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

    .column-list {
      ::v-deep(.ant-card-body) {
        padding: 16px !important;
      }

      ::v-deep(.column-item-mini) {
        &:nth-child(n+2) {
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

    ::v-deep(.ant-card) {
      .ant-card-head {
        /*position: sticky;*/
        /*top: 60px;*/
        /*background: var(--antd-background);*/
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
      }

      .ant-card-body {
        padding: 16px 24px;
      }
    }
  }
</style>
