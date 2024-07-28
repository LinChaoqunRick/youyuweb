<template>
  <div class="image-preview-embed">
    <div class="preview-top">
      <div class="action-item" @click="onClose">
        <i-zoom-out theme="outline" size="16" fill="currentColor"/>
        <span class="action-name">收起</span>
      </div>
      <div class="action-item" @click="onDetail">
        <i-zoom-in theme="outline" size="16" fill="currentColor"/>
        <span class="action-name">查看大图</span>
      </div>
      <div class="action-item" @click="onRotate('left')">
        <i-undo theme="outline" size="15" fill="currentColor"/>
        <span class="action-name">向左旋转</span>
      </div>
      <div class="action-item" @click="onRotate('right')">
        <i-redo theme="outline" size="15" fill="currentColor"/>
        <span class="action-name">向右旋转</span>
      </div>
    </div>
    <div class="preview-body" ref="previewBody">
      <div class="white-panel"></div>
      <transition name="toggle" mode="in-out">
        <a-spin :spinning="loading" :key="currentImage">
          <img v-if="showImage" :src="currentImage" @load="onLoad" @error="onError" @click="onClose" ref="image"/>
          <div class="reload-image" v-if="fail">
            <div class="reload-btn" @click="onReload">
              <i-refresh theme="outline" size="16" fill="currentColor"/>
              重新加载
            </div>
          </div>
        </a-spin>
      </transition>
      <div class="change-btn last-btn" title="上一张" v-if="current>0" @click="onChange('left')"></div>
      <div class="change-btn next-btn" title="下一张" v-if="current<list.length-1" @click="onChange('right')"></div>
    </div>
    <div class="preview-bottom">
      <div class="nav-list">
        <img v-for="(item, index) in list" :src="item" :class="{'active':index===current}" @click="onClick(index)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, watch, nextTick} from "vue";
  import openImage from "@/libs/tools/openImage";
  import {getImgSizeByMaxWidth, getImgSizeByMaxHeight} from "@/components/common/utils/image/utils";

  const props = defineProps({
    list: {
      type: Array<String>,
      required: true
    },
    current: {
      type: Number,
      default: 0
    }
  });
  const emit = defineEmits(['onClose'])

  const showImage = ref<boolean>(true);
  const current = ref<number>(props.current);
  const currentImage = computed(() => props.list[current.value].split("?")[0] + '?x-oss-process=style/detailThumb');
  const loading = ref<boolean>(false);
  const fail = ref<boolean>(false);
  const image = ref<HTMLImageElement | null>(null);
  const previewBody = ref<HTMLElement | null>(null);
  let rotate: number = 0, tx: number, ty: number;

  watch(() => current.value, () => {
    loading.value = true;
    fail.value = false;
  })

  const onClick = (index: number) => {
    if (current.value === index) return;
    rotate = 0;
    tx = 0;
    ty = 0;
    loading.value = true;
    current.value = index;
  }

  const onLoad = () => {
    loading.value = false;
    refreshTransform();
  }

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
  }

  const onDetail = () => {
    openImage({
      componentProps: {
        list: props.list,
        current: current.value
      }
    })
  }

  const onChange = (direction: string) => {
    if (direction === 'left') {
      current.value -= 1;
    } else {
      current.value += 1;
    }
  }

  function refreshTransform() {
    if (!image.value || !previewBody.value) return;
    const is180Multiple = Math.abs(rotate % 180) === 0;
    let result;
    if (is180Multiple) {
      result = getImgSizeByMaxWidth(image.value.naturalWidth, image.value.naturalHeight, previewBody.value.clientWidth);
    } else {
      result = getImgSizeByMaxHeight(image.value?.naturalWidth, image.value?.naturalHeight, previewBody.value.clientWidth);
    }
    image.value.style.transform = `rotate(${rotate}deg) translate3d(${tx}%, ${ty}%, 0px)`;
    image.value.style.height = `${result.height}px`;
    image.value.style.width = `${result.width}px`;
    previewBody.value.style.height = `${image.value.getBoundingClientRect().height}px`;
  }

  const onClose = () => {
    emit('onClose');
  }

  const onError = () => {
    loading.value = false;
    fail.value = true;
  }

  const onReload = () => {
    fail.value = false;
    showImage.value = false;
    nextTick(() => {
      showImage.value = true;
    })
  }
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
        color: #76797e;
        cursor: pointer;
        line-height: 32px;

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
      background-color: #f4f5f7;
      overflow: hidden;
      height: 200px;
      transition: height .2s;

      .white-panel {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        animation: bufferHide .3s linear 1;
        animation-fill-mode: forwards;
      }

      .change-btn {
        position: absolute;
        width: 30%;
        top: 0;
        bottom: 20px;
        /*background-color: skyblue;*/

        &.last-btn {
          left: 0;
          cursor: url("../../../../assets/images/cursor/cursor_left.ico"), auto;
        }

        &.next-btn {
          right: 0;
          cursor: url("../../../../assets/images/cursor/cursor_right.ico"), auto;
        }
      }

      ::v-deep(.ant-spin-nested-loading) {
        height: 100%;

        > div {
          height: 100%;

          .ant-spin {
            max-height: fit-content;
          }
        }

        .ant-spin-container {
          .reload-image {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;

            .reload-btn {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 4px 13px;
              border-radius: 20px;
              border: 2px solid var(--youyu-background1);
              cursor: pointer;
              color: #1890ff;

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
        transform-origin: top left;
        cursor: zoom-out;
      }
    }

    .preview-bottom {
      .nav-list {
        img {
          position: relative;
          box-sizing: border-box;
          opacity: .6;
          transition: .2s;
          height: 58px;
          width: 58px;
          cursor: pointer;
          overflow: hidden;
          object-fit: cover;
          margin: 4px 4px 4px 0;
          border: 2px solid transparent;

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

  @keyframes bufferHide {
    0% {
      background-color: white;
    }

    60% {
      background-color: rgba(255, 255, 255, 0.7);
    }

    99.9% {
      background-color: transparent;
    }


    100% {
      background-color: transparent;
      height: 0;
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
