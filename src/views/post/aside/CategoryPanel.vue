<template>
  <div class="category-panel">
    <div class="category-title">分类专栏</div>
    <div class="category-list">
      <div class="category-item" v-for="item in categoryList"
           :style="`border:2px solid ${item.backgroundColor};background-color: ${item.backgroundColor+'99'};color:${item.color}`"
      >
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useStore} from 'vuex';
  import {randomColor, colorReverse} from "@/assets/utils/utils";

  const {dispatch} = useStore();

  const categoryList = ref([]);

  function getCategoryList() {
    dispatch("getCategoryList").then(res => {
      categoryList.value = res.data;
      categoryList.value.forEach(item => {
        item.backgroundColor = randomColor();
        // item.color = colorReverse(item.backgroundColor);
        item.color = "#fff";
      })
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
    padding: 10px 16px;

    .category-title {
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #bfbfbf;
      padding-bottom: 6px;
    }

    .category-list {
      padding-top: 10px;
      /*display: grid;*/
      /*grid-template-columns: auto auto auto;*/
      /*grid-auto-flow: row dense;*/

      display: flex;
      flex-wrap: wrap;

      .category-item {
        padding: 1px 14px;
        border-radius: 20px;
        margin: 4px;
        cursor: pointer;
      }
    }
  }
</style>
