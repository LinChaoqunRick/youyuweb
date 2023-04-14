<template>
  <div class="note-editor">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="note-form">
      <div class="note-left">
        <a-form-item label="标题" name="name">
          <a-input v-model:value="formValidate.name" show-count :maxlength="20"/>
        </a-form-item>
        <a-form-item label="说明" name="introduce">
          <a-textarea
            v-model:value="formValidate.introduce"
            :rows="4"
            show-count
            :maxlength="100"
          />
        </a-form-item>
      </div>
      <div class="note-right">
        <a-form-item label="封面" name="cover" :label-col="{span: 8, offset: 0}" class="form-item-cover">
          <a-input v-model:value="formValidate.title" disabled/>
        </a-form-item>
        <div class="cover-box">
          <div class="note-cover">
            <UploadFile @uploadSuccess="uploadSuccess">
              <img :src="formValidate.cover">
            </UploadFile>
          </div>
          <div class="cover-tip">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import type {PropType} from 'vue';
  import type {note} from "@/views/note/type";
  import {useStore} from "vuex";
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';

  const {getters, commit, dispatch} = useStore();
  import {computed} from "vue";

  const labelCol = {span: 4};
  const wrapperCol = {span: 20};
  const formRef = ref();

  const props = defineProps({
    formValidate: {
      type: Object as PropType<note>
    }
  })

  const rulesRef = {
    name: [
      {
        required: true,
        message: '请输入标题',
      },
    ],
    introduce: [
      {
        required: true,
        message: '请输入说明',
      },
    ],
    cover: [
      {
        required: true,
        message: '请上传封面',
      },
    ],
  };

  async function getFormData() {
    return  await formRef.value.validate().catch(console.log);
  }

  function uploadSuccess(fileList: []) {
    props.formValidate.cover = fileList[0].url;
  }

  defineExpose({
    getFormData
  })
</script>

<style lang="scss" scoped>
  .note-editor {

    .note-form {
      display: flex;

      .note-left {
        flex: 1;
      }

      .note-right {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 180px;
        height: 200px;

        .cover-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          left: 30px;
          top: -55px;

          .note-cover {
            height: 150px;
            margin-bottom: 8px;
            overflow: hidden;
            border-radius: 2px;

            img {
              object-fit: cover;
              height: 150px;
              width: 110px;
              cursor: pointer;
            }
          }

          .cover-tip {
            width: 140px;
            font-size: 12px;
            color: var(--youyu-text1);
          }
        }
      }

      ::v-deep(.form-item-cover) {

        .ant-form-item-control-input {
          opacity: 0;
        }

        .ant-form-item-explain {
          position: relative;
          top: 163px;
        }
      }
    }
  }
</style>
