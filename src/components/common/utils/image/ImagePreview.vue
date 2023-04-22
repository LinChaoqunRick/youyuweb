<template>
  <div class="image-preview">
    <div class="image-preview-operations">
      <i-sort-two theme="outline" size="19" fill="currentColor" @click="handleFlip('x')"/>
      <i-switch theme="outline" size="19" fill="currentColor" @click="handleFlip('y')"/>
      <i-rotate theme="outline" size="20" fill="currentColor" @click="handleRotate('c')"/>
      <i-rotate theme="outline" size="20" fill="currentColor" @click="handleRotate('ac')"
                style="transform: scale3d(-1,1,1)"/>
      <i-zoom-in :class="{'disabled': scale >= maxScale}" theme="outline" size="20" fill="currentColor"
                 @click="handleScale('large')"/>
      <i-zoom-out :class="{'disabled': scale <= minScale}" theme="outline" size="20" fill="currentColor"
                  @click="handleScale('small')"/>
      <i-close theme="outline" size="20" fill="currentColor"/>
    </div>
    <div class="image-preview-body">
      <div class="ope-icon last-icon">
        <i-left theme="outline" size="30" fill="#fff"/>
      </div>
      <div class="ope-icon next-icon">
        <i-left theme="outline" size="30" fill="#fff" style="transform: scale3d(-1,1,1)"/>
      </div>
      <img src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/background/cloud.jpg" @load="onLoad"
           id="preview-image"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';

  interface resultData {
    width: number,
    height: number
  }

  let image: HTMLElement | null,
    result: resultData,
    x: number = 0,
    y: number = 0,
    minScale: number = 0.4,
    maxScale: number = 12,
    flipX: boolean = false,
    flipY: boolean = false,
    rotate: number = 0,
    scaleRatio: number = 1.2,
    isPointerdown = false,
    moveDiff = {x: 0, y: 0}, // 相对于上一次pointermove移动差值
    lastPointermove = {x: 0, y: 0}; // 用于计算diff; // 按下标识;

  const scale = ref<number>(1);

  function onLoad() {
    image = document.getElementById('preview-image');
    result = getImgSize(image.naturalWidth, image.naturalHeight, window.innerWidth, window.innerHeight);
    listenWheel();
    listenDrag();
  }

  function listenWheel() {
    document.addEventListener('wheel', (e: Event) => {
      e.preventDefault();
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

      if (e.target.tagName === 'IMG') {
        // 图片的中心坐标
        const origin = {
          x: window.innerWidth * 0.5 + x,
          y: window.innerHeight * 0.5 + y
        }

        // 滚动前的x长度，y长度
        const before = {
          x: e.clientX - origin.x,
          y: e.clientY - origin.y
        }

        // 滚动后的x‘长度，y’长度
        const after = {
          x: before.x * ratio,
          y: before.y * ratio
        }

        const diff = {
          x: after.x - before.x,
          y: after.y - before.y
        }

        x -= diff.x;
        y -= diff.y;
      }
      refreshTransform();
    })
  }

  function listenDrag() {
// 绑定 pointerdown
    image.addEventListener('pointerdown', function (e) {
      isPointerdown = true;
      lastPointermove = {x: e.clientX, y: e.clientY};
    });
    // 绑定 pointermove
    image.addEventListener('pointermove', function (e) {
      if (isPointerdown) {
        const current = {x: e.clientX, y: e.clientY};
        moveDiff.x = current.x - lastPointermove.x;
        moveDiff.y = current.y - lastPointermove.y;
        lastPointermove = {x: current.x, y: current.y};
        x += moveDiff.x;
        y += moveDiff.y;
        refreshTransform();
      }
      e.preventDefault();
    });
    // 绑定 pointerup
    image.addEventListener('pointerup', function (e) {
      if (isPointerdown) {
        isPointerdown = false;
      }
    });
    // 绑定 pointercancel
    image.addEventListener('pointercancel', function (e) {
      if (isPointerdown) {
        isPointerdown = false;
      }
    });
  }

  /**
   * 获取图片缩放尺寸
   * @param {number} naturalWidth
   * @param {number} naturalHeight
   * @param {number} maxWidth
   * @param {number} maxHeight
   * @returns
   */
  function getImgSize(naturalWidth: number, naturalHeight: number, maxWidth: number, maxHeight: number) {
    const imgRatio = naturalWidth / naturalHeight;
    const maxRatio = maxWidth / maxHeight;
    let width, height;
    // 如果图片实际宽高比例 >= 显示宽高比例
    if (imgRatio >= maxRatio) {
      if (naturalWidth > maxWidth) {
        width = maxWidth;
        height = maxWidth / naturalWidth * naturalHeight;
      } else {
        width = naturalWidth;
        height = naturalHeight;
      }
    } else {
      if (naturalHeight > maxHeight) {
        width = maxHeight / naturalHeight * naturalWidth;
        height = maxHeight;
      } else {
        width = naturalWidth;
        height = naturalHeight;
      }
    }
    return {width: width, height: height}
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
    } else {
      scale.value = scale.value / scaleRatio;
      if (scale.value < minScale) {
        scale.value = minScale;
      }
    }
    refreshTransform();
  }
</script>

<style lang="scss" scoped>
  .image-preview {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .55);

    .image-preview-operations {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 46px;
      background: rgba(0, 0, 0, .4);
      z-index: 1;
      color: #fff;

      .i-icon {
        padding: 12px;
        cursor: pointer;
        transition: .3s;

        &:nth-child(n+2) {
          margin-left: 12px;
        }

        &.disabled {
          color: #9E9E9E;
        }
      }
    }

    .image-preview-body {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
        transform: scale3d(1, 1, 1);
        /*cursor: grab;*/
        transition: transform .3s cubic-bezier(.215, .61, .355, 1) 0s;
        user-select: none;
        touch-action: none;
      }

      .ope-icon {
        height: 40px;
        width: 40px;
        position: absolute;
        top: 50%;
        background-color: rgba(0, 0, 0, .1);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 1;

        &:hover {
          background-color: rgba(0, 0, 0, .2);
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
  }
</style>
