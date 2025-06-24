<template>
  <router-link v-slot="{ isActive, isExactActive, navigate }" :to="route?.path" custom>
    <div
      :class="{ 'router-link-active': isActive, 'router-link-exact-active': isExactActive }"
      @click="handleNavigate(isActive, isExactActive, navigate)"
    >
      <slot :route="route">
        {{ route?.title }}
      </slot>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
defineProps({
  route: {
    type: Object,
    required: true,
  },
});

function handleNavigate(isActive: boolean, isExactActive: boolean, navigate: Function) {
  if (!isExactActive) {
    navigate();
  }
}
</script>

<style scoped></style>
