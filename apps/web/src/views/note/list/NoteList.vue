<template>
  <div class="note-list">
    <a-button class="create-button" type="primary" @click="handleCreate">创建</a-button>
    <div class="note-list-items">
      <YTable listUrl="listNote" ref="YTableRef">
        <template #default="{dataList}">
          <div v-for="(item) in dataList" :key="item.id" class="note-item">
            <NoteItem :data="item" @onEditSuccess="onEditSuccess"/>
          </div>
        </template>
      </YTable>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NoteList"
}
</script>

<script setup lang="ts">
import {ref, computed} from "vue";
import {useStore} from "vuex";

import YTable from "@/components/common/table/YTable.vue";
import openModal from "@/libs/tools/openModal";
import NoteAdd from "./component/NoteAdd.vue";
import NoteEdit from "./component/NoteEdit.vue";
import NoteItem from './component/NoteItem.vue';
import type {note} from "../type";

const {getters, dispatch} = useStore();
const isAuthor = computed(() => getters['isAuthor']);
const noteList = ref([]);
const YTableRef = ref();

async function handleCreate() {
  const res = await openModal({
    component: NoteAdd,
    title: '创建笔记',
    maskClosable: false,
    width: '620px'
  }).catch(console.log);
  YTableRef.value.refreshData();
}

const onEditSuccess = (data: note) => {
  YTableRef.value.refreshData();
}
</script>

<style lang="scss" scoped>
.note-list {
  position: relative;
  padding: 6px 80px 8px 80px;

  .create-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .note-list-items {
    ::v-deep(.ant-spin-container) {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      max-width: 1600px;
      margin: 0 auto;
      padding-top: 10px;

      @media (max-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
      }

      @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }

    .list-wrapper {
      display: contents;

      .note-body {
        display: contents;
      }
    }
  }
}
</style>
