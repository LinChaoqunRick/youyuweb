<template>
  <div class="column-detail">
    <div class="column-item">
      <div class="column-cover">
        <img :src="column.cover" />
      </div>
      <div class="column-data">
        <div class="column-title">
          <div class="title-text" :title="column.title">{{ column.title }}</div>
          <span class="column-operation">
            <div v-if="isOwn">
              <a-popover placement="bottom" trigger="click" overlayClassName="column-operation-tooltip">
                <template #content>
                  <a-button type="text" @click="onEdit">编辑专栏</a-button>
                  <a-button type="text" class="top-btn"
                    ><span>{{ column.isTop === '1' ? '取消置顶' : '置顶' }}</span></a-button
                  >
                  <a-button type="text" class="delete-btn" @click="onDelete">删除</a-button>
                </template>
                <i-more theme="outline" size="22" fill="currentColor" />
              </a-popover>
            </div>
            <div v-else class="subscribe-button">
              <a-button type="primary" size="small" @click="handleSubscribe">
                <i-plus theme="outline" size="14" fill="currentColor" />
                订阅
              </a-button>
            </div>
          </span>
        </div>
        <div class="column-content" :title="column.content">{{ column.content }}</div>
        <div class="column-info" v-if="column.user">
          <RouterLink :to="`/user/${column.user.id}`">
            <span class="info-item">
              <img class="user-avatar" :src="column.user.avatar" />
              <span class="user-nickname">{{ column.user.nickname }}</span>
            </span>
          </RouterLink>
          <span class="info-item">创建于{{ column.createTime }}</span>
          <span class="info-item">{{ column.postNum }}篇文章</span>
          <span class="info-item">{{ column.subscriberNum }}人订阅</span>
        </div>
      </div>
    </div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="postList" tab="收录文章">
        <div class="post-list">
          <YTable listUrl="getColumnPosts" :params="listParams">
            <template #default="{ dataList }">
              <div v-for="(item, index) in dataList" class="article-item" :key="item.postId">
                <PostItem :data="item" :index="index">
                  <template v-slot:footer>
                    <a-popconfirm title="是否移除本文?" ok-text="是" cancel-text="否" @confirm="onRemoveConfirm(item)">
                      <a-button v-if="isOwn" size="small" type="primary" danger>移除</a-button>
                    </a-popconfirm>
                  </template>
                </PostItem>
              </div>
            </template>
          </YTable>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import YTable from '@/components/common/table/YTable.vue';
import PostItem from '@/views/user/profile/post/PostItem.vue';
import openModal from '@/libs/tools/openModal';
import ColumnEdit from '@/views/user/profile/column/list/ColumnEdit.vue';
import { message, Modal } from 'ant-design-vue';
import { cloneDeep } from 'lodash';
import type { userType } from '@/types/user';

interface Column {
  id: number;
  title: string;
  content: string;
  cover: string;
  user?: userType;
}

const { getters, dispatch } = useStore();
const route = useRoute();

const activeKey = ref('postList');
const columnId = route.params.columnId;
const userInfo = computed(() => getters['userInfo']);
const isOwn = computed(() => column.value.user?.id === userInfo.value.id);
const column = ref<Column>({});
const listParams = computed(() => ({
  columnId,
  pageSize: 20,
}));

const getColumnDetail = () => {
  dispatch('getColumnDetail', { columnId }).then(res => {
    column.value = res.data;
  });
};

getColumnDetail();

function handleSubscribe() {}

const onEdit = () => {
  openModal({
    component: ColumnEdit,
    componentProps: { columnId: column.value.id },
  }).then(res => {
    column.value.title = res.title;
    column.value.content = res.content;
    column.value.cover = res.cover;
  });
};

const onDelete = () => {
  Modal.confirm({
    title: '删除时刻',
    icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
    content: '确定删除此专栏？',
    async onOk() {
      const res = await dispatch('deleteColumn', { columnId: column.value.id });
      message.success('删除成功');
    },
  });
};

const onRemoveConfirm = item => {
  const post = cloneDeep(item);
  post.columnIds = post.columnIds
    .split(',')
    .filter(id => id != columnId)
    .join(',');
  // dispatch("")
};
</script>

<style lang="scss" scoped>
.column-detail {
  width: 800px;
  margin: 8px auto;

  .column-item {
    cursor: pointer;
    display: flex;
    padding: 16px;
    background-color: var(--youyu-background1);
    margin-bottom: 8px;
    border-radius: 4px;

    a {
      color: inherit !important;
    }

    .column-cover {
      height: 130px;
      width: 240px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    .column-data {
      display: flex;
      flex-direction: column;
      position: relative;
      width: calc(100% - 166px);
      margin-left: 12px;
      box-sizing: border-box;

      .column-title {
        width: 100%;
        display: flex;
        word-break: break-all;
        align-items: center;
        color: var(--youyu-text);

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
          font-size: 18px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .column-operation {
          display: inline-block;

          .subscribe-button {
            .i-icon {
              color: #fff;
              position: relative;
              top: 0.7px;
            }

            button {
              font-size: 13px;
            }
          }
        }

        .i-icon {
          color: var(--youyu-text1);
        }
      }

      .column-content {
        flex: 1;
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
          .user-avatar {
            position: relative;
            top: -1px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            margin-right: 4px;
          }

          .user-nickname {
            color: #1890ff;
          }

          &:nth-child(n + 2) {
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

  ::v-deep(.y-table) {
    .ant-pagination {
      margin-top: 8px;
    }
  }

  ::v-deep(.ant-tabs) {
    background-color: var(--youyu-background1);
    padding: 8px 12px 0 12px;
    border-radius: 4px;

    .ant-tabs-nav {
      margin: 0;
    }

    .ant-tabs-tab {
      padding: 0 0 8px 0;
    }
  }

  .post-list {
    padding: 8px 0;
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

  .top-btn {
    color: #1890ff;
  }

  .delete-btn {
    color: red;
  }
}
</style>