<template>
  {{ data }}
  <div class="note-item">
    <div class="item-left">
      <img :src="data.cover"/>
    </div>
    <div class="item-right">
      <div class="note-title">{{ data.name }}</div>
      <div class="note-introduce">{{ data.introduce }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
})

</script>

<style scoped lang="scss">
.note-item {
  display: flex;
  padding: 12px;
  background-color: var(--youyu-background1);

  .item-left {
    img {
      height: 140px;
      width: 210px;
      object-fit: cover;
    }
  }

  .item-right {
    flex: 1;
    padding-left: 12px;

    .note-title {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
