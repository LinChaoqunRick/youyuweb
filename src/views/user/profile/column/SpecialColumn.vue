<template>
  <div class="special-column">
    <div class="column-header" v-if="isOwn">
      <span>最多可创建 {{maxNum}} 个专栏，当前 <span :class="{'active':!!columnList.length}">{{columnList.length}}</span>/{{maxNum}} </span>
      <a-button class="add-button" :disabled="addBtnDisabled">添加专栏</a-button>
    </div>
    <ContentData url="getColumnList" :params="{userId: user.id}" v-slot="{data}">
      <div class="column-list">
        <ColumnItem v-for="item in data" :data="item"/>
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

  const {getters, dispatch} = useStore();
  const user = inject('user');
  const userInfo = computed(() => getters['userInfo']);
  const isOwn = computed(() => userInfo.value.id === user.value.id);

  const maxNum = 5;
  const columnList = ref([]);
  const loading = ref(false);
  const addBtnDisabled = computed(() => columnList.value.length >= maxNum);
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
