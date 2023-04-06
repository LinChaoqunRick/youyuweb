<template>
  <div class="note-item">
    <div class="item-cover">
      <img :src="data.cover"/>
    </div>
    <div class="item-info">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type {PropType} from 'vue';
  import type {note} from "../../type";

  const props = defineProps({
    data: {
      type: Object as PropType<note>
    }
  })
</script>

<style lang="scss" scoped>
  .note-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 210px;
    width: 160px;
    background-color: var(--youyu-body-background3);
    border-radius: 4px;
    padding: 6px;

    .item-cover {
      height: 170px;
      width: 130px;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .item-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
</style>
