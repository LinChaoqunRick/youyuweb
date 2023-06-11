<template>
  <div class="moment-list mt-8">
    <div class="moment-middle">
      <MomentEditor @saveSuccess="saveSuccess"/>
      <div class="moment-list-body">
        <MomentItem v-for="item in momentList" :data="item"/>
      </div>
      <transition name="momentSpin">
        <div class="load-more-box" v-show="loading || failed">
          <div v-show="loading">
            <a-spin/>
            <span class="loading-text">加载中...</span>
          </div>
          <div v-show="failed" @click="onLoadMore" class="retry-load">
            <i-refresh theme="outline" size="16" fill="#1890ff"/>
            <span class="loading-text">重新加载</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue';
  import {useStore} from 'vuex';
  import type {momentType} from "@/views/moment/types";
  import {useScroll} from '@vueuse/core'
  import MomentEditor from "../components/MomentEditor.vue";
  import MomentItem from "./MomentItem.vue";

  const {dispatch} = useStore();
  let pageNum: number = 1;
  let totalPageNum: number = 0;
  const momentList = ref<Array<momentType>>([]);
  const loading = ref<boolean>(false);
  const failed = ref<boolean>(false);

  function getListData() {
    failed.value = false;
    dispatch('momentList', {
      pageNum,
      pageSize: 10,
      orderBy: 'create_time',
    }).then(res => {
      momentList.value.push(...res.data.list);
      pageNum++;
      totalPageNum = res.data.pages;
    }).catch(e => {
      failed.value = true;
    }).finally(() => {
      loading.value = false;
    })
  };

  getListData();

  const {arrivedState} = useScroll(document);

  watch(() => arrivedState.bottom, (newVal) => {
    if (newVal) {
      onLoadMore();
    }
  })

  const onLoadMore = () => {
    if (!loading.value && pageNum <= totalPageNum) {
      loading.value = true;
      getListData();
    }
  }

  const saveSuccess = (data: momentType) => {
    momentList.value.unshift(data);
  }
</script>

<style lang="scss" scoped>
  .moment-list {
    display: flex;
    justify-content: center;

    .moment-middle {
      width: 750px;

      .moment-list-body {
        ::v-deep(.moment-item) {
          margin-top: 8px;
          border-radius: 4px;

          &:last-child {
            margin-bottom: 8px;
          }
        }
      }

      .load-more-box {
        height: 50px;
        background-color: var(--youyu-background1);
        border-radius: 4px;
        margin-bottom: 8px;
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
          margin-left: 8px;
        }

        .retry-load {
          cursor: pointer;
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
