<template>
  <button @click="handleClick">请求一次Hello</button>
  <a-tree-select
    v-model:value="value"
    show-search
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    placeholder="Please select"
    allow-clear
    tree-default-expand-all
    :tree-data="treeData"
    :fieldNames="{ value: 'id' }"
  >
    <template #title="{ value: val, title }">
      <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
      <template v-else>{{ title }}</template>
    </template>
  </a-tree-select>
</template>

<script setup lang="ts">
  import {useStore} from 'vuex';

  const {dispatch} = useStore();
  import type {TreeSelectProps} from 'ant-design-vue';
  import {defineComponent, ref, watch} from 'vue';

  const value = ref<string>();
  const treeData = ref<TreeSelectProps['treeData']>([]);
  watch(value, () => {
    console.log(value.value);
  });

  function handleClick() {
    dispatch("helloTest1").then(res => {
      console.log(res);
    })
  }

  function getCategoryList() {
    dispatch("getCategoryList").then(res => {
      treeData.value = transferData(res.data);
    })
  }

  getCategoryList();

  function transferData(data) {
    data.forEach(item => {
      item.title = item.name;
      if (item.pid > -1) {
        const parent = data.find(i => i.id === item.pid);
        if (parent) {
          if (!parent.children?.length) {
            parent.children = []
          }
          parent.children.push(item);
        }
      }
    })
    return data.filter(item => item.pid === -1)
  }
</script>

<style scoped>

</style>
