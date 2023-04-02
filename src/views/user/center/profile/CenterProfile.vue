<template>
  <div class="center-profile">
    <div class="center-title">
      个人资料
    </div>
    <div class="center-content">
      <div class="content-form">
        <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
                ref="formRef">
          <a-form-item label="昵称" name="nickname">
            <a-input v-model:value="formValidate.nickname" show-count :maxlength="20"/>
          </a-form-item>
          <a-form-item name="sex" label="性别">
            <a-radio-group v-model:value="formValidate.sex">
              <a-radio :value="0">男生</a-radio>
              <a-radio :value="1" class="girl-radio-item">女生</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="个人描述" name="signature">
            <a-textarea
              v-model:value="formValidate.signature"
              :rows="3"
              show-count
              :maxlength="100"
            />
          </a-form-item>
          <a-form-item name="birthday" label="生日">
            <a-date-picker v-model:value="formValidate.birthday" value-format="YYYY-MM-DD"/>
          </a-form-item>
          <a-form-item label=" " class="submit-btn">
            <a-button type="primary" @click="onSubmit">保存修改</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="content-right">
        <div class="user-avatar">
          <img :src="formValidate.avatar"/>
          <UploadFile @uploadSuccess="uploadSuccess">
            <div class="upload-box">
              <i-add-one theme="outline" size="22" fill="#fff"/>
              <div class="upload-text">上传头像</div>
            </div>
          </UploadFile>
        </div>
        <div class="avatar-text">我的头像</div>
        <div class="avatar-tips">
          支持 jpg、png、jpeg 格式大小 5M 以内的图片
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, reactive} from "vue";
  import {useStore} from "vuex";
  import {message} from "ant-design-vue";
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';

  const {getters, commit, dispatch} = useStore();

  const userInfo = computed(() => getters['userInfo']);
  const labelCol = {span: 4};
  const wrapperCol = {span: 20};
  const formValidate = ref({});

  const rulesRef = {
    nickname: [
      {
        required: true,
        message: '请输入昵称',
      },
    ],
    sex: [
      {
        required: true,
        message: '请选择性别',
      },
    ],
  };

  function initData() {
    dispatch("getUserById", {userId: userInfo.value.id}).then(res => {
      formValidate.value = res.data;
    });
  }

  function uploadSuccess(fileList: []) {
    const url = fileList[0].url;
    formValidate.value.avatar = url;
  }

  async function onSubmit() {
    await dispatch("saveBasicInfo", formValidate.value).then(res => {
      message.success("保存成功!");
    })
    // 保存成功后更新Vuex数据
    await dispatch("getUserById", {userId: formValidate.value.id}).then(res => {
      commit("changeUser", res.data);
    })
  }

  initData();
</script>

<style lang="scss" scoped>
  .center-profile {
    padding: 10px 16px;

    .center-title {
      font-size: 18px;
      font-weight: bold;
    }

    .center-content {
      display: flex;
      padding: 30px 0;

      .content-form {
        flex: 1;
        padding-right: 20px;

        .girl-radio-item {
          ::v-deep(.ant-radio) {
            &.ant-radio-checked {
              .ant-radio-inner {
                border-color: #f18b9b;

                box-shadow: 0 0 0 2.5px rgba(241, 139, 155, 0.2);

                &::after {
                  background-color: #f18b9b;
                }
              }
            }
          }
        }
      }

      .content-right {
        width: 260px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .user-avatar {
          position: relative;
          height: 100px;
          width: 100px;
          border: 1px dashed #1890ff;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;

          .upload-box {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;

            .i-icon {
              margin-bottom: 3px;
            }

            .upload-text {
              font-size: 13px;
            }
          }

          &:hover {
            .upload-box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          }

          img {
            height: 100%;
            width: 100%;
          }
        }

        .avatar-text {
          margin: 6px 0;
        }

        .avatar-tips {
          width: 160px;
          font-size: 13px;
          color: var(--youyu-text1);
        }
      }
    }
  }
</style>
