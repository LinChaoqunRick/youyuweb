<template>
  <div class="not-found">
    <img src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/error/404Error.png" alt="404"/>
    <p class="error-text text1">哎呀，你访问的页面不存在！{{ time }}秒后返回首页</p>
    <p class="error-text text2">你输入的网址有误或链接已经过期</p>
    <a-button type="primary" size="large" @click="$router.replace('/')">返回首页</a-button>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const time = ref(5);

const interval = setInterval(() => {
  time.value--;
  if (time.value <= 0) {
    clearInterval(interval);
    router.replace("/");
  }
}, 1000)
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  background-color: var(--youyu-background1);

  img {
    position: relative;
    top: -16px;
    height: 40%;
  }

  .error-text {
    color: #29AAE3;
  }

  .text1 {
    font-size: 28px;
    margin-bottom: 0;
  }

  .text2 {
    font-size: 18px;
  }

  button {
    margin-top: 40px;
    width: 200px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: 2px;

    &:hover {
      background-color: #1890ff;
      color: #ffffff;
    }
  }
}
</style>
