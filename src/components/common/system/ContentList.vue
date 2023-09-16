<template>
  <div class="content-list">
    <div class="data-list mb-8" v-if="!!dataList?.length">
      <slot :list="dataList"/>
    </div>
    <div class="bottom-operation" v-if="!flex">
      <div class="failed-box" v-if="failed" @click="onRetry">
        <slot name="failedBox">
          <i-refresh theme="outline" size="15" fill="#1890ff"/>
          <span class="ml-8">加载失败，重新加载</span>
        </slot>
      </div>
      <div class="no-data" v-else-if="totalPageNum===0">
        <slot name="noDataBox">
          暂无数据
        </slot>
      </div>
      <div class="view-all-data" v-else-if="pageNum <= totalPageNum" @click="onUnlock" ref="loadMoreRef">
        <slot name="loadMoreBox" :total="totalNum" v-if="!restLoading">
          <span class="mr-8">查看全部 <span>{{ total }}</span> 条{{ dataText }}</span>
          <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
          <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
        </slot>
        <slot name="loadingBox" v-else>
          <a-spin :spinning="restLoading"></a-spin>
          <span class="tip-text">加载中...</span>
        </slot>
      </div>
      <div class="loaded-all-data" v-else-if="pageNum>totalPageNum">
        <slot name="loadedAllBox">
          已加载全部~
        </slot>
      </div>
    </div>
    <div class="flex-operation" v-else>
      <div v-if="showLoadReply && total" class="view-more" @click="getListData">
        <span>
          {{
            (pageNum === 1) ? `共${total}条${dataText}` : `${fold && dataList?.length ? '展开' : '查看'}更多${dataText}`
          }}
        </span>
        <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
        <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
      </div>
      <div class="fold-btn" v-if="dataList?.length && !fold" @click="onFold">
        <span>收起</span>
        <i-up theme="outline" size="14" fill="#1890ff"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, nextTick, watch} from 'vue'
import {useStore} from "vuex";
import {keepScrollTop} from '@/assets/utils/utils';

const props = defineProps({
  url: {type: String, required: true},
  params: {type: Object,},
  showSpin: {type: Boolean, default: true},
  total: {type: Number},
  autoLoad: {type: Boolean, default: false},
  immediate: {type: Boolean, default: true},
  flex: {type: Boolean, default: false},
  dataText: {type: String, default: "数据"}
})

const {dispatch} = useStore();

const firstLoading = computed(() => !dataList.value.length && restLoading.value);
const pageNum = ref<number>(1);
const totalPageNum = ref<number>(1);
const totalNum = ref<number>(0);
const restLoading = ref<boolean>(false);
const failed = ref<boolean>(false);
const loadMoreRef = ref<HTMLElement | null>(null);
const dataList = ref([]);
const fold = ref<boolean>(false);
const showLoadReply = computed(() => (props.total > 0 && !dataList.value.length) || pageNum.value <= pageNum.value || fold.value);

const getListData = () => {
  if ((totalPageNum.value !== -1 && pageNum > totalPageNum) || failed.value) return;
  const params = {
    pageSize: 10,
    pageNum: pageNum.value,
  }
  restLoading.value = true;
  dispatch(props.url, Object.assign({}, params, props.params)).then(res => {
    dataList.value.push(...res.data.list);
    totalPageNum.value = res.data.pages;
    pageNum.value++;
    totalNum.value = res.data.total;
    keepScrollTop()
  }).catch(() => {
    failed.value = true;
  }).finally(() => {
    restLoading.value = false;
  })
}

if (props.immediate) {
  getListData();
}

const initData = () => {
  dataList.value = [];
  totalPageNum.value = 1;
  pageNum.value = 1;
  totalNum.value = 0;
  getListData();
}

const onUnlock = () => {
  if (!loadMoreRef.value) return;
  const ob = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    getListData();
  });

  ob.observe(loadMoreRef.value);
}

const onRetry = () => {
  failed.value = false;
  getListData();
}

const onFold = () => {
  fold.value = !fold.value;
}

watch(() => firstLoading.value, () => {
  if (!firstLoading.value && props.autoLoad) {
    nextTick(() => {
      onUnlock();
    })
  }
})

defineExpose({
  list: dataList,
  getListData,
  initData
})
</script>

<style lang="scss" scoped>
.content-list {
  position: relative;

  .bottom-operation {
    min-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    background-color: var(--youyu-background1);

    .failed-box, .no-data, .view-all-data, .loaded-all-data {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 48px;
      height: 100%;
      width: 100%;
    }

    .failed-box {
      padding: 6px 0;
      text-align: center;
      cursor: pointer;

      span {
        color: #1890ff;
      }
    }

    .no-data {
      padding: 6px 0;
      text-align: center;
      cursor: pointer;
    }

    .view-all-data {
      width: 100%;
      cursor: pointer;

      ::v-deep(.ant-spin ) {
        line-height: 0;
      }

      .tip-text {
        margin-left: 6px;
        color: #1890ff;
      }
    }

    .loaded-all-data {
      padding: 6px 0;
      text-align: center;
      color: var(--youyu-text2);
    }
  }

  .flex-operation {
    display: flex;
    cursor: pointer;
    color: #1890ff;

    > div {
      &:nth-child(n+2) {
        margin-left: 16px;
      }
    }
  }
}
</style>
