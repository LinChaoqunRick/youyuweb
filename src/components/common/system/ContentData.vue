<template>
  <div class="content-data">
    <a-spin :spinning="loading">
      <slot :data="data">
        <div class="bottom-operation" v-if="!loading">
          <div v-if="failed" @click="initData" class="retry-load">
            <i-refresh theme="outline" size="15" fill="#1890ff"/>
            <span class="loading-text">加载失败，重新加载</span>
          </div>
          <div v-else-if="!loading && (!data || !data?.length)" class="no-data">暂无数据</div>
        </div>
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
  data,
  initData
})
</script>

<style lang="scss" scoped>
.content-data {
  position: relative;

  ::v-deep(.ant-spin) {
    padding: 30px 0;
    width: 100%;
  }

  .bottom-operation {
    height: 40px;
    background-color: var(--youyu-background2);
    margin: 8px 16px;

    .retry-load {
      width: 100%;
      height: 100%;
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
    }
  }
}
</style>
