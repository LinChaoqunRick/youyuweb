<template>
  <div class="post-operation">
    <div class="ope-item">
      <i-good-two theme="filled" size="21" fill="currentColor"/>
    </div>
    <div class="ope-item" @click="scrollToComment">
      <i-comment theme="filled" size="19" fill="currentColor"/>
    </div>
    <div class="ope-item">
      <i-star theme="filled" size="21" fill="currentColor"/>
    </div>
    <div class="ope-item">
      <i-share-one theme="filled" size="21" fill="currentColor"/>
    </div>
    <div class="ope-item">
      <i-caution theme="filled" size="19" fill="currentColor"/>
    </div>
    <a-back-top>
      <div class="ope-item" ref="item">
        <i-to-top-one theme="filled" size="21" fill="currentColor"/>
      </div>
    </a-back-top>
  </div>
</template>

<script lang="ts" setup>
  import {scrollToEle} from "@/assets/utils/utils";
  import {ref} from "vue";

  const item = ref(null);

  function scrollToComment() {
    const commentEl: HTMLElement | null = document.querySelector("#post-comment-id");
    commentEl && scrollToEle(commentEl.offsetTop - 100);
  }

</script>

<style lang="scss" scoped>
  .post-operation {
    .ope-item {
      height: 4rem;
      width: 4rem;
      background-color: var(--youyu-body-background3);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 7px;
      cursor: pointer;
      color: #8a919f;

      &:hover {
        .i-icon {
          color: #545457;
        }
      }
    }

    ::v-deep(.ant-back-top) {
      position: relative;
      top: 0;
      left: 0;
    }
  }
</style>
