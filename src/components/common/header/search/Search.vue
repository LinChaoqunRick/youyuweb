<template>
  <div class="search">
    <a-input-search
      v-model:value="text"
      placeholder="搜索有语"
      enter-button
      @search="handleSearch"
    />
  </div>
</template>

<script setup>
  import {ref} from 'vue';

  const text = ref("");

  const handleSearch = () => {
    console.log(text.value);
  }
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-input-search) {
    .ant-input-search-button {
      padding: 4px 12px;
    }

    input {
      background-color: transparent;
    }
  }
</style>
