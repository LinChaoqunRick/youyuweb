<template>
  <div class="note-detail">
    <div class="note-category-body">
      <NoteCategory/>
    </div>
    <div class="note-content"></div>
  </div>
</template>

<script setup lang="ts">
  import NoteCategory from "./component/NoteCategory.vue";
</script>

<style lang="scss" scoped>
  .note-detail {
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
  }
</style>
