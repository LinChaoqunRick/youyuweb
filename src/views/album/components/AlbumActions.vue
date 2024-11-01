<template>
  <a-input v-model:value="keyword" placeholder="请输入相册名称">
    <template #prefix>
      <i-search theme="outline" size="16" fill="#999" />
    </template>
  </a-input>
  <a-popover trigger="click" overlayClassName="album-order-popover">
    <template #content>
      <div
        v-for="item in orderTypeList"
        class="order-item cp"
        :class="{ active: orderType === item.value }"
        :key="item.value"
        @click="onOrderChange(item)"
      >
        {{ item.label }}
      </div>
    </template>
    <i-sort-one title="排序方式" theme="outline" size="22" fill="currentColor" />
  </a-popover>
  <i-view-grid-card
    v-if="viewType === 'card'"
    title="卡片模式"
    theme="outline"
    size="22"
    fill="currentColor"
    :strokeWidth="3"
    @click="onViewChange('list')"
  />
  <i-view-grid-list
    v-else
    title="列表模式"
    theme="outline"
    size="22"
    fill="currentColor"
    :strokeWidth="3"
    @click="onViewChange('card')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const keyword = ref<string>('');
const orderType = ref<number>(0);
const viewType = ref<string>('card');

interface OrderType {
  value: number;
  label: string;
}

const orderTypeList: Array<OrderType> = [
  { value: 0, label: '相册名称' },
  { value: 1, label: '创建时间' },
];

const onViewChange = (type: string) => {
  viewType.value = type;
};

const onOrderChange = (item: OrderType) => {
  orderType.value = item.value;
};
</script>

<style scoped lang="scss"></style>

<style lang="scss">
.album-order-popover {
  .ant-popover-inner {
    padding: 6px !important;
  }

  .order-item {
    padding: 4px 12px;
    border-radius: 4px;

    &:hover {
      background-color: var(--youyu-background2);
      color: var(--youyu-text2);
    }

    &.active {
      color: #1890ff;
    }
  }
}
</style>
