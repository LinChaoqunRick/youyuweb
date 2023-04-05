<template>
  <div class="note-list">
    <a-button type="primary" @click="handleCreate">创建</a-button>
  </div>
</template>

<script>
  import openModal from "@/libs/tools/openModal";
  import NoteAdd from "./component/NoteAdd.vue";
  import {Modal} from "ant-design-vue";

  export default {
    name: "NoteList",
    components: {
      Modal
    },
    methods: {
      handleCreate() {
        openModal({
          component: NoteAdd,
          title: '创建笔记',
        })
      }
    }
  }
</script>

<style scoped>

</style>
