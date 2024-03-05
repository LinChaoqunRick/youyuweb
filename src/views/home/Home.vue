<template>
<!--  <a-button  @click="onOpenSpin">Global Spin</a-button>-->
<!--  <a-button @click="success">Customized display duration</a-button>-->
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue';
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

const success = () => {
  message.success(
    'This is a prompt message for success, and it will disappear in 10 seconds',
    10,
  );
};
</script>

<style scoped>

</style>
