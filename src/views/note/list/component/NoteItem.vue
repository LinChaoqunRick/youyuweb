<template>
  <div class="source-item">
    <div class="item-top">
      <div class="firstPic">
        <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
          <img :src="data.cover" :alt="data.name">
        </RouterLink>
        >
      </div>
      <div class="caption-top">{{ data.name }}</div>
      <div class="caption">{{ data.name }}</div>
    </div>
    <div class="item-bottom">
      <div class="item-info">
        <div class="item-data">
          <i-preview-open theme="outline" size="18" fill="currentColor" :strokeWidth="3"/>
          {{ data.viewCount }}
        </div>
        <div class="item-data">
          <i-list-view theme="outline" size="15" fill="currentColor" :strokeWidth="3"/>
          {{ data.chapterCount }}
        </div>
      </div>
      <div class="pubDate">{{ dayjs(data.createTime).format('YYYY-MM-DD') }}</div>
    </div>
  </div>
</template>

<script>
import {RouterLink} from "vue-router";
import dayjs from "dayjs";

export default {
  name: "data",
  computed: {
    dayjs() {
      return dayjs
    }
  },
  components: {RouterLink},
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.caption-top {
  position: absolute;
  top: -60px;
  height: 50px;
  width: 100%;
  background-color: #b1211f6b;
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

.source-item:hover .caption-top {
  top: 0;
}

.source-item:hover img {
  position: relative;
}
</style>

<style lang="scss" scoped>
.source-item {
  box-sizing: content-box;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.14);
  }

  padding: 16px 16px 4px;
  margin: 0 8px 10px 8px;
  height: 220px;
  width: 245px;
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);

  .item-top {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #f2f2f2;
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
      padding: 2px 0;
    }
  }

  .item-bottom {
    flex: 1;
    font-size: 13px;
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item-info {
      display: flex;

      .item-data {
        display: flex;
        align-items: center;

        .i-icon {
          margin-right: 4px;
        }

        &:nth-child(n+2) {
          margin-left: 12px;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .source-item {
    width: 300px;
  }
}
</style>
