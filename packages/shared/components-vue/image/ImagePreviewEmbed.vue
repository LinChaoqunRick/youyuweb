<template>
  <div class="image-preview-embed">
    <div class="preview-top">
      <div class="action-item" @click="onClose">
        <i-zoom-out theme="outline" size="16" fill="currentColor" />
        <span class="action-name">收起</span>
      </div>
      <div class="action-item" @click="onDetail">
        <i-zoom-in theme="outline" size="16" fill="currentColor" />
        <span class="action-name">查看大图</span>
      </div>
      <div class="action-item" @click="onRotate('left')">
        <i-undo theme="outline" size="15" fill="currentColor" />
        <span class="action-name">向左旋转</span>
      </div>
      <div class="action-item" @click="onRotate('right')">
        <i-redo theme="outline" size="15" fill="currentColor" />
        <span class="action-name">向右旋转</span>
      </div>
    </div>
    <div ref="previewBody" class="preview-body">
      <transition name="toggle" mode="in-out">
        <a-spin :key="currentImage" :spinning="loading">
          <img
            v-if="showImage"
            ref="image"
            :src="currentImage"
            alt=""
            @load="onLoad"
            @error="onError"
            @progress="onProgress"
            @click="onClose"
          />
          <div v-if="fail" class="reload-image">
            <div class="reload-btn" @click="onReload">
              <i-refresh theme="outline" size="16" fill="currentColor" />
              重新加载
            </div>
          </div>
        </a-spin>
      </transition>
      <div v-if="current > 0" class="change-btn last-btn" title="上一张" @click="onChange('left')" />
      <div v-if="current < list.length - 1" class="change-btn next-btn" title="下一张" @click="onChange('right')" />
    </div>
    <div class="preview-bottom">
      <div class="nav-list">
        <img
          v-for="(item, index) in list"
          :key="index"
          :src="item"
          alt=""
          :class="{ active: index === current }"
          @click="onClick(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import openImage from '../../vue-hooks/openImage';
import { getImgSizeByMaxWidth, getImgSizeByMaxHeight } from './utils.ts';

const props = defineProps({
  list: {
    type: Array<String>,
    required: true,
  },
  current: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['onClose']);

const showImage = ref<boolean>(true);
const current = ref<number>(props.current);
const currentImage = computed(() => props.list[current.value].split('?')[0] /*+ '?x-oss-process=style/detailThumb'*/);
const loading = ref<boolean>(true);
const fail = ref<boolean>(false);
const image = ref<HTMLImageElement | null>(null);
const previewBody = ref<HTMLElement | null>(null);
let rotate: number = 0,
  tx: number,
  ty: number;

watch(
  () => current.value,
  () => {
    loading.value = true;
    fail.value = false;
  },
);

const onClick = (index: number) => {
  if (current.value === index) return;
  rotate = 0;
  tx = 0;
  ty = 0;
  loading.value = true;
  current.value = index;
};

const onLoad = () => {
  loading.value = false;
  refreshTransform();
};

const onProgress = () => {
  console.log(111);
};

const onRotate = (direction: string) => {
  if (direction === 'left') {
    rotate -= 90;
  } else if (direction === 'right') {
    rotate += 90;
  }
  const remainder = rotate % 360;
  if (Math.abs(remainder) === 0) {
    tx = 0;
    ty = 0;
  } else if (Math.abs(remainder) === 270) {
    if (remainder >= 0) {
      tx = -100;
      ty = 0;
    } else {
      tx = 0;
      ty = -100;
    }
  } else if (Math.abs(remainder) === 180) {
    tx = -100;
    ty = -100;
  } else {
    if (remainder >= 0) {
      tx = 0;
      ty = -100;
    } else {
      tx = -100;
      ty = 0;
    }
  }
  refreshTransform();
};

const onDetail = () => {
  openImage({
    componentProps: {
      list: props.list,
      current: current.value,
    },
  });
};

const onChange = (direction: string) => {
  if (direction === 'left') {
    current.value -= 1;
  } else {
    current.value += 1;
  }
};

function refreshTransform() {
  if (!image.value || !previewBody.value) return;
  const is180Multiple = Math.abs(rotate % 180) === 0;
  let result;
  if (is180Multiple) {
    result = getImgSizeByMaxWidth(image.value.naturalWidth, image.value.naturalHeight, previewBody.value.clientWidth);
  } else {
    result = getImgSizeByMaxHeight(
      image.value?.naturalWidth,
      image.value?.naturalHeight,
      previewBody.value.clientWidth,
    );
  }
  image.value.style.transform = `rotate(${rotate}deg) translate3d(${tx}%, ${ty}%, 0px)`;
  image.value.style.height = `${result.height}px`;
  image.value.style.width = `${result.width}px`;
  previewBody.value.style.height = `${image.value.getBoundingClientRect().height}px`;
}

const onClose = () => {
  emit('onClose');
};

const onError = () => {
  loading.value = false;
  fail.value = true;
};

const onReload = () => {
  fail.value = false;
  showImage.value = false;
  nextTick(() => {
    showImage.value = true;
  });
};
</script>

<style lang="scss" scoped>
.image-preview-embed {
  position: relative;
  user-select: none;

  .preview-top {
    display: flex;
    align-items: center;
    height: 32px;
    background-color: var(--youyu-body-background-4);
    user-select: none;

    .action-item {
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      font-size: 13px;
      line-height: 32px;
      color: #76797e;
      cursor: pointer;

      .i-icon {
        position: relative;
        top: 1px;
      }

      .action-name {
        margin-left: 3px;
      }
    }
  }

  .preview-body {
    position: relative;
    height: 200px;
    overflow: hidden;
    background-color: #f4f5f7;
    transition: height 0.2s;

    .change-btn {
      position: absolute;
      top: 0;
      bottom: 20px;
      width: 30%;

      /* background-color: skyblue; */

      &.last-btn {
        left: 0;
        cursor: url('../../../../apps/web/src/assets/images/cursor/cursor_left.ico'), auto;
      }

      &.next-btn {
        right: 0;
        cursor: url('../../../../apps/web/src/assets/images/cursor/cursor_right.ico'), auto;
      }
    }

    ::v-deep(.ant-spin-nested-loading) {
      height: 100%;

      > div {
        height: 100%;

        .ant-spin {
          height: 100%;
          max-height: 100%;
        }
      }

      .ant-spin-container {
        .reload-image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;

          .reload-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 13px;
            color: #1890ff;
            border: 2px solid var(--youyu-background1);
            border-radius: 20px;
            cursor: pointer;

            &:hover {
              background-color: var(--youyu-background2);
            }

            .i-icon {
              margin-right: 4px;
            }
          }
        }
      }
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      cursor: zoom-out;
      transform-origin: top left;
    }
  }

  .preview-bottom {
    .nav-list {
      img {
        position: relative;
        box-sizing: border-box;
        width: 58px;
        height: 58px;
        margin: 4px 4px 4px 0;
        overflow: hidden;
        object-fit: cover;
        border: 2px solid transparent;
        opacity: 0.6;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
          border-color: #027fff;
          opacity: 1;
        }
      }

      .active {
        border-color: #027fff;
        opacity: 1;
      }
    }
  }
}

.toggle-enter-active,
.toggle-leave-active {
  transition: opacity 0.05s;
}

.toggle-enter-from,
.toggle-leave-to {
  opacity: 0.95;
}
</style>
