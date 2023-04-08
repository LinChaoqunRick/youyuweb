<template>
  <div class="note-detail">
    <div class="note-category-body">
      <NoteCategory/>
    </div>
    <div class="note-content">
      <button @click="show = true">AAAAA</button>
      <a-input v-if="show" v-model:value="title" v-focus @blur="onBlur"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import NoteCategory from "./component/NoteCategory.vue";

  const title = ref("");
  const show = ref(false);

  function onBlur() {
    show.value = false;
  }
</script>

<style lang="scss" scoped>
  .note-detail {
    display: flex;
    height: calc(100vh - 100px);
    width: 100%;
    background-color: var(--youyu-background1);
    overflow: hidden;

    .note-category-body {
      height: 100%;
      width: 340px;
      overflow: auto;
      padding: 16px 20px;
      border-right: var(--youyu-navigation-border);
    }

    .note-content {
      flex: 1;
    }
  }
</style>
