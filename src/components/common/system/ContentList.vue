<template>
  <div class="content-list" :style="{minHeight: minHeight+'px'}">
    <a-spin :spinning="firstLoading">
      <slot :list="dataList"/>
    </a-spin>
    <div v-if="!firstLoading" class="bottom-operation">
      <div class="failed-box" v-if="failed" @click="onRetry">
        <i-refresh theme="outline" size="15" fill="#1890ff"/>
        重新加载
      </div>
      <div class="no-data" v-else-if="totalPageNum===0">暂无数据</div>
      <div class="comment-load-all"
           v-else-if="dataList.length && pageNum <= totalPageNum"
           @click="onUnlock" ref="loadMoreRef">
        <div class="more-btn">
          查看全部 <span class="comment-count">{{total ?? totalNum}}</span> 条评论
          <i-down v-if="!restLoading" theme="outline" size="14" fill="#1890ff"/>
          <i-loading-four v-else theme="outline" size="14" fill="#1890ff"/>
        </div>
      </div>
      <div class="loaded-all" v-else-if="pageNum>totalPageNum">已加载全部评论~</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ref, computed} from 'vue'
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
      default: 120
    },
    total: {
      type: Number
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
    if (totalPageNum.value !== -1 && pageNum > totalPageNum || failed.value) return;
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
      min-height: 120px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
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

    .comment-load-all {

      .more-btn {
        padding: 6px 0;
        cursor: pointer;
        text-align: center;
        color: #1890ff;

        &:hover {

        }
      }
    }

    .loaded-all {
      padding: 6px 0;
      text-align: center;
      color: var(--youyu-text2);
    }
  }
</style>
