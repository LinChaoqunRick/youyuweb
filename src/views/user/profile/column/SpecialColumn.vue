<template>
  <div class="special-column">
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

  function getColumnList() {
    dispatch('getColumnList', {userId: user.value.id}).then(res => {
      columnList.value = res.data;
    })
  }

  getColumnList();

</script>

<style scoped>

</style>
