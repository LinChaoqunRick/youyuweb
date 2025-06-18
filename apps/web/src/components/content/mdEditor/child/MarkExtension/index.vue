<template>
  <normal-toolbar title="mark" @on-click="markHandler">
    <template #trigger>
      <i-mark theme="outline" size="17" fill="currentColor" style="padding: 0 3.5px; color: var(--editor-icon-color)" />
    </template>
  </normal-toolbar>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { InsertContentGenerator } from 'md-editor-v3';
import { NormalToolbar } from 'md-editor-v3';

defineOptions({
  name: 'MarkExtension',
});

const props = defineProps({
  onInsert: {
    type: Function as PropType<(generator: InsertContentGenerator) => void>,
    default: () => () => null,
  },
});

const markHandler = () => {
  const generator: InsertContentGenerator = selectedText => {
    return {
      targetValue: `==${selectedText}==`,
      select: true,
      deviationStart: 0,
      deviationEnd: 0,
    };
  };

  props.onInsert(generator);
};
</script>
