<template>
  <div class="note-item">
    <div class="item-top">
      <div class="firstPic">
        <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
          <img :src="data.cover" :alt="data.name">
        </RouterLink>
      </div>
      <div class="caption-top">{{ data.name }}</div>
      <div class="caption">{{ data.name }}</div>
    </div>
    <div class="item-bottom">
      <div class="item-info">
        <RouterLink :to="{name:'userNote', params: {userId: data.user.id, page: 1}}" class="item-data">
          <img :src="data.user.avatar"/>
          <div class="user-nickname text-limit">{{ data.user.nickname }}</div>
        </RouterLink>
        <div class="item-data">
          <i-preview-open theme="outline" size="18" fill="currentColor" :strokeWidth="3"/>
          {{ data.viewCount }}
        </div>
        <div class="item-data">
          <i-list-view theme="outline" size="15" fill="currentColor" :strokeWidth="3"/>
          {{ data.chapterCount }}
        </div>
      </div>
      <div class="pubDate">
        <i-calendar theme="outline" size="15" fill="currentColor" :strokeWidth="3"/>
        {{ dayjs(data.createTime).format('YYYY-MM-DD') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {RouterLink} from "vue-router";
import dayjs from "dayjs";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.caption-top {
  position: absolute;
  top: -60px;
  height: 50px;
  width: 100%;
  background-color: #1890ff6b;
  transition: .2s;
}

.firstPic img {
  position: relative;
  top: 0;
  height: 160px;
  width: 100%;
  cursor: pointer;
  transition: .2s;
  object-fit: cover;
}

.note-item:hover .caption-top {
  top: 0;
}

.note-item:hover img {
  position: relative;
}
</style>

<style lang="scss" scoped>
.note-item {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.14);
  }

  padding: 16px 16px 4px;
  width: 270px;
  background-color: var(--youyu-background1);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);

  .item-top {
    position: relative;
    width: 100%;
    border-bottom: 1px solid var(--youyu-border-color);
    overflow: hidden;

    .caption-top {
      padding: 3px 6px;
      font-size: 13px;
      color: #fff;
    }

    .firstPic {
      overflow: hidden;
      height: 160px;
    }

    .caption {
      overflow: hidden;
      color: var(--youyu-text2);
      font-size: 18px;
      padding: 4px 0;
    }
  }

  .item-bottom {
    flex: 1;
    font-size: 13px;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 4px;

    .item-info {
      display: flex;

      .item-data {
        display: flex;
        align-items: center;

        img {
          height: 22px;
          width: 22px;
          border-radius: 50%;
        }

        .user-nickname {
          font-size: 12px;
          margin-left: 4px;
          color: #1890ff;
          max-width: 120px;
          overflow: hidden;
        }

        .i-icon {
          margin-right: 4px;
        }

        &:nth-child(n+2) {
          margin-left: 12px;
        }
      }
    }

    .pubDate {
      display: flex;
      align-items: center;

      .i-icon {
        margin-right: 2px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .note-item {
    width: 300px;
  }
}
</style>
