<template>
  <div class="theme-switch">
    <div class="switch-button" @click="handleSwitch">
      <transition name="fade" mode="out-in">
        <icon-sun-one v-if="theme === 'light'" type="AddText" theme="filled"/>
        <icon-moon v-else type="AddText" theme="filled"/>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    name: "ThemeSwitch",
    computed: {
      ...mapGetters(['currentTheme'])
    },
    data() {
      return {
        theme: "light"
      }
    },
    methods: {
      ...mapMutations(['changeTheme']),
      initData() {
        this.theme = localStorage.getItem("theme") || 'light';
        document.documentElement.setAttribute("theme", this.theme);
      },
      handleSwitch() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.changeTheme(this.theme);
      }
    },
    created() {
      this.initData();
    }
  }
</script>

<style lang="scss" scoped>
  .theme-switch {
    .switch-button {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      background-color: skyblue;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;

      .i-icon-sun-one {
        color: yellow;
      }
    }
  }
</style>
