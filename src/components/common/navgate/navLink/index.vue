<template>
  <router-link :to="route.path" custom v-slot="{isActive, isExactActive, navigate}">
    <div :class="{'router-link-active':isActive, 'router-link-exact-active':isExactActive}"
         @click="handleNavigate(isActive,isExactActive,navigate)">
      <slot :route="route">
        {{route.title}}
      </slot>
    </div>
  </router-link>
</template>

<script setup lang="ts">
  const props = defineProps({
    route: {
      type: Object,
      requires: true
    }
  })

  function handleNavigate(isActive, isExactActive, navigate) {
    if (!isExactActive) {
      navigate();
    }
  }
</script>

<style scoped>

</style>
