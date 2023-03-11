<template>
  <div class="user-card">
    <div class="user-info">
      <img :src="user.avatar"/>
      <div class="user-info-basic">
        <div class="user-nickname">{{user.nickname}}</div>
        <div class="user-signature">{{user.signature}}</div>
      </div>
    </div>
    <div class="user-data">
      <div class="statis-data" v-for="item in dataItems" @click="handleClickStat(item)">
        <div class="data-value">{{user.extraInfo?.[item.value]}}</div>
        <div class="data-label">{{item.label}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {Modal} from "ant-design-vue";

  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })

  const dataItems = [
    {
      value: 'postCount',
      label: '原创'
    },
    {
      value: 'viewCount',
      label: '阅读'
    },
    {
      value: 'likeCount',
      label: '点赞'
    },
    {
      value: 'fansCount',
      label: '粉丝'
    }
  ]

  function handleClickStat(item: statData) {
    const {value} = item;
    if (value === 'viewCount') {
      Modal.info({
        content: `Ta的文章已被阅读${user.value.extraInfo[item.value]}次`,
      });
    } else if (value === 'likeCount') {
      Modal.info({
        content: `Ta共收获了${user.value.extraInfo[item.value]}个点赞`,
      });
    }
  }

</script>

<style lang="scss" scoped>
  .user-card {
    width: 240px;

    .user-info {
      padding-bottom: 8px;

      img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
      }

      .user-info-basic {
        margin-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .user-nickname {
          font-weight: bold;
          cursor: pointer;
        }

        .user-signature {
          font-size: 12px;
          color: #8f969c;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      display: flex;
    }

    .user-data {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 8px 0 2px 0;
      border-top: var(--youyu-border);

      .statis-data {
        flex: 1;
        position: relative;
        text-align: center;
        cursor: pointer;

        &:nth-child(n+2) {
          &:before {
            position: absolute;
            content: '';
            border-left: 1px solid #ebebeb;
            height: 20px;
            top: calc(60% - 10px);
            left: 0;
          }
        }

        .data-value {
          font-size: 20px;
          font-weight: bold;
        }

        .data-label {
          font-size: 14px;
        }
      }
    }
  }
</style>
