<template>
  <div class="post-column">
    <RouterLink target="_blank" :to="{ name: 'ColumnDetail', params: { columnId: data.id } }" class="column-left">
      <img :src="data.cover" />
    </RouterLink>
    <div class="column-right">
      <div class="column-top">
        <RouterLink
          target="_blank"
          :to="{ name: 'ColumnDetail', params: { columnId: data.id } }"
          class="column-title text-limit"
        >
          {{ data.title }}
        </RouterLink>
        <div class="include-text-inner">已收录</div>
      </div>
      <RouterLink
        target="_blank"
        :to="{ name: 'ColumnDetail', params: { columnId: data.id } }"
        class="column-content text-limit"
      >
        {{ data.content }}
      </RouterLink>
      <div class="column-info">
        <span class="info-item">{{ data.postNum }}篇文章</span>
        <span class="info-item">{{ data.subscriberNum }}人订阅</span>
        <a-button class="subscribe-btn" type="primary" size="small" :danger="data.subscribe" v-login="onSubscribe">
          {{ data.subscribe ? '取消订阅' : '订阅专栏' }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import type { PropType } from 'vue';
import type { Column } from '@/views/user/profile/column/type';

const props = defineProps({
  data: {
    type: Object as PropType<Column>,
    required: true,
  },
});

const { dispatch } = useStore();
const loading = ref<boolean>(false);

const onSubscribe = () => {
  if (loading.value) return;
  loading.value = true;
  const isSubscribe = props.data.subscribe;
  dispatch(isSubscribe ? 'cancelPostLike' : 'setPostLike', {
    columnId: props.data.id,
  })
    .then(res => {
      if (isSubscribe) {
        props.data.subscribe = false;
        props.data.subscriberNum -= 1;
      } else {
        props.data.subscribe = true;
        props.data.subscriberNum += 1;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped lang="scss">
.post-column {
  display: flex;
  position: relative;
  background-color: var(--youyu-background1);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: var(--youyu-shadow2);
  z-index: 2;
  overflow: hidden;
  padding: 8px;

  .column-left {
    height: 80px;
    width: 120px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
  }

  .column-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 8px;
    overflow: hidden;

    .column-top {
      font-size: 16px;

      a {
        color: inherit !important;
      }

      .column-title {
        padding-right: 50px;
      }

      .include-text-inner {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 13px;
        border-radius: 0 0 0 12px;
        background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
        color: white;
        padding: 2px 10px;
      }
    }

    .column-content {
      color: var(--youyu-text2);
    }

    .column-info {
      font-size: 13px;
      color: var(--youyu-text1);

      .info-item {
        &:nth-child(n + 2) {
          &:before {
            content: '/';
            color: #e1e1e1;
            padding: 0 5px;
          }
        }
      }

      .subscribe-btn {
        margin-left: 12px;
      }
    }
  }
}
</style>
