<template>
  <div class="moment-list mt-8">
    <div class="moment-middle">
      <MomentEditor/>
      <div class="moment-list-body">
        <MomentItem v-for="item in momentList" :data="item"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useStore} from 'vuex';
  import type {momentListType} from "@/views/moment/types";
  import {vInfiniteScroll} from '@vueuse/components';
  import MomentEditor from "../components/MomentEditor.vue";
  import MomentItem from "./MomentItem.vue";

  const {dispatch} = useStore();
  let pageNum: number = 1;
  const momentList = ref<Array<momentListType>>([]);

  function initData() {
    dispatch('momentList', {
      pageNum,
      pageSize: 20,
      orderBy: 'create_time',
    }).then(res => {
      momentList.value.push(...res.data.list);
      pageNum++;
    })
  }

  initData();
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
    }
  }
</style>
