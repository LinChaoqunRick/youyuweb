<template>
  <FavoritesEditor :formValidate="formValidate" ref="editor"/>
</template>

<script setup lang="ts">
import { computed, ref, inject, type PropType } from 'vue';
import {useStore} from "vuex";
import type {FavoritesType} from "@/views/user/profile/favorites/type";
import FavoritesEditor from "@/views/user/profile/favorites/components/FavoritesEditor.vue";
import {message} from "ant-design-vue";

const modal = inject('modal');
const userInfo = computed(() => getters['userInfo']);
const {getters, dispatch} = useStore();
const editor = ref();
const props = defineProps({
  formValidate: Object as PropType<FavoritesType>
})

async function beforeConfirm(done: Function) {
  const form = await editor.value.getFormData();
  if (form) {
    modal.confirmLoading = true;
    dispatch("updateFavorites", props.formValidate).then(res => {
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
