<template>
  <div class="change-homepage">
    <a-form
      ref="formRef"
      :model="formValidate"
      :colon="false"
      :rules="rulesRef"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="note-form"
    >
      <div class="note-left">
        <a-form-item label="主页地址" name="homepage">
          <a-input v-model:value="formValidate.homepage" show-count :maxlength="100" />
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue';
import type { PropType } from 'vue';
import { checkDomain } from '@youyu/shared/utils/antdv-validate';
import { message } from 'ant-design-vue';
import { useStore } from 'vuex';
import type { User } from '@/types/user';

const modal = inject('modal');
const labelCol = { span: 4 };
const wrapperCol = { span: 20 };
const formRef = ref();
const { dispatch } = useStore();

const props = defineProps({
  user: {
    type: Object as PropType<User>,
  },
});

const formValidate = reactive({
  id: props.user.id,
  homepage: props.user.homepage,
});

const rulesRef = {
  homepage: [{ required: false, validator: checkDomain, trigger: 'change' }],
};

function beforeConfirm(done) {
  modal.confirmLoading = true;
  dispatch('saveHomepage', formValidate)
    .then(res => {
      done();
      message.success('保存成功');
    })
    .finally(() => {
      modal.confirmLoading = false;
    });
}

defineExpose({
  beforeConfirm,
});
</script>

<style scoped></style>
