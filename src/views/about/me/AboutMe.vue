<template>
  <AMap v-model="location"/>
</template>

<script setup>
import {ref} from 'vue';
import AMap from "@/components/common/utils/aMap/AMap.vue";

const location = ref({
  longitude: '',
  latitude: '',
  address: '',
  zone: '',
})

</script>

<style lang="scss" scoped>

</style>

