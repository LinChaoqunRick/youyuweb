<template>
  <div class="moment-list mt-8">
    <div class="moment-middle">
      <MomentEditor @saveSuccess="saveSuccess"/>
      <div class="moment-list-body">
        <MomentItem v-for="item in momentList" :data="item"/>
      </div>
      <transition name="momentSpin">
        <div class="load-more-box" ref="loadMoreBox">
          <div v-show="loading">
            <a-spin/>
            <span class="loading-text">加载中...</span>
          </div>
          <div v-if="failed" @click="onLoadRetry" class="retry-load">
            <i-refresh theme="outline" size="15" fill="#1890ff"/>
            <span class="loading-text">重新加载</span>
          </div>
          <div v-if="totalPageNum === 0" class="no-data">
            暂无数据
          </div>
          <div v-if="finish" class="data-finished">已加载全部数据</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, provide, onMounted, computed, onUnmounted} from 'vue';
  import {useStore} from 'vuex';
  import type {momentType} from "@/views/moment/types";
  import MomentEditor from "../components/MomentEditor.vue";
  import MomentItem from "./MomentItem.vue";

  const {dispatch} = useStore();
  const pageNum = ref<number>(1);
  const totalPageNum = ref<number>(-1);
  const momentList = ref<Array<momentType>>([]);
  const loading = ref<boolean>(false);
  const failed = ref<boolean>(false);
  const finish = computed(() => totalPageNum.value !== -1 && pageNum.value > totalPageNum.value); // 是否完成加载（还能不能加载下一页）
  const loadMoreBox = ref<HTMLElement>(null);
  const activeId = ref<number>(-1);

  function getListData() {
    failed.value = false;
    loading.value = true;
    dispatch('momentList', {
      pageNum: pageNum.value,
      pageSize: 10,
      orderBy: 'create_time',
    }).then(res => {
      momentList.value.push(...res.data.list);
      pageNum.value === 1 && (totalPageNum.value = res.data.pages);
      pageNum.value++;
    }).catch(e => {
      failed.value = true;
    }).finally(() => {
      loading.value = false;
    })
  };

  const onLoadMore = () => {
    if (!loading.value && !finish.value && !failed.value) {
      getListData();
    }
  }

  const onLoadRetry = () => {
    failed.value = false;
    onLoadMore();
  }

  const saveSuccess = (data: momentType) => {
    momentList.value.unshift(data);
  }

  const updateActiveId = (value: number) => {
    activeId.value = value;
  }

  provide('active', {activeId, updateActiveId});

  const ob = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    onLoadMore();
  });

  onMounted(() => {
    ob.observe(loadMoreBox.value);
  })

  onUnmounted(() => {
    ob.disconnect();
  })
</script>

<style lang="scss" scoped>
  .no-data {

  }

  .moment-list {
    display: flex;
    justify-content: center;

    .moment-middle {
      width: 750px;

      .moment-list-body {
        ::v-deep(.moment-item) {
          margin-top: 8px;
          border-radius: 4px;
        }
      }

      .load-more-box {
        height: 50px;
        background-color: var(--youyu-background1);
        border-radius: 4px;
        margin: 8px 0;
        overflow: hidden;

        > div {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        ::v-deep(.ant-spin) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .loading-text {
          font-size: 14px;
          color: #1890ff;
          margin-left: 6px;
        }

        .retry-load {
          cursor: pointer;
        }

        .data-finished {
          color: var(--youyu-text1);
        }

        .no-data {
          color: var(--youyu-text1);
        }
      }
    }
  }

  .momentSpin-enter-active,
  .momentSpin-leave-active {
    transition: .6s ease-out;
  }

  .momentSpin-enter-from,
  .momentSpin-leave-to {
    opacity: 0;
    height: 0;
  }
</style>
