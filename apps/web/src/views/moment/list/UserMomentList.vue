<template>
  <div class="user-moment-list">
    <div class="moment-list-body mt-8">
      <!-- @vue-generic {import('@youyu/shared/types/vo/moment').MomentVo} -->
      <vue-content-page
        ref="VueContentPageRef"
        :url="props.url"
        :params="params"
        data-text="时刻"
        class="moment-content-list"
      >
        <template #default="{ list }">
          <MomentItem
            v-for="(item, index) in list"
            :key="item.id"
            v-model:data="list[index]"
            @delete-success="deleteSuccess"
          />
        </template>
      </vue-content-page>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserMomentList',
};
</script>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { MOMENT_LIST } from '@youyu/shared/apis';
import { VueContentPage } from '@youyu/shared/components-vue';
import MomentItem from './MomentItem.vue';
import type { MomentVo } from '@youyu/shared/types/vo/moment';
import type { ComponentExposed } from 'vue-component-type-helpers';

const props = defineProps({
  url: {
    type: String,
    default: MOMENT_LIST,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
});

const VueContentPageRef = ref<ComponentExposed<typeof VueContentPage> | null>(null);
const activeId = ref<number>(-1);

const unshiftItem = (data: MomentVo) => {
  VueContentPageRef.value!.unshiftData(data);
};

const updateActiveId = (value: number) => {
  activeId.value = value;
};

const deleteSuccess = (moment: MomentVo) => {
  VueContentPageRef.value!.removeById(moment.id);
};

provide('active', { activeId, updateActiveId });

defineExpose({
  unshiftItem,
});
</script>

<style lang="scss" scoped>
.user-moment-list {
  .moment-list-body {
    ::v-deep(.moment-content-list) {
      &.content-list {
        .moment-item {
          margin-bottom: 8px;
          overflow: hidden;
          border-radius: 4px;

          .bottom-operation {
            min-height: 0;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }

        > .bottom-operation {
          padding: 12px 0;
          overflow: hidden;
          background-color: var(--youyu-background1);
          border-radius: 4px;

          .ant-spin {
            font-size: 0;
          }
        }
      }
    }

    .tip-text {
      margin-left: 6px;
    }
  }
}

.momentSpin-enter-active,
.momentSpin-leave-active {
  transition: 0.6s ease-out;
}

.momentSpin-enter-from,
.momentSpin-leave-to {
  height: 0;
  opacity: 0;
}
</style>
