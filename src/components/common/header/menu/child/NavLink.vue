<template>
  <div class="nav-link" v-if="route?.children.length">
    <a-dropdown placement="bottom" overlayClassName="route-dropdown">
      <div class="route-dropdown-item">
        <RouterLink :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
          <span
            :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}">{{ route.title }}</span>
        </RouterLink>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in route.children">
            <RouterLink :to="item.path" class="route-dropdown-item">{{ item.title }}</RouterLink>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <div class="nav-link nav-link-single" v-else>
    <RouterLink :to="route.path">{{ route.title }}</RouterLink>
  </div>
</template>

<script setup>
import {RouterLink} from 'vue-router';

const prop = defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.nav-link {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--youyu-text2);
  transition: 0s !important;

  .dropdown-arrow {
    color: #324053;
  }

  a {
    color: inherit;
    font-size: 14px;

    &:hover {
      color: #1890ff;
    }
  }

  &:hover {
    .route-dropdown {
      display: block;
    }

    .dropdown-arrow {
      transform: translateY(-3px);

      &:before {
        transform: rotate(45deg) translateX(3.5px);
      }

      &:after {
        transform: rotate(-45deg) translateX(-3.5px);
      }
    }
  }
}

.nav-link-single {
  transition: .3s;

  &:hover {
    color: #1890ff;
  }
}
</style>

<style lang="scss">
.route-dropdown {
  display: none;
  width: 80px;
  background-color: var(--youyu-navigation);
  position: absolute;
  top: 50px;
  text-align: center;
  border-radius: 2px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  transition: 0s !important;

  .ant-dropdown-menu {
    padding: 0;
  }

  .route-dropdown-item {
    &:hover {
      color: #1890ff !important;
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
</style>
