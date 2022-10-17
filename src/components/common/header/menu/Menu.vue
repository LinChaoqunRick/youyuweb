<template>
  <div class="route-items" v-for="item in _routes">
    <div class="route-item" v-if="item.children?.length">
      <router-link :to="item.path" custom v-slot="{ isActive, navigate, href, route }">
        <div class="y-dropdown">
          <span :class="{'router-link-active':isActive}">{{ item.title }}</span>
          <!--          <i-down theme="filled" size="18" fill="#909090" strokeLinejoin="miter"/>-->
          <div class="y-dropdown-children">
            <div v-for="child in item.children" class="child-item">
              <router-link :to="child.path">{{child.title}}</router-link>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <router-link class="route-item" :to={path:item.path} v-else>{{item.title}}</router-link>
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
