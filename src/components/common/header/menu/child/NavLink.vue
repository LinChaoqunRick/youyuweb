<template>
  <div class="nav-link" v-if="route?.children?.length">
    <a-dropdown
      :getPopupContainer="triggerNode => triggerNode.parentNode"
      placement="bottom"
      overlayClassName="route-dropdown"
    >
      <div class="route-dropdown-trigger">
        <RouterLink :to="route.path" custom v-slot="{ isActive, isExactActive, navigate }">
          <div
            :class="{
              'router-link-active': route.exact ? isExactActive : isActive,
              'router-link-exact-active': route.exact ? isExactActive : isActive,
            }"
          >
            <span>{{ route.title }}</span>
            <i-down theme="outline" size="14" fill="currentColor" />
          </div>
        </RouterLink>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in route.children" :key="item.path">
            <RouterLink :to="item.path" custom v-slot="{ isActive, isExactActive, navigate }">
              <a
                :class="{
                  'router-link-active': route.exact ? isExactActive : isActive,
                  'router-link-exact-active': item.exact ? isExactActive : isActive,
                }"
                :href="item.path"
                @click="onRouteClick($event, isActive, isExactActive, navigate)"
              >
                <span>{{ item.title }}</span>
              </a>
            </RouterLink>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <div class="nav-link nav-link-single" v-else>
    <RouterLink :to="route.path" custom v-slot="{ isActive, isExactActive, navigate }">
      <div
        :class="{
          'nav-link-item': true,
          'cp': true,
          'router-link-active': route.exact ? isExactActive : isActive,
          'router-link-exact-active': route.exact ? isExactActive : isActive,
        }"
        @click="onRouteClick($event, isActive, isExactActive, navigate)"
      >
        <slot>
          <span>{{ route.title }}</span>
        </slot>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from './types';
import type { PropType } from 'vue';

defineProps({
  route: {
    type: Object as PropType<NavLink>,
    required: true,
  },
});

const onRouteClick = (e: Event, isActive: boolean, isExactActive: boolean, navigate: Function) => {
  e.preventDefault();
  if (!isExactActive) {
    navigate();
  }
};
</script>

<style lang="scss" scoped>
.nav-link {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a,
  .i-icon,
  div {
    transition: 0.3s;
    color: var(--youyu-text2);
  }

  .route-dropdown-trigger {
    a {
      display: flex;
      align-items: center;
    }

    .i-icon {
      margin-left: 2px;
    }
  }

  &:hover {
    .route-dropdown-trigger {
      a,
      .i-icon,
      div {
        color: #1890ff !important;
      }
    }
  }
}

.nav-link-single {
  &:hover {
    a {
      color: #1890ff !important;
    }
  }
}
</style>

<style lang="scss">
.route-dropdown {
  width: 90px;
  /*position: absolute;
  top: 50px !important;
  text-align: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, .12);
  z-index: 9999;*/

  .ant-dropdown-menu {
    //padding: 0;

    .route-dropdown-item {
      &:hover {
        color: #1890ff !important;
      }
    }
  }
}
</style>
