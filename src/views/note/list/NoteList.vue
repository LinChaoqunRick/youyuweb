<template>
  <div class="note-list">
    <a-button class="create-button" type="primary" @click="handleCreate" v-if="isAuthor">创建</a-button>
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
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: auto;

    .create-button {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .note-list-items {
      height: 100%;
      padding: 3% 5% 0 5%;

      ::v-deep(.ant-spin-nested-loading) {
        .ant-spin-container {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
        }
      }

      .note-body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        height: 50%;
        min-width: 220px;

        &:nth-child(n+6) {
          //margin: 2% 0;
        }
      }

      ::v-deep(.y-table) {
        height: 100%;
        width: 100%;

        .table-body {
          width: 100%;
          height: 90%;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          margin-bottom: 8px;

          .ant-skeleton {
            height: 240px;
            width: 20%;
          }
        }
      }
    }
  }
</style>
