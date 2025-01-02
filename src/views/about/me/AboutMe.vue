<template>
  <div>
    <button @click="onClick">click me!</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AMap from '@/components/common/utils/aMap/AMap.vue';

const location = ref({
  longitude: '',
  latitude: '',
  address: '',
  zone: '',
});

function onClick() {
  console.log(111);
  logMsg();
  console.log(333);
}

function logMsg() {
  console.log(222);
  throw new Error('This is an error');
}
</script>

<style lang="scss" scoped></style>
