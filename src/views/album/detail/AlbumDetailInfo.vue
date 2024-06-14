<template>
  <div class="album-detail-info">
    <div class="album-name">{{ data.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref } from 'vue';

const props = defineProps({
  albumId: {
    type: [String, Number],
    required: true
  }
});

const { dispatch } = useStore();
const data = ref({});

const initData = () => {
  dispatch('getAlbumDetail', { id: props.albumId }).then(res => {
    data.value = res.data;
  });
};

initData();
</script>

<style scoped lang="scss">
.album-detail-info {
  background-color: var(--youyu-background1);
  height: 100%;
  margin-left: auto;
  padding: 10px 16px;

  .album-name {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
