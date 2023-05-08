<template>
  <md-catalog
    :editor-id="editorId"
    :scroll-element="scrollElement"
    :offsetTop="headerClientHeight"
    class="note-catalog"
  />
</template>

<script setup lang="ts">
  import MdEditor from 'md-editor-v3';
  import {ref, onMounted} from "vue";

  const MdCatalog = MdEditor.MdCatalog;

  const props = defineProps({
    editorId: {
      type: String,
      required: true
    }
  })

  const scrollElement = document.getElementById("chapter-preview");
  const headerClientHeight = 0;
</script>

<style lang="scss">
  .note-catalog {
    span {
      overflow: visible;
    }

    .md-editor-catalog-active {
      color: #1890ff;
      font-weight: bold;
    }
  }
</style>
