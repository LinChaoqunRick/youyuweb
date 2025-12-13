<template>
  <a :href="data.address" class="link-item cp" target="_blank">
    <img :src="data.avatar" alt="">
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
  width: 240px;
  height: 70px;
  padding: 0 16px;
  color: var(--youyu-text);
  background-color: var(--youyu-background1);
  border: 1px solid var(--youyu-border-color);
  border-radius: 8px;

  img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .link-item-info {
    display: flex;
    flex-direction: column;
    margin-left: 12px;

    .info-name {
      font-size: 16px;
    }

    .info-description {
      font-size: 12px;
      color: var(--youyu-text1);
    }
  }
}
</style>
