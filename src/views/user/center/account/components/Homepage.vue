<template>
  <div class="my-homepage">
    <a-form :model="formValidate" :colon="false" :rules="rulesRef" :label-col="labelCol" :wrapper-col="wrapperCol"
            ref="formRef" class="note-form">
      <div class="note-left">
        <a-form-item label="主页地址" name="homepage">
          <a-input v-model:value="formValidate.homepage" show-count :maxlength="100"/>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import {ref, reactive, inject} from "vue";
  import type {PropType} from 'vue';
  import type {userType} from "@/types/user";
  import {useStore} from "vuex";
  import {message} from "ant-design-vue";
  import {checkDomain} from "@/libs/validate/validate";

  const modal = inject('modal');
  const labelCol = {span: 4};
  const wrapperCol = {span: 20};
  const formRef = ref();
  const {dispatch} = useStore();

  const props = defineProps({
    user: {
      type: Object as PropType<userType>
    }
  })

  const formValidate = reactive({
    id: props.user.id,
    homepage: props.user.homepage
  })

  const rulesRef = {
    homepage: [
      {required: false, validator: checkDomain, trigger: 'change'}
    ],
  };

  function beforeConfirm(done) {
    modal.confirmLoading = true;
    dispatch("saveHomepage", formValidate).then(res => {
      done();
      message.success("保存成功");
    }).finally(() => {
      modal.confirmLoading = false;
    })
  }

  defineExpose({
    beforeConfirm
  })
</script>

<style scoped>

</style>
