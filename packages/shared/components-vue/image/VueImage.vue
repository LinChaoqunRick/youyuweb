<template>
  <div class="vue-image-wrapper" :class="{ 'has-error': hasError }">
    <!-- 顶部slot -->
    <slot name="top" />
    <!-- 图片容器 -->
    <div
      class="image-container"
      :class="{ 'is-loading': !isLoaded }"
      :style="{ width: normalizedWidth, height: normalizedHeight }"
    >
      <img
        ref="imageRef"
        :alt="alt"
        :class="[
          'vue-image',
          {
            'is-loaded': isLoaded,
            'has-error': hasError,
          },
          props.class,
        ]"
        :src="lazy ? undefined : url"
        :placeholder="placeholder"
        @load="handleLoad"
        @error="handleError"
        @click="handleClick"
        @dblclick="handleDblclick"
      />
    </div>
    <!-- 底部slot -->
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Props {
  // 图片URL
  url: string;
  // 图片宽度，支持px或者百分比
  width?: string | number;
  // 图片高度，支持px或者百分比
  height?: string | number;
  // 是否启用懒加载，默认为true
  lazy?: boolean;
  // 图片加载失败时的替代文本
  alt?: string;
  // 图片的CSS类名
  class?: string;
  // 图片的CSS样式
  style?: Record<string, string | number>;
  // 占位图（懒加载未加载时显示）
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
  alt: '',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  load: [event: Event];
  error: [event: Event];
  dblclick: [event: MouseEvent];
}>();

const isLoaded = ref(false);
const hasError = ref(false);
const imageRef = ref<HTMLImageElement | null>(null);
const intersectionObserver = ref<IntersectionObserver | null>(null);

// 规范化宽度值
const normalizedWidth = computed(() => {
  if (props.width) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  return '152px';
});

// 规范化高度值
const normalizedHeight = computed(() => {
  if (props.height) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  // 默认与宽度相同，形成正方形
  return normalizedWidth.value;
});

// 处理图片加载
const handleLoad = (event: Event) => {
  isLoaded.value = true;
  hasError.value = false;
  emit('load', event);
};

// 处理图片加载失败
const handleError = (event: Event) => {
  hasError.value = true;
  emit('error', event);
};

// 处理图片点击
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

// 处理图片双击
const handleDblclick = (event: MouseEvent) => {
  emit('dblclick', event);
};

// 初始化懒加载
const initLazyLoad = () => {
  if (!props.lazy || !imageRef.value) return;

  intersectionObserver.value = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && imageRef.value) {
          imageRef.value.src = props.url;
          intersectionObserver.value?.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '50px',
    },
  );

  intersectionObserver.value.observe(imageRef.value);
};

onMounted(() => {
  if (props.lazy) {
    initLazyLoad();
  } else {
    // 不使用懒加载时，直接加载图片
    if (imageRef.value) {
      imageRef.value.src = props.url;
    }
  }
});

onUnmounted(() => {
  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect();
  }
});
</script>

<style scoped lang="scss">
.vue-image-wrapper {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;

  .image-container {
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    background: linear-gradient(135deg, #efefef 0%, #dcdcdc 100%);
    cursor: pointer;
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    img {
      transition: 0.3s;
    }

    &:hover {
      box-shadow: inset 0 0 20px rgb(255, 255, 255, 0.9);

      img {
        transform: scale(1.1);
      }
    }

    &::before {
      position: absolute;
      inset: 0;
      background: linear-gradient(45deg, transparent 25%, rgb(255, 255, 255, 0.25) 50%, transparent 75%);
      opacity: 0;
      pointer-events: none;
      content: '';
      transition: opacity 0.3s ease;
    }

    // 只在加载中时显示骨架屏动画
    &.is-loading::before {
      opacity: 1;
      animation: shimmer 1.2s infinite;
    }

    &.is-loading {
      background: linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%);
      background-size: 200% 100%;
      animation: skeleton 1.5s infinite;
    }
  }

  .vue-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &.is-loaded {
      opacity: 1;
    }

    &.has-error {
      opacity: 1;
    }
  }

  &.has-error {
    .image-container {
      background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
      border: 1px solid #e8e8e8;

      &:hover {
        box-shadow: inset 0 0 12px rgb(220, 53, 69, 0.12);
      }
    }

    .vue-image {
      background-color: #fafafa;
    }
  }
}

@keyframes shimmer {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}

@keyframes skeleton {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>
