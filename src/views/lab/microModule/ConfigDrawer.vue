<template>
  <a-drawer title="微模块配置" width="92%" :open="visible" @close="onClose" class="micro-config-drawer">
    <template #closeIcon>
      <i-close theme="outline" size="20" fill="#909090"/>
    </template>
    <div class="drawer-content">
      <div class="config-form">
        <a-form :model="formValidate" :rules="rulesRef" :label-col="{span: 1.8}" :wrapper-col="{span: 22.2}"
                ref="formRef">
          <a-form-item label="门头类型" name="doorHeadType" class="door-header-type-item">
            <a-radio-group v-model:value="formValidate.doorHeadType">
              <a-radio-button v-for="item in microConfig.doorHeadType" :value="item.code">
                {{ item.desc }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="门楣Logo" name="lintelLogoType" class="lintel-logo-type-item">
            <a-radio-group v-model:value="formValidate.lintelLogoType" name="lintelRadioGroup">
              <a-radio v-for="(item, i) in microConfig.lintelLogoType.filter(i => i.code!=99)" :value="item.code">
                <img class="lintel-logo" :class="['lintel-logo-'+ i]" :src="'/static/micro/map/'+item.image"
                     :alt="item.desc"/>
                <div class="lintel-name">({{ item.desc }})</div>
              </a-radio>
              <a-radio value="99">
                <UploadFile class="lintel-logo" auto-upload @uploadSuccess="onUploadSuccess">
                  <div class="upload-box">

                  </div>
                </UploadFile>
                <div class="lintel-name">(自定义，尺寸340*120)</div>
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <template #footer>
      <div class="drawer-footer">
        <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
        <a-button type="primary" :loading="submitLoading" @click="onSubmit">保存</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useStore} from "vuex";
import {mockCabinetData, mockMicroConfigEnum} from "@/views/lab/microModule/config";
import UploadFile from "@/components/common/utils/upload/UploadFile.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
const {dispatch} = useStore();

const emit = defineEmits(['update:visible']);
const formValidate = ref({});
const microConfig = mockMicroConfigEnum;

const rulesRef = {
  doorHeadType: [{required: true, message: '请选择门头类型'}],
  lintelLogoType: [{required: true, message: '请选择门楣Logo'}],
};
const submitLoading = ref(false);

const initData = () => {
  dispatch('getMicroModuleConfig').then(res => {
    res.data = mockCabinetData;
    formValidate.value = res.data;
  })
};

initData();

const onClose = () => {
  emit('update:visible', false);
}

const onUploadSuccess = (data) => {
  console.log(data);
  microConfig.lintelLogoType[microConfig.lintelLogoType.length - 1].image =data[0].url;
}

const onSubmit = () => {

}
</script>

<style scoped lang="scss">

</style>

<style lang="scss">
.micro-config-drawer {

  .ant-drawer-body {
    padding: 12px;

    .drawer-content {
      height: 100%;

      .config-form {
        height: 100%;
        width: 530px;
        padding: 12px;
        border-radius: 4px;

        .lintel-logo-type-item {
          .ant-radio-wrapper {
            height: 80px;
            align-items: center;
          }

          .lintel-logo {
            height: 50px;
            width: 170px;
            object-fit: contain;

            &.lintel-logo-0 {
              background-color: black;
            }

            .ant-upload-wrapper {
              position: relative;
              top: -2px;
              display: block;
              height: 100%;
              width: 100%;
              border: 1px dashed #1890ff;
              box-sizing: border-box;
            }

            .upload-box {
              height: 50px;
              width: 170px;
            }
          }

          .lintel-name {
            width: 170px;
            position: absolute;
            bottom: -6px;
            text-align: center;
          }
        }

        .door-header-type-item {
          .ant-radio-group {
            .ant-radio-button-wrapper {
              margin-right: 10px;
              border-radius: 4px;
              padding: 0 20px;
              border: 1px solid var(--youyu-border-color4);
              color: var(--youyu-body-text) !important;

              &:before {
                background: none;
              }

              &.ant-radio-button-wrapper-checked {
                background: #1890ff;
                color: white !important;
              }
            }
          }
        }
      }

    }
  }

  .ant-drawer-footer {
    .drawer-footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
