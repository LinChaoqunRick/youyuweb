<template>
  <md-editor :modelValue="text" v-bind="editorConfig"/>
</template>

<script setup lang="ts">
  import MdEditor from 'md-editor-v3';
  import {computed} from "vue";

  const props = defineProps({
    text: {
      type: String
    },
    extend: {
      type: Object,
    },
  })

  const editorConfig = computed(() => {
    return Object.assign({}, {
      previewTheme: 'cyanosis',
      previewOnly: true,
    }, props.extend);
  })
</script>

<style scoped>

</style>
