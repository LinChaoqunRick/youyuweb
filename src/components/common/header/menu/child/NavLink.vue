<template>
  <div class="nav-link" v-if="route?.children.length">
    <router-link :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
      <span :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}">{{route.title}}</span>
      <div class="route-dropdown">
        <div class="dropdown-arrow"></div>
        <div v-for="item in route.children" class="route-dropdown-item">
          <router-link :to="item.path" custom v-slot="{isActive, isExactActive, navigate}">
          <span :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
                @click="handleNavigate(isActive,isExactActive,navigate)">
            {{item.title}}
          </span>
          </router-link>
        </div>
      </div>
    </router-link>
  </div>
  <div class="nav-link" v-else>
    <router-link :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
      <span :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
            @click="handleNavigate(isActive,isExactActive,navigate)">{{route.title}}</span>
    </router-link>
  </div>
</template>

<script setup>
  const prop = defineProps({
    route: {
      type: Object,
      required: true
    }
  })

  function handleNavigate(isActive, isExactActive, navigate) {
    if (!isExactActive) {
      navigate();
    }
  }
</script>

<style lang="scss" scoped>
  .nav-link {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .route-dropdown {
      display: none;
      width: 80px;
      background-color: var(--youyu-navigation);
      position: absolute;
      top: 50px;
      text-align: center;
      border-radius: 2px;
      box-shadow: 0 0 6px rgba(0, 0, 0, .12);
      transition: .3s;

      .route-dropdown-item {
        padding-top: 6px;

        &:last-child {
          padding-bottom: 6px;
        }
      }

      .dropdown-arrow {
        position: absolute;
        top: -12px;
        left: calc(50% - 6px);
        height: 0;
        width: 0;
        border: 6px solid transparent;
        border-bottom-color: var(--youyu-navigation);;
      }
    }

    &:hover {
      .route-dropdown {
        display: block;
      }
    }
  }
</style>
