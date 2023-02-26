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
      <a-form-item label="封面" v-bind="validateInfos.thumbnail">
        <UploadFile @uploadSuccess="uploadSuccess"/>
      </a-form-item>
      <a-form-item label="摘要" v-bind="validateInfos.summary">
        <a-textarea
          v-model:value="modelRef.summary"
          :rows="4"
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
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, toRaw} from 'vue';
  import {Form} from 'ant-design-vue';
  import {useStore} from 'vuex';
  import type {TreeSelectProps} from 'ant-design-vue';
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue'

  const {dispatch} = useStore();

  const treeData = ref<TreeSelectProps['treeData']>([]);
  const useForm = Form.useForm;

  const labelCol = {span: 6};
  const wrapperCol = {span: 16};

  const createTypes = ref([]);
  const modelRef = reactive({
    categoryId: '',
    summary: '',
    createType: '0',
    originalLink: '',
    thumbnail: []
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
  const onSubmit = () => {
    validate()
      .then(() => {
        console.log(toRaw(modelRef));
      })
      .catch(err => {
        console.log('error', err);
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
    console.log(fileList);
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
</script>

<style lang="scss" scoped>
  .create-post-info {


  }
</style>
