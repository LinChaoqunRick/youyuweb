<template>
  <div class="column-item-mini">
    <div class="column-left">
      <img :src="data.cover+'?x-oss-process=style/tinyThumb'"/>
    </div>
    <div class="column-right">
      <div class="column-title" :title="data.title">{{data.title}}</div>
      <div class="column-info">
        <span class="info-item">{{data.postNum}}篇文章</span>
        <span class="info-item">{{data.subscriberNum}}人订阅</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object
    }
  })

</script>

<style lang="scss" scoped>
  .column-item-mini {
    display: flex;
    align-items: center;
    height: 60px;

    .column-left {
      height: 56px;
      width: 90px;

      img {
        height: 100%;
        width: 100%;
        cursor: pointer;
        object-fit: cover;
      }
    }

    .column-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: calc(100% - 90px);
      padding: 4px 0 4px 8px;
      height: 100%;

      .column-title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }

      .column-info {
        font-size: 13px;
        color: var(--youyu-body-text1);
        cursor: pointer;

        .info-item {
          &:nth-child(n+2) {
            &:before {
              content: '/';
              color: #e1e1e1;
              padding: 0 5px;
            }
          }
        }
      }
    }
  }
</style>
