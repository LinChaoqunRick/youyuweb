<template>
  <div class="note-detail-box">
    <div class="note-detail" v-if="note">
      <div class="note-category-body" :class="{'note-category-collapse':collapse}">
        <NoteCategory @handleNodeSelect="handleNodeSelect" ref="NoteCategoryRef"/>
        <div class="collapse-button" @click="onCollapse">
          <i-left theme="outline" size="16" fill="currentColor"/>
        </div>
      </div>
      <div class="note-content">
        <NoteContent :id="id"
                     @contentLoaded="contentLoaded"
                     @saveSuccess="saveSuccess"
                     @noteInfoCollapse="noteInfoCollapse"/>
      </div>
      <div class="note-info-wrapper" :class="{'note-info-collapse':infoCollapse}">
        <NoteInfo v-if="showCatalog"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NoteDetail"
}
</script>

<script setup lang="ts">
  import {ref, provide, nextTick} from "vue";
  import {useStore} from "vuex";
  import {useRoute} from "vue-router";
  import NoteCategory from "./component/NoteCategory.vue";
  import NoteContent from "./component/NoteContent.vue";
  import NoteInfo from "./component/NoteInfo.vue";
  import type {note, chapter} from "@/views/note/type";

  const NoteCategoryRef = ref(null);
  const id = ref(null);
  const collapse = ref<boolean>(false);
  const infoCollapse = ref<boolean>(false);
  const {dispatch} = useStore();
  const route = useRoute();
  const note = ref<note>();
  const chapter = ref<chapter>();
  const showCatalog = ref(false);

  function initData() {
    dispatch("getNote", {noteId: route.params.noteId}).then(res => {
      note.value = res.data;
    })
  }

  initData();

  provide('note', note);
  provide('chapter', chapter);

  function handleNodeSelect(node) {
    id.value = node.id;
  }

  function contentLoaded(data: chapter) {
    chapter.value = data;
    NoteCategoryRef.value.generatePreNext()
    nextTick(() => {
      showCatalog.value = true;
    });
    setTimeout(() => {
      document.title = chapter.value.title;
    })
  }

  function onCollapse() {
    collapse.value = !collapse.value;
  }

  function noteInfoCollapse(value) {
    infoCollapse.value = value;
  }

  function saveSuccess() {
    NoteCategoryRef.value.initData();
  }

  console.log(123);
</script>

<style lang="scss" scoped>
  .note-detail {
    display: flex;
    height: calc(100vh - 100px);
    width: 100%;
    background-color: var(--article-background);
    overflow: hidden;

    .note-category-body {
      position: relative;
      height: 100%;
      width: 300px;
      overflow: visible;
      padding: 20px 16px;
      border-right: var(--youyu-navigation-border);
      transform: translateX(0);
      transition: .3s;
      z-index: 1;

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
        border-right: 16px solid var(--youyu-background2);
        cursor: pointer;
        transition: all .3s ease-in-out;
        color: #bebebe;

        &:hover {
          color: var(--youyu-text2);
        }
      }

      &.note-category-collapse {
        margin-left: -300px;

        .collapse-button {
          transform: rotateY(180deg);
          right: -16px;
        }
      }
    }

    .note-content {
      flex: 1;
      overflow: hidden;
      background: transparent;
    }

    .note-info-wrapper {
      width: 280px;
      border-left: var(--youyu-navigation-border);
      transition: .3s;

      &.note-info-collapse {
        margin-right: -280px;
      }
    }
  }
</style>
