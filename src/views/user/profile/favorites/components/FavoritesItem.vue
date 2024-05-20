<template>
  <div class="favorites-item cp" :class="[data.count > 2 ? 'count-3' : data.count > 1 ? 'count-2' : 'count-1']">
    <div class="favorites-preview" @click="onDetail">
      <img :src="getFavoriteCover" alt="" />
      <div class="post-count">
        <i-star theme="outline" size="12" fill="currentColor" />
        {{ data.count }}
      </div>
    </div>
    <div class="favorites-data">
      <div class="favorites-name" @click="onDetail">{{ data.name }}</div>
      <div class="favorites-data-bottom">
        <span>创建于：{{ data.createTime.slice(0, 10) }}</span>
        <span
          >类型：
          <span :class="[data.open ? 'open' : 'private']">{{ data.open ? '公开' : '私密' }}</span>
        </span>
      </div>
      <a-popover
        v-model:open="visible"
        placement="bottomRight"
        overlayClassName="favorites-item-top-popover"
      >
        <div class="operation-btn" v-if="data.userId == userInfo.id">
          <i-more theme="outline" size="24" fill="currentColor" />
        </div>
        <template #content>
          <div class="operation-items">
            <div class="operation-item edit-favorites">
              <i-editor theme="outline" size="14" fill="currentColor" />
              编辑
            </div>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PropType } from 'vue';
import { useStore } from 'vuex';
import type { FavoritesType } from '@/views/user/profile/favorites/type';
import openModal from '@/libs/tools/openModal';

const { getters } = useStore();

const props = defineProps({
  data: {
    type: Object as PropType<FavoritesType>,
    require: true,
  },
});

const emit = defineEmits(['onDetail']);

const visible = ref<boolean>(false);
const userInfo = computed(() => getters['userInfo']);

const getFavoriteCover = computed(() => {
  const firstPost = props.data?.previewPosts?.[0];
  return firstPost ? firstPost.thumbnail : props.data?.cover;
});

const onDetail = () => emit('onDetail');
</script>

<style scoped lang="scss">
.favorites-item {
  display: flex;
  height: 70px;
  //padding: 6px 0;
  background-color: var(--youyu-background1);

  .favorites-preview {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    height: 100%;
    margin-right: 8px;

    img {
      height: 100%;
      width: 110px;
      border-radius: 2px;
      object-fit: cover;
    }

    .post-count {
      display: flex;
      align-items: center;
      position: absolute;
      right: 4px;
      bottom: 4px;
      line-height: 18px;
      padding: 0 4px;
      font-size: 12px;
      border-radius: 2px;
      color: white;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 10;

      .i-icon {
        margin-right: 2px;
      }
    }
  }

  .favorites-data {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;

    .favorites-name {
      font-size: 16px;
    }

    .favorites-data-bottom {
      display: flex;
      align-items: center;
      color: var(--youyu-text1);

      span {
        margin-right: 16px;
      }

      .open {
        color: #00bc00;
      }

      .private {
        color: red;
      }
    }
  }

  &.count-3 {
    .favorites-preview {
      img {
        height: 90%;
        z-index: 10;
      }

      &:before {
        position: absolute;
        content: '';
        height: 5%;
        width: 92%;
        left: 4%;
        top: 4.6%;
        background-color: #afb3b8;
        border-radius: 2px 2px 0 0;
        z-index: 5;
      }

      &:after {
        position: absolute;
        content: '';
        height: 6%;
        width: 84%;
        left: 8%;
        top: 0;
        background-color: #e3e5e7;
        border-radius: 2px 2px 0 0;
      }
    }
  }

  &.count-2 {
    .favorites-preview {
      img {
        height: 95%;
        z-index: 10;
      }

      &:before {
        position: absolute;
        content: '';
        height: 5%;
        width: 92%;
        left: 4%;
        top: 0;
        background-color: #afb3b8;
        border-radius: 2px 2px 0 0;
        z-index: 5;
      }
    }
  }
}

.operation-btn {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>

<style lang="scss">
.favorites-item-top-popover {
  position: absolute;

  padding-top: 4px;

  .ant-popover-inner {
    padding: 0;

    .ant-popover-inner-content {
      padding: 6px !important;

      .operation-items {
        .operation-item {
          width: 70px;
          cursor: pointer;
          padding: 3px 8px;
          border-radius: 4px;

          &:hover {
            background-color: var(--youyu-background2);
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        .edit-favorites {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
