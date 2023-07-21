<template>
  <div class="column-add">
    <ColumnEditor :formValidate="formValidate"/>
  </div>
</template>

<script setup lang="ts">
  import ColumnEditor from "./ColumnEditor.vue";
  import {ref} from "vue";
  import type {column} from "@/views/user/profile/column/type";

  const formValidate = ref<column>({
    title: '',
    content: '',
    cover: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/login/loginImg.jpg',
  })
</script>

<style scoped>

</style>
