<template>
  <div class="note-category">
    <div class="category-top">
      <a-button type="primary" ghost class="create-chapter" @click="createFirstChapter">创建章节</a-button>
    </div>
    <a-tree
      class="draggable-tree"
      :selectedKeys="selectedKeys"
      draggable
      block-node
      :tree-data="treeData"
      @select="handleSelect"
    >
      <template v-slot:title="{data, selected}">
        <a-dropdown :trigger="['contextmenu']">
          <div>
            <div class="item-title" v-show="!data.edit">
              <span>{{data.title}}</span>
              <div class="item-operation" v-show="selected">
                <i-editor theme="outline" size="14" fill="#333" title="编辑" @click="onEdit(data)"/>
                <i-delete-four theme="outline" size="16" fill="#333" title="删除"/>
              </div>
            </div>
            <div v-show="data.edit">
              <a-input v-model:value="data.title"/>
            </div>
          </div>
          <template #overlay>
            <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';

  const treeData = ref([]);
  const selectedKeys = ref([]);

  function createFirstChapter() {
    treeData.value = [
      {
        title: 'parent 1',
        key: '0-0'
      }
    ]
  }

  function handleSelect(keys, info) {
    const node = info.node;
    selectedKeys.value = [node.key];
  }

  function onEdit(data) {
    console.log(data);
    data.edit = true;
  }
</script>

<style lang="scss" scoped>
  .note-category {
    width: 100%;

    .category-top {
      width: 100%;
      text-align: center;

      .create-chapter {
        margin-bottom: 10px;
      }
    }

    .draggable-tree {
      .item-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-operation {
          display: flex;
          align-items: center;

          .i-icon {
            &:nth-child(n+2) {
              margin-left: 2px;
            }
          }
        }
      }
    }
  }
</style>
