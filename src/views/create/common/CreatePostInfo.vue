<template>
  <div class="create-post-info">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="文章分类" v-bind="validateInfos.categoryId">
        <a-tree-select
          v-model:value="modelRef.categoryId"
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
      <a-form-item label="标签" v-bind="validateInfos.tags">
        <template v-for="(tag, index) in modelRef.tags" :key="tag">
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
        <a-tag v-if="!state.inputVisible && modelRef.tags.length<3"
               @click="showInput"
               class="new-tag">
          <i-plus theme="outline" size="14" fill="#000"/>
          新建
        </a-tag>
      </a-form-item>
      <a-form-item label="封面" v-bind="validateInfos.thumbnail">
        <UploadFile multiple @uploadSuccess="uploadSuccess"/>
      </a-form-item>
      <a-form-item label="摘要" v-bind="validateInfos.summary">
        <a-textarea
          v-model:value="modelRef.summary"
          :rows="4"
          show-count
          :maxlength="100"
        />
      </a-form-item>
      <a-form-item label="文章类型" v-bind="validateInfos.createType">
        <a-radio-group v-model:value="modelRef.createType" button-style="solid">
          <a-radio-button v-for="item in createTypes" :value="item.code">{{item.desc}}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="原文连接" v-bind="validateInfos.originalLink" v-if="modelRef.createType!=='0'">
        <a-input v-model:value="modelRef.originalLink"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CreatePostInfo'
  }
</script>

<script setup lang="ts">
  import {nextTick, reactive, ref, toRaw} from 'vue';
  import type {TreeSelectProps} from 'ant-design-vue';
  import {Form} from 'ant-design-vue';
  import {useStore} from 'vuex';
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';

  const {dispatch} = useStore();

  const treeData = ref<TreeSelectProps['treeData']>([]);
  const useForm = Form.useForm;

  const labelCol = {span: 6};
  const wrapperCol = {span: 16};

  const createTypes = ref([]);
  const modelRef = reactive({
    categoryId: '',
    tags: [],
    summary: '',
    createType: '0',
    originalLink: '',
    thumbnail: ''
  });
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
  const {validate, validateInfos} = useForm(modelRef, rulesRef);

  const inputRef = ref();
  const state = reactive({
    inputVisible: false,
    inputValue: '',
  });


  const onSubmit = async () => {
    return await validate().then(res => {
      return toRaw(modelRef);
    }).catch(err => {
      return false;
    });
  };

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
    modelRef.thumbnail = fileList.map(file => file.url).join(",")
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
    modelRef.tags = modelRef.tags.filter(tag => tag !== removedTag);
  };

  const handleInputConfirm = () => {
    const inputValue = state.inputValue;
    if (inputValue && modelRef.tags.indexOf(inputValue) === -1) {
      modelRef.tags = [...modelRef.tags, inputValue];
    }
    Object.assign(state, {
      inputVisible: false,
      inputValue: '',
    });
  };

  defineExpose({
    onSubmit,
    modelRef: toRaw(modelRef)
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
