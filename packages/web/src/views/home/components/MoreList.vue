<template>
  <div class="more-list">
    <RouterLink to="/about/me" class="more-item cp">
      <img src="/static/images/illustration/work.png" alt="">
      <div class="item-name">关于作者</div>
    </RouterLink>
    <RouterLink to="/about/updateLogs" class="more-item cp">
      <img src="/static/images/illustration/log.png" alt="">
      <div class="item-name">更新日志</div>
    </RouterLink>
    <a href="https://github.com/LinChaoqunRick/youyuweb/issues" target="_blank" class="more-item cp">
      <img src="/static/images/illustration/report.png" alt="">
      <div class="item-name">汇报Bug</div>
    </a>
    <div class="more-item cp">
      <img src="/static/images/illustration/more.png" alt="">
      <div class="item-name">更多内容，敬请期待</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.more-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px 80px 80px 80px;

  img {
    height: 180px;
    width: 180px;
    border-radius: 50%;
  }

  .item-name {
    margin-top: 20px;
    font-size: 18px;
    color: var(--youyu-text5);
  }
}
</style>
