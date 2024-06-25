<template>
  <div class="image-item" :style="computedRootStyle">
    <img :src="data.thumb || data" alt=""/>
    <div class="image-delete" @click="onImageDelete">
      <i-close theme="outline" size="10" fill="currentColor" :strokeWidth="2" />
    </div>
    <div class="progress-wrapper">
      <Transition name="fade" mode="out-in">
        <i-check-one v-if="!data.thumb || progress===100" theme="filled" size="36"
                     fill="#52C41ACC" />
        <CircleProgress v-else-if="progress>=0" :value="computedProgress ?? 0" :size="36" :stroke-width="3.8">
          <i-up-small theme="outline" size="24" fill="#FFFFFF" />
        </CircleProgress>
        <i-caution v-else-if="progress===-1" theme="filled" size="36"
                   fill="#FF0000CC" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import CircleProgress from '@/components/common/share/upload/CircleProgress.vue';
import { computed } from 'vue';

const emit = defineEmits(['onImageDelete']);

const props = defineProps({
  data: {
    type: [String, Object],
    required: true
  },
  progress: {
    type: Number,
    default: -2
  },
  height: {
    type: Number,
    default: 80
  },
  width: {
    type: Number,
    default: 80
  }
});

const computedRootStyle = computed(() => `height: ${props.height}px;width: ${props.width}px;`);

const computedProgress = computed(() => {
  if (props.progress < 0) {
    return 0;
  } else if (props.progress > 100) {
    return 100;
  } else {
    return props.progress;
  }
});

const onImageDelete = () => {
  emit('onImageDelete', props.data);
};
</script>

<style scoped lang="scss">
.image-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 8px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .image-delete {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 50%;
    border: 1px solid #c5c5c5;
    background: rgba(0, 0, 0, 0.4);

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    .i-icon {
      color: white;
    }
  }

  .progress-wrapper {
    position: absolute;
  }
}
</style>
