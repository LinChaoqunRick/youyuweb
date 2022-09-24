<template>
  <header>
    <div class="route-items" v-for="route in _routes">
      <div class="route-item" v-if="route.children?.length">
        <a-dropdown placement="bottom">
          <router-link :to="route.path" class="ant-dropdown-link" @click.prevent>
            {{route.name}}
          </router-link>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="child in route.children">
                <router-link :to="child.path" tag="div">{{child.name}}</router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <router-link class="route-item" :to="route.path" v-else tag="div">{{route.name}}</router-link>
    </div>
    <ThemeSwitch/>
    <Create/>
  </header>
</template>

<script setup>
  import router from "@/router";
  import {ref, reactive} from 'vue';

  import ThemeSwitch from "@/components/common/theme/ThemeSwitch.vue";
  import Create from "@/components/common/header/child/Create.vue";

  const routes = router.options.routes;
  let _routes = [];

  function generateRoute(routes, routesObj, parent) {
    routes.forEach((route) => {
      let obj = {
        name: route.name,
        path: `${parent ? parent.path + '/' + route.path : route.path}`,
        children: []
      };
      route.children?.length && generateRoute(route.children, obj.children, route);
      routesObj.push(obj);
    })
  }

  function filterEmptyRouter() {
    _routes = _routes.filter(item => item.name);
  }

  generateRoute(routes, _routes);
  filterEmptyRouter();
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--youyu-navigation);
    border-bottom: var(--youyu-navigation-border);
    color: #909090;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 16px;

    .route-items {
      .route-item {
        cursor: pointer;
        color: inherit;
        width: 52px;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          color: #909090;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  ::v-deep(.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title) {
    padding: 5px 30px !important;;
  }
</style>
