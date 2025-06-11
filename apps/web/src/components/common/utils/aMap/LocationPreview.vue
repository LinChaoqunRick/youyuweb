<template>
  <div class="position-preview">
    <AMap :model-value="data" :search="false" :clickable="false" :geolocation="false"/>
    <div class="location-data">
      <div class="data-label">位置名称：</div>
      <div class="data-value">{{ data.name}}</div>
    </div>
  </div>
</template>

<script setup>
import AMap from "@/components/common/utils/aMap/AMap.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      longitude: '',
      latitude: '',
      address: '',
      zone: '',
      name: ''
    })
  }
})
</script>

<style scoped lang="scss">
.position-preview {
  height: 100%;
  width: 100%;

  ::v-deep(.map-wrapper) {
    height: 100%;
  }

  .location-data {
    position: absolute;
    left: 8px;
    right: 0;
    bottom: 4px;
    display: flex;
    align-items: center;
    height: 53px;
    padding: 0 16px;
    font-weight: bold;

    .data-label {
      &:nth-child(n+2) {
        margin-left: 16px;
      }
    }

    .data-value {
      color: #1890ff;
    }
  }
}
</style>
