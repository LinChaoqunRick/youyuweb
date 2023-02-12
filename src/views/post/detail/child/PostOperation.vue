<template>
  <div class="post-operation">
    <div class="ope-item">
      <i-good-two theme="filled" size="20" fill="currentColor"/>
    </div>
    <div class="ope-item">
      <i-comment theme="filled" size="18" fill="#8a919f"/>
    </div>
    <div class="ope-item">
      <i-star theme="filled" size="20" fill="#8a919f"/>
    </div>
    <div class="ope-item">
      <i-share-one theme="filled" size="20" fill="#8a919f"/>
    </div>
    <div class="ope-item">
      <i-caution theme="filled" size="18" fill="#8a919f"/>
    </div>
    <a-back-top>
      <div class="ope-item">
        <i-to-top-one theme="filled" size="20" fill="#8a919f"/>
      </div>
    </a-back-top>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
  .post-operation {
    .ope-item {
      height: 44px;
      width: 44px;
      background-color: var(--youyu-body-background3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 7px;
      cursor: pointer;
      fill: #8a919f;

      svg {
        fill: #8a919f;
      }

      &:hover {

      }
    }

    ::v-deep(.ant-back-top) {
      position: relative;
      top: 0;
      left: 0;
    }
  }
</style>
