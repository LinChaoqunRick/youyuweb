<template>
  <div class="note-list">
    <a-button class="create-button" type="primary" @click="handleCreate">创建</a-button>
    <div class="note-list-items">
      <YTable listUrl="listNote" ref="YTableRef">
        <template #default="{dataList}">
          <div class="list-wrapper">
            <div v-for="(item) in dataList.slice(0,5)" class="note-body" :key="item.id" ref="postItem">
              <NoteItem :data="item" @onEditSuccess="onEditSuccess"/>
            </div>
          </div>
          <div class="list-wrapper">
            <div v-for="(item) in dataList.slice(5)" class="note-body" :key="item.id" ref="postItem">
              <NoteItem :data="item" @onEditSuccess="onEditSuccess"/>
            </div>
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
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      justify-items: flex-start;

      .note-item {
        margin: 8px;
      }
    }

    .list-wrapper {
      display: flex;
      align-items: center;
      margin-top: 10px;

      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
