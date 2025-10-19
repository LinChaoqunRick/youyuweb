<template>
  <div class="image-preview fullscreen-mask" :class="{ 'single-image': isSingleImage }">
    <div class="image-preview-close" @click="onClose">
      <i-close theme="outline" size="20" fill="currentColor" />
    </div>
    <div ref="imagePreviewBodyRef" class="image-preview-body">
      <div v-if="current !== 0" class="ope-icon last-icon" @click="handleChange('last')">
        <i-left theme="outline" size="30" fill="#fff" />
      </div>
      <div v-if="current !== props.list?.length - 1" class="ope-icon next-icon" @click="handleChange('next')">
        <i-left theme="outline" size="30" fill="#fff" style="transform: scale3d(-1, 1, 1)" />
      </div>
      <div id="preview-image">
        <img v-show="!loading" :src="currentOriginUrl" alt="photo" @load="onLoad" />
        <div class="drag-mask" />
      </div>
    </div>
    <spin v-show="loading" size="large" class="a-spin" />
    <Transition name="fade">
      <div v-if="!idle" class="image-preview-operations">
        <div class="operation-item">
          <i-left
            :class="{ disabled: current === 0 }"
            theme="outline"
            size="22"
            fill="currentColor"
            @click="handleChange('last')"
          />
          <div class="image-preview-progress">{{ current + 1 }} / {{ props.list.length }}</div>
          <i-right
            :class="{ disabled: current === props.list?.length - 1 }"
            class="separator"
            theme="outline"
            size="22"
            fill="currentColor"
            @click="handleChange('next')"
          />
        </div>
        <div class="operation-item">
          <i-zoom-in
            :class="{ disabled: scale >= maxScale }"
            theme="outline"
            size="19"
            fill="currentColor"
            @click="handleScale('large')"
          />
          <div class="image-preview-scale">{{ (scale * 100).toFixed(0) }}%</div>
          <i-zoom-out
            :class="{ disabled: scale <= minScale }"
            theme="outline"
            size="19"
            fill="currentColor"
            @click="handleScale('small')"
          />
          <i-one-to-one theme="outline" size="19" fill="currentColor" @click="handleScale('reset')" />
        </div>
        <div v-if="false" class="operation-item">
          <i-sort-two theme="outline" size="17" fill="currentColor" @click="handleFlip('x')" />
          <i-switch theme="outline" size="17" fill="currentColor" @click="handleFlip('y')" />
        </div>
        <div class="operation-item">
          <i-rotate class="icon-rotate-left" theme="outline" size="18" fill="currentColor" @click="handleRotate('c')" />
          <i-rotate
            class="icon-rotate-right"
            theme="outline"
            size="18"
            fill="currentColor"
            style="transform: scale3d(-1, 1, 1)"
            @click="handleRotate('ac')"
          />
          <!--        <i-more theme="outline" size="19"/>-->
        </div>
      </div>
    </Transition>
    <div v-if="!isSingleImage" class="image-preview-footer">
      <div ref="imageThumbnailRef" class="image-thumbnails" :class="{ 'flex-box': isThumbsOverScreen }">
        <div
          v-for="(item, index) in props.list"
          :key="item"
          class="image-item-thumbnail"
          :class="{ active: index === current }"
          @click="onClickThumbnail(index)"
        >
          <img :src="item" alt="" draggable="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useEventListener, useIdle, usePointerSwipe, useScrollLock } from '@vueuse/core';
import { Spin } from 'ant-design-vue';
import { convertHEICUrlToBlob } from '../../utils';

const props = defineProps({
  list: {
    type: Array<string>,
    required: true,
  },
  originTransfer: {
    type: Function,
    default: null,
  },
});
const emit = defineEmits(['onClose']);
const current = defineModel('current', { type: Number, default: 0 });
const { idle } = useIdle(2 * 1000);
const isLocked = useScrollLock(document.body);

let image: HTMLElement,
  x: number = 0,
  y: number = 0,
  minScale: number = 0.2,
  maxScale: number = 8,
  flipX: boolean = false,
  flipY: boolean = false,
  rotate: number = 0,
  scaleRatio: number = 1.1,
  isPointerdown = false, // 按下标识;
  moveDiff = { x: 0, y: 0 }, // 相对于上一次pointermove移动差值
  lastPointermove = { x: 0, y: 0 }; // 用于计算diff;

const loading = ref<boolean>(true);
const scale = ref<number>(1);
const currentOriginUrl = ref<string>();
const isSingleImage = computed(() => props.list?.length === 1);
const imagePreviewBodyRef = ref<HTMLElement | null>(null);
const imageThumbnailRef = ref<HTMLElement | null>(null);
const documentClientWidth = document.body.clientWidth;
let imageThumbnailWidth = ref(0);
const isSwiping = ref<boolean>(false);
const isThumbsOverScreen = computed(() => {
  return props.list?.length * imageThumbnailWidth.value < documentClientWidth;
});

onMounted(() => {
  const firstItem = document.getElementsByClassName('image-item-thumbnail')[0] as HTMLImageElement;
  imageThumbnailWidth.value = firstItem?.offsetWidth ?? 0;
});

const handleFooterScroll = () => {
  if (props.list?.length <= 1) return;
  const halfDocumentClientWidth = documentClientWidth / 2;
  const currentOffset = current.value * imageThumbnailWidth.value;
  if (!imageThumbnailRef.value) {
    return;
  }
  if (currentOffset > halfDocumentClientWidth) {
    imageThumbnailRef.value.scrollLeft = currentOffset + imageThumbnailWidth.value / 2 - halfDocumentClientWidth;
  } else {
    imageThumbnailRef.value.scrollLeft = 0;
  }
};

function refreshTransform() {
  if (image) {
    image.style.transform = `translate3d(${x}px, ${y}px, 0px) scale3d(${flipY ? -scale.value : scale.value}, ${
      flipX ? -scale.value : scale.value
    }, 1) rotate(${rotate}deg)`;
  }
}

function listenWheel() {
  useEventListener(imagePreviewBodyRef, 'wheel', (e: WheelEvent) => {
    let ratio = scaleRatio;
    // 缩小
    if (e.deltaY > 0) {
      ratio = 1 / scaleRatio;
    }
    const _scale = scale.value * ratio;
    if (_scale > maxScale) {
      ratio = maxScale / scale.value;
      scale.value = maxScale;
    } else if (_scale < minScale) {
      ratio = minScale / scale.value;
      scale.value = minScale;
    } else {
      scale.value = _scale;
    }

    if ((e.target as HTMLElement)?.className.includes('drag-mask')) {
      // 图片的中心坐标
      const origin = {
        x: window.innerWidth * 0.5 + x,
        y: (window.innerHeight - (imageThumbnailRef.value ? 80 : 0)) * 0.5 + y,
      };

      // 滚动前的x长度，y长度
      const before = {
        x: e.clientX - origin.x,
        y: e.clientY - origin.y,
      };

      // 滚动后的x‘长度，y’长度
      const after = {
        x: before.x * ratio,
        y: before.y * ratio,
      };

      // 计算差值
      const diff = {
        x: after.x - before.x,
        y: after.y - before.y,
      };

      x -= diff.x;
      y -= diff.y;
    }
    refreshTransform();
  });
}

function listenDrag() {
  // 绑定 pointerdown
  useEventListener(image, 'pointerdown', function (e: PointerEvent) {
    isPointerdown = true;
    image.setPointerCapture(e.pointerId);
    lastPointermove = { x: e.clientX, y: e.clientY };
  });
  // 绑定 pointermove
  useEventListener(image, 'pointermove', function (e: PointerEvent) {
    if (isPointerdown) {
      const current = { x: e.clientX, y: e.clientY };
      moveDiff.x = current.x - lastPointermove.x;
      moveDiff.y = current.y - lastPointermove.y;
      lastPointermove = { x: current.x, y: current.y };
      x += moveDiff.x;
      y += moveDiff.y;
      refreshTransform();
    }
    e.preventDefault();
  });
  // 绑定 pointerup
  useEventListener(image, 'pointerup', function (e) {
    if (isPointerdown) {
      isPointerdown = false;
    }
  });
  // 绑定 pointercancel
  useEventListener(image, 'pointercancel', function (e) {
    if (isPointerdown) {
      isPointerdown = false;
    }
  });
}

function refreshData() {
  x = 0;
  y = 0;
  flipX = false;
  flipY = false;
  rotate = 0;
  moveDiff = { x: 0, y: 0 }; // 相对于上一次pointermove移动差值
  lastPointermove = { x: 0, y: 0 }; // 用于计算diff;
  scale.value = 1;

  refreshTransform();
}

watch(
  () => current.value,
  async () => {
    loading.value = true;
    currentOriginUrl.value = props.originTransfer
      ? await props.originTransfer(current.value)
      : props.list[current.value].split('?')[0];

    const fileNameArr = currentOriginUrl.value!.split('.');
    const suffix = fileNameArr[fileNameArr.length - 1];

    if (suffix.toLowerCase() === 'heic') {
      currentOriginUrl.value = await convertHEICUrlToBlob(currentOriginUrl.value as string);
    }

    handleFooterScroll();
  },
  { immediate: true },
);

function initListen() {
  image = document.getElementById('preview-image')!;
  listenWheel();
  listenDrag();
}

function onLoad() {
  loading.value = false;
  if (!image) {
    initListen();
  }
  refreshData();
}

function handleFlip(dir: string) {
  if (dir === 'x') {
    flipX = !flipX;
  } else {
    flipY = !flipY;
  }
  refreshTransform();
}

function handleRotate(dir: string) {
  if (dir === 'c') {
    rotate -= 90;
  } else {
    rotate += 90;
  }
  refreshTransform();
}

function handleScale(dir: string) {
  if (dir === 'large') {
    scale.value = scale.value * scaleRatio;
    if (scale.value > maxScale) {
      scale.value = maxScale;
    }
  } else if (dir === 'small') {
    scale.value = scale.value / scaleRatio;
    if (scale.value < minScale) {
      scale.value = minScale;
    }
  } else if (dir === 'reset') {
    refreshData();
  }
  refreshTransform();
}

function handleChange(type: string) {
  if (type === 'last') {
    current.value -= 1;
    if (current.value <= 0) {
      current.value = 0;
    }
  } else {
    current.value += 1;
    if (current.value > props.list.length - 1) {
      current.value = props.list.length - 1;
    }
  }
}

function onClose() {
  emit('onClose');
}

const onClickThumbnail = (index: number) => {
  console.log(isSwiping.value);

  if (isSwiping.value) {
    return;
  }
  if (imageThumbnailRef.value) {
    imageThumbnailRef.value.style.scrollBehavior = 'smooth';
  }
  current.value = index;
};

let swipeStartScrollLeft = 0;
const { distanceX } = usePointerSwipe(imageThumbnailRef, {
  onSwipe() {
    isSwiping.value = true;
    if (imageThumbnailRef.value) {
      imageThumbnailRef.value.scrollLeft = swipeStartScrollLeft + distanceX.value;
    }
  },
  onSwipeStart() {
    if (imageThumbnailRef.value) {
      imageThumbnailRef.value.style.scrollBehavior = 'unset';
      swipeStartScrollLeft = imageThumbnailRef.value.scrollLeft;
    }
  },
  onSwipeEnd() {
    setTimeout(() => {
      isSwiping.value = false;
    }, 50);
  },
});

isLocked.value = true;

onUnmounted(() => {
  isLocked.value = false;
});
</script>

<style lang="scss" scoped>
$icon-hover-background: rgb(89, 82, 82, 0.8);
$footerHeight: 80px;

.image-preview {
  position: fixed;
  inset: 0;
  z-index: 1000;

  .image-preview-close {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgb(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      background: $icon-hover-background;
    }

    .i-icon {
      font-weight: bold;
      color: #fff;
    }
  }

  .image-preview-body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    #preview-image {
      position: relative;
      top: calc(-#{$footerHeight} / 2);
      line-height: 0;
      touch-action: none;
      user-select: none;
      //cursor: grab;
      transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
      transform: scale3d(1, 1, 1);

      img {
        max-width: 100vw;
        max-height: calc(100vh - $footerHeight);
      }

      .drag-mask {
        position: absolute;
        inset: 0;
      }
    }

    .ope-icon {
      position: absolute;
      top: calc(50% - #{$footerHeight} / 2 - 20px);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background: rgb(0, 0, 0, 0.2);
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        background-color: $icon-hover-background;
      }
    }

    .last-icon {
      left: 20px;

      .i-icon {
        position: relative;
      }
    }

    .next-icon {
      right: 20px;

      .i-icon {
        position: relative;
        left: 2px;
      }
    }
  }

  .a-spin {
    position: absolute;
    top: calc(50% - 16px);
    left: calc(50% - 16px);
  }

  .image-preview-operations {
    position: absolute;
    bottom: 90px;
    left: 50%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 46px;
    color: #fff;
    background: rgb(0, 0, 0, 0.3);
    border-radius: 6px;
    user-select: none;
    transform: translateX(-50%);

    .operation-item {
      display: flex;
      align-items: center;

      &:nth-child(n + 2) {
        &::before {
          height: 20px;
          border-left: 1px solid hsl(0deg, 0%, 100%, 0.3);
          cursor: default;
          content: '';
        }
      }
    }

    .i-icon {
      padding: 3px;
      margin: 0 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: $icon-hover-background;
      }

      &.disabled {
        color: #9e9e9e;
        background-color: transparent;
        cursor: not-allowed;
      }

      &.i-icon-one-to-one,
      &.i-icon-more,
      &.icon-rotate-right {
        margin-left: 0;
      }
    }

    .image-preview-scale {
      width: 35px;
      text-align: center;
    }
  }

  .image-preview-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: $footerHeight;
    background-color: rgb(0, 0, 0, 0.2);
    user-select: none;

    .image-thumbnails {
      height: 100%;
      overflow: auto hidden;
      white-space: nowrap;
      scroll-behavior: smooth;

      &.flex-box {
        display: flex;
        justify-content: center;
      }

      &::-webkit-scrollbar {
        display: none;
      }

      .image-item-thumbnail {
        display: inline-block;
        height: 80px;
        filter: brightness(60%);
        border: 2px solid transparent;

        img {
          box-sizing: border-box;
          width: 105px;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }

        &.active {
          filter: brightness(100%);
          border: 2px solid #1890ff;
        }
      }
    }
  }
}

.single-image {
  #preview-image {
    top: 0 !important;
  }

  .image-preview-operations {
    bottom: 35px !important;
  }
}
</style>
