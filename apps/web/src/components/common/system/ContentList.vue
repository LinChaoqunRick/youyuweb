<template>
  <div class="content-list" :class="{ 'content-list-expand': !fold }">
    <div v-if="!!dataList?.length" ref="dataListWrapperRef" class="data-list-wrapper">
      <div class="data-list">
        <slot :list="dataList" />
      </div>
    </div>
    <div ref="bottomOperation" class="bottom-operation mt-8">
      <div v-if="showFailed && failed" class="failed-box" @click="onRetry">
        <slot name="failedBox">
          <i-refresh theme="outline" size="15" fill="currentColor" />
          <span class="ml-8">加载失败，重新加载</span>
        </slot>
      </div>
      <div v-else class="success-box">
        <div
          v-if="
            showViewAll &&
              (total != null ? !!total : true) &&
              !fold &&
              (pageNum <= totalPageNum || totalPageNum === 0) &&
              (firstLoading ? true : restNum > 0)
          "
          class="view-all-data"
          @click="onLoadData"
        >
          <slot name="loadMoreBox" :loading="restLoading" :total="totalNum">
            <div class="load-more-item mr-10">
              <div>
                {{
                  pageNum === 1 ? `${firstLoading && !totalNum ? '加载中' : total + unit + dataText}` : `查看更多${dataText}`
                }}
              </div>
              <i-down
                v-if="!restLoading"
                theme="outline"
                size="14"
                fill="currentColor"
              />
              <i-loading-four
                v-else
                theme="outline"
                size="14"
                fill="currentColor"
              />
            </div>
          </slot>
        </div>
        <div v-else-if="showNoData && (totalNum === 0 || total === 0)" class="no-data">
          <slot name="noDataBox">
            暂无数据
          </slot>
        </div>
        <div v-else-if="showLoadedAll && pageNum > totalPageNum" class="loaded-all-data">
          <slot name="loadedAllBox">
            已加载全部{{ totalNum ?? 0 }}{{ unit + dataText }} ~
          </slot>
        </div>
        <div v-if="foldable && !!dataList?.length" class="loaded-fold">
          <slot name="loadedAllFold">
            <div v-show="!fold" class="fold" @click="onFold(true)">
              <span>收起</span>
              <i-up theme="outline" size="14" fill="currentColor" />
            </div>
            <div v-show="fold" class="unfold" @click="onFold(false)">
              <span>展开更多{{ dataText }}</span>
              <i-down theme="outline" size="14" fill="currentColor" />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import { keepScrollTop } from '@/assets/utils/utils';

const props = defineProps({
  url: { type: String, required: true },
  params: { type: Object },
  showFailed: { type: Boolean, default: true },
  showNoData: { type: Boolean, default: true },
  showViewAll: { type: Boolean, default: true },
  showLoadedAll: { type: Boolean, default: true },
  foldable: { type: Boolean, default: false },
  total: { type: Number },
  immediate: { type: Boolean, default: true },
  unit: { type: String, default: '条' },
  dataText: { type: String, default: '数据' },
  autoLoad: { type: Boolean, default: false }, // 滚动到底后自动加载
  loadTrigger: { type: Boolean, default: false }, // 配合autoLoad使用，如果是true，则需要点击后触发autoLoad
});

const { dispatch } = useStore();

const emit = defineEmits(['update:total']);

const firstLoading = computed(() => !dataList.value.length && restLoading.value);
const pageNum = ref<number>(0);
const totalPageNum = ref<number>(0);
const totalNum = ref<number>(props.total ?? 0);
const restLoading = ref<boolean>(false);
const failed = ref<boolean>(false);
const dataList = ref<Array<unknown>>([]);
const fold = ref<boolean>(false);
const restNum = computed(() => (props.total ?? totalNum.value) - dataList.value.length);

const bottomOperation = ref<HTMLElement | null>(null);
const dataListWrapperRef = ref<HTMLElement | null>(null);

const getListData = () => {
  if (restLoading.value || failed.value || pageNum.value > totalPageNum.value) {
    return;
  }
  const params = {
    pageSize: 10,
    pageNum: pageNum.value + 1,
  };
  restLoading.value = true;
  dispatch(props.url, Object.assign({}, params, props.params))
    .then(res => {
      dataList.value.push(...res.data.list);
      totalPageNum.value = res.data.pages;
      pageNum.value++;
      totalNum.value = res.data.total;
      emit('update:total', totalNum.value);
      if (props.foldable) {
        foldAnimation();
      }
      keepScrollTop();
    })
    .catch(() => {
      failed.value = true;
    })
    .finally(() => {
      restLoading.value = false;
    });
};

if (props.immediate) {
  getListData();
}

const initData = () => {
  dataList.value = [];
  totalPageNum.value = 1;
  pageNum.value = 1;
  totalNum.value = props.total ?? 0;
  getListData();
};

const onLoadData = () => {
  if (props.loadTrigger) {
    onUnlock();
  } else {
    getListData();
  }
};

const onUnlock = () => {
  if (!bottomOperation.value) return;
  const ob = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && pageNum.value <= totalPageNum.value) {
      getListData();
    }
  });
  ob.observe(bottomOperation.value);
};

const onRetry = () => {
  failed.value = false;
  getListData();
};

const onFold = (value: boolean) => {
  fold.value = value;
  if (dataListWrapperRef.value) {
    if (fold.value) {
      dataListWrapperRef.value.style.height = `0`;
    } else {
      // dataListWrapperRef.value.style.height = `${dataListHeight}px`;
      dataListWrapperRef.value.style.height = 'auto';
    }
  }
};

const foldAnimation = () => {
  nextTick(() => {
    if (dataListWrapperRef.value) {
      ({ height: dataListHeight } = dataListWrapperRef.value.getBoundingClientRect());
      // dataListWrapperRef.value.style.height = '0';
      // dataListWrapperRef.value.offsetHeight;
      // dataListWrapperRef.value.style.height = `${dataListHeight}px`;
    }
  });
};

watch(
  () => firstLoading.value,
  value => {
    if (value) {
      dataList.value = [];
    }
    if (!value && props.autoLoad) {
      nextTick(() => {
        if (!props.loadTrigger) {
          onUnlock();
        }
      });
    }
  }
);

defineExpose({
  list: dataList,
  getListData,
  initData,
});
</script>

<style lang="scss" scoped>
.content-list {
  position: relative;

  .data-list-wrapper {
    height: auto;
    overflow: hidden;
  }

  .bottom-operation {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 4px;

    .i-icon {
      margin-left: 2px;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #1890ff;
      cursor: pointer;

      span {
        color: #1890ff;
      }
    }

    .view-all-data {
      display: flex;
      align-items: center;

      .load-more-item {
        display: flex;
        align-items: center;
      }
    }

    .no-data {
      cursor: default;
    }
  }
}

.content-list-expand {
  > .data-list-wrapper {
    margin-top: 8px;
  }
}
</style>
