<template>
  <div class="more-list">
    <RouterLink v-for="item in moreList" :to="item.path" class="more-item cp">
      <img :src="'/static/images/illustration/' + item.image" :alt="item.name">
      <div class="item-name">{{ item.name }}</div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
const moreList = [
  {
    name: '关于作者',
    image: 'work.png',
    path: '/about/me'
  },
  {
    name: '更新日志',
    image: 'log.png',
    path: '/about/updateLogs'
  },
  {
    name: '汇报Bug',
    image: 'report.png',
    path: ''
  },
  {
    name: '更多内容，敬请期待',
    image: 'more.png',
    path: ''
  }
]
</script>

<style scoped lang="scss">
.more-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 80px 40px 80px;

  img {
    height: 260px;
    width: 260px;
    border-radius: 50%;
  }

  .item-name {
    margin-top: 20px;
    font-size: 18px;
    color: var(--youyu-text5);
  }
}
</style>
