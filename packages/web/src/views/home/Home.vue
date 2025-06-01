<template>
  <div class="home">
    <div class="home-welcome">
      <div class="welcome-lead">
        <div class="home-content">
          <div class="author-info">
            <img class="author-avatar cp" :src="authorInfo.avatar" alt="站长头像" />
            <span class="author-nickname cp">{{ authorInfo.nickname }}</span>
          </div>

          <div class="text_first">
            <div>Hello! 这里是</div>
            <div class="site-name">有语</div>
          </div>

          <div class="text-second">
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
        <RouterLink
          v-for="item in featureList"
          :to="item.path"
          :key="item.path"
          class="feature-item"
          @mouseenter="onLottieAnimate(item, 'play')"
          @mouseleave="onLottieAnimate(item, 'pause')"
        >
          <div class="feature-item-wrapper">
            <div class="feature-introduce">
              <div class="feature-name">{{ item.name }}</div>
              <div class="feature-introduction">{{ item.introduction }}</div>
            </div>
            <div class="feature-lottie" :class="[item.lottieClass]" :ref="item.ref"></div>
          </div>
        </RouterLink>
      </div>

      <div class="technology-container">
        <div class="introduce-title">技术栈</div>
        <div class="list-wrapper">
          <TechnologyList />
        </div>
      </div>

      <div class="about-container">
        <div class="introduce-title">关于</div>
        <div class="about-wrapper">
          <AboutSiteHome />
        </div>
      </div>

      <div class="more-container">
        <div class="introduce-title">更多</div>
        <div class="list-wrapper">
          <MoreList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { computed, onMounted, reactive, ref } from 'vue';
import lottie from 'lottie-web';
import TechnologyList from '@/views/home/components/TechnologyList.vue';
import MoreList from '@/views/home/components/MoreList.vue';
import AboutSiteHome from '@/views/home/components/AboutSiteHome.vue';

const { getters, dispatch } = useStore();
const authorId = computed(() => getters['getAuthorId']);
const postLottie = ref(null);
const momentLottie = ref(null);
const noteLottie = ref(null);
const albumLottie = ref(null);
const labLottie = ref(null);

const authorInfo = ref({});
const featureList = [
  {
    name: '文章✍️',
    introduction: '日常的学习记录，包括新知识的分享，旧知识的巩固、一些实用资源的分享以及BUG记录等',
    path: '/post',
    lottieClass: 'post-lottie',
    lottieData: ' https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/lottie/post.json',
    ref: postLottie,
    animation: null,
  },
  {
    name: '时刻🧭',
    introduction: '用于记录日常生活，旅游见闻，在此可以发布动态，这里有很多很多有趣的内容，就像一个朋友圈',
    path: '/moment',
    lottieClass: 'moment-lottie',
    lottieData: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/lottie/travel.json',
    ref: momentLottie,
    animation: null,
  },
  {
    name: '笔记🎯',
    introduction: '用于记录所学习的新知识的的内容，按章节划分，持续更新中...',
    path: '/note',
    lottieClass: 'note-lottie',
    lottieData: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/lottie/draw.json',
    ref: noteLottie,
    animation: null,
  },
  {
    name: '相册📷',
    introduction: '爱好摄影？哦不！是终于以可清空手机相册啦！！！',
    path: '/album',
    lottieClass: 'album-lottie',
    lottieData: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/lottie/album.json',
    ref: albumLottie,
    animation: null,
  },
  {
    name: '实验室🔎',
    introduction: '千奇百怪的内容，这里都是一些练手的内容，来看看站长平时都在学些什么！',
    path: '/lab',
    lottieClass: 'lab-lottie',
    lottieData: 'https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/lottie/lab.json',
    ref: labLottie,
    animation: null,
  },
];

const getAuthorInfo = () => {
  dispatch('getUserDetailBasic', { userId: authorId.value }).then(res => {
    authorInfo.value = res.data;
  });
};
getAuthorInfo();

const initLottie = () => {
  featureList.forEach(item => {
    if (item.lottieData) {
      fetch(item.lottieData)
        .then(res => res.json())
        .then(data => {
          item.animation = lottie.loadAnimation({
            container: item.ref.value[0],
            renderer: 'canvas', // 或者 'canvas'
            loop: true,
            autoplay: false,
            animationData: data, // 导入的动画 JSON 数据
          });
        });
    }
  });
};

const onLottieAnimate = (item: object, type: string) => {
  if (type === 'play') {
    item.animation?.play();
  } else {
    item.animation?.stop();
  }
};

onMounted(() => {
  initLottie();
});
</script>

<style lang="scss" scoped>
.home {
  .home-welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    position: relative;
    //background-color: rgba(255, 255, 255, 0.2) !important;
    //backdrop-filter: blur(10px) !important;
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
          animation: bounceInUpMe 0.8s ease-in-out;

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
          color: var(--youyu-text5);
          margin: 20px 0;
          animation: bounceInUpMe 0.8s ease-in-out 0.2s backwards;

          .site-name {
            color: #1890ff;
            margin-left: 6px;
          }
        }

        .text-second {
          font-size: 20px;
          color: var(--youyu-text5);
          animation: bounceInUpMe 0.8s ease-in-out 0.4s backwards;

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
        height: 357px;
        width: 540px;
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
    background-color: var(--bg-transparent);

    .features-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      .feature-item {
        position: relative;
        height: 300px;
        width: 80%;
        margin-bottom: 40px;
        transition: 0.3s;
        border: 1px solid var(--youyu-border-color);
        border-radius: 16px;
        cursor: pointer;
        overflow: hidden;

        &:before {
          position: absolute;
          left: -40px;
          top: -130px;
          content: '';
          height: 300px;
          width: 300px;
          border-radius: 50%;
          background: linear-gradient(270deg, #30b6ec, #0692ef 95%);
          transition: 0.4s;
          transform: translate(-300px, -300px);
          z-index: 0;
        }

        .feature-item-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(4px) !important;
          padding: 18px 36px;
          width: 100%;
          height: 100%;
          border-radius: 16px;

          .feature-introduce {
            height: 100%;
            max-width: 440px;
            text-align: left;

            .feature-name {
              font-size: 26px;
              font-weight: bold;
              color: var(--youyu-text5);
            }

            .feature-introduction {
              padding-top: 8px;
              font-size: 20px;
              color: var(--youyu-text);
            }
          }

          .feature-lottie {
            position: relative;
            width: 262px;
            height: 262px;

            &.moment-lottie {
              height: 320px;
              width: 320px;
            }

            &.album-lottie {
              top: -20px;
              height: 330px;
              width: 330px;
            }

            &.lab-lottie {
              height: 360px;
              width: 360px;
            }
          }
        }

        &:hover {
          box-shadow: var(--youyu-shadow2);
          //background-color: #1890ff;

          &:before {
            transform: translate(0, 0) !important;
          }
        }

        &:nth-child(odd) {
          .feature-item-wrapper {
            display: flex;
            flex-direction: row-reverse;

            .feature-introduce {
              text-align: right;
            }
          }

          &:before {
            left: auto;
            right: -40px;
            transform: translate(300px, -300px);
          }
        }
      }
    }

    .technology-container {
      .list-wrapper {
        margin: 30px 0;
        display: flex;
        justify-content: center;
      }
    }

    .about-container {
      .about-wrapper {
        display: flex;
        justify-content: center;

        > div {
          width: 70%;
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
    padding: 50px 0;

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
