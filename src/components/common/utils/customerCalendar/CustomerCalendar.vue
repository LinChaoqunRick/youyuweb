<template>
  <div class="customer-calendar">
    <div class="image-container">
      <img :src="imgList[2]"/>
      <div class="date-container">
        <div class="month">{{month}}</div>
        <div class="day">{{day}}</div>
      </div>
    </div>
    <div class="date-today">
      <span class="date-item">{{day}}</span>
      <span class="date-item">{{month}}</span>
      <span class="date-item">{{year}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const imgList = [
    "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/calendar/20221030100624.jpg",
    "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/calendar/20221030100634.jpg",
    "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/calendar/20221030100639.jpg",
    "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/calendar/20221030100642.jpg",
    "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/calendar/20221030100646.jpg",
    "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/calendar/20221030100649.jpg"
  ];
  const monthEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec"];
  const date = new Date();
  const year = date.getFullYear();
  const month = monthEn[date.getMonth()];
  const day = date.getDate();

</script>

<style lang="scss" scoped>
  .customer-calendar {
    width: 300px;
    height: 380px;
    background-color: var(--article-background);
    border-radius: 8px;
    padding: 24px 26px;

    .image-container {
      position: relative;
      height: 320px;

      .date-container {
        width: 48px;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-36%, -36%);
        text-align: center;

        .month {
          background-color: #1890ff;
          font-family: DM Sans, sans-serif;
          color: #fff;
          border-radius: 6px 6px 0 0;
        }

        .day {
          backdrop-filter: blur(4px);
          color: #fff;
          font-family: DM Sans, sans-serif;
          background-color: #0006;
        }
      }

      img {
        height: 100%;
        width: 100%;
        /*object-fit: cover;*/
      }
    }

    .date-today {
      margin-top: 6px;
      height: 30px;
      width: 100%;
      color: rgba(0, 0, 0, 0.6);
      font-family: DM Sans, sans-serif;
      font-size: 13px;
      font-weight: 500;
      text-align: center;

      .date-item {
        font-weight: bold;

        &:nth-child(n+2) {
          &:before {
            content: '/';
            color: rgba(0, 0, 0, 0.4);
            padding: 0 6px;
          }
        }
      }
    }
  }
</style>
