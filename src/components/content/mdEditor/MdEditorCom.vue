<template>
  <div id="editor">
    <md-editor
      v-model="model"
      :mdHeadingId="createMdHeadingId"
      v-bind="editorConfig"
      @on-upload-img="onUploadImg"
      @change="onChange"
      ref="editorRef"
    >
      <template #defToolbars>
        <Mark>
          <template #trigger>
            <i-mark
              theme="outline"
              size="17"
              fill="currentColor"
              style="padding: 0 3.5px; color: var(--editor-icon-color)"
            />
          </template>
        </Mark>
        <emoji-extension :on-insert="insert" />
        <read-extension />
        <ExportPDF :modelValue="state.text" height="700px">
          <template #trigger>
            <i-file-pdf
              theme="outline"
              size="17"
              fill="currentColor"
              style="padding: 0 3.5px; color: var(--editor-icon-color)"
            />
          </template>
        </ExportPDF>
      </template>
      <template #defFooters>
        <time-now :editor-id="editorId" />
      </template>
    </md-editor>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { MdEditor } from 'md-editor-v3';
import type { ExposeParam, InsertContentGenerator } from 'md-editor-v3';
import { Mark, ExportPDF } from '@vavt/v3-extension';

import { ref, reactive, toRef, computed } from 'vue';
import { createMdHeadingId } from '@/components/content/mdEditor/utils';
import EmojiExtension from '@/components/content/mdEditor/child/EmojiExtension/index.vue';
import ReadExtension from '@/components/content/mdEditor/child/ReadExtension/index.vue';
import TimeNow from '@/components/content/mdEditor/child/TimeNow/index.vue';
import { uploadToOss } from '@/components/common/utils/upload/utils';

const { state } = useStore();
const model = defineModel<string>();

const props = defineProps({
  editorId: {
    type: String,
    default: 'md-editor',
  },
  extend: {
    type: Object,
    default: {},
  },
  toolbars: {
    type: Array,
    default: [
      'bold',
      'underline',
      'italic',
      'strikeThrough',
      '-',
      'title',
      'sub',
      'sup',
      'quote',
      'unorderedList',
      'orderedList',
      'task',
      '-',
      'codeRow',
      'code',
      'link',
      'image',
      'table',
      'mermaid',
      'katex',
      0,
      1,
      2,
      3,
      '-',
      'revoke',
      'next',
      /*'save',*/
      '=',
      'prettier',
      'pageFullscreen',
      'fullscreen',
      'preview',
      'htmlPreview',
      'catalog',
    ],
  },
  footers: {
    type: Array,
    default: ['markdownTotal', '=', 0, 'scrollSwitch'],
  },
});

const editorRef = ref<ExposeParam>();
const editorProps = reactive({
  theme: toRef(state.theme, 'theme'),
  editorId: props.editorId,
  toolbars: props.toolbars,
  footers: props.footers,
  previewTheme: 'github',
  codeTheme: 'github',
  showCodeRowNumber: true,
});
const emit = defineEmits(['onChange']);
const editorConfig = computed(() => {
  return Object.assign({}, editorProps, props.extend);
});

const insert = (generator: InsertContentGenerator) => {
  editorRef.value?.insert(generator);
};

const handleFocus = () => {
  editorRef.value?.focus();
};

const onChange = (v: string) => {
  emit('onChange');
};

const onUploadImg = async (files: File[], callback: Function) => {
  const hide = message.loading('上传中...', 0);
  uploadToOss(files, { needTip: false })
    .then(res => {
      message.success('上传成功');
      callback(res.map(item => item.url + '?x-oss-process=style/highThumb'));
    })
    .catch(() => {
      message.error('上传失败');
    })
    .finally(() => {
      hide();
    });
};

defineExpose({
  onChange,
  handleFocus,
});
</script>

<style lang="scss" scoped>
#editor {
  height: 100%;

  #md-editor {
    height: 100%;

    ::v-deep(.i-icon) {
      display: flex;
      align-items: center;
      height: 24px;
      width: 24px;
    }
  }
}
</style>
