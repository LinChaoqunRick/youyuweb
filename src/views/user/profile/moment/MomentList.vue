<template>
  <div class="moment-list">
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
</template>

<script setup lang="ts">
  import {computed} from 'vue';
  import {useStore} from "vuex";
  import UserMomentList from "@/views/moment/list/UserMomentList.vue";

  const {getters, commit, dispatch} = useStore();

  const userInfo = computed(() => getters['userInfo']);
</script>

<style lang="scss" scoped>

</style>
