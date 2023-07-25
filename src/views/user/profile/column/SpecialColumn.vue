<template>
  <div class="special-column">
    <div class="column-header" v-if="isOwn">
      <span>最多可创建 {{maxNum}} 个专栏，当前 <span :class="{'active':!!columnList.length}">{{columnList.length}}</span>/{{maxNum}} </span>
      <a-button class="add-button" :disabled="addBtnDisabled" @click="onAdd">添加专栏</a-button>
    </div>
    <ContentData url="getColumnList" :params="{userId: user.id}" v-slot="{data}" ref="ContentDataRef">
      <div class="column-list" v-if="data && data.length">
        <ColumnItem @deleteSuccess="deleteSuccess" v-for="item in data" :data="item"/>
      </div>
    </ContentData>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, watch, inject} from "vue";
  import {useStore} from 'vuex';
  import openModal from "@/libs/tools/openModal";
  import ColumnItem from "./list/ColumnItem.vue";
  import ContentData from "@/components/common/system/ContentData.vue";
  import ColumnAdd from "./list/ColumnAdd.vue";
  import type {column} from "@/views/user/profile/column/type";

  const {getters, dispatch} = useStore();

  const ContentDataRef = ref<typeof ContentData>(null);

  const user = inject('user');
  const userInfo = computed(() => getters['userInfo']);
  const isOwn = computed(() => userInfo.value.id === user.value.id);

  const maxNum = 5;
  const columnList = computed(() => ContentDataRef.value?.data ?? []);
  const loading = ref(false);
  const addBtnDisabled = computed(() => columnList.value.length >= maxNum);

  const onAdd = async () => {
    await openModal({
      component: ColumnAdd,
      title: '添加专栏'
    }).then(res => {
      ContentDataRef.value.data.push(res);
    })
  }

  const deleteSuccess = (data: column[]) => {
    ContentDataRef.value.data = ContentDataRef.value.data.filter(item => item.id !== data.id);
  }
</script>

<style lang="scss" scoped>
  .special-column {
    background-color: var(--youyu-background1);
    padding: 0 16px 16px 16px;

    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--youyu-border-color);
      padding: 4px 0;

      .active {
        color: #1890ff;
        cursor: pointer;
      }

      .add-button {
        margin-left: auto;
      }
    }

    .column-list {
      ::v-deep(.column-item) {
        padding: 10px 0 0 0;
      }

      .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
      }
    }
  }
</style>
