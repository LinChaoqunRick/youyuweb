<template>
  <modal-toolbar
    :visible="state.visible"
    :is-fullscreen="state.modalFullscreen"
    show-adjust
    title="帮助"
    modal-title="编辑预览"
    width="870px"
    height="600px"
    @on-click="state.visible = true"
    @on-close="state.visible = false"
    @on-adjust="state.modalFullscreen = !state.modalFullscreen"
  >
    <div v-if="state.visible" style="height: 100%; padding: 20px; overflow: auto">
      <MdEditor
        :theme="store.state.theme"
        :language="store.state.lang"
        :preview-theme="store.state.previewTheme"
        :code-theme="store.state.codeTheme"
        editor-id="edit2preview"
        preview-only
        :model-value="props.mdText"
      />
    </div>
    <template #trigger>
      <i-help theme="outline" size="17" fill="currentColor" style="padding: 0 3.5px;color:var(--editor-icon-color)"/>
    </template>
  </modal-toolbar>
</template>

<script lang="ts" setup>
  import {reactive} from 'vue';
  import type {PropType} from 'vue';
  import {useStore} from 'vuex';
  import {MdEditor, ModalToolbar} from 'md-editor-v3';

  const props = defineProps({
    mdText: {
      type: String as PropType<string>,
      default: ''
    }
  });

  const state = reactive({
    visible: false,
    modalFullscreen: false
  });

  const store = useStore();
</script>

<script lang="ts">
  export default {
    name: 'ReadExtension'
  };
</script>
