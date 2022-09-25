<template>
  <a-dropdown-button type="primary" :trigger="['click']" overlayClassName="create-container">
    创作盒
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <icon-write/>
          写博客
        </a-menu-item>
        <a-menu-item key="2">
          <icon-notes/>
          写随笔
        </a-menu-item>
        <a-menu-item key="3">
          <icon-newspaper-folding/>
          草稿箱
        </a-menu-item>
      </a-menu>
    </template>
    <template #icon><icon-down/></template>
  </a-dropdown-button>
</template>

<script>
  export default {
    name: "Create"
  }
</script>

<style lang="scss">
  .create-container {

    .ant-dropdown-content {
      width: 106px !important;

      .ant-dropdown-menu {
        border-radius: 6px;
      }

      .ant-dropdown-menu-title-content {
        display: flex;
        justify-content: center;
        align-items: center;

        .i-icon {
          font-size: 16px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
