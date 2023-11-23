<template>
  <div class="route-items" v-for="route in showRoutes">
    <div class="route-item">
      <NavLink :route="route"/>
    </div>
  </div>
</template>

<script setup>
  import {ref, toRef, watchEffect} from 'vue';
  import {useStore} from 'vuex';
  import {_routes} from "@/router/config/useGenerateRoutes";
  import NavLink from "./child/NavLink.vue";

  const routes = toRef(_routes, "value");
  const showRoutes = ref([]);
  const {dispatch} = useStore();

  watchEffect(() => {
    if (routes.value.length) {
      showRoutes.value = [];
      generateRoutes(routes.value, showRoutes.value);
    }
  })

  function generateRoutes(routes, _routes) {
    routes.forEach(route => {
      let obj = {
        name: route.name,
        title: route.meta?.title,
        path: route.path,
        children: []
      }
      route.children?.length && generateRoutes(route.children, obj.children)
      !route.meta?.hide && route.meta?.title && _routes.push(obj);
    })
  }

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
