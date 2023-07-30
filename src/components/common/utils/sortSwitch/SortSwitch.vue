<template>
  <div class="sort-switch">
    <div v-for="item in items" class="sort-item" :class="{'active': modelValue === item.value}" @click="onChange(item)">
      <component :is="item.icon" theme="filled" size="13" fill="currentColor"/>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

  interface SortItem {
    title: string,
    value: string | number,
    icon: string
  }

  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true
    },
    items: {
      type: Array<SortItem>,
      default: () => {
        return [
          {title: '最新', value: 'new', icon: 'i-time'},
          {title: '最热', value: 'hot', icon: 'i-fire'},
        ]
      }
    }
  })

  const emit = defineEmits(['update:modelValue', 'onChange']);

  const onChange = (item: SortItem) => {
    if (props.modelValue === item.value) return;
    emit("update:modelValue", item.value, item);
    emit('onChange', item.value, item);
  }
</script>

<style scoped lang="scss">
  .sort-switch {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: #4e5969;
    font-weight: 400;
    cursor: pointer;
    background: var(--youyu-body-background-ligth);
    border-radius: 2px;
    padding: 3px;

    .sort-item {
      display: flex;
      align-items: center;
      padding: 2px 8px;
      line-height: 22px;
      font-size: 1.167rem;
      color: #8a919f;

      ::v-deep(svg) {
        margin-right: 4px;
      }
    }

    .active {
      color: #1890ff;
      border-radius: 2px;
      background: var(--youyu-body-background2);

      ::v-deep(svg) {
        margin-right: 4px;
      }
    }
  }
</style>
