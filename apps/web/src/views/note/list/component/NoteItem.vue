<template>
  <div class="note-item">
    <div class="note-cover-wrapper">
      <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
        <img :src="data.cover" :alt="data.name" class="note-cover-img">
        <div class="cover-hover-layer"></div>
        <!-- 数据统计徽章 -->
        <div class="stats-badge">
          <div class="stat-item">
            <i-preview-open theme="outline" size="16" fill="currentColor"/>
            <span>{{ data.viewCount }}</span>
          </div>
          <div class="stat-item">
            <i-list-view theme="outline" size="16" fill="currentColor"/>
            <span>{{ data.chapterCount }}</span>
          </div>
        </div>
      </RouterLink>

      <!-- 发布日期标签 -->
      <div class="publish-date" :title="'发布于:'+data.createTime">
        <i-calendar theme="outline" size="13" fill="currentColor"/>
        <span>{{ dayjs(data.createTime).format('MM-DD') }}</span>
      </div>

      <!-- 操作按钮组 -->
      <div class="action-bar" v-if="userInfo.id === data.user.id">
        <a-button type="primary" size="small" @click="onEdit">编辑</a-button>
        <a-button type="primary" size="small" danger @click="onDelete">删除</a-button>
      </div>
    </div>

    <!-- 标题区域 -->
    <div class="note-header">
      <h3 class="note-title">
        <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
          {{ data.name }}
        </RouterLink>
      </h3>
    </div>

    <!-- 内容区域 -->
    <div class="note-body">
      <!-- 作者信息 -->
      <div class="author-card">
        <RouterLink :to="{name:'userNote', params: {userId: data.user.id, page: 1}}" class="author-link">
          <img :src="data.user.avatar" :alt="data.user.nickname" class="avatar"/>
          <div class="author-info">
            <div class="author-label">作者</div>
            <div class="author-name">{{ data.user.nickname }}</div>
          </div>
        </RouterLink>
      </div>

      <!-- 简介描述 -->
      <div class="description">
        <div class="desc-label">简介</div>
        <p class="desc-text">{{ data.introduce }}</p>
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
  width: 290px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: var(--youyu-background1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.16);
    transform: translateY(-12px);

    .note-cover-wrapper {
      .note-cover-img {
        transform: scale(1.1);
      }

      .cover-hover-layer {
        opacity: 1;
      }

      .stats-badge {
        opacity: 1;
        transform: translateY(0);
      }

      .action-bar {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .note-title a {
      color: #1890ff;
    }
  }

  // ==================== 封面区域 ====================
  .note-cover-wrapper {
    position: relative;
    height: 160px;
    flex-shrink: 0;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

    .note-cover-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .cover-hover-layer {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(24, 144, 255, 0.15) 0%, rgba(64, 186, 238, 0.1) 100%);
      opacity: 0;
      transition: opacity 0.35s ease;
      pointer-events: none;
    }

    // 数据统计徽章
    .stats-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 3;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.92);
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        color: #1890ff;
        backdrop-filter: blur(8px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.98);
          transform: translateX(4px);
        }

        .i-icon {
          flex-shrink: 0;
        }
      }
    }

    // 发布日期
    .publish-date {
      position: absolute;
      bottom: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #1890ff;
      backdrop-filter: blur(6px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      z-index: 2;
    }

    // 操作按钮
    .action-bar {
      position: absolute;
      bottom: 12px;
      left: 12px;
      display: flex;
      gap: 6px;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 3;

      button {
        height: 28px;
        padding: 0 10px;
        font-size: 12px;
        font-weight: 600;
        border-radius: 6px;
      }
    }
  }

  // ==================== 标题区域 ====================
  .note-header {
    flex-shrink: 0;
    padding: 14px 14px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);

    .note-title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.5;
      color: var(--youyu-text1);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      a {
        color: inherit;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  // ==================== 内容区域 ====================
  .note-body {
    flex: 1;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;

    // 作者卡片
    .author-card {
      .author-link {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: 10px;
        background: rgba(24, 144, 255, 0.04);
        color: inherit;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(24, 144, 255, 0.08);

          .avatar {
            box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
            transform: scale(1.08);
          }

          .author-name {
            color: #1890ff;
          }
        }
      }

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        border: 2px solid rgba(24, 144, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .author-info {
        flex: 1;
        min-width: 0;

        .author-label {
          font-size: 11px;
          font-weight: 600;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .author-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--youyu-text1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.3s ease;
        }
      }
    }

    // 描述区域
    .description {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-height: 0;

      .desc-label {
        font-size: 11px;
        font-weight: 600;
        color: #999;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .desc-text {
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
        color: var(--youyu-text2);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-break: break-word;
      }
    }
  }
}
</style>
