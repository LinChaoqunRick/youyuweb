<template>
  <div>
    me
    <input v-model="meValue"/>
  </div>
</template>

<script>
  export default {
    name: "AboutMe",
    data(){
      return{
        meValue: ''
      }
    }
  }
</script>

<style scoped>

</style>
