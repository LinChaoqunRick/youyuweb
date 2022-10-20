<template>
  <div class="route-items" v-for="route in _routes">
    <div class="route-item">
      <NavLink :route="route"/>
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import router from "@/router";

  import NavLink from "./child/NavLink.vue"

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
      !route.meta?.hide && route.meta?.title && routesObj.push(obj);
    })
  }

  generateRoute(routes, _routes.value);
</script>

<style lang="scss" scoped>
  .route-items {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .route-item {
      position: relative;
      cursor: pointer;
      color: inherit;
      width: 52px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      .y-dropdown {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          .y-dropdown-children {
            display: block;

            &:hover {
              display: block;
            }
          }
        }
      }

      .y-dropdown-children {
        display: none;
        width: 90px;
        background-color: var(--youyu-navigation);
        position: absolute;
        top: 50px;
        left: -18px;
        text-align: center;
        border-radius: 2px;
        box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);
        transition: .3s;

        .child-item {
          padding: 6px;
        }
      }

      a {
        color: #909090;
      }
    }
  }
</style>

<style lang="scss">
  .youyu-menu-dropdown {
    .ant-dropdown-menu-item {
      padding: 5px 30px !important;
    }
  }
</style>
