<template>
  <div class="column-item">
    <div class="column-cover">
      <img :src="data.cover"/>
    </div>
    <div class="column-data">
      <div class="column-title">
        <div class="column-is-top" v-if="data.isTop==='1'">
          <i-to-top theme="outline" size="12" fill="#1890ff"/>
          置顶
        </div>
        <div class="title-text">{{data.title}}</div>
      </div>
      <div class="column-content">{{data.content}}</div>
      <div class="column-info">
        {{data.createTime}}
        <span class="info-separator">/</span>
        4篇文章
        <span class="info-separator">/</span>
        2人订阅
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  .column-item {
    cursor: pointer;
    display: flex;
    padding: 10px;

    .column-cover {
      height: 92px;
      width: 150px;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .column-data {
      position: relative;
      width: calc(100% - 166px);
      margin-left: 16px;
      box-sizing: border-box;
      border-bottom: 1px solid #e5e6eb;

      .column-title {
        width: 100%;
        display: flex;
        word-break: break-all;
        align-items: center;

        .column-is-top {
          flex: none;
          padding: 1px 4px 0 4px;
          font-size: 12px;
          font-weight: 400;
          width: 44px;
          height: 20px;
          border-radius: 2px;
          color: #1d7dfa;
          background: #f4f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
        }

        .title-text {
          vertical-align: middle;
          display: inline-block;
          flex: auto;
          font-size: 16px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .column-content {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        color: var(--youyu-body-text2);
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        margin: 8px 0;
      }

      .column-info {
        color: var(--youyu-body-text1);

        .info-separator {
          margin: 0 9px;
          font-weight: 700;
          font-size: 14px;
          line-height: 1;
          color: #86909c;
        }
      }
    }
  }
</style>
