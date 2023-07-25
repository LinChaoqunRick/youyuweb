<template>
  <a-spin :spinning="spinning" tip="加载中...">
    <PostEditor :formValidate="formValidate" @handleSubmit="handleSubmit"/>
  </a-spin>
</template>

<script lang="ts" setup>
  import {computed, ref, toRaw} from 'vue';
  import {useStore} from "vuex";
  import {onBeforeRouteLeave, useRoute, useRouter} from "vue-router";
  import PostEditor from "./PostEditor.vue";
  import type {postData} from "@/types/post";
  import {notification} from "ant-design-vue";
  import {cloneDeep} from 'lodash';

  const {getters, dispatch} = useStore();
  const route = useRoute();
  const router = useRouter();

  const userInfo = computed(() => getters['userInfo']);
  const formValidate = ref<postData>({
    id: null,
    title: '',
    content: '',
    categoryId: null,
    tags: [],
    thumbnail: ['https://youyu-source.oss-cn-beijing.aliyuncs.com/firstImages/default/defaultFirstPic.png'],
    summary: '',
    createType: '0',
    originalLink: '',
    userId: null,
    columnIds: null
  });
  const isSave = ref(false);
  const spinning = ref(true);

  const initData = () => {
    dispatch("getPostEditDetail", {postId: route.query.postId}).then(res => {
      formValidate.value = res.data;
      formValidate.value.tags = formValidate.value.tags ? formValidate.value.tags.split(",") : [];
      formValidate.value.thumbnail = formValidate.value.thumbnail?.split(",") ?? [];
      formValidate.value.columnIds = formValidate.value.columnIds?(formValidate.value.columnIds+'').split(",") : [];
    }).finally(() => {
      spinning.value = false;
    })
  }
  initData();

  const handleSubmit = (callback: Function) => {
    const form = cloneDeep(formValidate.value);
    form.tags = form.tags.join(",");
    form.thumbnail = form.thumbnail.join(",");
    form.columnIds = form.columnIds.join(",");
    if (!form.title || !form.content) {
      notification.error({
        message: '发布失败',
        description: '文章标题与内容不能为空'
      })
      callback();
      return;
    }
    dispatch("updatePost", form).then(res => {
      notification.success({
        message: '修改成功',
        description: '你的文章已经成功修改'
      })
      isSave.value = true;
      router.replace({name: 'PostDetail', params: {postId: form.id}})
    }).finally(() => {
      callback();
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
