<template>
  <div class="column-item">
    <RouterLink :to="{name: 'ColumnDetail', params: {columnId: data.id, page: 1}}" class="column-cover">
      <img :src="data.cover"/>
    </RouterLink>
    <div class="column-data">
      <div class="column-title">
        <div class="column-is-top" v-if="data.isTop==='1'">
          <i-to-top theme="outline" size="12" fill="#1890ff"/>
          置顶
        </div>
        <RouterLink :to="{name: 'ColumnDetail', params: {columnId: data.id}}" class="title-text" :title="data.title">
          {{ data.title }}
        </RouterLink>
        <span class="column-operation">
          <div v-if="isOwn">
            <a-popover placement="bottom" trigger="click" overlayClassName="column-operation-tooltip">
            <template #content>
              <a-button type="text" @click="onDetail">管理内容</a-button>
              <a-button type="text" @click="onEdit">编辑专栏</a-button>
              <a-button type="text" class="top-btn"
                        @click="onSetTop"><span>{{ data.isTop === '1' ? '取消置顶' : '置顶' }}</span></a-button>
              <a-button type="text" class="delete-btn" @click="onDelete">删除</a-button>
            </template>
            <i-more theme="outline" size="22" fill="currentColor"/>
          </a-popover>
          </div>
          <div v-else class="subscribe-button">
            <a-button type="primary" size="small" v-login="handleSubscribe">
              <i-plus theme="outline" size="14" fill="currentColor"/>
              订阅
            </a-button>
          </div>
        </span>
      </div>
      <RouterLink :to="{name: 'ColumnDetail', params: {columnId: data.id}}"
                  class="column-content"
                  :title="data.content">
        <div>{{ data.content }}</div>
      </RouterLink>
      <div class="column-info">
        <span class="info-item">创建于{{ data.createTime }}</span>
        <span class="info-item">{{ data.postNum }}篇文章</span>
        <span class="info-item">{{ data.subscriberNum }}人订阅</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import {useStore} from "vuex";
import {useRouter, RouterLink} from "vue-router";
import openModal from "@/libs/tools/openModal";
import ColumnEdit from "./ColumnEdit.vue";
import {message, Modal} from "ant-design-vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['deleteSuccess', 'updateSuccess']);
const {getters, commit, dispatch} = useStore();
const user = inject('user');
const userInfo = computed(() => getters['userInfo']);
const isOwn = computed(() => user.value.id === userInfo.value.id);
const router = useRouter();

function handleSubscribe() {

}

const onDetail = () => {
  router.push({name: 'ColumnDetail', params: {columnId: props.data.id, page: 1}})
}

const onEdit = () => {
  openModal({
    component: ColumnEdit,
    componentProps: {columnId: props.data.id}
  }).then(res => {
    props.data.title = res.title;
    props.data.content = res.content;
    props.data.cover = res.cover;
  })
}

const onSetTop = () => {
  Modal.confirm({
    title: '置顶',
    content: '确定将本专栏置顶？',
    onOk() {
      setColumnIsTop();
    },
  });
}

const setColumnIsTop = () => {
  const {id, isTop} = props.data;
  dispatch('setColumnIsTop', {
    columnId: id,
    isTop: isTop === '0'
  }).then(res => {
    message.success(isTop === '0' ? "置顶成功" : "取消置顶成功");
    emit("updateSuccess");
  })
}

const onDelete = () => {
  Modal.confirm({
    title: '删除时刻',
    icon: '', // <help theme="outline" size="24" fill="#1890ff"/>
    content: '确定删除此专栏？',
    onOk() {
      return dispatch('deleteColumn', {columnId: props.data.id}).then(res => {
        message.success('删除成功');
        emit('deleteSuccess', props.data);
      })
    },
  });
}
</script>

<style lang="scss" scoped>
.column-item {
  cursor: pointer;
  display: flex;
  padding: 10px;

  a {
    color: inherit !important;
  }

  .column-cover {
    height: 92px;
    width: 150px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .column-data {
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
        font-size: 16px;
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

  .top-btn {
    color: #1890ff;
  }

  .delete-btn {
    color: red;
  }
}
</style>
