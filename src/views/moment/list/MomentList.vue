<template>
  <div class="moment-list">
    <div class="moment-list-left mr-8">
      <div class="moment-list-left-menu" v-aside3>
        <div v-for="menu in menuList" class="menu-item">
          <RouterLink :to="menu.path">
            <component :is="menu.icon" theme="filled" size="16" fill="currentColor" />
            <span>{{ menu.title }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="moment-list-center mr-8">
      <MomentEditor @saveSuccess="saveSuccess" />
      <EmptyPage ref="EmptyPageRef" />
    </div>
    <div class="moment-list-right">
      <UserPanelMoment v-aside3 />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MomentList',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import EmptyPage from '@/components/common/system/EmptyPage.vue';
import MomentEditor from '../components/MomentEditor.vue';
import UserPanelMoment from '@/views/moment/components/UserPanelMoment.vue';

const route = useRoute();
const menuList = [
  {
    title: '最新',
    path: '/moment/list/new',
    icon: 'i-time',
  },
  {
    title: '热门',
    path: '/moment/list/hot',
    icon: 'i-fire',
  },
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

  .moment-list-left {
    position: relative;
    width: 180px;

    .moment-list-left-menu {
      width: 180px;
      background-color: var(--youyu-background1);
      border-radius: 4px;
      padding: 8px 8px 35px 8px;

      .menu-item {
        font-size: 16px;

        span {
          font-weight: normal !important;
        }

        a {
          color: inherit;
          display: inline-block;
          height: 100%;
          width: 100%;
          padding: 8px 12px;
          border-radius: 4px;

          &.router-link-active {
            background-color: var(--youyu-body-background-5);
            color: #1890ff !important;

            .i-icon {
              color: #1890ff !important;
            }
          }
        }

        .i-icon {
          margin-right: 8px;
          color: #8a919f;
        }
      }
    }
  }

  .moment-list-center {
    width: 824px;
  }

  .moment-list-right {
    position: relative;
    width: 280px;
  }
}
</style>
