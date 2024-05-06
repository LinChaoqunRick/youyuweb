<template>
  <div class="favorites-item">

  </div>
</template>

<script setup lang="ts">
import type {PropType} from "vue";

interface FavoritesType {
  id?: string,
  userId?: number,
  name?: string,
  postIds?: string,
  cover?: string,
  open?: number,
  isTop?: number,
  likeCount?: number,
  createTime?: string,
  updateTime?: string,
}

const props = defineProps({
  data: {
    type: Object as PropType<FavoritesType>,
    require: true
  }
})
</script>

<style scoped lang="scss">

</style>
