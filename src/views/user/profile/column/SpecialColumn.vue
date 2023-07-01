<template>
  <div class="special-column">
    <div class="no-data" v-if="finished && columnList.length === 0">
      暂无数据
    </div>
    <ColumnItem v-for="item in columnList" :data="item"/>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, watch, inject} from "vue";
  import {useStore} from 'vuex';
  import ColumnItem from "./ColumnItem.vue";

  const {getters, dispatch} = useStore();
  const user = inject('user');

  const userInfo = computed(() => getters['userInfo']);

  const columnList = ref([]);
  const finished = ref(false);

  function getColumnList() {
    finished.value = false;
    columnList.value = [];
    dispatch('getColumnList', {userId: user.value.id}).then(res => {
      finished.value = true;
      columnList.value = res.data;
    })
  }

  getColumnList();

</script>

<style lang="scss" scoped>
  .special-column {
    background-color: var(--youyu-background1);

    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
    }
  }
</style>
