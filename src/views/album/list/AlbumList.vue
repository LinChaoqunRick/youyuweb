<template>
  <div class="album-list">

  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';

const { dispatch } = useStore();

const initData = () => {
  dispatch('getAlbumList').then(res => {
    console.log(res);
  });
};

initData();
</script>

<style scoped>

</style>
