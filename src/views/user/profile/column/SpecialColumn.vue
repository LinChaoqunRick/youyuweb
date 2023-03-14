<template>
  <div class="special-column">
    <ColumnItem v-for="item in columnList" :data="item"/>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, watch} from "vue";
  import {useStore} from 'vuex';
  import ColumnItem from "./ColumnItem.vue";

  const {getters, dispatch} = useStore();
  const props = defineProps({
    user: {
      type: Object
    }
  })

  const userInfo = computed(() => getters['userInfo']);

  const columnList = ref([]);

  function getColumnList() {
    dispatch('getColumnList', {userId: props.user.id}).then(res => {
      columnList.value = res.data;
    })
  }

  watch(() => props.user, (newVal) => {
    getColumnList();
  }, {immediate: true})

</script>

<style scoped>

</style>
