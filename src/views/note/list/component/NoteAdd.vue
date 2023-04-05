<template>
  <div>
    NoteAdd
  </div>
</template>

<script>
  export default {
    name: "NoteAdd",
    methods: {
      beforeConfirm(done) {
        console.log("beforeConfirm");
        done();
      }
    }
  }
</script>

<style scoped>

</style>
