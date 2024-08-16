<template>
  <div class="user-home">
    <ContentList url="getUserDynamics" :params="params" auto-load ref="ContentListRef">
      <template v-slot="{ list }">
        <div v-for="item in list" :key="item.id" class="dynamic-item">
          <div class="dynamic-item-title">{{ $dayjs().to(item.createTime) }} {{ getItemType(item) }}</div>
          <Component :is="isComponent(item)" :data="item" @deleteSuccess="deleteSuccess" class="dynamic-item-component" />
        </div>
      </template>
      <template v-slot:loadMoreBox="{ loading }">
        <a-spin :spinning="loading"></a-spin>
        <span class="tip-text">加载中...</span>
      </template>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import ContentList from '@/components/common/system/ContentList.vue';
import type { userType } from '@/types/user';
import PostItem from '../post/PostItem.vue';
import MomentItem from '@/views/moment/list/MomentItem.vue';
import NoteItem from '@/views/user/profile/home/component/NoteItem.vue';
import ChapterItem from '@/views/user/profile/home/component/ChapterItem.vue';

const user = inject<userType>('user');
const ContentListRef = ref();

const params = computed(() => ({
  userId: user.value.id,
  pageSize: 10,
}));

const isComponent = (item: any) => {
  if (Reflect.has(item, 'categoryId')) {
    return PostItem;
  } else if (Reflect.has(item, 'momentLike')) {
    return MomentItem;
  } else if (Reflect.has(item, 'chapterCount')) {
    return NoteItem;
  } else {
    return ChapterItem;
  }
};

const getItemType = (item: any) => {
  if (Reflect.has(item, 'categoryId')) {
    return '发布了 文章';
  } else if (Reflect.has(item, 'momentLike')) {
    return '发布了 时刻';
  } else if (Reflect.has(item, 'chapterCount')) {
    return '创建了 笔记';
  } else {
    return '发布了 章节';
  }
};

const deleteSuccess = data => {
  if (data.hasOwnProperty('momentLike')) {
    // 删除的是一个时刻
    ContentListRef.value.list = ContentListRef.value.list.filter(
      item => item.hasOwnProperty('momentLike') && item.id !== data.id
    );
  }
};
</script>

<style lang="scss" scoped>
.user-home {
  ::v-deep(.content-list) {
    .data-list {
      > div {
        margin-top: 8px;
        border-radius: 4px;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    .bottom-operation {
      background-color: var(--youyu-body-background2);
      padding: 12px 0;
    }
  }

  .dynamic-item {
    background-color: var(--youyu-body-background2);

    .dynamic-item-title {
      padding: 8px 16px;
      border-bottom: var(--youyu-border);
      color: var(--youyu-text1);
      font-size: 14px;
    }

    .dynamic-item-component {
      border-radius: 4px;
    }
  }

  .tip-text {
    margin-left: 6px;
  }
}
</style>
