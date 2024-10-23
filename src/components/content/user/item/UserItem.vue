<template>
  <div class="user-item">
    <div class="user-left">
      <RouterLink :to="`/user/${props.data.id}`">
        <img :src="data.avatar"/>
      </RouterLink>
    </div>
    <div class="user-mid">
      <RouterLink :to="`/user/${props.data.id}`">
        <div class="user-nickname">{{data.nickname}}</div>
      </RouterLink>
      <div class="user-signature">{{data.signature}}</div>
    </div>
    <div class="user-right">
      <a-button type="primary" @click="handleFollow" v-if="!(userInfo.id === data.id)">
        {{props.data.follow ? '取消关注' : '关注'}}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, inject} from 'vue';
  import {useStore} from "vuex";
  import {useRouter, RouterLink} from "vue-router";
  import {message} from "ant-design-vue";

  const router = useRouter();
  const {getters, commit, dispatch} = useStore();
  const isLogin = computed(() => getters['isLogin']);

  const userInfo = computed(() => getters['userInfo']);

  const props = defineProps({
    data: {
      type: Object
    }
  })

  const handleFollow = () => {
    if (!isLogin.value) {
      commit("changeLogin", true);
      return;
    }
    if (props.data.follow) { // 已经关注了，取消关注
      dispatch("cancelUserFollow", {
        userId: userInfo.value.id,
        userIdTo: props.data.id
      }).then(res => {
        props.data.follow = false;
        message.success("已取消关注")
      })
    } else { // 还没有关注，关注
      dispatch("setUserFollow", {
        userId: userInfo.value.id,
        userIdTo: props.data.id
      }).then(res => {
        props.data.follow = true;
        message.success("已添加关注")
      })
    }
  }
</script>

<style lang="scss" scoped>
  .user-item {
    display: flex;
    align-items: center;
    height: 80px;
    background-color: var(--youyu-body-background2);
    padding: 0 12px;

    .user-left {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }

    .user-mid {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 12px 16px;
      flex: 1;

      a {
        color: inherit;
      }

      .user-nickname {
        flex: 1;
        font-size: 16px;
        line-height: 28px;
        font-weight: bold;
        cursor: pointer;
      }

      .user-signature {
        flex: 1;
        font-size: 12px;
        line-height: 28px;
        color: var(--youyu-body-text1);
      }
    }
  }
</style>
