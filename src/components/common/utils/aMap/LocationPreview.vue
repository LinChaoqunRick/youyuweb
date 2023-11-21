<template>
  <div class="position-preview">
    <AMap :model-value="data" :search="false" :clickable="false" :geolocation="false"/>
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
}
</style>
