<template>
  <div class="note-list">
    <a-button type="primary" @click="handleCreate">创建</a-button>
  </div>
</template>

<script setup lang="ts">
  import openModal from "@/libs/tools/openModal";
  import NoteAdd from "./component/NoteAdd.vue";
  import {Modal} from "ant-design-vue";

  function handleCreate() {
    const res = openModal({
      component: NoteAdd,
      title: '创建笔记',
      maskClosable: false,
      width: '620px'
    }).catch(console.log);
  }
</script>

<style scoped>

</style>
