<template>
  <a :href="data.address" class="link-item cp" target="_blank">
    <div class="link-item-avatar">
      <img :src="data.avatar" alt="">
    </div>
    <div class="link-item-info">
      <div class="info-name">
        {{ data.name }}
      </div>
      <div class="info-description">
        {{ data.description }}
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Link } from '@youyu/shared/types/vo';

defineProps({
  data: {
    type: Object as PropType<Link>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.link-item {
  display: inline-flex;
  align-items: center;
  width: 320px;
  height: 90px;
  padding: 0 20px;
  color: var(--youyu-text);
  background-color: var(--youyu-background1);
  border-radius: 8px;

  img {
    width: 50px;
    height: 50px;
    border: 2px solid var(--youyu-border-color);
    border-radius: 50%;
  }

  .link-item-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .info-name {
      font-size: 18px;
      font-weight: bold;
    }

    .info-description {
      color: var(--youyu-text1);
    }
  }
}
</style>
