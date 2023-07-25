<template>
  <div class="content-data" :style="{minHeight: minHeight+'px'}">
    <a-spin :spinning="loading">
      <slot :data="data">
        <div v-if="failed" @click="initData" class="retry-load">
          <i-refresh theme="outline" size="15" fill="#1890ff"/>
          <span class="loading-text">重新加载</span>
        </div>
        <div v-else-if="!loading && (!data || !data?.length)" class="no-data">暂无数据</div>
      </slot>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue'
  import {useStore} from "vuex";

  const props = defineProps({
    url: {
      type: String,
      required: true
    },
    params: {
      type: Object,
    },
    showSpin: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: Number,
      default: 200
    }
  })

  const {dispatch} = useStore();

  const loading = ref<boolean>(false);
  const failed = ref<boolean>(false);

  const data = ref();

  const initData = () => {
    loading.value = true;
    failed.value = false;
    dispatch(props.url, props.params).then(res => {
      data.value = res.data;
    }).catch(() => {
      failed.value = true;
    }).finally(() => {
      loading.value = false;
    })
  }

  initData();

  defineExpose({
    data
  })
</script>

<style lang="scss" scoped>
  .content-data {
    position: relative;

    ::v-deep(.ant-spin-nested-loading) {
      min-height: 200px;

      .ant-spin-container {
        min-height: 200px;
      }
    }

    .retry-load {
      width: 100%;
      min-height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .loading-text {
        margin-left: 4px;
      }
    }

    .no-data {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      min-height: 200px;
    }
  }
</style>
