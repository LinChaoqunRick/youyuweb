<template>
  <div class="progress-ring" :style="containerStyles">
    <svg class="progress-ring__svg" :width="size" :height="size">
      <circle class="progress-ring__circle progress-ring__circle--back"
              :stroke="backColor"
              :stroke-width="strokeWidth"
              :r="normalizedRadius"
              fill="none"
              :cx="radius"
              :cy="radius"
      />
      <circle class="progress-ring__circle progress-ring__circle--front"
              :stroke="frontColor"
              :stroke-width="strokeWidth"
              :stroke-dasharray="circumference"
              stroke-linejoin="round"
              stroke-linecap="round"
              :style="circleStyle"
              :r="normalizedRadius"
              fill="none"
              :cx="radius"
              :cy="radius"
      />
    </svg>
    <div class="progress-ring-content">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch, defineProps} from 'vue';

interface Props {
  value: number;
  size?: number;
  strokeWidth?: number;
  backColor?: string;
  frontColor?: string;
}

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  size: {
    type: Number,
    default: 100,
  },
  strokeWidth: {
    type: Number,
    default: 10,
  },
  backColor: {
    type: String,
    default: '#B9B9B9CC',
  },
  frontColor: {
    type: String,
    default: '#1890ff',
  },
});

const radius = ref(props.size / 2);
const normalizedRadius = ref((props.size - props.strokeWidth) / 2);
const circumference = ref(normalizedRadius.value * 2 * Math.PI);

const circleStyle = computed(() => `stroke-dashoffset: ${(circumference.value - (props.value / 100) * circumference.value)}px`);

const containerStyles = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));
</script>

<style lang="scss" scoped>
.progress-ring {
  position: relative;

  .progress-ring__svg {
    transform: rotate(-90deg);

    .progress-ring__circle--front {
      transition: all 0.3s ease;
    }
  }

  .progress-ring-content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
