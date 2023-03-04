<template>
  <PostEditor :formValidate="formValidate" @handleSubmit="handleSubmit"/>
</template>

<script lang="ts" setup>
  import {computed, reactive, toRaw} from 'vue';
  import {useStore} from "vuex";
  import PostEditor from "./PostEditor.vue";
  import type {postData} from "@/types/create";
  import {notification} from "ant-design-vue";

  const {getters, dispatch} = useStore();

  const userInfo = computed(() => getters['userInfo']);
  const formValidate = reactive<postData>({
    title: '',
    content: '',
    categoryId: null,
    tags: [],
    thumbnail: [],
    summary: '',
    createType: '0',
    originalLink: '',
    userId: null
  })

  const handleSubmit = () => {
    const form = JSON.parse(JSON.stringify(toRaw(formValidate)));
    form.tags = form.tags.join(",");
    form.thumbnail = form.thumbnail.join(",");
    if (!form.title || !form.content) {
      notification.error({
        message: '发布失败',
        description: '文章标题与内容不能为空'
      })
      return;
    }
    form.userId = userInfo.value.id;
    dispatch("createPost", form).then(res => {
      notification.success({
        message: '发布成功',
        description: '你的文章已经成功发布'
      })
    })
  }

</script>

<style lang="scss" scoped>

</style>
