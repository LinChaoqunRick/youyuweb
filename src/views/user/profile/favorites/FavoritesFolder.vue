<template>
  <div class="collect-list">
    <a-button class="add-btn" type="text">ÐÂÔö</a-button>
    <div class="list-body">
      <ContentData url="listFavorites" :params="listParams" v-slot="{data}" ref="ContentDataRef">
        <FavoritesItem v-for="item in data" :data="item" :key="item.id"/>
      </ContentData>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import ContentData from "@/components/common/system/ContentData.vue";
import FavoritesItem from '@/views/user/profile/favorites/components/FavoritesItem.vue';

const user = inject('user');
const listParams = computed(() => ({
  userId: user.value.id,
}))

</script>

<style lang="scss" scoped>
.collect-list {
  padding-bottom: 6px;

  .list-body {
    .article-item {
      border-top: 1px solid var(--youyu-border-color);

      button {
        font-size: 13px;
      }
    }
  }
}
</style>
