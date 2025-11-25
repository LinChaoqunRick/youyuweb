<template>
  <div class="main-logo">
    <img src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/logo_280x120.png" alt="">
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  border-radius: 4px;

  img {
    width: 112px;
    height: 48px;
    object-fit: cover;
    filter: var(--youyu-logo-showdow);
  }
}
</style>
