<template>
  <div class="home">
    <div class="home-welcome">
      <div class="welcome-lead">
        <div class="home-content">
          <div class="author-info">
            <img class="author-avatar cp" :src="authorInfo.avatar" alt="站长头像"/>
            <span class="author-nickname cp">{{ authorInfo.nickname }}</span>
          </div>
          <div class="text_first animate__animated animate__bounceInUp">
            <div>Hello! 这里是</div>
            <div class="site-name">中国</div>
          </div>
          <div class="text-second animate__animated animate__bounceInUp">
            中国是一个博客及记录类的网站，在这里你可以浏览
            <RouterLink :to="/post">技术文章</RouterLink>
            、分享
            <RouterLink to="/moment">
              日常生活
            </RouterLink>
            、撰写
            <RouterLink to="/note"
            ，同时还可以参与讨论，希望你可以在这里学到东西。
          </div>
        </div>
        <img class="welcome-image" src="/static/images/background/home-image.svg" alt=""/>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {computed, ref} from "vue";

const {getters, dispatch} = useStore();
const authorId = computed(() => getters['getAuthorId']);

const authorInfo = ref({});

const getAuthorInfo = () => {
  dispatch('getUserDetailBasic', {userId: authorId.value}).then(res => {
    authorInfo.value = res.data;
  })
}

getAuthorInfo();
</script>

<style lang="scss" scoped>
.home {
  .home-welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    position: relative;
    background-color: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
    background-image: url("/static/images/background/Pattern-Half-Circle.svg");
    background-position: 100% 50%;
    background-size: auto;
    background-repeat: no-repeat;
    //filter: drop-shadow(0 0 5px #ffffff);

    .welcome-lead {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 500px;

      .home-content {
        width: 686px;
        height: 100%;

        .author-info {
          display: flex;
          align-items: center;
          height: 50px;

          img {
            height: 42px;
            width: 42px;
            border-radius: 50%;
          }

          .author-nickname {
            color: #1890ff;
            font-size: 20px;
            margin-left: 10px;
            font-weight: bold;
          }
        }

        .text_first {
          display: flex;
          align-items: center;
          font-size: 52px;
          font-weight: 600;
          font-family: Roboto, Verdana, "Raleway", "PingFang SC", "Microsoft Yahei", sans-serif;
          color: var(--youyu-text5);
          margin: 30px 0;

          .site-name {
            color: #1890ff;
            margin-left: 6px;
          }
        }

        .text-second {
          font-size: 18px;
          color: var(--youyu-text5);
          --animate-delay: 0.5s;
        }
      }

      .welcome-image {
        display: inline-block;
        max-height: 357px;
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0));
        transition: .3s;

        &:hover {
          filter: drop-shadow(0 0 5px #ffffff);
        }
      }
    }
  }

  .main-menus {
    position: absolute;
    bottom: 40px;
    padding-left: 80px;

    .menu-item {
      border: 2px solid var(--youyu-border-color);
      height: 70px;
      width: 220px;
      border-radius: 4px;
    }
  }

}
</style>
