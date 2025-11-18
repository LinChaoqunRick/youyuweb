<template>
  <div class="moment-list">
    <div class="moment-list-center mr-8">
      <MomentEditor @save-success="saveSuccess" />
      <EmptyPage ref="EmptyPageRef" />
    </div>
    <div class="moment-list-right mr-8">
      <div v-side-fixed>
        <announcement />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Announcement from '@/components/common/share/announcement/index.vue';
import EmptyPage from '@/components/common/system/EmptyPage.vue';

import MomentEditor from '../components/MomentEditor.vue';

const route = useRoute();
const menuList = [
  {
    title: '最新',
    path: '/moment/list/new',
    icon: 'i-time',
  },
  /*{
    title: '热门',
    path: '/moment/list/hot',
    icon: 'i-fire',
  },*/
  {
    title: '关注',
    path: '/moment/list/follow',
    icon: 'i-concern',
  },
  {
    title: '我的',
    path: '/moment/list/me',
    icon: 'i-user',
  },
];
const EmptyPageRef = ref<typeof EmptyPage>(null);

const saveSuccess = data => {
  if (route.name === 'MomentListNew') {
    EmptyPageRef.value.Component.unshiftItem(data);
  }
};
</script>

<style lang="scss" scoped>
.moment-list {
  display: flex;
  justify-content: center;
  padding: 8px 0;

  .moment-list-right {
    position: relative;
    width: 290px;
  }

  .moment-list-center {
    width: 850px;
  }
}
</style>
