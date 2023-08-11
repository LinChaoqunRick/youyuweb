<template>
  <div class="content-list">
    <a-spin :spinning="firstLoading">
      <div class="data-list mb-8">
        <slot :list="dataList"/>
      </div>
    </a-spin>
    <div v-if="!firstLoading" class="bottom-operation">
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
      <div class="view-all-data"
           v-else-if="dataList.length && pageNum <= totalPageNum"
           @click="onUnlock" ref="loadMoreRef">
        <slot name="loadMoreBox">
          <div class="more-btn">
            <span class="mr-8">查看全部 <span class="comment-count">{{ total ?? totalNum }}</span> 条评论</span>
            <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
            <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
          </div>
        </slot>
      </div>
      <div class="loaded-all-data" v-else-if="pageNum>totalPageNum">
        <slot name="loadedAllBox">
          已加载全部评论~
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
    total: {
      type: Number
    },
    autoLoad: {
      type: Boolean,
      default: false
    }
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
      keepScrollTop();
    }).catch(() => {
      failed.value = true;
    }).finally(() => {
      restLoading.value = false;
    })
  }

  getListData();

  const initData = () => {
    dataList.value = [];
    totalPageNum.value = 0;
    pageNum.value = 0;
    totalNum.value = 0;
    getListData();
  }

  const onUnlock = () => {
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

    ::v-deep(.ant-spin) {
      padding: 30px 0;
      position: relative;
    }

    .bottom-operation {
      height: 40px;
      /*background-color: var(--youyu-background2);*/
      margin: 0 16px;

      .failed-box, .no-data, .view-all-data, .loaded-all-data {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
      }

      .failed-box {
        padding: 6px 0;
        text-align: center;
        cursor: pointer;
      }

      .no-data {
        padding: 6px 0;
        text-align: center;
        cursor: pointer;
      }

      .view-all-data {

        .more-btn {
          padding: 6px 0;
          cursor: pointer;
          text-align: center;
          color: #1890ff;

          &:hover {

          }
        }
      }

      .loaded-all-data {
        padding: 6px 0;
        text-align: center;
        color: var(--youyu-text2);
      }
    }
  }
</style>
