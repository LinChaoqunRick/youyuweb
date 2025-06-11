<template>
  <div class="post-select-collect">
    <a-checkbox v-for="item in favoritesList" :checked="form.favoritesId == item.id" @click="onCheck(item)">
      <FavoritesItem :data="item" :show-more-btn="false" />
    </a-checkbox>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { ref, reactive, type PropType, computed, inject } from 'vue';
import type { FavoritesType } from '@/views/user/profile/favorites/type';
import FavoritesItem from '@/views/user/profile/favorites/components/FavoritesItem.vue';
import { message } from 'ant-design-vue';
import type { Post, PostCollect } from '@/views/post/detail/types';

const { dispatch, getters } = useStore();
const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true
  },
  setPostAttribute: {
    type: Function
  }
});

const modal = inject('modal');
const userInfo = computed(() => getters['userInfo']);
const favoritesList = ref<FavoritesType[]>();

const form: PostCollect = reactive({
  postId: props.post.id,
  userId: userInfo.value.id,
  userIdTo: props.post.userId,
  favoritesId: ''
});

const initData = async () => {
  await dispatch('listFavorites').then(res => {
    favoritesList.value = res.data;
  });

  await dispatch('getPostCollectInfo', {
    postId: props.post.id,
    userId: userInfo.value.id
  }).then(res => {
    const data = res.data;
    if (!data) {
      form.favoritesId = favoritesList.value[0].id;
    } else {
      form.favoritesId = data.favoritesId;
    }
  });
};

initData();

async function beforeConfirm(done: Function) {
  modal.confirmLoading = true;
  dispatch('setPostCollect', form)
    .then(res => {
      done();
      if (props.post.postCollect && !form.favoritesId) {
        message.success('取消收藏成功');
        props.setPostAttribute('collectCount', props.post.collectCount - 1);
        props.setPostAttribute('postCollect', false);
      } else {
        message.success('收藏成功');
        if (!props.post.postCollect) {
          props.setPostAttribute('collectCount', props.post.collectCount + 1);
        }
        props.setPostAttribute('postCollect', true);
      }
    })
    .finally(() => {
      modal.confirmLoading = false;
    });
}

const onCheck = (item: FavoritesType) => {
  form.favoritesId = form.favoritesId == item.id ? null : item.id;
};

defineExpose({
  beforeConfirm
});
</script>

<style scoped lang="scss">
.post-select-collect {
  ::v-deep(.favorites-item) {
    height: 65px;
  }

  ::v-deep(.ant-checkbox-wrapper) {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    span {
      &:nth-child(n + 2) {
        flex: 1;
        overflow: hidden;
      }

      .favorites-item {
        background-color: transparent;
      }
    }
  }
}
</style>
