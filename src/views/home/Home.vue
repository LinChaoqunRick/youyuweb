<template>
  <div class="home">
    <div class="home-welcome" :style="`height:${height}px`">
      <div class="lottie-container" ref="lottieContainer">
        <img src="/static/images/background/home-image.svg" alt=""/>
      </div>
      <div class="main-menus">
        <div class="menu-item">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import lottie from 'lottie-web';
// import animationData from '/static/lottie/9o43xBeH3z.json';
// import animationData from '/static/lottie/YSJWwy0cVx.json';
import {onMounted, ref} from "vue";

// const lottieContainer = ref(null);
const height = ref(0);

// const loadAnimation = () => {
//   lottie.loadAnimation({
//     container: lottieContainer.value,
//     renderer: 'svg', // 或者 'canvas'
//     loop: true,
//     autoplay: true,
//     animationData: animationData // 导入的动画 JSON 数据
//   });
// }

onMounted(() => {
  height.value = window.innerHeight - 60;
  // loadAnimation();
})
</script>

<style lang="scss" scoped>
.home {
  .home-welcome {
    position: relative;
    background-color: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;

    .lottie-container {
      position: absolute;
      top: 0;
      right: 0;
      height: 80%;
      max-height: 357px;

      img {
        max-height: 100%;
      }
    }

    .main-menus {
      position: absolute;
      bottom: 40px;
      padding-left: 80px;

      .menu-item {
        border: 2px solid var(--youyu-border-color);
        height: 70px;
        width: 220px;
        border-radius: 4px;
      }
    }
  }
}
</style>
