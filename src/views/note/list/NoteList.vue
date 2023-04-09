<template>
  <div class="note-list">
    <a-button type="primary" @click="handleCreate" v-if="isAuthor">创建</a-button>
    <div class="note-list-items">
      <YTable listUrl="listNote">
        <template #default="{dataList}" ref="YTableRef">
          <div v-for="(item, index) in dataList" class="article-body" :key="item.postId" ref="postItem">
            <NoteItem :data="item" @handleEdit="handleEdit" @click="handleNavigate(item)"/>
          </div>
        </template>
      </YTable>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from "vue";
  import {useRouter} from "vue-router";
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
  const router = useRouter();

  function handleCreate() {
    const res = openModal({
      component: NoteAdd,
      title: '创建笔记',
      maskClosable: false,
      width: '620px'
    }).catch(console.log);
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
    YTableRef.value.initData();
  }

  function handleNavigate(data: note) {
    console.log(data);
    router.push({name: 'noteDetail', params: {noteId: data.id}})
  }
</script>

<style lang="scss" scoped>
  .note-list {
    padding: 16px;

    .note-list-items {
      ::v-deep(.table-body) {
        display: grid;
        grid-template-columns: repeat(5, 250px);
        justify-items: center;
        justify-content: center;
      }

      ::v-deep(.table-pagination) {
        position: absolute;
        right: 0;
        bottom: 10px;
        left: 0;
        margin: auto;
      }
    }
  }
</style>
