<template>
  <div class="note-list">
    <YTable listUrl="listNote" :params="params" ref="YTableRef">
      <template #default="{dataList}">
        <div v-for="(item, index) in dataList" class="note-body" :key="item.id">
          <NoteItem :data="item"/>
        </div>
      </template>
    </YTable>
  </div>
</template>

<script lang="ts" setup>
  import {computed, inject} from 'vue';
  import YTable from "@/components/common/table/YTable.vue";
  import NoteItem from "./NoteItem.vue";

  const user = inject('user');

  const params = computed(() => ({
    userId: user.value.id,
    pageSize: 10
  }))

</script>

<style lang="scss" scoped>
  .note-list {
    ::v-deep(.note-item) {
      margin-top: 8px;
      border-radius: 4px;

      &:last-child {
        margin-bottom: 8px;
      }
    }
  }
</style>
