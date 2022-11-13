<template>
  <div class="about-container">
    <MusicPlayer/>
  </div>
</template>

<script setup>
  import MusicPlayer from "@/components/common/utils/player/MusicPlayer.vue"
</script>

<style lang="scss" scoped>
  .about-container {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
</style>
