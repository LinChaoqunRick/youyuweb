<template>
  <div class="moment-list">
    <div class="moment-middle">
      <UserMomentList url="momentListFollowing" v-if="isLogin" ref="UserMomentListRef"/>
      <div v-else class="login-hit mt-8">
        <div class="hint-text">登录以后可以查看好友的时刻</div>
        <a-button type="primary" v-login>立即登录</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "MomentListFollow"
  }
</script>

<script setup lang="ts">
  import {computed, ref} from 'vue';
  import {useStore} from "vuex";
  import UserMomentList from "@/views/moment/list/UserMomentList.vue";

  const {getters, dispatch} = useStore();

  const UserMomentListRef = ref(null);
  const isLogin = computed(() => getters['isLogin'])

</script>

<style lang="scss" scoped>
  .moment-list {
    display: flex;
    justify-content: center;

    .moment-middle {
      width: 100%;

      .login-hit {
        text-align: center;
        background-color: var(--youyu-background1);
        border-radius: 4px;
        padding: 20px;

        .hint-text {
          color: var(--youyu-text2);
          padding-bottom: 12px;
        }

        .ant-btn {
          display: inline-block;
        }
      }
    }
  }
</style>
