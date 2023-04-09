<template>
  <div class="note-detail">
    <div class="note-category-body" :class="{'note-category-collapse':collapse}">
      <NoteCategory @handleNodeSelect="handleNodeSelect" ref="NoteCategoryRef"/>
      <div class="collapse-button" @click="onCollapse">
        <i-left theme="outline" size="16" fill="#bebebe"/>
      </div>
    </div>
    <div class="note-content">
      <NoteContent :id="id" @contentLoaded="contentLoaded"/>
    </div>
    <div class="note-info"></div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import NoteCategory from "./component/NoteCategory.vue";
  import NoteContent from "./component/NoteContent.vue";

  const NoteCategoryRef = ref(null);
  const id = ref(null);
  const collapse = ref<boolean>(false);

  function handleNodeSelect(node) {
    id.value = node.id;
  }

  function contentLoaded() {
    NoteCategoryRef.value.generatePreNext()
  }

  function onCollapse() {
    collapse.value = !collapse.value;
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
      position: relative;
      height: 100%;
      width: 320px;
      overflow: visible;
      padding: 20px 16px;
      border-right: var(--youyu-navigation-border);
      transform: translateX(0);
      transition: .3s;

      .collapse-button {
        display: flex;
        align-items: center;
        position: absolute;
        top: calc(50% - 33px);
        right: 0;
        width: 0;
        height: 66px;
        border: 8px solid transparent;
        border-left: 0;
        border-right: 16px solid var(--youyu-background3);
        cursor: pointer;
        transition: all .3s ease-in-out;
        transform: rotateY(0);
      }

      &.note-category-collapse {
        transform: translateX(-100%);

        .collapse-button {
          transform: rotateY(180deg);
          right: -16px;
        }
      }
    }

    .note-content {
      flex: 1;
      overflow: hidden;
    }

    .note-info {
      width: 260px;
      border-left: var(--youyu-navigation-border);
    }
  }
</style>
