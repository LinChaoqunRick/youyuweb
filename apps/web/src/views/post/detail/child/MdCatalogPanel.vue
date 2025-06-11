<template>
  <div class="md-catalog-panel">
    <div class="fold-panel">
      <div class="switch" @click="handleShow" v-show="!move">
        <i-list-middle theme="outline" size="20" fill="currentColor" :strokeWidth="3" />
      </div>
      <div v-show="show" class="md-catalog-wrapper" :class="{ fixed: move, dragging: isDragging }" ref="mdCatalogWrapperRef">
        <div ref="handle" class="catalog-title">
          <div class="header-title">
            <i-list-middle theme="outline" :strokeWidth="3" size="18" fill="currentColor" />
            目录
          </div>
          <div class="move-switch" @click="onMove">
            <i-drag theme="outline" :strokeWidth="3" size="14" fill="#141414" />
          </div>
        </div>
        <div class="catalog-body youyu-scrollbar">
          <md-catalog
            :editor-id="editorId"
            :scroll-element="scrollElement"
            :offsetTop="80"
            :scrollElementOffsetTop="headerClientHeight"
            :mdHeadingId="createMdHeadingId"
            @onClick="onHeadingClick"
            ref="mdCatalogRef"
          />
        </div>
        <div class="resize-handler resize-n"></div>
        <div class="resize-handler resize-s"></div>
        <div class="resize-handler resize-w"></div>
        <div class="resize-handler resize-e"></div>
        <div class="resize-handler resize-nw"></div>
        <div class="resize-handler resize-ne"></div>
        <div class="resize-handler resize-se"></div>
        <div class="resize-handler resize-sw"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useDraggable } from '@vueuse/core';
import { MdCatalog } from 'md-editor-v3';
import { getElementTop, getElementLeft, scrollToAnchor, keepScrollTop } from '@/assets/utils/utils';
import { createMdHeadingId } from '@/components/content/mdEditor/utils';
import type { TocItem } from 'md-editor-v3/lib/types/MdCatalog/MdCatalog';

const props = defineProps({
  editorId: {
    type: String,
    default: 'post-content',
  },
});

const mdCatalogWrapperRef = ref<HTMLElement | null>(null);
const mdCatalogRef = ref<typeof MdCatalog | null>(null);
const handle = ref<HTMLElement | null>(null);
const move = ref<boolean>(false);
const show = ref<boolean>(false);
const scrollElement = document.documentElement;
const headerClientHeight = ref<number>(0);
let initOffsetWidth = 0;
const minWidth = 120;
const minHeight = 120;

const handleShow = () => {
  show.value = !show.value;
  nextTick(() => {
    !initOffsetWidth && (initOffsetWidth = mdCatalogWrapperRef.value?.offsetWidth);
  });
};

const { position, isDragging, style } = useDraggable(mdCatalogWrapperRef, { handle });

watch(
  () => style.value,
  newVal => {
    const mdCatalogWrapper = mdCatalogWrapperRef.value;
    if (!mdCatalogWrapper) return;
    if (move.value) {
      if (position.value.x >= 0 && position.value.x + mdCatalogWrapper.offsetWidth <= document.body.offsetWidth) {
        mdCatalogWrapper.style.left = `${position.value.x}px`;
      }
      if (position.value.y >= 0 && position.value.y + mdCatalogWrapper.offsetHeight <= document.body.offsetHeight) {
        mdCatalogWrapper.style.top = `${position.value.y}px`;
      }
    }
  }
);

const onMove = (e: Event) => {
  const mdCatalogWrapper = mdCatalogWrapperRef.value;
  if (!mdCatalogWrapper) return;
  move.value = !move.value;
  if (move.value) {
    mdCatalogWrapper.style.left = `${getElementLeft(mdCatalogWrapper) ?? 0}px`;
    mdCatalogWrapper.style.top = `${getElementTop(mdCatalogWrapper) ?? 0}px`;
  } else {
    mdCatalogWrapper.style.left = `-${mdCatalogWrapper.offsetWidth + 5}px`;
    mdCatalogWrapper.style.top = '-48px';
  }
};

const initDragEvent = () => {
  const handlers = document.getElementsByClassName('resize-handler');
  for (let i = 0; i < handlers.length; i++) {
    bindDragEvent(handlers[i] as HTMLElement);
  }
};

const bindDragEvent = (targetDOM: HTMLElement) => {
  const mdCatalogWrapper = mdCatalogWrapperRef.value;
  if (!mdCatalogWrapper) return;
  targetDOM?.addEventListener('pointerdown', (e: PointerEvent) => {
    targetDOM?.setPointerCapture(e.pointerId);
    const cn = targetDOM.classList[1];

    const OffsetWidth = mdCatalogWrapper.offsetWidth;
    const OffsetHeight = mdCatalogWrapper.offsetHeight;
    const Top = mdCatalogWrapper.offsetTop;
    const Bottom = mdCatalogWrapper.offsetTop + OffsetHeight;
    const Left = mdCatalogWrapper.offsetLeft;
    const Right = mdCatalogWrapper.offsetLeft + OffsetWidth;

    const startMouseMoveX = e.clientX;
    const startMouseMoveY = e.clientY;

    const onresize = (ev: MouseEvent) => {
      // 鼠标移动时的鼠标位置
      const mouseMoveX = ev.clientX;
      const mouseMoveY = ev.clientY;

      const offsetX = startMouseMoveX - mouseMoveX;
      const offsetY = startMouseMoveY - mouseMoveY;

      const resizeHandler = (dir: string) => {
        const resizeW = () => {
          if (OffsetWidth + offsetX < minWidth) return;
          mdCatalogWrapper.style.width = `${OffsetWidth + offsetX}px`;
          mdCatalogWrapper.style.left = `${Left - offsetX}px`;
        };
        const resizeE = () => {
          if (OffsetWidth - offsetX < minWidth) return;
          mdCatalogWrapper.style.width = `${OffsetWidth - offsetX}px`;
        };
        const resizeS = () => {
          if (OffsetHeight - offsetY < minHeight) return;
          mdCatalogWrapper.style.height = `${OffsetHeight - offsetY}px`;
        };
        const resizeN = () => {
          if (OffsetHeight + offsetY < minHeight) return;
          mdCatalogWrapper.style.height = `${OffsetHeight + offsetY}px`;
          mdCatalogWrapper.style.top = `${Top - offsetY}px`;
        };
        switch (dir) {
          case 'resize-w':
            resizeW();
            break;
          case 'resize-s':
            resizeS();
            break;
          case 'resize-e':
            resizeE();
            break;
          case 'resize-n':
            resizeN();
            break;
          case 'resize-sw':
            resizeS();
            resizeW();
            break;
          case 'resize-nw':
            resizeN();
            resizeW();
            break;
          case 'resize-se':
            resizeS();
            resizeE();
            break;
          case 'resize-ne':
            resizeN();
            resizeE();
            break;
        }
      };

      if (!move.value) {
        if (['resize-w', 'resize-s', 'resize-sw'].includes(cn)) {
          resizeHandler(cn);
        }
      } else {
        resizeHandler(cn);
      }
    };

    if (cn && cn.startsWith('resize')) {
      targetDOM?.addEventListener('pointermove', onresize, false);

      targetDOM?.addEventListener('pointerup', (ev: Event) => {
        targetDOM?.removeEventListener('pointermove', onresize, false);
      });
    }
  });
};

const onHeadingClick = (e: MouseEvent, t: TocItem) => {
  history.replaceState({}, '', `${location.pathname}#${t.text}`);
};

onMounted(() => {
  const header = document.getElementById('header');
  headerClientHeight.value = header?.clientHeight ?? 40;
  initDragEvent();
});
</script>

<style lang="scss" scoped>
.md-catalog-panel {
  user-select: none;

  .fold-panel {
    position: relative;

    .switch {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: var(--youyu-navigation);
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .md-catalog-wrapper {
      display: flex;
      flex-direction: column;
      position: relative;
      left: -265px;
      top: -48px;
      width: 260px;
      min-width: 120px;
      min-height: 120px;
      height: 360px;
      background-color: var(--post-detail-background);
      border: 1px solid #9ca3af4d;
      border-radius: 6px;
      opacity: 1;
      transition: opacity 0.2s;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 2px, rgba(0, 0, 0, 0.04) 0px 0px 6px;

      &.dragging.fixed {
        opacity: 0.6;
      }

      .catalog-title {
        font-size: 18px;
        font-weight: bold;
        padding: 8px 16px;
        box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .header-title {
          display: flex;
          align-items: center;

          .i-icon {
            position: relative;
            top: 1px;
            margin-right: 2px;
          }
        }

        .move-switch {
          cursor: pointer;
          height: 26px;
          width: 26px;
          background-color: #ebebeb;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background-color: #d2d2d2;
          }
        }
      }

      .catalog-body {
        flex: 1;
        overflow: auto;
        padding: 0 10px;
      }

      .resize-n,
      .resize-s,
      .resize-nw,
      .resize-ne,
      .resize-se,
      .resize-sw {
        height: 10px;
        position: absolute;
        /*background-color: rgba(135, 206, 235, 0.4);*/
      }

      .resize-w,
      .resize-e,
      .resize-nw,
      .resize-ne,
      .resize-se,
      .resize-sw {
        width: 10px;
        position: absolute;
        /*background-color: rgba(135, 206, 235, 0.4);*/
      }

      .resize-n {
        top: -5px;
        right: 0;
        left: 0;
        cursor: n-resize;
      }

      .resize-s {
        bottom: -5px;
        right: 0;
        left: 0;
        cursor: s-resize;
      }

      .resize-w {
        bottom: 0;
        top: 0;
        left: -5px;
        cursor: w-resize;
      }

      .resize-e {
        bottom: 0;
        top: 0;
        right: -5px;
        cursor: e-resize;
      }

      .resize-nw {
        top: -5px;
        left: -5px;
        cursor: nw-resize;
      }

      .resize-ne {
        top: -5px;
        right: -5px;
        cursor: ne-resize;
      }

      .resize-se {
        bottom: -5px;
        right: -5px;
        cursor: nw-resize;
      }

      .resize-sw {
        bottom: -5px;
        left: -5px;
        cursor: sw-resize;
      }
    }

    .fixed {
      .catalog-title {
        cursor: move;
      }
    }
  }
}
</style>
