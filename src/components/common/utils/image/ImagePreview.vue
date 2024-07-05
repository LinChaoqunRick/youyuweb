<template>
  <div class="image-preview fullscreen-mask" :class="{'single-image': isSingleImage}">
    <div class="image-preview-close" @click="onClose">
      <i-close theme="outline" size="20" fill="currentColor" />
    </div>
    <div class="image-preview-body" ref="imagePreviewBodyRef">
      <div class="ope-icon last-icon" v-if="current!==0" @click="handleChange('last')">
        <i-left theme="outline" size="30" fill="#fff" />
      </div>
      <div class="ope-icon next-icon" v-if="current!==props.list?.length-1" @click="handleChange('next')">
        <i-left theme="outline" size="30" fill="#fff" style="transform: scale3d(-1,1,1)" />
      </div>
      <div id="preview-image">
        <img :src="currentOriginUrl" @load="onLoad" v-show="!loading" alt="photo" />
        <div class="drag-mask"></div>
      </div>
    </div>
    <spin size="large" class="a-spin" v-show="loading" />
    <Transition name="fade">
      <div class="image-preview-operations" v-if="!idle">
        <div class="operation-item">
          <i-left :class="{'disabled': current===0}" theme="outline" size="22" fill="currentColor"
                  @click="handleChange('last')" />
          <div class="image-preview-progress">{{ current + 1 }} / {{ props.list.length }}</div>
          <i-right :class="{'disabled': current===props.list?.length-1}" class="separator" theme="outline" size="22"
                   fill="currentColor" @click="handleChange('next')" />
        </div>
        <div class="operation-item">
          <i-zoom-in :class="{'disabled': scale >= maxScale}" theme="outline" size="19" fill="currentColor"
                     @click="handleScale('large')" />
          <div class="image-preview-scale">{{ (scale * 100).toFixed(0) }}%</div>
          <i-zoom-out :class="{'disabled': scale <= minScale}" theme="outline" size="19" fill="currentColor"
                      @click="handleScale('small')" />
          <i-one-to-one theme="outline" size="19" fill="currentColor" @click="handleScale('reset')" />
        </div>
        <div class="operation-item" v-if="false">
          <i-sort-two theme="outline" size="17" fill="currentColor" @click="handleFlip('x')" />
          <i-switch theme="outline" size="17" fill="currentColor" @click="handleFlip('y')" />
        </div>
        <div class="operation-item">
          <i-rotate class="icon-rotate-left" theme="outline" size="18" fill="currentColor" @click="handleRotate('c')" />
          <i-rotate class="icon-rotate-right" theme="outline" size="18" fill="currentColor" @click="handleRotate('ac')"
                    style="transform: scale3d(-1,1,1)" />
          <!--        <i-more theme="outline" size="19"/>-->
        </div>
      </div>
    </Transition>
    <div class="image-preview-footer" v-if="!isSingleImage">
      <div class="image-thumbnails" ref="imageThumbnailRef">
        <div v-for="(item, index) in props.list"
             class="image-item-thumbnail"
             :class="{'active': index === current}"
             @click="onClickThumbnail(index)">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineModel, onMounted, onUnmounted, ref, watch } from 'vue';
import { getImgSize } from '@/components/common/utils/image/utils';
import { disabledBodyScroll, enabledBodyScroll } from '@/assets/utils/utils.ts';
import { Spin } from 'ant-design-vue';
import { useIdle } from '@vueuse/core';

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  originTransfer: {
    type: Function
  }
});
const emit = defineEmits(['onClose']);
const current = defineModel('current', { type: Number, default: 0 });
const { idle } = useIdle(2 * 1000);

interface resultData {
  width: number,
  height: number
}

let image: HTMLElement,
  result: resultData,
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
let imageThumbnailWidth = 0;

onMounted(() => {
  imageThumbnailWidth = document.getElementsByClassName('image-item-thumbnail')[0].offsetWidth;
});

watch(() => current.value, async () => {
  loading.value = true;
  currentOriginUrl.value = props.originTransfer ? await props.originTransfer(current.value) : props.list[current.value].split('?')[0];
  handleFooterScroll();
}, { immediate: true });

const handleFooterScroll = () => {
  const halfDocumentClientWidth = documentClientWidth / 2;
  const currentOffset = current.value * imageThumbnailWidth;
  if (currentOffset > halfDocumentClientWidth) {
    imageThumbnailRef!.value.scrollLeft = (currentOffset + imageThumbnailWidth / 2) - halfDocumentClientWidth;
  } else {
    imageThumbnailRef!.value.scrollLeft = 0;
  }
};

function initListen() {
  image = document.getElementById('preview-image');
  listenWheel();
  listenDrag();
}

function onLoad() {
  loading.value = false;
  if (!image) {
    initListen();
  }
  refreshData();
  result = getImgSize(image.naturalWidth, image.naturalHeight, window.innerWidth, window.innerHeight);
}

function listenWheel() {
  imagePreviewBodyRef.value?.addEventListener('wheel', (e: MouseEvent) => {
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

    if (e?.target.className.includes('drag-mask')) {
      // 图片的中心坐标
      const origin = {
        x: window.innerWidth * 0.5 + x,
        y: (window.innerHeight - 80) * 0.5 + y
      };

      // 滚动前的x长度，y长度
      const before = {
        x: e.clientX - origin.x,
        y: e.clientY - origin.y
      };

      // 滚动后的x‘长度，y’长度
      const after = {
        x: before.x * ratio,
        y: before.y * ratio
      };

      // 计算差值
      const diff = {
        x: after.x - before.x,
        y: after.y - before.y
      };

      x -= diff.x;
      y -= diff.y;
    }
    refreshTransform();
  });
}

function listenDrag() {
// 绑定 pointerdown
  image.addEventListener('pointerdown', function(e) {
    isPointerdown = true;
    image.setPointerCapture(e.pointerId);
    lastPointermove = { x: e.clientX, y: e.clientY };
  });
  // 绑定 pointermove
  image.addEventListener('pointermove', function(e) {
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
  image.addEventListener('pointerup', function(e) {
    if (isPointerdown) {
      isPointerdown = false;
    }
  });
  // 绑定 pointercancel
  image.addEventListener('pointercancel', function(e) {
    if (isPointerdown) {
      isPointerdown = false;
    }
  });
}

function refreshTransform() {
  if (image) {
    image.style.transform = `translate3d(${x}px, ${y}px, 0px) scale3d(${flipY ? -scale.value : scale.value}, ${flipX ? -scale.value : scale.value}, 1) rotate(${rotate}deg)`;
  }
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

function onClose() {
  emit('onClose');
}

const onClickThumbnail = (index: number) => {
  current.value = index;
};

disabledBodyScroll();

onUnmounted(() => {
  enabledBodyScroll();
});

</script>

<style lang="scss" scoped>
$icon-hover-background: rgba(89, 82, 82, 0.8);
$footerHeight: 80px;

.image-preview {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  .image-preview-close {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .2);
    cursor: pointer;
    z-index: 1;

    &:hover {
      background: $icon-hover-background;
    }

    .i-icon {
      color: #fff;
      font-weight: bold;
    }
  }

  .image-preview-body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    #preview-image {
      position: relative;
      top: calc(-#{$footerHeight} / 2);
      transform: scale3d(1, 1, 1);
      //cursor: grab;
      transition: transform .3s cubic-bezier(.215, .61, .355, 1) 0s;
      user-select: none;
      touch-action: none;
      line-height: 0;

      img {
        max-width: 100vw;
        max-height: calc(100vh - $footerHeight);
      }

      .drag-mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }

    .ope-icon {
      height: 40px;
      width: 40px;
      position: absolute;
      top: calc(50% - #{$footerHeight} / 2 - 20px);
      background: rgba(0, 0, 0, .2);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 1;

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
    left: calc(50% - 16px);
    top: calc(50% - 16px);
  }

  .image-preview-operations {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    bottom: 90px;
    height: 46px;
    background: rgba(0, 0, 0, .3);
    z-index: 1;
    color: #fff;
    border-radius: 6px;
    transform: translateX(-50%);
    left: 50%;
    user-select: none;

    .operation-item {
      display: flex;
      align-items: center;

      &:nth-child(n+2) {
        &:before {
          content: "";
          border-left: 1px solid hsla(0, 0%, 100%, 0.3);;
          cursor: default;
          height: 20px;
        }
      }
    }

    .i-icon {
      cursor: pointer;
      transition: .3s;
      margin: 0 12px;
      border-radius: 4px;
      padding: 3px;

      &:hover {
        background: $icon-hover-background;
      }

      &.disabled {
        color: #9E9E9E;
        cursor: not-allowed;
        background-color: transparent;
      }

      &.i-icon-one-to-one, &.i-icon-more, &.icon-rotate-right {
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
    left: 0;
    right: 0;
    bottom: 0;
    height: $footerHeight;
    background-color: rgba(0, 0, 0, .2);

    .image-thumbnails {
      white-space: nowrap;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;

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
          height: 100%;
          width: 105px;
          cursor: pointer;
          object-fit: cover;
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
