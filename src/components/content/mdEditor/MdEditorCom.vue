<template>
  <div id="editor">
    <md-editor v-model="text" v-bind="editorConfig">
      <template #defToolbars>
        <mark-extension :editor-id="editorId" @on-change="onChange"/>
        <emoji-extension :editor-id="editorId" @on-change="onChange"/>
        <read-extension :md-text="state.text"/>
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
  import 'md-editor-v3/lib/style.css';
  import MarkExtensionConfig from "@/libs/marked/marked-mark";

  import EmojiExtension from '@/components/content/mdEditor/child/EmojiExtension/index.vue';
  import MarkExtension from '@/components/content/mdEditor/child/MarkExtension/index.vue';
  import ReadExtension from '@/components/content/mdEditor/child/ReadExtension/index.vue';
  import TimeNow from '@/components/content/mdEditor/child/TimeNow/index.vue';
  import {extend} from "dayjs";

  MdEditor.config({
    markedExtensions: [MarkExtensionConfig],
    markedRenderer(renderer) {
      renderer.link = (href, title, text) => {
        return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
      };

      return renderer;
    },
    editorExtensions: {
      highlight: {
        css: {
          atom: {
            light:
              'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css',
            dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
          }
        }
      }
    }
  });

  const store = useStore();

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

  const text = ref<string>("");

  const state = reactive({
    text: 'zh-CN',
    modalVisible: false,
    modalFullscreen: false
  });

  const editorProps = reactive({
    theme: toRef(store.state.theme, "theme"),
    editorId: prop.editorId,
    toolbars: prop.toolbars,
    footers: prop.footers
  })

  const emit = defineEmits(["update:text"])

  const editorConfig = computed(() => {
    return Object.assign({}, editorProps, prop.extend);
  })

  const onChange = (v: string) => (text.value = v);

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
