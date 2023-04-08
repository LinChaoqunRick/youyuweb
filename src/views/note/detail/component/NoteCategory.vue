<template>
  <div class="note-category">
    <div class="category-top">
      <a-button type="primary" ghost class="create-chapter" @click="createFirstChapter">创建章节</a-button>
    </div>
    <a-tree
      class="draggable-tree"
      v-model:selectedKeys="selectedKeys"
      block-node
      :tree-data="treeData"
      defaultExpandAll
      @select="handleSelect"
      ref="aTree"
    >
      <template v-slot:title="{data, dataRef, selected}">
        <a-dropdown :trigger="['contextmenu']">
          <div class="title-item">
            <div class="title-text" v-if="!data.isEdit">
              <span>{{data.title}}</span>
              <div class="item-operation" v-show="selected">
                <i-editor theme="outline" size="14" fill="#333" title="编辑" @click="onEdit(data)"/>
                <i-delete-four theme="outline" size="16" fill="#333" title="删除"/>
              </div>
            </div>
            <div v-else class="item-input">
              <input v-model="data.title" v-focus @blur="onBlur(data)"/>
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

<script>
  export default {
    data() {
      return {
        selectedKeys: [],
        treeData: [
          {
            title: '第一章: 初识Spring',
            children: [
              {
                title: '1-1: Spring的诞生',
              },
              {
                title: '1-2: Spring的历史演变',
              }
            ]
          },
          {
            title: '第二章: Spring容器',
          },
          {
            title: '第三章: Spring IOC',
          },
          {
            title: '第四章: Spring AOP',
          }
        ]
      }
    },
    methods: {
      createFirstChapter() {
        // this.treeData = [
        //   {
        //     title: 'parent 1',
        //     isEdit: true,
        //   }
        // ]
        console.log(this.$refs.aTree);
      },
      handleSelect(keys, info) {
        console.log(info);
        const node = info.node;
        this.selectedKeys = [node.key];
      },
      onEdit(data) {
        data.isEdit = true;
      },
      onBlur(data) {
        data.isEdit = false;
      }
    }
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
      .title-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 4px;

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

      .item-input {
        width: 100%;

        input {
          box-sizing: border-box;
          margin: 0;
          font-variant: tabular-nums;
          list-style: none;
          font-feature-settings: "tnum";
          position: relative;
          display: inline-block;
          width: 100%;
          min-width: 0;
          padding: 4px 11px;
          color: #000000d9;
          font-size: 14px;
          line-height: 1.5715;
          background-color: #fff;
          background-image: none;
          border: 1px solid #d9d9d9;
          border-radius: 2px;
          transition: all .3s;
          outline: none;

          &:focus {
            box-shadow: 0 0 2px 1px #1890ff;
          }
        }
      }
    }

    ::v-deep(.ant-tree) {
      .ant-tree-node-content-wrapper {
        padding: 0 !important;
      }
    }
  }
</style>
