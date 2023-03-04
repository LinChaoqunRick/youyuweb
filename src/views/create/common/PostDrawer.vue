<template>
  <div class="create-post-info">
    <a-drawer title="发布文章" width="500" :visible="visible" @close="onClose" class="create-post-drawer">
      <template #closeIcon>
        <i-close theme="outline" size="20" fill="#909090"/>
      </template>
      <a-form :model="formValidate" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
        <a-form-item label="文章分类" name="categoryId">
          <a-tree-select
            v-model:value="formValidate.categoryId"
            show-search
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请选择"
            allow-clear
            tree-default-expand-all
            :tree-data="treeData"
            :fieldNames="{ value: 'id' }"
          >
            <template #title="{ value: val, title }">
              <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
              <template v-else>{{ title }}</template>
            </template>
          </a-tree-select>
        </a-form-item>
        <a-form-item label="标签" name="tags">
          <template v-for="(tag, index) in formValidate.tags" :key="tag">
            <a-tag closable color="#1890ff" @close="handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="state.inputVisible"
            ref="inputRef"
            v-model:value="state.inputValue"
            :maxlength="10"
            type="text"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag v-if="!state.inputVisible && formValidate.tags.length<3"
                 @click="showInput"
                 class="new-tag">
            <i-plus theme="outline" size="14" fill="#000"/>
            新建
          </a-tag>
        </a-form-item>
        <a-form-item label="封面" name="thumbnail" class="post-thumbnails">
          <UploadFile :max-count="3" multiple @uploadSuccess="uploadSuccess">
            <div class="file-list">
              <div v-for="(file, index) in formValidate.thumbnail"
                   :style="{left: 40 * index + 'px',top: 8 * index + 'px'}" class="image-preview">
                <a-image
                  :width="200"
                  :height="120"
                  :src="file"
                />
              </div>
            </div>
          </UploadFile>
        </a-form-item>
        <a-form-item label="摘要" name="summary">
          <a-textarea
            v-model:value="formValidate.summary"
            :rows="4"
            show-count
            :maxlength="100"
          />
        </a-form-item>
        <a-form-item label="文章类型" name="createType">
          <a-radio-group v-model:value="formValidate.createType" button-style="solid">
            <a-radio-button v-for="item in createTypes" :value="item.code">{{item.desc}}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="原文连接" name="originalLink" v-if="formValidate.createType!=='0'">
          <a-input v-model:value="formValidate.originalLink"/>
        </a-form-item>
      </a-form>
      <template #footer>
        <div class="drawer-footer">
          <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
          <a-button type="primary" @click="onSubmit">发布</a-button>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PostDrawer'
  }
</script>

<script setup lang="ts">
  import {nextTick, reactive, ref} from 'vue';
  import type {PropType,} from 'vue';
  import type {TreeSelectProps} from 'ant-design-vue';
  import {Form, notification} from 'ant-design-vue';
  import {useStore} from 'vuex';
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
  import type {postData} from "@/types/create";

  const {dispatch} = useStore();

  const props = defineProps({
    formValidate: {
      type: Object as PropType<postData>,
    },
    visible: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['handleSubmit', 'update:visible'])

  const treeData = ref<TreeSelectProps['treeData']>([]);
  const labelCol = {span: 6};
  const wrapperCol = {span: 16};
  const createTypes = ref([]);
  const rulesRef = reactive({
    categoryId: [
      {
        required: true,
        message: '请选择文章分类',
      },
    ],
    summary: [
      {
        required: true,
        message: '请输入文章摘要',
      },
    ],
    createType: [
      {
        required: true,
        message: '请选择文章类型',
      },
    ],
    originalLink: [
      {
        required: true,
        message: '请输入原文链接',
      },
    ],
  });
  const formRef = ref();
  const inputRef = ref();
  const state = reactive({
    inputVisible: false,
    inputValue: '',
  });

  async function onSubmit() {
    const form = await formRef.value.validate().catch(console.log);
    if (form) {
      emit('handleSubmit');
    }
  }

  function getCategoryList() {
    dispatch("getCategoryList").then(res => {
      treeData.value = transferData(res.data);
    })
  }

  function getCreateTypes() {
    dispatch("getCreateTypes").then(res => {
      createTypes.value = res.data;
    })
  }

  function uploadSuccess(fileList) {
    console.log(fileList.map(file => file.url));
    props.formValidate.thumbnail = fileList.map(file => file.url)
  }

  getCategoryList();
  getCreateTypes();

  function transferData(data) {
    data.forEach(item => {
      item.title = item.name;
      if (item.pid > -1) {
        const parent = data.find(i => i.id === item.pid);
        if (parent) {
          if (!parent.children?.length) {
            parent.children = []
          }
          parent.children.push(item);
        }
      }
    })
    return data.filter(item => item.pid === -1)
  }

  const showInput = () => {
    state.inputVisible = true;
    nextTick(() => {
      inputRef.value.focus();
    });
  };

  const handleClose = (removedTag: string) => {
    props.formValidate.tags = props.formValidate.tags.filter(tag => tag !== removedTag);
  };


  function onClose() {
    emit('update:visible', false);
  }

  const handleInputConfirm = () => {
    const inputValue = state.inputValue;
    if (inputValue && props.formValidate.tags.indexOf(inputValue) === -1) {
      props.formValidate.tags = [...props.formValidate.tags, inputValue];
    }
    Object.assign(state, {
      inputVisible: false,
      inputValue: '',
    });
  };

  defineExpose({
    onSubmit,
  })
</script>

<style lang="scss" scoped>
  .create-post-info {
    ::v-deep(.ant-form) {
      .ant-form-item-control-input-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      .ant-tag {
        padding: 1px 7px;
        /*margin-bottom: 6px;*/
      }

      .ant-input-textarea {
        width: 100%;
      }

      .new-tag {
        background: #fff;
        border-style: dashed;
        height: 24px;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="scss">
  .create-post-drawer {
    .post-thumbnails {
      position: relative;

      .file-list {
        position: relative;
        width: 200px;
        height: 120px;

        .image-preview {
          position: absolute;
        }

        .ant-image {
          transition: .3s;

          &:hover {
            transform: scale(1.1);
            z-index: 10;
          }

          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
</style>
