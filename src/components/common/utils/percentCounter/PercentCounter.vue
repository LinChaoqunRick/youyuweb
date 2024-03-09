<template>
  <div class="percent-counter" :style="{width: `${percent}%`}"></div>
</template>

<script setup>
  import {ref, onMounted, onUnmounted} from 'vue';
  import {useResizeObserver} from '@vueuse/core'

  const props = defineProps({
    elementId: {
      type: String,
      default: ''
    }
  })

  const percent = ref(0);
  let element;

  function handleScroll() {
    let hideHeight, value;
    if (props.elementId) {
      hideHeight = element.scrollHeight - element.offsetHeight;
      value = hideHeight > 0 ? element.scrollTop / hideHeight * 100 : 0;
    } else {
      hideHeight = document.documentElement.scrollHeight - window.innerHeight;
      value = hideHeight > 0 ? document.documentElement.scrollTop / hideHeight * 100 : 0;
    }
    percent.value = value > 100 ? 100 : value;
  }

  function addListener() {
    if (props.elementId) {
      element.addEventListener("scroll", handleScroll, false);
    } else {
      document.addEventListener("scroll", handleScroll, false);
    }
  }

  function removeListener() {
    if (props.elementId) {
      element.removeEventListener("scroll", handleScroll, false);
    } else {
      document.removeEventListener("scroll", handleScroll, false);
    }
  }

  onMounted(() => {
    element = props.elementId ? document.getElementById(props.elementId) : null;
    const observeElement = props.elementId ? element : document.documentElement;
    useResizeObserver(observeElement, (entries) => {
      handleScroll();
    })
    addListener();
  })
  onUnmounted(() => {
    removeListener();
  })
</script>

<style lang="scss" scoped>
  .percent-counter {
    height: 2px;
    width: 0;
    position: absolute;
    background-color: #1980ff;
    bottom: -1px;
    left: 0;
  }
</style>
