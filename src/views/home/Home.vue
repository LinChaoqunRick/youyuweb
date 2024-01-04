<template>
  <button @click="onOpenSpin">Global Spin</button>
</template>

<script setup lang="ts">
import openSpin from "@/libs/tools/openSpin";

const onOpenSpin = () => {
  const closeSpin = openSpin({
    componentProps: {
      tip: "登录中...."
    }
  });

  setTimeout(() => {
    closeSpin();
  }, 3000)
}
</script>

<style scoped>

</style>
