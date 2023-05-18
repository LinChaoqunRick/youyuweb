<template>
  <div class="not-found">
    <img src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/error/404Error.png"/>
    <p class="error-text text1">哎呀，你访问的页面不存在！</p>
    <p class="error-text text2">你输入的网址有误或链接已经过期</p>
    <a-button type="primary" ghost size="large" @click="$router.replace('/')">返回首页</a-button>
  </div>
</template>

<script>
  export default {
    name: "404"
  }
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
      height: 50%;
    }

    .error-text {
      color: #29AAE3;
    }

    .text1 {
      font-size: 24px;
      margin-bottom: 0;
    }

    .text2 {
      font-size: 16px;
    }

    button {
      width: 200px;
      font-weight: bold;
      letter-spacing: 1px;

      &:hover {
        background-color: #1890ff;
        color: #ffffff;
      }
    }
  }
</style>
