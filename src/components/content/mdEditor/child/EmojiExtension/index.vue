<template>
  <dropdown-toolbar title="emoji" :visible="state.visible" @on-change="onChange">
    <template #overlay>
      <Emoji @emojiHandler="emojiHandler"/>
    </template>
    <template #trigger>
      <i-smiling-face theme="outline" size="17" fill="#3F4A54" style="padding: 0 3.5px"/>
    </template>
  </dropdown-toolbar>
</template>

<script lang="ts" setup>
  import {ref, reactive} from 'vue';
  import type {PropType} from 'vue';
  import type { InsertContentGenerator } from 'md-editor-v3';
  import MdEditor from 'md-editor-v3';
  import Emoji from '@/components/common/utils/emoji/index.vue';

  const DropdownToolbar = MdEditor.DropdownToolbar;

  const props = defineProps({
    onInsert: {
      type: Function as PropType<(generator: InsertContentGenerator) => void>,
      default: () => () => null
    }
  });

  const emit = defineEmits(['onChange']);

  const state = reactive({
    visible: true
  });

  const emojiHandler = (emoji: string) => {
    const generator: InsertContentGenerator = () => {
      return {
        targetValue: emoji,
        select: false,
        deviationStart: 0,
        deviationEnd: 0
      };
    };

    props.onInsert(generator);
  };

  const onChange = (visible: boolean) => {
    state.visible = visible;
  };
</script>

<style>
  .md-toolbar-item {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
</style>
