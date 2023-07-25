<template>
  <div class="post-column">
    <div class="column-left">
      <img :src="data.cover"/>
    </div>
    <div class="column-right">
      <div class="column-top">
        <div class="column-title text-limit">{{ data.title }}</div>
        <div class="include-text-inner">已收录</div>
      </div>
      <div class="column-content text-limit">{{ data.content }}</div>
      <div class="column-info">
        <span class="info-item">{{ data.postNum }}篇文章</span>
        <span class="info-item">{{ data.subscriberNum }}人订阅</span>
        <a-button class="subscribe-btn" type="primary" size="small" :danger="data.subscribe" @click="onSubscribe">
          {{ data.subscribe ? '取消订阅' : '订阅专栏' }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {useStore} from "vuex";
  import type {PropType} from "vue";
  import type {column} from "@/views/user/profile/column/type";

  const props = defineProps({
    data: {
      type: Object as PropType<column>
    }
  })

  const {dispatch} = useStore();

  const loading = ref<boolean>(false);

  const onSubscribe = () => {
    if (loading.value) return;
    loading.value = true;
    const isSubscribe = props.data.subscribe;
    dispatch(isSubscribe ? "cancelPostLike" : "setPostLike", {
      columnId: props.data.id,
    }).then(res => {
      if (isSubscribe) {
        props.data.subscribe = false;
        props.data.subscriberNum -= 1;
      } else {
        props.data.subscribe = true;
        props.data.subscriberNum += 1;
      }
    }).finally(() => {
      loading.value = false;
    })
  }
</script>

<style scoped lang="scss">
  .post-column {
    display: flex;
    position: relative;
    background-color: var(--youyu-background1);
    border-radius: 4px;
    cursor: pointer;
    box-shadow: var(--youyu-shadow2);
    z-index: 2;
    overflow: hidden;

    .column-left {
      height: 70px;
      width: 110px;
      margin: 8px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }

    .column-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 4px 8px 4px 4px;
      overflow: hidden;

      .column-top {
        font-size: 16px;

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
          &:nth-child(n+2) {
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
