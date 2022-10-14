<template>
  <header id="header">
    <div class="menu-nav">
      <Logo/>
      <Menu/>
    </div>
    <div class="right-nav">
      <Search/>
      <Create/>
      <ThemeSwitch/>
      <Login/>
    </div>
  </header>
</template>

<script setup>
  import Logo from "@/components/common/header/logo/Logo.vue";
  import Menu from "@/components/common/header/menu/Menu.vue";
  import ThemeSwitch from "@/components/common/theme/ThemeSwitch.vue";
  import Create from "@/components/common/header/create/Create.vue";
  import Login from "@/components/common/header/login/Login.vue";
  import Search from "@/components/common/header/search/Search.vue";
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--youyu-navigation);
    border-bottom: var(--youyu-navigation-border);
    color: #909090;
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 16px;

    .menu-nav {
      display: flex;
      align-items: center;
    }

    .right-nav {
      display: flex;
      align-items: center;
    }
  }
</style>

<style lang="scss" scoped>
  ::v-deep(.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title) {
    padding: 5px 30px !important;;
  }

  header {
    z-index: 100;
  }

  .menu-nav {
    .main-logo {
      margin-right: 10px;
    }
  }

  .right-nav {
    margin-right: 26px;

    .search, .create, .theme-switch {
      margin-right: 16px;
    }

  }
</style>
