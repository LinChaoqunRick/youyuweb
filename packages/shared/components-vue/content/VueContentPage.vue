<template>
  <div :class="['vue-content-page', props.actionAlign === 'center' ? 'action-align-center' : 'action-align-left']">
    <div class="data-list">
      <slot :list="dataList" :unshiftData="unshiftData" :removeById="removeById" />
    </div>
    <div v-if="hideActionFinish ? !isFinish : true" ref="statusRef" class="vue-content-page-status">
      <div v-if="isLoading" class="content-status content-status-loading">
        <slot name="loading" :remainCount="remainCount">
          <Spin :tip="props.loadingText" />
        </slot>
      </div>
      <div v-else-if="isFailed" class="content-status content-status-failed" @click="onRetry">
        <slot name="failed">
          <i-refresh theme="outline" size="15" fill="currentColor" />
          <div class="content-status-text">{{ props.failedText }}</div>
        </slot>
      </div>
      <div
        v-else-if="isReady"
        class="content-status content-status-ready"
        v-intersection-observer="onIntersectionObserver"
        @click="getPageData"
      >
        <slot name="ready" :remainCount="remainCount">
          <i-down theme="outline" size="16" fill="currentColor" />
          <div class="content-status-text">{{ readyText }}</div>
        </slot>
      </div>
      <div v-else-if="isFinish" class="content-status content-status-finish">
        <slot name="finish">
          <div class="content-status-text">{{ finishText }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" generic="T extends BasicVoProps" setup>
import { computed, type PropType, ref, useTemplateRef, type Ref } from 'vue';
import http from '../../network';
import type { BasicVoProps, PageResult } from '../../types/common';
import { PageStatus } from '../../types/components-vue';
import { Spin } from 'ant-design-vue';
import { vIntersectionObserver } from '@vueuse/components';

type Mode = 'auto' | 'trigger' | 'manual' | 'lazy';
// auto: 每次滑动到底部，自动加载数据
// trigger: 首次需要点击，后续同auto
// manual: 每次都需要手动点击才能加载数据
// lazy: 加载第一页数据，后续手动加载

const props = defineProps({
  presetData: { type: Object as PropType<T[]>, default: () => [] }, // 预设数据
  url: { type: String }, // 数据获取url
  params: { type: Object as PropType<Record<string, any>> }, // 数据获取参数
  total: { type: Number },
  unitText: { type: String, default: '条' }, // 单位名称
  dataText: { type: String, default: '数据' }, // 数据名称
  pageSize: { type: Number, default: 10 }, // 分页大小
  loadingText: { type: String, default: '加载中...' },
  failedText: { type: String, default: '加载失败，点击重试' },
  readyText: { type: String },
  finishText: { type: String },
  mode: { type: String as PropType<Mode>, default: 'auto' }, // 加载模式
  actionAlign: { type: String, default: 'center' },
  hideActionFinish: { type: Boolean, default: false }, // 加载全部数据后，隐藏action
});

const pageNum = ref(1);
const status = ref<PageStatus>(props.total === props.presetData.length ? PageStatus.FINISH : PageStatus.READY);
const dataList = ref<T[]>([...props.presetData]) as Ref<T[]>;
const total = ref(props.total ?? 0);
const unLocked = ref(false);

const statusRef = useTemplateRef<HTMLDivElement>('statusRef');
const isFinish = computed(() => status.value === PageStatus.FINISH);
const isReady = computed(() => status.value === PageStatus.READY);
const isLoading = computed(() => status.value === PageStatus.LOADING);
const isFailed = computed(() => status.value === PageStatus.FAILED);
const readyText = computed(() => (props.readyText ? props.readyText : '加载更多' + props.dataText));
const finishText = computed(() =>
  props.readyText ? props.readyText : total.value > 0 ? '已加载全部' + props.dataText : '暂无' + props.dataText,
);
const remainCount = computed(() => total.value - dataList.value.length);

function refresh() {
  status.value = PageStatus.READY;
  pageNum.value = 1;
  total.value = props.total ?? 0;
  unLocked.value = false;
  dataList.value = [];
  getPageData();
}

function getPageData() {
  if (!isReady.value || !props.url) {
    return;
  }
  unLocked.value = true;
  const { url, params, pageSize } = props;
  status.value = PageStatus.LOADING;
  http
    .post<PageResult<T>>(url, {
      pageSize,
      pageNum: pageNum.value,
      ...params,
    })
    .then(res => {
      if (pageNum.value === 1) {
        // 首次直接赋值，避免有presetData影响
        dataList.value = res.data.list;
      } else {
        dataList.value.push(...res.data.list);
      }
      total.value = res.data.total;
      pageNum.value = pageNum.value + 1;
      if (pageNum.value > res.data.pages) {
        status.value = PageStatus.FINISH;
      } else {
        status.value = PageStatus.READY;
      }
    })
    .catch(err => {
      status.value = PageStatus.FAILED;
    });
}

function onRetry() {
  status.value = PageStatus.READY;
  getPageData();
}

function onIntersectionObserver([entry]: IntersectionObserverEntry[]) {
  const isVisible = entry?.isIntersecting || false;
  if (!isVisible) {
    return;
  }
  const { mode } = props;
  if (mode === 'auto') {
    getPageData();
  } else if (mode === 'trigger') {
    if (unLocked.value) {
      getPageData();
    }
  } else if (mode === 'lazy') {
    if (!unLocked.value) {
      getPageData();
    }
  }
}

function unshiftData(data: T) {
  dataList.value = [data, ...dataList.value];

  if (dataList.value.length === total.value) {
    status.value = PageStatus.FINISH;
  }
}

function removeById(id: number) {
  const newList = dataList.value.filter((item: T) => item.id !== id);
  if (newList.length === dataList.value.length) return false; // 没找到
  dataList.value = newList; // 替换引用 -> 触发更新
  return true;
}

defineExpose({
  dataList,
  unshiftData,
  removeById,
  refresh,
});
</script>

<style lang="scss" scoped>
.vue-content-page {
  .vue-content-page-status {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background-color: var(--youyu-body-background2);
    border-radius: 4px;

    .content-status {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #1890ff;
      cursor: pointer;

      .content-status-text {
        margin-left: 4px;
      }

      &.content-status-finish {
        color: var(--youyu-text);
      }
    }

    ::v-deep(.ant-spin) {
      display: flex;
      align-items: center;
      justify-content: center;

      .ant-spin-text {
        margin-left: 8px;
      }
    }
  }

  &.action-align-left {
    .vue-content-page-status {
      justify-content: left;
      height: auto;
      padding: 0;
    }
  }
}
</style>
