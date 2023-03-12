<template>
  <footer class="y-footer" id="footer">
    <div class="copyright">Copyright© 2020-{{year}}有语</div>
    <a class="mitt" href="https://beian.miit.gov.cn">闽ICP备2021002248号-1 </a>
  </footer>
</template>

<script>
  export default {
    name: "YFooter",
    setup() {
      let year = (new Date()).getFullYear();
      return {
        year
      }
    }
  }
</script>

<style lang="scss" scoped>
  .y-footer {
    background-color: var(--youyu-navigation);
    border-top: var(--youyu-navigation-border);
    color: #909090;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    .copyright {
      margin-right: 16px;
    }
  }
</style>
