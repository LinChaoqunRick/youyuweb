<template>
  <button @click="handleClick">请求一次Hello</button>
</template>

<script setup>
  import {useStore} from 'vuex';

  const {dispatch} = useStore();

  function handleClick() {
    dispatch("helloTest1").then(res => {
      console.log(res);
    })
  }
</script>

<style scoped>

</style>
