<template>
  <modal-toolbar
    :visible="state.visible"
    :is-fullscreen="state.modalFullscreen"
    show-adjust
    title="帮助"
    modal-title="帮助"
    width="870px"
    height="600px"
    @on-click="state.visible = true"
    @on-close="state.visible = false"
    @on-adjust="state.modalFullscreen = !state.modalFullscreen"
  >
    <div v-if="state.visible" style="height: 100%; padding: 20px; overflow: auto">准备中...</div>
    <template #trigger>
      <i-help theme="outline" size="17" fill="currentColor" style="padding: 0 3.5px; color: var(--editor-icon-color)" />
    </template>
  </modal-toolbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { MdEditor, ModalToolbar } from 'md-editor-v3';

const state = reactive({
  visible: false,
  modalFullscreen: false,
});
</script>

<script lang="ts">
export default {
  name: 'ReadExtension',
};
</script>
