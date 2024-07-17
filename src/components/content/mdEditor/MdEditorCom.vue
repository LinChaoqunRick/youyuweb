<template>
  <div id="editor">
    <md-editor :modelValue="props.modelValue"
               v-bind="editorConfig"
               @on-upload-img="onUploadImg"
               @update:modelValue="onChange"
               :mdHeadingId="createMdHeadingId"
               ref="editorRef">
      <template #defToolbars>
        <mark-extension :on-insert="insert"/>
        <emoji-extension :on-insert="insert"/>
        <read-extension :md-text="extendState.text"/>
      </template>
      <template #defFooters>
        <time-now :editor-id="editorId"/>
      </template>
    </md-editor>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, toRef, computed} from 'vue';
  import {useStore} from "vuex";
  import {MdEditor} from 'md-editor-v3';
  import type {ExposeParam, InsertContentGenerator} from 'md-editor-v3';
  import {message} from "ant-design-vue";
  import {createMdHeadingId} from "@/components/content/mdEditor/utils";

  import EmojiExtension from '@/components/content/mdEditor/child/EmojiExtension/index.vue';
  import MarkExtension from '@/components/content/mdEditor/child/MarkExtension/index.vue';
  import ReadExtension from '@/components/content/mdEditor/child/ReadExtension/index.vue';
  import TimeNow from '@/components/content/mdEditor/child/TimeNow/index.vue';
  import {uploadToOss} from "@/components/common/utils/upload/utils";

  const {state, dispatch} = useStore();

  const props = defineProps({
    modelValue: {
      type: String
    },
    editorId: {
      type: String,
      default: 'md-editor'
    },
    extend: {
      type: Object,
      default: {

      }
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
      ]
    },
    footers: {
      type: Array,
      default: ['markdownTotal', '=', 0, 'scrollSwitch']
    },
  });

  const emit = defineEmits(['update:modelValue'])

  const editorRef = ref<ExposeParam>();
  const extendState = reactive({
    text: 'zh-CN',
    modalVisible: false,
    modalFullscreen: false
  });
  const editorProps = reactive({
    theme: toRef(state.theme, "theme"),
    editorId: props.editorId,
    toolbars: props.toolbars,
    footers: props.footers,
    previewTheme: 'github',
    codeTheme: 'github',
    showCodeRowNumber: true
  })

  const editorConfig = computed(() => {
    return Object.assign({}, editorProps, props.extend);
  })

  const insert = (generator: InsertContentGenerator) => {
    editorRef.value?.insert(generator);
  };

  const handleFocus = () => {
    editorRef.value?.focus();
  }

  const onChange = (v: string) => (emit("update:modelValue", v));

  const onUploadImg = async (files: File[], callback: Function) => {
    const hide = message.loading('上传中...', 0);
    uploadToOss(files, {needTip: false}).then(res => {
      message.success("上传成功");
      callback(res.map((item) => item.url + '?x-oss-process=style/highThumb'));
    }).catch(() => {
      message.error("上传失败");
    }).finally(() => {
      hide();
    });
  };

  defineExpose({
    onChange,
    handleFocus
  })
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
