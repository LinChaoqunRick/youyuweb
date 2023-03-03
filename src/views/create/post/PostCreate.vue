<template>
  <PostEditor :formValidate="formValidate" @handleSubmit="handleSubmit"/>
</template>

<script lang="ts" setup>
  import {reactive} from 'vue';
  import PostEditor from "./PostEditor.vue";
  import type {postData} from "@/types/create";

  const formValidate = reactive<postData>({
    title: '',
    content: '',
    categoryId: null,
    tags: [],
    thumbnail: [],
    summary: '',
    createType: '0',
    originalLink: ''
  })

  const handleSubmit = () => {
    console.log("handleSubmit");
  }

</script>

<style lang="scss" scoped>

</style>
