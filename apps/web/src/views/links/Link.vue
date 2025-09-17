<template>
  <div class="links-wrapper">
    <LinkItem v-for="item in linkList" :key="item.id" :data="item" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import LinkItem from '@/views/links/LinkItem.vue';
import type { Link } from '@youyu/shared/types/vo';

const { dispatch } = useStore();

const linkList = ref<Link[]>([]);

function initData() {
  dispatch('getLinkList', { pageSize: -1 }).then(res => {
    linkList.value = res.data.list;
  });
}

initData();
</script>

<style lang="scss" scoped>
.links-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 每列最多 4 行 */
  grid-auto-rows: 120px;
  gap: 12px; /* 行列间距 */
  place-items: center center;
  height: calc(100vh - 100px);
  padding: 20px 50px 0;
  overflow: auto;
  background-color: var(--youyu-body-background1);
}
</style>
SHOW STATUS LIKE 'Threads_connected';
