<template>
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
    <a-form-item label="Activity name" v-bind="validateInfos.name">
      <a-input
        v-model:value="modelRef.name"
        @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
      />
    </a-form-item>
    <a-form-item label="Activity zone" v-bind="validateInfos.region">
      <a-select v-model:value="modelRef.region" placeholder="please select your zone">
        <a-select-option value="shanghai">Zone one</a-select-option>
        <a-select-option value="beijing">Zone two</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="文章类别" v-bind="validateInfos.categoryId">
      <a-radio-group v-model:value="value1" button-style="solid">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click.prevent="onSubmit">Create</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import {ref, reactive, toRaw} from 'vue';
  import {Form} from 'ant-design-vue';
  import {useStore} from 'vuex';
  import type {TreeSelectProps} from 'ant-design-vue';

  const {dispatch} = useStore();


  const treeData = ref<TreeSelectProps['treeData']>([]);
  const useForm = Form.useForm;

  const labelCol = {span: 6};
  const wrapperCol = {span: 16};

  const modelRef = reactive({
    categoryId: '',
    name: '',
    region: undefined,
  });
  const rulesRef = reactive({
    categoryId: [
      {
        required: true,
        message: '请选择文章分类',
      },
    ],
    name: [
      {
        required: true,
        message: 'Please input Activity name',
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur',
      },
    ],
    region: [
      {
        required: true,
        message: 'Please select region',
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

  getCategoryList();

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

<style scoped>

</style>
