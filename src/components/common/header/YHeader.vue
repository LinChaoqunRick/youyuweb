<template>
  <header>
    <div class="menu-nav">
      <Logo/>
      <Menu/>
    </div>
    <div class="right-nav">
      <Search/>
      <CreateCenter/>
      <ThemeSwitch/>
      <Login/>
    </div>
  </header>
</template>

<script setup>
  import Logo from "@/components/common/header/logo/Logo.vue";
  import Menu from "@/components/common/header/menu/Menu.vue";
  import ThemeSwitch from "@/components/common/theme/ThemeSwitch.vue";
  import CreateCenter from "@/components/common/header/create/CreateCenter.vue";
  import Login from "@/components/common/header/login/Login.vue";
  import Search from "@/components/common/header/search/Search.vue";
</script>

<style lang="scss" scoped>
  header {
    background-color: var(--youyu-header-background);
    border-bottom: var(--youyu-navigation-border);
    color: #909090;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;
    background-image: radial-gradient(transparent 1px,var(--youyu-background1) 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);

    .menu-nav {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .right-nav {
      display: flex;
      align-items: center;
    }
  }
</style>

<style lang="scss" scoped>

  .menu-nav {
    .main-logo {
      margin-right: 10px;
    }
  }

  .right-nav {
    height: 100%;

    .search, .create, .theme-switch {
      margin-right: 16px;
    }

  }
</style>
