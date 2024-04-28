<template>
  <div class="nav-link" v-if="route?.children.length">
    <a-dropdown :getPopupContainer="triggerNode=>triggerNode.parentNode"
                placement="bottom" overlayClassName="route-dropdown">
      <div class="route-dropdown-trigger">
        <RouterLink :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
          <div :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}">
            <span>{{ route.title }}</span>
            <i-down theme="outline" size="14" fill="currentColor"/>
          </div>
        </RouterLink>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in route.children">
            <RouterLink :to="item.path" custom v-slot="{isActive, isExactActive, navigate}">
              <a :href="item.path" :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
                 @click="onRouteClick($event, isActive, isExactActive, navigate)">
                <span>{{ item.title }}</span>
              </a>
            </RouterLink>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <div class="nav-link nav-link-single" v-else>
    <RouterLink :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
      <a :href="route.path" :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
         @click="onRouteClick($event, isActive, isExactActive, navigate)">
        <span>{{ route.title }}</span>
      </a>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import {RouterLink} from 'vue-router';

const prop = defineProps({
  route: {
    type: Object,
    required: true
  }
})

const onRouteClick = (e: Event, isActive, isExactActive, navigate) => {
  e.preventDefault();
  if (!isActive) {
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

  a, .i-icon, div {
    transition: .3s;
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

      a, .i-icon, div {
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
