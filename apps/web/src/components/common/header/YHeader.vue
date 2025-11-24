<template>
  <header>
    <div class="menu-nav">
      <Logo />
      <Menu />
    </div>
    <div class="right-nav">
      <Search />
      <CreateCenter />
      <ThemeSwitch />
      <Login />
    </div>
  </header>
</template>

<script setup>
import CreateCenter from '@/components/common/header/create/CreateCenter.vue';
import Login from '@/components/common/header/login/Login.vue';
import Logo from '@/components/common/header/logo/Logo.vue';
import Menu from '@/components/common/header/menu/Menu.vue';
import Search from '@/components/common/header/search/Search.vue';
import ThemeSwitch from '@/components/common/theme/ThemeSwitch.vue';
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding-left: 16px;
  color: #909090;
  background-color: var(--youyu-header-background);

  // background-image: radial-gradient(transparent 1px,var(--youyu-background1) 1px);
  background-size: 4px 4px;
  border-bottom: var(--youyu-navigation-border);
  backdrop-filter: saturate(50%) blur(4px);

  .menu-nav {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .right-nav {
    display: flex;
    align-items: center;
    padding-right: 16px;
  }
}
</style>

<style lang="scss" scoped>
.menu-nav {
  .main-logo {
    margin: 0 16px;
  }
}

.right-nav {
  height: 100%;

  .search,
  .create-center,
  .theme-switch {
    margin-right: 16px;
  }
}
</style>
