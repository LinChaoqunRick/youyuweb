<template>
  <div class="category-panel">

  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useStore} from 'vuex';

  const {dispatch} = useStore();

  const categoryList = ref([]);

  function getCategoryList() {
    dispatch("getCategoryList").then(res => {
      categoryList.value = res.data;
    })
  }

  getCategoryList();
</script>

<style lang="scss" scoped>
  .category-panel {
    width: 300px;
    height: 380px;
    background-color: var(--article-background);
    border-radius: 8px;
    padding: 24px 26px
  }
</style>
