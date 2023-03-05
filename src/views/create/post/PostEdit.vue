<template>
  <PostEditor :formValidate="formValidate" @handleSubmit="handleSubmit"/>
</template>

<script lang="ts" setup>
  import {computed, ref, toRaw} from 'vue';
  import {useStore} from "vuex";
  import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
  import PostEditor from "./PostEditor.vue";
  import type {postData} from "@/types/post";
  import {notification} from "ant-design-vue";

  const {getters, dispatch} = useStore();
  const route = useRoute();
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
    userId: null
  });
  const isSave = ref(false);

  const initData = () => {
    dispatch("getPostEditDetail", {postId: route.query.postId}).then(res => {
      formValidate.value = res.data;
      formValidate.value.tags = formValidate.value.tags?.split(",") ?? [];
      formValidate.value.thumbnail = formValidate.value.thumbnail?.split(",") ?? [];
    })
  }
  initData();

  const handleSubmit = () => {
    const form = JSON.parse(JSON.stringify(toRaw(formValidate.value)));
    form.tags = form.tags.join(",");
    form.thumbnail = form.thumbnail.join(",");
    if (!form.title || !form.content) {
      notification.error({
        message: '发布失败',
        description: '文章标题与内容不能为空'
      })
      return;
    }
    dispatch("updatePost", form).then(res => {
      notification.success({
        message: '修改成功',
        description: '你的文章已经成功修改'
      })
      isSave.value = true;
      router.replace({name: 'postDetail', params: {postId: form.id}})
    })
  };

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
