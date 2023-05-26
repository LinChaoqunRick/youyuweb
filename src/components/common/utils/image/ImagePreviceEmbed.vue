<template>
  <div class="image-preview-embed">
    <div class="preview-top">
      <div class="action-item">
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
      <a-spin :spinning="loading">
        <img :src="currentImage" @load="onLoad" ref="image"/>
      </a-spin>
    </div>
    <div class="preview-bottom">
      <div class="nav-list">
        <img v-for="(item,index) in list" :src="item" :class="{'active':index===current}" @click="onClick(index)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed} from "vue";
  import openImage from "@/libs/tools/openImage";
  import {getImgSizeByMaxWidth, getImgSizeByMaxHeight} from "@/components/common/utils/image/utils";

  const props = defineProps({
    list: {
      type: Array,
      required: true
    },
    current: {
      type: Number,
      default: 0
    }
  })

  const current = ref<number>(props.current);
  const currentImage = computed(() => props.list[current.value].split("?")[0] + '?x-oss-process=style/detailThumb');
  const loading = ref<boolean>(false);
  const image = ref<HTMLElement>(null);
  const previewBody = ref<HTMLElement>(null);
  let rotate: number = 0, tx: number, ty: number;

  const onClick = (index) => {
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

  function refreshTransform() {
    const is180Multiple = Math.abs(rotate % 180) === 0;
    let result;
    if (is180Multiple) {
      result = getImgSizeByMaxWidth(image.value.naturalWidth, image.value.naturalHeight, previewBody.value.clientWidth);
    } else {
      result = getImgSizeByMaxHeight(image.value.naturalWidth, image.value.naturalHeight, previewBody.value.clientWidth);
    }
    console.log(result);
    image.value.style.transform = `rotate(${rotate}deg) translate3d(${tx}%, ${ty}%, 0px)`;
    previewBody.value.style.height = `${image.value.getBoundingClientRect().height}px`;
  }
</script>

<style lang="scss" scoped>
  .image-preview-embed {
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
      background-color: #f4f5f7;
      /*overflow: hidden;*/
      transition: height .2s;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transform-origin: top left;
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
</style>
