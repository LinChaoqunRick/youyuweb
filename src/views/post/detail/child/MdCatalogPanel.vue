<template>
  <div class="md-catalog-panel">
    <div class="fold-panel" ref="panel">
      <div class="switch" @click="handleShow" v-show="!move">
        <i-list-middle theme="outline" size="22" fill="#000"/>
      </div>
      <div class="drag-container" v-show="show">
        <UseDraggable
          class="bg-$vp-c-bg select-none cursor-move z-20"
          :class="{'fixed':move}"
          :initialValue="{ x: innerWidth - 360, y: 100 }"
          :handle="handle"
        >
          <div class="md-catalog-wrapper">
            <div ref="handle" class="catalog-title">
              <div>目录</div>
              <div class="move-switch" @click="handleMove">
                <i-direction-adjustment-two theme="outline" size="18" fill="#000"/>
              </div>
            </div>
            <div class="catalog-body">
              <md-catalog
                :editor-id="editorId"
                :scroll-element="scrollElement"
                :offsetTop="headerClientHeight"
              />
            </div>
          </div>
        </UseDraggable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue';
  import {UseDraggable} from '@vueuse/components';
  import MdEditor from 'md-editor-v3';

  const prop = defineProps({
    editorId: {
      type: String,
      default: 'post-content'
    },
  })

  const innerWidth = window.innerWidth;

  const handle = ref<HTMLElement | null>(null);
  const panel = ref<HTMLElement | null>(null);
  const move = ref<boolean>(false);
  const show = ref<boolean>(false);
  const MdCatalog = MdEditor.MdCatalog;
  const scrollElement = document.documentElement;
  const headerClientHeight = ref<number>(0)

  function handleShow() {
    show.value = !show.value;
  }

  function handleMove() {
    move.value = !move.value;
  }

  onMounted(() => {
    const header = document.getElementById("header");
    headerClientHeight.value = header?.clientHeight ?? 20;
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
            padding: 8px 16px;
          }

          ::v-deep(.md-editor-catalog) {
            .md-editor-catalog-active {
              border-left: 3px solid #1890ff;
              font-weight: 700;
              color: #1890ff !important;

              span {
                color: #1890ff !important;
              }
            }
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
