<template>
  <MdPreview :modelValue="text" v-bind="editorConfig" :mdHeadingId="createMdHeadingId" @onHtmlChanged="onHtmlChanged" />
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import { computed, reactive, toRef } from 'vue';
import { useStore } from 'vuex';
import { createMdHeadingId } from '@/components/content/mdEditor/utils';

const store = useStore();
const emit = defineEmits(['onHtmlChanged']);

const props = defineProps({
  text: {
    type: String,
  },
  extend: {
    type: Object,
  },
});
const editorProps = reactive({
  theme: toRef(store.state.theme, 'theme'),
  previewTheme: 'github',
  previewOnly: true,
  codeTheme: 'github',
  showCodeRowNumber: true,
});

const editorConfig = computed(() => {
  return Object.assign({}, editorProps, props.extend);
});

const mdHeadingId = (_text, _level, index) => `heading-${index}`;

const onHtmlChanged = () => emit('onHtmlChanged');
</script>

<style scoped></style>
