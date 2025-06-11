<template>
  <div class="note-item">
    <div class="note-cover">
      <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
        <img :src="data.cover" :alt="data.name">
        <div class="data-items">
          <div class="data-item" :title="'阅读数:'+data.viewCount">
            <i-preview-open theme="outline" size="18" fill="currentColor" :strokeWidth="3"/>
            {{ data.viewCount }}
          </div>
          <div class="data-item" :title="'章节数:'+data.chapterCount">
            <i-list-view theme="outline" size="15" fill="currentColor" :strokeWidth="3"/>
            {{ data.chapterCount }}
          </div>
        </div>
        <div class="operation-btns" v-if="userInfo.id === data.user.id">
          <a-button type="primary" size="small" @click="onEdit">编辑</a-button>
          <a-button type="primary" size="small" danger @click="onDelete">删除</a-button>
        </div>
        <div class="create-time" :title="'发布于:'+data.createTime">
          <i-calendar theme="outline" size="14" fill="currentColor" :strokeWidth="3"/>
          {{ dayjs(data.createTime).format('YYYY-MM-DD') }}
        </div>
      </RouterLink>
    </div>
    <div class="note-title text-limit" :title="data.name">
      <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
        {{ data.name }}
      </RouterLink>
    </div>
    <div class="note-caption">
      <div class="note-user-info">
        <div class="user-title">作者:</div>
        <RouterLink :to="{name:'userNote', params: {userId: data.user.id, page: 1}}">
          <img class="user-avatar" :src="data.user.avatar" alt="头像"/>
          <div class="user-nickname">{{ data.user.nickname }}</div>
        </RouterLink>
      </div>
      <div class="note-introduce">
        <div class="introduce-title">简介:</div>
        <div class="introduce-content">{{ data.introduce }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {RouterLink} from "vue-router";
import dayjs from "dayjs";
import {computed} from "vue";
import {useStore} from "vuex";
import openModal from "@/libs/tools/openModal";
import NoteEdit from "@/views/note/list/component/NoteEdit.vue";
import {message, Modal} from "ant-design-vue";

const {getters, dispatch} = useStore();
const emit = defineEmits(['onEditSuccess']);

const userInfo = computed(() => getters['userInfo']);

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const onEdit = async (e: Event) => {
  e.preventDefault();

  const res = await openModal({
    component: NoteEdit,
    componentProps: {
      noteId: props.data.id
    },
    title: '编辑笔记',
    maskClosable: false,
    width: '620px'
  }).catch(console.log);
  emit('onEditSuccess');
}

const onDelete = (e: Event) => {
  e.preventDefault();

  Modal.confirm({
    title: '删除笔记',
    content: '确认删除该笔记？',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return new Promise((resolve, reject) => {
        dispatch('deleteNote', {noteId: props.data.id}).then(res => {
          message.success('删除成功');
          emit('onEditSuccess');
          resolve(true);
        }).catch((error) => {
          reject(error);
        })
      })
    }
  });
}
</script>

<style lang="scss" scoped>
.note-item {
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 360px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--youyu-background1);
  box-shadow: var(--youyu-shadow2);
  cursor: pointer;

  .note-cover {
    height: 170px;
    position: relative;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    .data-items {
      position: absolute;
      right: 0;
      top: 12px;
      color: #1890ff;

      .data-item {
        display: flex;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.6);
        margin-bottom: 6px;
        padding: 0 12px 0 8px;
        border-radius: 15px 0 0 15px;
        width: fit-content;
        float: right;
        clear: both;

        .i-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 18px;
          height: 18px;
          margin-right: 4px;
        }
      }
    }

    .operation-btns {
      position: absolute;
      left: 6px;
      bottom: 6px;
      opacity: 0;
      transition: .3s;

      button {
        margin-right: 4px;
        height: auto;
        font-size: 13px;
      }
    }

    .create-time {
      display: flex;
      align-items: center;
      position: absolute;
      right: 6px;
      bottom: 6px;
      border-radius: 2px;
      padding: 0 4px;
      color: #1890ff;
      background-color: rgba(255, 255, 255, 0.6);

      .i-icon {
        margin-right: 3px;
      }
    }
  }

  .note-title {
    flex-shrink: 0;
    padding: 6px 0 6px 6px;
    font-size: 16px;
    border-left: 4px solid #40baee;
    transition: .1s;

    a {
      color: var(--youyu-text) !important;
    }
  }

  .note-caption {
    flex: 1;
    padding: 0 8px;
    border-bottom: 4px solid #40baee;

    .note-user-info {
      display: flex;
      align-items: center;
      padding: 6px 0;
      border-bottom: var(--youyu-navigation-border);

      a {
        display: flex;
        align-items: center;
        width: fit-content;
        color: var(--youyu-text) !important;
      }

      .user-avatar {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        margin-right: 6px;
      }

      .user-nickname {
        line-height: 0;
      }
    }

    .note-introduce {
      padding: 6px 0;
      color: var(--youyu-text3);
      height: 105px;
      overflow: hidden;
      line-height: 24px;

      .introduce-content {
        position: relative;
        top: -2px;
      }
    }
  }

  .introduce-title, .user-title {
    background-image: linear-gradient(90deg, #3ca5f6 0%, #1890ff 100%);
    color: white;
    float: left;
    padding: 0 6px;
    border-radius: 2px;
    margin-right: 6px;
    line-height: 20px;
    font-size: 13px;
  }

  &:hover {
    .create-time, .data-item {
      background-color: rgba(255, 255, 255) !important;
    }

    .note-title {
      border-color: #1890ff;
    }

    .note-caption {
      border-color: #1890ff;
    }

    .operation-btns {
      opacity: 1;
    }
  }
}
</style>
