<template>
  <div class="position-selector">
    <AMap v-model="location"/>
    <div class="location-data">
      <div class="data-label">位置名称：</div>
      <div class="data-value">{{ location?.name || '- - -'}}</div>
      <div class="data-label">位置详情：</div>
      <div class="data-value">{{ location?.address || '- - -'}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import type {PropType} from 'vue';
import AMap from "@/components/common/utils/aMap/AMap.vue";

interface LocationInfo {
  longitude: '',
  latitude: '',
  address: '',
  zone: '',
  name: ''
}

const props = defineProps({
  data: {
    type: Object as PropType<LocationInfo>,
    default: () => ({
      longitude: '',
      latitude: '',
      address: '',
      zone: '',
      name: ''
    })
  }
})


const location = ref({
  longitude: '',
  latitude: '',
  address: '',
  zone: '',
  name: ''
})

location.value = props.data;

const beforeConfirm = (done: Function) => {
  done(location.value);
}

defineExpose({
  beforeConfirm
})
</script>

<style scoped lang="scss">
.position-selector {
  height: 100%;
  width: 100%;

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
