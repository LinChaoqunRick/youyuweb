<template>
  <MyInput a="1" b="2" c="3" v-model="val" ref="myInputRef">
    <template #prefix>
      prefix
    </template>
    <template #suffix>
      suffix
    </template>
  </MyInput>
</template>

<script setup lang="ts">
import MyInput from '@/views/about/site/MyInput.vue';
import { onMounted, ref } from 'vue';

const myInputRef = ref(null);

onMounted(() => {
  console.log(myInputRef.value?.focus);
  myInputRef.value?.focus();
});
</script>

