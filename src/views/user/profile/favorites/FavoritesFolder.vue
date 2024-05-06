<template>
  <div class="collect-list">
    <div class="list-body">
      <ContentData url="listFavorites" :params="listParams" v-slot="{data}" ref="ContentDataRef">
        <div v-for="(item, index) in data" class="article-item" :key="item.id">
          {{ item }}
        </div>
      </ContentData>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import ContentData from "@/components/common/system/ContentData.vue";

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
