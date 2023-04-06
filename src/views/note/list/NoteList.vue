<template>
  <div class="note-list">
    <a-button type="primary" @click="handleCreate" v-if="isAuthor">创建</a-button>
    <div class="note-list-items">
      <div v-for="note in noteList">
        <NoteItem :data="note"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from "vue";
  import {useStore} from "vuex";

  import openModal from "@/libs/tools/openModal";
  import NoteAdd from "./component/NoteAdd.vue";
  import NoteItem from './component/NoteItem.vue';

  const {getters, dispatch} = useStore();
  const isAuthor = computed(() => getters['isAuthor']);
  const noteList = ref([]);

  function handleCreate() {
    const res = openModal({
      component: NoteAdd,
      title: '创建笔记',
      maskClosable: false,
      width: '620px'
    }).catch(console.log);
  }

  function initData() {
    dispatch('listNote').then(res => {
      noteList.value = res.data.list;
    })
  }

  initData();
</script>

<style lang="scss" scoped>
  .note-list {
    padding: 16px;

    .note-list-items {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  }
</style>
