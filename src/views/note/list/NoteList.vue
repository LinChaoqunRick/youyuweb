<template>
  <div class="note-list">
    <a-button class="create-button" type="primary" @click="handleCreate">创建</a-button>
    <div class="note-list-items">
      <YTable listUrl="listNote" ref="YTableRef">
        <template #default="{dataList}">
          <div v-for="(item, index) in dataList" class="note-body" :key="item.postId" ref="postItem">
            <NoteItem :data="item" @handleEdit="handleEdit"/>
          </div>
        </template>
      </YTable>
    </div>
  </div>
</template>

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

async function handleEdit(data: note) {
  const res = await openModal({
    component: NoteEdit,
    componentProps: {
      noteId: data.id
    },
    title: '创建笔记',
    maskClosable: false,
    width: '620px'
  }).catch(console.log);
  YTableRef.value.refreshData();
}
</script>

<style lang="scss" scoped>
.note-list {
  position: relative;
  padding: 8px 0;

  .create-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }

  .note-list-items {
    ::v-deep(.ant-spin-container) {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      justify-items: flex-start;
    }
  }
}
</style>
