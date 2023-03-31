<template>
  <div class="user-center">
    <div class="center-aside aside">
      <div class="menu-items" v-aside3>
        <div v-for="item in menus" class="route-dropdown-item">
          <NavLink :route="item">
            <div class="menu-item">
              <component :is="item.icon"/>
              {{item.title}}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
    <div class="center-content ml-8">
      <router-view/>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavLink from "@/components/common/navgate/navLink/index.vue";

  const menus = [
    {title: '个人资料', path: '/user/center/profile', icon: 'i-user'},
    {title: '账号设置', path: '/user/center/account', icon: 'i-setting-two'},
    {title: '消息通知', path: '/user/center/message', icon: 'i-remind'}
  ]
</script>

<style lang="scss" scoped>
  .user-center {
    display: flex;
    justify-content: center;
    margin: 8px 0;

    .center-aside {
      width: 240px;

      .menu-items {
        background-color: var(--youyu-background1);
        padding: 8px;

        .route-dropdown-item {

          .menu-item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 44px;
            cursor: pointer;

            .i-icon {
              margin-right: 8px;
            }
          }

          ::v-deep(.router-link-active) {
            background-color: #e8f3ff;
            border-radius: 4px;
          }
        }
      }
    }

    .center-content {
      width: 58%;
      background-color: var(--youyu-background1);
    }
  }
</style>
