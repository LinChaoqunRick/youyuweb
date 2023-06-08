<template>
  <PostEditor :formValidate="formValidate" @handleSubmit="handleSubmit"/>
</template>

<script lang="ts" setup>
  import {computed, ref, toRaw} from 'vue';
  import {useStore} from "vuex";
  import {onBeforeRouteLeave, useRouter} from "vue-router";
  import PostEditor from "./PostEditor.vue";
  import type {postData} from "@/types/post";
  import {notification} from "ant-design-vue";

  const {getters, dispatch} = useStore();
  const router = useRouter();

  const userInfo = computed(() => getters['userInfo']);
  const formValidate = ref<postData>({
    title: '',
    content: '',
    categoryId: null,
    tags: [],
    thumbnail: ['https://youyu-source.oss-cn-beijing.aliyuncs.com/firstImages/default/defaultFirstPic.png'],
    summary: '',
    createType: '0',
    originalLink: '',
    userId: userInfo.value.id
  });
  const isSave = ref(false);

  const handleSubmit = (callback: Function) => {
    const form = JSON.parse(JSON.stringify(toRaw(formValidate.value)));
    form.tags = form.tags.join(",");
    form.thumbnail = form.thumbnail.join(",");
    if (!form.title || !form.content) {
      notification.error({
        message: '发布失败',
        description: '文章标题与内容不能为空'
      })
      callback();
      return;
    }
    form.userId = userInfo.value.id;
    dispatch("createPost", form).then(res => {
      notification.success({
        message: '发布成功',
        description: '你的文章已经成功发布'
      })
      isSave.value = true;
      router.replace({name: 'postDetail', params: {postId: res.data}})
    }).finally(() => {
      callback();
    })
  }

  onBeforeRouteLeave((to, from) => {
    if (isSave.value) {
      return true;
    } else {
      const answer = window.confirm(
        '确定离开此页面？请确保您的变更已被保存!'
      )
      // 取消导航并停留在同一页面上
      if (!answer) return false
    }
  })

</script>

<style lang="scss" scoped>

</style>
