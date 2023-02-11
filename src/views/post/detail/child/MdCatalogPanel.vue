<template>
  <div class="md-catalog-panel">
    <div class="fold-panel" ref="panel" v-if="!move">
      <a-tooltip placement="leftTop"
                 trigger="click"
                 overlayClassName="catalog-tooltip"
                 color="var(--post-detail-background)"
                 :getPopupContainer="()=>panel">
        <template #title>
          <div class="md-catalog-wrapper">
            <div ref="handle" class="catalog-title">
              目录
              <i-pushpin theme="outline" size="16" fill="#000"/>
            </div>
            <div class="catalog-body">
              <md-catalog
                :editor-id="editorId"
                :scroll-element="scrollElement"
              />
            </div>
          </div>
        </template>
        <div class="switch">
          <i-list-middle theme="outline" size="22" fill="#000"/>
        </div>
      </a-tooltip>
    </div>
    <UseDraggable
      v-else
      class="move-panel fixed bg-$vp-c-bg select-none cursor-move z-24"
      :initialValue="{ x: innerWidth - 360, y: 100 }"
      :handle="handle"
    >
      <div class="md-catalog-wrapper">
        <div ref="handle" class="catalog-title">目录</div>
        <div class="catalog-body">
          <md-catalog
            :editor-id="editorId"
            :scroll-element="scrollElement"
          />
        </div>
      </div>
    </UseDraggable>
  </div>

</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {UseDraggable} from '@vueuse/components';
  import MdEditor from 'md-editor-v3';

  const prop = defineProps({
    editorId: {
      type: String,
      default: 'md-editor'
    },
  })

  const innerWidth = window.innerWidth;

  const handle = ref<HTMLElement | null>(null);
  const panel = ref<HTMLElement | null>(null);
  const move = ref<boolean>(false);
  const MdCatalog = MdEditor.MdCatalog;
  const scrollElement = document.documentElement;
</script>

<style lang="scss" scoped>
  .md-catalog-panel {
    position: fixed;
    top: 100px;
    right: 20px;

    .fold-panel {
      .catalog-tooltip {
        top: 15px !important;

        .ant-tooltip-inner {
          color: var(--youyu-body-text);
        }

        .md-catalog-wrapper {
          background-color: var(--post-detail-background);
          color: var(--youyu-body-text);
          border-radius: 6px;
          padding-left: 6px;

          .catalog-title {
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 8px;
            box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
          }

          .catalog-body {
            height: 300px;
            overflow: auto;
          }

          ::v-deep(.md-catalog) {
            .md-catalog-active {
              border-left: 3px solid #42b983;
              font-weight: 700;
              color: #42b983;
            }
          }
        }
      }

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
    }

    .move-panel {
      .md-catalog-wrapper {
        width: 260px;
        background-color: var(--post-detail-background);
        border: 1px solid #9ca3af4d;
        border-radius: 6px;

        .catalog-title {
          font-size: 18px;
          font-weight: bold;
          padding: 8px 16px;
          cursor: move;
          box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
        }

        .catalog-body {
          height: 300px;
          overflow: auto;
          padding: 8px 16px;
        }

        ::v-deep(.md-catalog) {
          .md-catalog-active {
            border-left: 3px solid #42b983;
            font-weight: 700;
            color: #42b983;
          }
        }
      }
    }
  }

</style>

<style lang="scss">

</style>
