<template>
  <div class="md-catalog-panel">
    <div class="fold-panel" ref="panel">
      <div class="switch" @click="handleShow" v-show="!move">
        <i-list-middle theme="outline" size="22" fill="currentColor"/>
      </div>
      <div class="drag-container" v-show="show">
        <div :style="styleRef"
             class="md-catalog-wrapper"
             :class="{'fixed': move, 'dragging': isDraggingRef}"
             ref="mdCatalogRef">
          <div ref="handle" class="catalog-title">
            <div>目录</div>
            <div class="move-switch" @click="handleMove">
              <i-direction-adjustment-three theme="outline" :strokeWidth="3" size="18" fill="#141414"/>
            </div>
          </div>
          <div class="catalog-body youyu-scrollbar">
            <md-catalog
              :editor-id="editorId"
              :scroll-element="scrollElement"
              :offsetTop="80"
              :scrollElementOffsetTop="headerClientHeight"
              :mdHeadingId="createMdHeadingId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import {useDraggable} from '@vueuse/core';
  import {MdCatalog} from 'md-editor-v3';
  import {getElementTop, getElementLeft} from "@/assets/utils/utils";
  import {createMdHeadingId} from "@/components/content/mdEditor/utils";

  const prop = defineProps({
    editorId: {
      type: String,
      default: 'post-content'
    },
  })

  const innerWidth = window.innerWidth;
  const mdCatalogRef = ref<HTMLElement | null>(null);
  const handle = ref<HTMLElement | null>(null);
  const panel = ref<HTMLElement | null>(null);
  const move = ref<boolean>(false);
  const show = ref<boolean>(false);
  const scrollElement = document.documentElement;
  const headerClientHeight = ref<number>(0);
  let styleRef = ref<string>('');
  let isDraggingRef = ref<boolean>(false);

  function handleShow() {
    show.value = !show.value;
  }

  function handleMove() {
    move.value = !move.value;
    if (move.value) {
      const {style, isDragging} = useDraggable(mdCatalogRef, {
        initialValue: {x: getElementLeft(mdCatalogRef.value) ?? 0, y: getElementTop(mdCatalogRef.value) ?? 0},
        handle
      })
      styleRef = style;
      isDraggingRef = isDragging;
    }
  }

  onMounted(() => {
    const header = document.getElementById("header");
    headerClientHeight.value = header?.clientHeight ?? 40;
  })
</script>

<style lang="scss" scoped>
  .md-catalog-panel {

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

      .drag-container {
        position: absolute;
        left: -265px;
        top: 0;

        .md-catalog-wrapper {
          width: 260px;
          background-color: var(--post-detail-background);
          border: 1px solid #9ca3af4d;
          border-radius: 6px;
          opacity: 1;
          transition: opacity .2s;

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
            height: 300px;
            overflow: auto;
            padding: 0 10px;
          }
        }

        .fixed {
          .catalog-title {
            cursor: move;
          }
        }
      }
    }
  }
</style>
