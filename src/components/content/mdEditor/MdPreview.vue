<template>
  <md-editor :modelValue="text" v-bind="editorConfig"/>
</template>

<script setup lang="ts">
  import MdEditor from 'md-editor-v3';
  import {computed, reactive, toRef} from "vue";
  import {useStore} from "vuex";

  const store = useStore();
  const props = defineProps({
    text: {
      type: String
    },
    extend: {
      type: Object,
    },
  })
  const editorProps = reactive({
    theme: toRef(store.state.theme, "theme"),
    previewTheme: 'cyanosis',
    previewOnly: true,
  })

  const editorConfig = computed(() => {
    return Object.assign({}, editorProps, props.extend);
  })
</script>

<style scoped>

</style>
