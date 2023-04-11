<template>
  <div class="note-category">
    <a-tree
      v-if="treeData.length"
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
              <!--<div class="item-operation" v-show="selected">
                <i-editor theme="outline" size="14" fill="#333" title="编辑" @click="onEdit(data)"/>
                <i-delete-four theme="outline" size="16" fill="#333" title="删除"/>
              </div>-->
            </div>
            <div v-else class="item-input">
              <input v-model="data.title" v-focus @blur="onBlur(data)"/>
            </div>
          </div>
          <template #overlay v-if="isOwn">
            <a-menu @click="({ key: menuKey }) => onContextMenuClick(data, menuKey)">
              <a-menu-item key="1">编辑</a-menu-item>
              <a-menu-item key="2">删除</a-menu-item>
              <a-menu-item key="3">添加子项</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
    <div class="category-top">
      <a-button type="primary" ghost class="create-chapter" @click="createFirstChapter" v-if="isOwn">创建章节</a-button>
    </div>
    <Teleport class="chapter-bottom" to="#chapter-bottom" v-if="contentMounted">
      <div class="chapter-last-next">
        <div class="chapter-item chapter-item-last">
          <div class="item-box" v-if="lastNode" @click="onLastNext('last')">
            <div class="item-text">
              <i-left theme="outline" size="12" fill="#3c3c3c54"/>
              上一篇
            </div>
            <div class="item-title">{{lastNode.title}}</div>
          </div>
        </div>
        <div class="chapter-item chapter-item-next">
          <div class="item-box" v-if="nextNode" @click="onLastNext('next')">
            <div class="item-text">下一篇
              <i-right theme="outline" size="12" fill="#3c3c3c54"/>
            </div>
            <div class="item-title">{{nextNode.title}}</div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
  import openModal from "@/libs/tools/openModal";
  import ChapterAdd from "./ChapterAdd.vue";
  import ChapterEdit from "./ChapterEdit.vue";
  import {mapActions, mapGetters} from "vuex";
  import {message} from 'ant-design-vue';
  import {computed} from "vue";

  export default {
    inject: ['note'],
    data() {
      return {
        selectedKeys: [],
        rawDataList: [],
        treeData: [],
        contentMounted: false,
        lastNode: null,
        nextNode: null,
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      isOwn() {
        return this.note.value?.userId === this.userInfo?.id
      }
    },
    methods: {
      ...mapActions(['getNote', 'listNoteChapter', 'deleteNoteChapter']),
      async initData() {
        this.getListChapter()
      },
      getListChapter() {
        this.listNoteChapter({noteId: this.note.value.id}).then(res => {
          this.treeData = this.transferData(res.data);
          this.rawDataList = this.flatTreeData(this.treeData);
          if (this.treeData.length) { // 默认选中第一章
            this.selectedKeys = [this.treeData[0].key];
            this.$emit("handleNodeSelect", this.treeData[0]);
          }
        })
      },
      transferData(data) {
        data.forEach(item => {
          item.key = item.id;
          if (item.parentId > -1) {
            const parent = data.find(i => i.id === item.parentId);
            if (parent) {
              if (!parent.children?.length) {
                parent.children = []
              }
              parent.children.push(item);
            }
          }
        })
        return data.filter(item => item.parentId === -1)
      },
      flatTreeData(data) {
        const flatData = [];
        (function transfer(data) {
          data.forEach(item => {
            flatData.push(item);
            if (item.children?.length) {
              transfer(item.children);
            }
          })
        })(data);
        return flatData;
      },
      async createFirstChapter() {
        const res = await openModal({
          component: ChapterAdd,
          componentProps: {
            noteId: this.note.value.id,
          },
          title: '新建章节'
        }).catch(console.log);
        if (res) {
          this.getListChapter();
        }
      },
      handleSelect(keys, info) {
        const node = info.node;
        this.selectedKeys = [node.key];
        this.$emit("handleNodeSelect", node);
      },
      onEdit(data) {
        data.isEdit = true;
      },
      onBlur(data) {
        data.isEdit = false;
      },
      async onContextMenuClick(data, menuKey) {
        if (menuKey === '1') {
          const res = await openModal({
            component: ChapterEdit,
            componentProps: {
              id: data.id
            },
            title: '编辑章节'
          }).catch(console.log);
          if (res) {
            this.getListChapter();
          }
        } else if (menuKey === '2') {
          this.deleteNoteChapter({id: data.id}).then(res => {
            message.success("删除成功");
            this.initData();
          })
        } else if (menuKey === '3') {
          const res = await openModal({
            component: ChapterAdd,
            componentProps: {
              noteId: this.note.value.id,
              parentId: data.id
            },
            title: '新建章节'
          }).catch(console.log);
          if (res) {
            this.getListChapter();
          }
        }
      },
      generatePreNext() {
        this.$nextTick(() => {
          this.contentMounted = true;
          const currentKey = this.selectedKeys[0];
          const currentIndex = this.rawDataList.findIndex(item => item.id === currentKey);
          this.lastNode = this.rawDataList[currentIndex - 1];
          this.nextNode = this.rawDataList[currentIndex + 1];
        })
      },
      onLastNext(type) {
        const node = type === 'last' ? this.lastNode : this.nextNode;
        this.selectedKeys = [node.key];
        this.$emit("handleNodeSelect", node);
      }
    },
    created() {
      this.initData();
    },
  }
</script>

<style lang="scss" scoped>
  .note-category {
    position: relative;
    width: 100%;

    .category-top {
      width: 100%;
      margin-top: 10px;
      /*text-align: center;*/

      .create-chapter {
        margin-bottom: 10px;
      }
    }

    .draggable-tree {
      .title-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 0 2px 8px;

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
