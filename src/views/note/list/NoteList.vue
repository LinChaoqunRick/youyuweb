<template>
  <div class="note-list">
    <a-button type="primary" @click="handleCreate">新增</a-button>
  </div>
</template>

<script>
  import openModal from "@/libs/tools/openModal";
  import NoteAdd from "./component/NoteAdd.vue";

  export default {
    name: "NoteList",
    methods: {
      handleCreate() {
        openModal({
          component: NoteAdd
        })
      }
    }
  }
</script>

<style scoped>

</style>
