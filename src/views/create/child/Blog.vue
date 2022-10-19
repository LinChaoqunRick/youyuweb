<template>
  <div id="editor">
    <md-editor v-model="text" v-bind="editorProps"/>
  </div>
</template>

<script setup>
  import {ref, reactive} from 'vue';
  import MdEditor from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('# Hello Editor');

  const editorProps = reactive({
    theme: "light",
    toolbars: [
      'bold',
      'underline',
      'italic',
      '-',
      'title',
      'strikeThrough',
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
      'emoji',
      '-',
      'revoke',
      'next',
      'save',
      '=',
      'pageFullscreen',
      'fullscreen',
      'preview',
      'htmlPreview',
      'catalog',
    ]
  })
</script>

<style scoped>

</style>
