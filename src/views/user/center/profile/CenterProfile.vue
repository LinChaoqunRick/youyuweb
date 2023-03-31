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
          <a-form-item name="birthday" label="生日" v-bind="config">
            <a-date-picker v-model:value="formValidate.birthday" value-format="YYYY-MM-DD"/>
          </a-form-item>
          <a-form-item label=" " class="submit-btn">
            <a-button type="primary">保存修改</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, reactive} from "vue";
  import {useStore} from "vuex";

  const {dispatch, getters} = useStore();

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
      console.log(res);
      formValidate.value = res.data;
    });
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
        background-color: skyblue;
      }
    }
  }
</style>
