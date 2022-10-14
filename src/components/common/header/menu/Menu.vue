<template>
  <div class="route-items" v-for="route in _routes">
    <div class="route-item" v-if="route.children?.length">
      <a-dropdown placement="bottom" overlayClassName="youyu-menu-dropdown">
        <router-link :to="route.path" class="ant-dropdown-link" @click.prevent>
          {{route.title}}
        </router-link>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="child in route.children">
              <router-link :to="child.path">{{child.title}}</router-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <router-link class="route-item" :to={path:route.path} v-else>{{route.title}}</router-link>
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
        title: route.meta?.title,
        path: `${parent ? parent.path + '/' + route.path : route.path}`,
        children: []
      };
      route.children?.length && generateRoute(route.children, obj.children, route);
      route.meta?.hide !== true && routesObj.push(obj);
    })
  }

  function filterEmptyRouter() {
    _routes.value = _routes.value.filter(item => item.title);
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

<style lang="scss">
  .youyu-menu-dropdown{
    .ant-dropdown-menu-item {
      padding: 5px 30px!important;
    }
  }
</style>
