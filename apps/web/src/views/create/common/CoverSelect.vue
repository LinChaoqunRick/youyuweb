<template>
  <div class="cover-select">
    <div class="image-box" v-if="showImages.length">
      <div class="image-item" v-for="item in showImages" :class="{'selected-active': item.selected}">
        <i-check-small v-if="item.selected" theme="outline" size="18" fill="#fff"/>
        <img :src="item.url" alt="" @click="handleItemClick(item)"/>
      </div>
    </div>
    <div v-else class="no-data">
      暂无数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, reactive } from 'vue';
import type { PreSetCover } from '@/views/create/common/types';

const props = defineProps({
  images: {
    type: Object as PropType<Array<string>>,
    required: true
  },
  maxNum: {
    type: Number,
    required: true
  }
})

const selectNum = computed(() => showImages.value.filter(i => i.selected).length);

const showImages = computed<Array<PreSetCover>>(() => {
  return props.images.map(item => (reactive({
    url: item,
    selected: false
  })))
})

const handleItemClick = (item: PreSetCover) => {
  if (item.selected) {
    return item.selected = !item.selected;
  }
  if (selectNum.value >= props.maxNum) {
    return;
  }
  item.selected = !item.selected;
}

const beforeConfirm = (done: Function) => {
  const selectedImages = showImages.value.filter(item => item.selected).map(item => item.url);
  return done(selectedImages);
}

defineExpose({
  beforeConfirm
})
</script>

<style scoped lang="scss">
.cover-select {
  min-height: 160px;

  .image-box {
    display: flex;
    flex-wrap: wrap;

    .image-item {
      position: relative;
      height: 100%;
      width: 25%;
      cursor: pointer;
      padding: 0 10px 10px 0;
      font-size: 0;

      img {
        object-fit: cover;
        height: 160px;
        width: 100%;
        transition: .3s;
        border: 2px dashed transparent;
      }
    }

    .selected-active {

      .i-icon {
        position: absolute;
        right: 11px;
        top: 0;
      }

      &:before {
        position: absolute;
        content: '';
        right: 10px;
        top: 0;
        border-top: 16px solid rgba(24, 144, 255, 0.9);
        border-right: 16px solid rgba(24, 144, 255, 0.9);
        border-bottom: 16px solid transparent;
        border-left: 16px solid transparent;
      }

      img {
        border: 2px dashed #1890ff;
        /*box-shadow: 0 0 6px 3px rgba(24, 144, 255, 0.8);*/
      }
    }
  }

  .no-data {
    min-height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
}
</style>
