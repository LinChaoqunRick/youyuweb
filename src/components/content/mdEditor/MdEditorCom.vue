<template>
  <div id="editor">
    <md-editor v-model="text"
               v-bind="editorConfig"
               @on-upload-img="onUploadImg"
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
  import MdEditor from 'md-editor-v3';
  import type {ExposeParam, InsertContentGenerator} from 'md-editor-v3';

  import EmojiExtension from '@/components/content/mdEditor/child/EmojiExtension/index.vue';
  import MarkExtension from '@/components/content/mdEditor/child/MarkExtension/index.vue';
  import ReadExtension from '@/components/content/mdEditor/child/ReadExtension/index.vue';
  import TimeNow from '@/components/content/mdEditor/child/TimeNow/index.vue';
  import {extend} from "dayjs";
  import {uploadToOss} from "@/assets/utils/utils";

  const {state, dispatch} = useStore();

  const prop = defineProps({
    editorId: {
      type: String,
      default: 'md-editor'
    },
    extend: {
      type: Object,
      default: {
        previewTheme: 'cyanosis',
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
        'save',
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

  const editorRef = ref<ExposeParam>();
  const text = ref<string>("");
  const extendState = reactive({
    text: 'zh-CN',
    modalVisible: false,
    modalFullscreen: false
  });
  const editorProps = reactive({
    theme: toRef(state.theme, "theme"),
    editorId: prop.editorId,
    toolbars: prop.toolbars,
    footers: prop.footers
  })

  const emit = defineEmits(["update:text"])

  const editorConfig = computed(() => {
    return Object.assign({}, editorProps, prop.extend);
  })

  const insert = (generator: InsertContentGenerator) => {
    editorRef.value?.insert(generator);
  };

  const onChange = (v: string) => (text.value = v);

  const onUploadImg = async (files: File[], callback: Function) => {
    const res = await uploadToOss(files, '/post/images')
    callback(res.map((item) => item.url));
  };

  defineExpose({
    text,
    onChange
  })
</script>

<style lang="scss" scoped>
  #editor {
    height: 100%;

    #md-editor {
      height: 100%;
    }
  }
</style>
