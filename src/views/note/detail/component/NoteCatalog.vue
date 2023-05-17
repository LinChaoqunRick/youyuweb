<template>
  <md-catalog
    :editor-id="editorId"
    :scroll-element="scrollElement"
    :scrollElementOffsetTop="headerClientHeight"
    class="note-catalog"
  />
</template>

<script setup lang="ts">
  import {MdEditor, MdCatalog} from 'md-editor-v3';
  import {ref, onMounted} from "vue";

  const headerClientHeight = ref<number>(0)

  const props = defineProps({
    editorId: {
      type: String,
      required: true
    }
  })

  const scrollElement = document.getElementById("chapter-preview");
  onMounted(() => {
    const header = document.getElementById("header");
    headerClientHeight.value = header?.clientHeight ?? 40;
  })
</script>

<style lang="scss">
  .note-catalog {
    span {
      overflow: visible;
    }
  }
</style>
