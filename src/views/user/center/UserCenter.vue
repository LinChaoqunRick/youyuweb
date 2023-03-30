<template>
  <div class="user-center">
    <div class="center-aside aside">
      <div class="menu-items" v-aside3>
        <div v-for="item in menus" class="route-dropdown-item">
          <router-link :to="item.path" custom v-slot="{isActive, isExactActive, navigate}">
          <span :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
                @click="handleNavigate(isActive,isExactActive,navigate)">
            {{item.title}}
          </span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="center-content ml-8">
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
  const menus = [
    {title: '个人资料', path: '/profile'},
    {title: '账号设置', path: '/account'},
    {title: '消息通知', path: '/message'}
  ]
</script>

<style lang="scss" scoped>
  .user-center {
    display: flex;
    justify-content: center;
    margin: 8px 0;

    .center-aside {
      width: 300px;
      background-color: var(--youyu-body-background3);
    }

    .center-content {
      width: 64%;
    }
  }
</style>
