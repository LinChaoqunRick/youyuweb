<template>
  <div class="moment-list mt-8">
    <div class="moment-middle">
      <MomentEditor/>
      <div class="moment-list-body">
        <MomentItem v-for="item in momentList" :data="item"/>
      </div>
      <transition name="momentSpin">
        <div class="momentSpin-box" v-show="loading">
          <a-momentSpin/>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, watch} from 'vue';
  import {useStore} from 'vuex';
  import type {momentListType} from "@/views/moment/types";
  import {useScroll} from '@vueuse/core'
  import MomentEditor from "../components/MomentEditor.vue";
  import MomentItem from "./MomentItem.vue";

  const {dispatch} = useStore();
  let pageNum: number = 1;
  let totalPageNum: number = 0;
  const momentList = ref<Array<momentListType>>([]);
  const loading = ref<boolean>(false);

  function getListData() {
    dispatch('momentList', {
      pageNum,
      pageSize: 10,
      orderBy: 'create_time',
    }).then(res => {
      momentList.value.push(...res.data.list);
      pageNum++;
      totalPageNum = res.data.pages;
    }).finally(() => {
      loading.value = false;
    })
  }

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
      
      .momentSpin-box {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--youyu-background1);
        border-radius: 4px;
        margin-bottom: 8px;
        overflow: hidden;
      }
    }
  }
  
  .momentSpin-enter-active,
  .momentSpin-leave-active {
    transition: .3s ease;
  }

  .momentSpin-enter-from,
  .momentSpin-leave-to {
    opacity: 0;
    height: 0;
  }
</style>
