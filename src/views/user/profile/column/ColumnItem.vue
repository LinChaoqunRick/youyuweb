<template>
  <div class="column-item">
    <div class="column-cover">
      <img :src="data.cover"/>
    </div>
    <div class="column-data">
      <div class="column-title">
        <div class="column-is-top" v-if="data.isTop==='1'">
          <i-to-top theme="outline" size="12" fill="#1890ff"/>
          置顶
        </div>
        <div class="title-text">{{data.title}}</div>
        <span class="column-operation">
          <div v-if="isOwn">
            <a-popover placement="bottom" trigger="click" overlayClassName="column-operation-tooltip">
            <template #content>
              <a-button type="text">管理内容</a-button>
              <a-button type="text" @click="handleEdit">编辑专栏</a-button>
              <a-button type="text"><span>{{data.isTop==='1'?'取消置顶':'置顶'}}</span></a-button>
              <a-button type="text">删除</a-button>
            </template>
            <i-more theme="outline" size="22" fill="currentColor"/>
          </a-popover>
          </div>
          <div v-else class="subscribe-button">
            <a-button type="primary" size="small" @click="handleSubscribe">
              <i-plus theme="outline" size="14" fill="currentColor"/>
              订阅
            </a-button>
          </div>
        </span>
      </div>
      <div class="column-content">{{data.content}}</div>
      <div class="column-info">
        <span class="info-item">{{data.createTime}}</span>
        <span class="info-item">{{data.postNum}}篇文章</span>
        <span class="info-item">{{data.subscriberNum}}人订阅</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, inject} from "vue";
  import {useStore} from "vuex";
  import openModal from "@/libs/tools/openModal";
  import ColumnEditor from "./ColumnEditor.vue";

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
  const {getters, commit} = useStore();
  const user = inject('user');
  const userInfo = computed(() => getters['userInfo']);
  const isLogin = computed(() => getters['isLogin']);
  const isOwn = computed(() => user.value.id === userInfo.value.id);

  function handleSubscribe() {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
  }

  function handleEdit() {
    openModal({
      component: ColumnEditor
    })
  }
</script>

<style lang="scss" scoped>
  .column-item {
    cursor: pointer;
    display: flex;
    padding: 10px;

    .column-cover {
      height: 92px;
      width: 150px;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .column-data {
      position: relative;
      width: calc(100% - 166px);
      margin-left: 16px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e6eb;

      .column-title {
        width: 100%;
        display: flex;
        word-break: break-all;
        align-items: center;

        .column-is-top {
          flex: none;
          padding: 1px 4px 0 4px;
          font-size: 12px;
          font-weight: 400;
          width: 44px;
          height: 20px;
          border-radius: 2px;
          color: #1d7dfa;
          background: #f4f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
        }

        .title-text {
          vertical-align: middle;
          display: inline-block;
          flex: auto;
          font-size: 16px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .column-operation {
          display: inline-block;

          .subscribe-button {
            button {
              font-size: 13px;
            }
          }
        }
      }

      .column-content {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        color: var(--youyu-body-text2);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        margin: 8px 0;
      }

      .column-info {
        font-size: 13px;
        color: var(--youyu-body-text1);

        .info-item {
          &:nth-child(n+2) {
            &:before {
              content: '/';
              color: #e1e1e1;
              padding: 0 5px;
            }
          }
        }
      }
    }

    .column-extra {
      padding: 6px 16px;
    }
  }
</style>

<style lang="scss">
  .column-operation-tooltip {
    .ant-popover-inner-content {
      padding: 0;
    }

    .ant-btn {
      width: 100%;

      &:hover {
        color: #1890ff;
      }
    }

    button {
      display: block;
    }
  }
</style>
