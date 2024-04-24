<template>
  <div class="home">
    <div class="home-welcome">
      <div class="welcome-lead">
        <div class="home-content">
          <div class="author-info">
            <img class="author-avatar cp" :src="authorInfo.avatar" alt="站长头像" />
            <span class="author-nickname cp">{{ authorInfo.nickname }}</span>
          </div>
          <div class="text_first animate__animated animate__bounceInUp">
            <div>Hello! 这里是</div>
            <div class="site-name">有语</div>
          </div>
          <div class="text-second animate__animated animate__bounceInUp">
            有语是一个博客及记录类的网站，在这里你可以浏览
            <RouterLink to="/post">技术文章</RouterLink>
            、分享
            <RouterLink to="/moment"> 日常生活</RouterLink>
            、撰写
            <RouterLink to="/note"> 学习笔记</RouterLink>
            ，同时还可以参与讨论，希望对你有所帮助。
          </div>
          <div class="text-three">
            <a href="https://github.com/LinChaoqunRick" target="_blank">
              <div class="text-btn" title="访问github">
                <img src="/static/images/logo/github.svg" alt="github_logo" />
                <div class="text-content">
                  <i-double-right theme="outline" size="32" fill="#ffffff" />
                </div>
              </div>
            </a>
          </div>
        </div>
        <img class="welcome-image" src="/static/images/background/home-image.svg" alt="" />
      </div>
      <div>
        <div></div>
      </div>
    </div>
    <div class="next-introduce">
      <div class="features-container">
        <div class="introduce-title">功能介绍</div>
        <div v-for="item in featureList" class="feature-item">
          <div class="feature-introduce">
            <div class="feature-name">{{ item.name }}</div>
            <div class="feature-introduction">{{ item.introduction }}</div>
          </div>
          <div class="feature-lottie">123</div>
        </div>
      </div>

      <div class="technology-container">
        <div class="introduce-title">技术栈</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const { getters, dispatch } = useStore();
const authorId = computed(() => getters['getAuthorId']);

const authorInfo = ref({});
const featureList = [
  {
    name: '文章',
    introduction: '日常的学习记录，包括新知识的分享，旧知识的巩固、一些实用资源的分享以及BUG记录等',
    lottieName: '',
  },
  {
    name: '时刻',
    introduction: '用于记录日常生活，旅游见闻，在此可以发布动态，这里有很多很多有趣的内容，就像一个朋友圈',
    lottieName: '',
  },
  {
    name: '笔记',
    introduction: '用于记录所学习的新知识的的内容，按章节划分，持续更新中...',
    lottieName: '',
  },
  {
    name: '相册',
    introduction: '爱好摄影？哦不！是终于以可清空手机相册啦！！！',
    lottieName: '',
  },
  {
    name: '实验室',
    introduction: '千奇百怪的内容，这里都是一些练手的内容，来看看有没有你感兴趣的内容吧！',
    lottieName: '',
  },
];

const getAuthorInfo = () => {
  dispatch('getUserDetailBasic', { userId: authorId.value }).then(res => {
    authorInfo.value = res.data;
  });
};

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
    background-image: url('/static/images/background/Pattern-Half-Circle.svg');
    background-position: 100% 50%;
    background-size: contain;
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
          font-family: Roboto, Verdana, 'Raleway', 'PingFang SC', 'Microsoft Yahei', sans-serif;
          color: var(--youyu-text5);
          margin: 20px 0;

          .site-name {
            color: #1890ff;
            margin-left: 6px;
          }
        }

        .text-second {
          font-size: 20px;
          color: var(--youyu-text5);
          --animate-delay: 0.5s;

          a {
            font-weight: bold;
            color: #1890ff;
          }
        }

        .text-three {
          margin: 30px 0;

          .text-btn {
            display: flex;
            //justify-content: center;
            align-items: center;
            background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
            height: 50px;
            width: 80px;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
            padding: 0 26px;

            img {
              transition: 0.3s;
            }

            .text-content {
              color: white;
              font-size: 0;
              transition: 0.3s;
              opacity: 0;
            }

            &:hover {
              width: 110px;

              img {
                transform: scale(1.05);
              }

              .text-content {
                transform: translateX(45%);
                opacity: 1;
              }
            }
          }
        }
      }

      .welcome-image {
        display: inline-block;
        max-height: 357px;
        filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0));
        transition: 0.3s;

        &:hover {
          filter: drop-shadow(0 0 5px #ffffff);
        }
      }
    }
  }

  .next-introduce {
    text-align: center;
    background-color: var(--youyu-background1);

    .features-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .feature-item {
        display: flex;
        justify-content: space-between;
        height: 260px;
        width: 80%;
        border: 1px solid var(--youyu-border-color);
        margin-bottom: 20px;
        border-radius: 16px;
        box-shadow: var(--youyu-shadow2);
        transition: 0.3s;
        cursor: pointer;
        padding: 18px 26px;

        .feature-introduce {
          max-width: 420px;
          text-align: left;

          .feature-name {
            font-size: 26px;
            font-weight: bold;
            color: var(--youyu-text5);
          }

          .feature-introduction{
            padding-top: 8px;
            font-size: 18px;
          }
        }

        &:hover {
          box-shadow: var(--youyu-shadow1);
        }

        &:nth-child(odd) {
          display: flex;
          flex-direction: row-reverse;
        }
      }
    }
  }

  .introduce-title {
    display: inline-flex;
    align-items: center;
    position: relative;
    font-size: 22px;
    color: var(--youyu-text5);
    font-weight: bold;
    padding: 30px 0;

    &:before,
    &:after {
      position: relative;
      top: 50%;
      content: '';
      height: 3px;
      width: 100px;
      background-color: var(--youyu-text5);
      left: 5%;
    }

    &:before {
      left: -5%;
    }
  }
}
</style>
