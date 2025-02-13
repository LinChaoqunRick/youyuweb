<template>
  <a-drawer title="微模块配置" width="92%" :open="visible" @close="onClose" class="micro-config-drawer">
    <template #closeIcon>
      <i-close theme="outline" size="20" fill="#909090" />
    </template>
    <div class="drawer-content">
      <div class="config-form">
        <a-form
          :model="formValidate"
          :rules="rulesRef"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
          :class="['form_head_' + formValidate.doorHeadType]"
          ref="formRef"
        >
          <a-form-item label="门头" name="doorHeadType" class="door-header-type-item">
            <a-radio-group v-model:value="formValidate.doorHeadType">
              <a-radio-button v-for="item in microConfig.doorHeadType" :value="item.code">
                {{ item.desc }}
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="门楣" name="lintelLogoType" class="lintel-logo-type-item">
            <a-radio-group v-model:value="formValidate.lintelLogoType" name="lintelRadioGroup">
              <a-radio v-for="(item, i) in microConfig.lintelLogoType" :value="item.code">
                <img
                  v-if="item.code != 99"
                  class="lintel-logo"
                  :class="['lintel-logo-' + i]"
                  :src="'/static/micro/map/' + item.image"
                  :alt="item.desc"
                />
                <div v-else class="lintel-logo lintel-logo-self">
                  <UploadFile auto-upload @uploadSuccess="onUploadLintelSuccess">
                    <div v-if="!formValidate.lintelLogoFilePath" class="upload-box" title="点击上传">
                      <i-plus theme="outline" size="14" fill="currentColor" />
                      点击上传
                    </div>
                    <img v-else :src="formValidate.lintelLogoFilePath" alt="自定义图片" />
                  </UploadFile>
                </div>
                <div class="lintel-name">({{ item.desc }})</div>
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="液晶屏" name="lcdDisplayType" class="lcd-display-type-item">
            <a-radio-group v-model:value="formValidate.lcdDisplayType" name="lintelRadioGroup">
              <a-radio
                v-for="(item, i) in formValidate.doorHeadType == 1
                  ? microConfig.lcdStandardDisplayType
                  : microConfig.lcdHighEndDisplayType"
                :value="item.code"
              >
                <div class="lcd-logo" :class="['lcd-logo-' + i]">
                  <img
                    v-if="item.code !== '99'"
                    class="lcd-image"
                    :src="'/static/micro/map/' + item.image"
                    :alt="item.desc"
                  />
                  <UploadFile v-else auto-upload @uploadSuccess="onUploadLcdSuccess">
                    <div
                      v-if="
                        !(formValidate.doorHeadType == 1
                          ? formValidate.lcdDisplayStandardFilePath
                          : formValidate.lcdDisplayHighEndFilePath)
                      "
                      class="upload-box"
                      title="点击上传"
                    >
                      <i-plus theme="outline" size="14" fill="currentColor" />
                      点击上传
                    </div>
                    <img
                      v-else
                      :src="
                        formValidate.doorHeadType == 1
                          ? formValidate.lcdDisplayStandardFilePath
                          : formValidate.lcdDisplayHighEndFilePath
                      "
                      alt="自定义图片"
                    />
                  </UploadFile>
                  <div class="lcd-name">({{ item.desc }})</div>
                </div>
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="门Logo" name="glassDoorLogoType" class="door-logo-type-item">
            <a-radio-group v-model:value="formValidate.glassDoorLogoType" name="glassDoorLogoType">
              <a-radio v-for="(item, i) in microConfig.glassDoorLogoType" :value="item.code">
                <div class="glass-logo" v-if="item.code !== '99'">
                  <img
                    class="glass-image"
                    :class="['lcd-image-' + i]"
                    :src="'/static/micro/map/' + item.image"
                    :alt="item.desc"
                  />
                  <div class="glass-name">({{ item.desc }})</div>
                </div>
                <div class="glass-logo" v-else>
                  <UploadFile auto-upload @uploadSuccess="onUploadDoorSuccess">
                    <div v-if="!formValidate.glassDoorLogoFilepath" class="upload-box" title="点击上传">
                      <i-plus theme="outline" size="14" fill="currentColor" />
                      点击上传
                    </div>
                    <img v-else :src="formValidate.glassDoorLogoFilepath" alt="自定义图片" />
                  </UploadFile>
                  <div class="lcd-name">({{ item.desc }})</div>
                </div>
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="玻璃门" name="glassDoorLogoType" class="glass-door-type-item">
            <a-radio-group v-model:value="formValidate.glassDoorType" name="glassDoorType">
              <a-radio v-for="(item, i) in microConfig.glassDoorType" :value="item.code">
                <div class="glass-door">
                  <img
                    class="door-image"
                    :class="['lcd-image-' + i]"
                    :src="'/static/micro/images/' + item.image"
                    :alt="item.desc"
                  />
                  <div class="door-name">({{ item.desc }})</div>
                </div>
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
import { ref } from 'vue';
import { useStore } from 'vuex';
import { mockCabinetData, mockMicroConfigEnum } from '@/views/lab/microModule/config';
import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
import { cloneDeep } from 'lodash';
import { message } from 'ant-design-vue';

const visible = defineModel('visible', { type: Boolean, default: false });
const { dispatch } = useStore();

const emit = defineEmits(['saveConfigSuccess']);
const formValidate = ref({});
const formRef = ref(null);
const microConfig = mockMicroConfigEnum;

const rulesRef = {
  doorHeadType: [{ required: true, message: '请选择门头' }],
  lintelLogoType: [{ required: true, message: '请选择门楣' }],
  lcdDisplayType: [{ required: true, message: '请选择液晶屏' }],
  glassDoorLogoType: [{ required: true, message: '请选择门Logo' }],
};
const submitLoading = ref(false);

const initData = () => {
  dispatch('getMicroModuleConfig').then(res => {
    res.data = cloneDeep(mockCabinetData);
    formValidate.value = res.data;
  });
};

initData();

const onClose = () => {
  visible.value = false;
};

const onUploadLintelSuccess = data => {
  formValidate.value.lintelLogoFilePath = data[0].url;
};

const onUploadLcdSuccess = data => {
  if (formValidate.value.doorHeadType == 1) {
    formValidate.value.lcdDisplayStandardFilePath = data[0].url;
  } else {
    formValidate.value.lcdDisplayHighEndFilePath = data[0].url;
  }
};

const onUploadDoorSuccess = data => {
  formValidate.value.glassDoorLogoFilepath = data[0].url;
};

const onSubmit = async () => {
  const form = await formRef.value.validate().catch(console.log);

  const {
    doorHeadType,
    lintelLogoType,
    lintelLogoFilePath,
    lcdDisplayType,
    lcdDisplayStandardFilePath,
    lcdDisplayHighEndFilePath,
    glassDoorLogoType,
    glassDoorLogoFilepath,
  } = formValidate.value;

  if (form) {
    if (lintelLogoType === '99' && !lintelLogoFilePath) {
      return message.error('请上传自定义门楣');
    }

    if (lcdDisplayType === '99' && !(doorHeadType == 1 ? lcdDisplayStandardFilePath : lcdDisplayHighEndFilePath)) {
      return message.error('请上传自定义液晶屏');
    }

    if (glassDoorLogoType === '99' && !glassDoorLogoFilepath) {
      return message.error('请上传自定义门Logo');
    }

    submitLoading.value = true;

    setTimeout(() => {
      submitLoading.value = false;

      visible.value = false;
      emit('saveConfigSuccess', formValidate.value);
    }, 500);
  }
};
</script>

<style scoped lang="scss"></style>

<style lang="scss">
.micro-config-drawer {
  .ant-drawer-body {
    padding: 12px 0;

    .drawer-content {
      height: 100%;

      .config-form {
        height: 100%;
        width: 530px;
        padding: 12px;
        border-radius: 4px;
        border-right: 1px solid var(--youyu-border-color3);

        .ant-upload-wrapper {
          display: block;
          border: 1px dashed #1890ff;
          box-sizing: border-box;
          overflow: hidden;

          .ant-upload {
            display: block;
            height: 100%;
            width: 100%;
            box-sizing: border-box;

            img {
              object-fit: contain;
              height: 100%;
              width: 100%;
            }
          }
        }

        .upload-box {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;

          .i-icon {
            margin-right: 2px;
          }
        }

        .lintel-logo-type-item {
          .ant-upload-wrapper {
            height: 49px;
            width: 170px;
          }

          .ant-radio-wrapper {
            height: 80px;
            align-items: center;
          }

          .lintel-logo {
            height: 50px;
            width: 170px;

            &.lintel-logo-0 {
              background-color: black;
              object-fit: contain;
            }

            &.lintel-logo-self {
              position: relative;
              top: -2px;
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
            margin-left: 23px;

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

        .lcd-display-type-item {
          .ant-radio-group {
            display: flex;
          }

          .ant-upload-wrapper {
            width: 170px;
            height: 108.25px;
          }

          .lcd-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 170px;
            height: 106.25px;

            .lcd-image {
              width: 170px;
              height: 106.25px;
            }

            .lcd-name {
              white-space: nowrap;
            }
          }
        }

        .door-logo-type-item {
          margin: 35px 0;

          .ant-radio-group {
            display: flex;
          }

          .ant-upload-wrapper {
            width: 170px;
            height: 22.78px;
          }

          .glass-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 170px;
            height: 22.78px;

            .glass-image {
              width: 170px;
              height: 22.78px;
            }

            .glass-image-self {
              object-fit: contain;
            }
          }

          .glass-name {
            text-align: center;
            white-space: nowrap;
          }
        }

        .glass-door-type-item {
          .ant-radio-group {
            display: flex;

            .ant-radio-wrapper {
              > span:nth-child(2) {
                width: 186px;
              }
            }
          }

          .ant-upload-wrapper {
            width: 100px;
            //height: 22.78px;
          }

          .glass-door {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100px;
            //height: 22.78px;

            .door-image {
              width: 100px;
              //height: 22.78px;
            }
          }
        }
      }
    }
  }

  .upload-file {
    height: 100%;
  }

  .ant-drawer-footer {
    .drawer-footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}

.form_head_2 {
  .lcd-logo {
    width: 116.49px !important;
    height: 160px !important;

    img {
      width: 116.49px !important;
      height: 200px !important;
      object-fit: contain;
    }

    .ant-upload-wrapper {
      width: 116.49px !important;
      height: 200px !important;
    }

    .upload-file {
      height: 200px !important;
    }
  }

  .lcd-display-type-item {
    .ant-radio-group {
      .ant-radio-wrapper {
        > span:nth-child(2) {
          display: flex;
          width: 186px;
          height: 200px !important;
        }
      }
    }

    .ant-upload-wrapper {
      //width: 100px;
      //height: 291.84px !important;
    }

    .lcd-logo {
      //width: 100px;
      //height: 291.84px !important;

      .lcd-image {
        //width: 100px;
        //height: 291.84px !important;
      }
    }
  }
}
</style>
