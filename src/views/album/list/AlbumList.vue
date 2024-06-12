<template>
  <div class="album-list">
    <AlbumItem v-for="(item, index) in albumList" :key="index" :data="item" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';
import type { AlbumType } from '@/views/album/type';
import AlbumItem from '@/views/album/list/AlbumItem.vue';

const { dispatch } = useStore();

const albumList = ref<AlbumType[]>([]);

const initData = () => {
  dispatch('getAlbumList').then(res => {
    albumList.value = res.data.list;
    console.log(albumList.value);
  });
};

initData();
</script>

<style lang="scss" scoped>
.album-list {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
}
</style>
