<template>
  <div>
    <BaseLayout>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
      <template v-slot:loadMoreBox>
        <a-spin/>
        <span class="loading-text">加载中...</span>
      </template>
      <template class="retry-load" #failedBox>
        <i-refresh theme="outline" size="15" fill="#1890ff"/>
        <span class="loading-text">重新加载</span>
      </template>
      <template class="no-data" #noDataBox>暂无数据</template>
      <template class="data-finished" #loadedAllBox>已加载全部数据</template>
    </BaseLayout>
  </div>
</template>

<script>
  import BaseLayout from "./BaseLayout.vue";

  export default {
    name: "AboutMe",
    components: {
      BaseLayout
    },
    data() {
      return {
        meValue: ''
      }
    }
  }
</script>

<style scoped>

</style>
