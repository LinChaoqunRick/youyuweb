<template>
  <a-card title="分类专栏" style="width: 100%">
    <div class="category-list">
      <div class="category-item" v-for="item in categoryList" :style="`color:${getRandomColor()}`">
        {{ item.name }}
      </div>
    </div>
  </a-card>
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

function getRandomColor() {
  const colors: string[] = ['#1890ff', '#003366', '#B433FF', '#CC0000', '#33B0CA'];
  return colors[Math.floor((Math.random() * colors.length))]
}
</script>

<style lang="scss" scoped>
::v-deep(.ant-card-body) {
  padding: 12px;
}

.category-list {

  display: flex;
  flex-wrap: wrap;

  .category-item {
    font-size: 13px;
    padding: 2px 12px;
    border-radius: 4px;
    margin: 4px;
    cursor: pointer;
    background-color: #fafafa;
    border: 1px solid rgba(221, 221, 221, 0.78);

    &:hover {
      background-color: #efefef;
    }
  }
}

</style>
