<template>
  <div class="content-list">
    <div class="data-list" v-if="!!dataList?.length">
      <slot :list="dataList"/>
    </div>
    <div class="bottom-operation mt-8">
      <div class="failed-box" v-if="showFailed && failed" @click="onRetry">
        <slot name="failedBox">
          <i-refresh theme="outline" size="15" fill="#1890ff"/>
          <span class="ml-8">加载失败，重新加载</span>
        </slot>
      </div>
      <div class="no-data" v-else-if="showNoData && totalPageNum===0">
        <slot name="noDataBox">
          暂无数据
        </slot>
      </div>
      <div class="view-all-data" v-else-if="showViewAll && pageNum <= totalPageNum" @click="onLoadData"
           ref="loadMoreRef">
        <slot name="loadMoreBox" :loading="restLoading" :total="totalNum">
          <div class="load-more-item">
            <div>
              {{
                (pageNum === 1) ?
                  `${total}&nbsp;条${dataText}` :
                  `${fold && dataList?.length ? '展开' : '查看'}更多${dataText}`
              }}
            </div>
            <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
            <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
          </div>
        </slot>
      </div>
      <div class="loaded-all-data" v-else-if="showLoadedAll && pageNum>totalPageNum">
        <slot name="loadedAllBox">
          已加载全部{{ dataText }} ~
        </slot>
      </div>
      <div class="loaded-fold" v-if="foldable && !!dataList?.length">
        <slot name="loadedAllFold">
          <div class="fold" v-show="!fold" @click="onFold(true)">
            <span>收起</span>
            <i-up theme="outline" size="14" fill="#1890ff"/>
          </div>
          <div class="unfold" v-show="fold" @click="onFold(false)">
            <span>展开更多{{ dataText }}</span>
            <i-down theme="outline" size="14" fill="#1890ff"/>
          </div>
        </slot>
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
  showFailed: {type: Boolean, default: true},
  showNoData: {type: Boolean, default: true},
  showViewAll: {type: Boolean, default: true},
  showLoadedAll: {type: Boolean, default: true},
  foldable: {type: Boolean, default: false},
  total: {type: Number},
  immediate: {type: Boolean, default: true},
  dataText: {type: String, default: '数据'},
  autoLoad: {type: Boolean, default: false}, // 滚动到底后自动加载
  loadTrigger: {type: Boolean, default: false} // 配合autoLoad使用，如果是true，则需要点击后触发autoLoad
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
const fold = ref<boolean>(true);

const getListData = () => {
  if ((totalPageNum.value !== -1 && pageNum > totalPageNum) || failed.value) return;
  const params = {
    pageSize: 5,
    pageNum: pageNum.value,
  }
  restLoading.value = true;
  dispatch(props.url, Object.assign({}, params, props.params)).then(res => {
    dataList.value.push(...res.data.list);
    totalPageNum.value = res.data.pages;
    pageNum.value++;
    totalNum.value = res.data.total;
    fold.value = false;
    keepScrollTop();
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

const onLoadData = () => {
  if (props.loadTrigger) {
    onUnlock();
  } else {
    getListData();
  }
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

const onFold = (value: boolean) => {
  fold.value = value;
}

watch(() => firstLoading.value, () => {
  if (!firstLoading.value && props.autoLoad) {
    nextTick(() => {
      if (!props.loadTrigger) {
        onUnlock();
      }
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
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    color: #1890ff;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #1890ff;
      height: 100%;
      cursor: pointer;

      span {
        color: #1890ff;
      }
    }

    .view-all-data {
      .load-more-item {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
