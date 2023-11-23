<template>
  <div class="nav-link" v-if="route?.children.length">
    <a-dropdown :getPopupContainer="triggerNode=>triggerNode.parentNode"
                placement="bottom" overlayClassName="route-dropdown">
      <div class="route-dropdown-trigger">
        <RouterLink :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
          <a :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}">{{ route.title }}</a>
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

  a{
    color: var(--youyu-text2);
  }

  &:hover {
    .route-dropdown {
      display: block;
    }

    .route-dropdown-trigger {
      color: #1890ff !important;
    }
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

  .ant-dropdown-menu {
    padding: 0;
  }
}
</style>
