<template>
  <div class="route-items" v-for="route in _routes">
    <div class="route-item" v-if="route.children?.length">
      <a-dropdown placement="bottom">
        <router-link :to="route.path" class="ant-dropdown-link" @click.prevent>
          {{route.name}}
        </router-link>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="child in route.children">
              <router-link :to="child.path">{{child.name}}</router-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <router-link class="route-item" :to="route.path" v-else>{{route.name}}</router-link>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import router from "@/router";

  const routes = router.options.routes;
  let _routes = ref([]);

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
    _routes.value = _routes.value.filter(item => item.name);
  }

  generateRoute(routes, _routes.value);
  filterEmptyRouter();
</script>

<style lang="scss" scoped>
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
</style>
