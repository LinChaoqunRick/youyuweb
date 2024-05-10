<template>
  <FavoritesEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
import {computed, ref, inject} from "vue";
import {useStore} from "vuex";
import type {FavoritesType} from "@/views/user/profile/favorites/type";
import FavoritesEditor from "@/views/user/profile/favorites/components/FavoritesEditor.vue";
import {message} from "ant-design-vue";

const modal = inject('modal');
const userInfo = computed(() => getters['userInfo']);
const {getters, dispatch} = useStore();
const editor = ref();
const formValidate = ref<FavoritesType>({
  name: '',
  open: 1
})

async function beforeConfirm(done: Function) {
  const form = await editor.value.getFormData();
  if (form) {
    formValidate.value.userId = userInfo.value.id;
    modal.confirmLoading = true;
    dispatch("createFavorites", formValidate.value).then(res => {
      done();
      message.success("保存成功");
    }).finally(() => {
      modal.confirmLoading = false;
    })
  }
}

defineExpose({
  beforeConfirm
})
</script>

<style scoped>

</style>
