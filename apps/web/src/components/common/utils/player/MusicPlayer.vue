<template>
  <audio
    controls
    src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3"
    ref="player"/>
  <div class="music-player" :class="{'fold': fold, 'running': status}">
    <div class="music-operation">
      <i-off-screen v-if="!fold" theme="outline" size="12" fill="#333" title="折叠" @click="handleFold(true)"/>
      <i-full-screen v-else theme="outline" size="12" fill="#333" title="展开" @click="handleFold(false)"/>
      <i-close theme="outline" size="12" fill="#333" title="关闭"/>
    </div>
    <div class="music-content">
      <div class="music-content-cover">
        <img src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"/>
      </div>
      <div class="music-content-main">
        <div class="music-content-name">韩红&林俊杰 - 飞云之下</div>
        <div class="music-content-time">
          <div class="time-current">
            {{music.currentTime}}
          </div>
          <div class="music-progress">
            <input v-model="progress" type="range" name="progress"
                   max="100" min="0" step="1" class="main-trail" @input="handleChange">
            <div class="trail-total"></div>
            <div class="trail-current" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="time-total">
            {{music.total}}
          </div>
        </div>
        <div class="music-content-operation">
          <div class="ope-last">
            <i-go-start theme="outline" size="16" fill="#000" title="上一首"/>
          </div>
          <div class="ope-play-pause" @click="handlePlay">
            <i-play-one theme="outline" size="16" fill="#000" title="播放" v-if="!status"/>
            <i-pause theme="outline" size="16" fill="#000" title="暂停" v-else/>
          </div>
          <div class="ope-next">
            <i-go-end theme="outline" size="16" fill="#000" title="下一首"/>
          </div>
          <div class="ope-type">
            <i-play-cycle theme="outline" size="16" fill="#000" title="循环播放" v-if="!type" @click="type = true"/>
            <i-play-once theme="outline" size="16" fill="#000" title="单曲循环" v-else @click="type = false"/>
          </div>
          <div class="ope-list">
            <i-list-top theme="outline" size="16" fill="#000" title="列表" @click="handleList"/>
          </div>
          <div class="ope-volume">
            <i-volume-notice theme="outline" size="16" fill="#000"/>
            <i-volume-small theme="outline" size="16" fill="#000"/>
            <i-volume-mute theme="outline" size="16" fill="#000"/>
          </div>
        </div>
      </div>
    </div>
    <div class="music-list" :class="{'show-list':showList}">
      <div class="list-body">
        <div v-for="(item, index) in musicList" class="music-list-item">
          <span class="item-index">{{index+1}}.</span><span class="item-name">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, reactive, onMounted} from 'vue';

  const player = ref(null);
  const status = ref(false);
  const fold = ref(false);
  const type = ref(false);
  const showList = ref(false);
  const progress = ref(0);
  const music = reactive({total: 0, currentTime: 0});
  const musicList = ref([
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
    {
      name: "韩红&林俊杰 - 飞云之下",
      src: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3",
      cover: "https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/feiyunzhixia.jpg"
    },
  ])
  let duration = 0;
  let currentTime = 0;

  function init() {
    player.value.ondurationchange = ondurationchange;
    player.value.ontimeupdate = ontimeupdate;
  }

  onMounted(() => {
    init();
  })

  function updateTime() {
    duration = player.value.duration;
    currentTime = player.value.currentTime;
    progress.value = (currentTime / duration) * 100;
    music.total = formatTime(duration);
    music.currentTime = formatTime(currentTime);
  }

  function ondurationchange() {
    updateTime();
  }

  function ontimeupdate() {
    updateTime();
  }

  function handleChange() {
    player.value.currentTime = duration * progress.value * 0.01;
  }

  function formatTime(time) { //
    if (!time) return "00:00";
    const min = Math.floor(time / 60).toString().padStart(2, '0');
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  function handlePlay() {
    status.value = !status.value;
    status.value ? player.value.play() : player.value.pause();
  }

  function handleFold(status) {
    fold.value = status;
    showList.value = status;
  }

  function handleList() {
    showList.value = !showList.value;
  }
</script>

<style lang="scss" scoped>
  .music-player {
    user-select: none;
    position: relative;
    height: 56px;
    width: 240px;
    transition: width .3s;
    z-index: 100;

    &:hover {
      .music-operation {
        height: 76px;
        border-radius: 10px 10px 28px 28px;
        opacity: 1;
      }
    }

    .music-operation {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
      height: 56px;
      width: 56px;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      border-radius: 28px;
      z-index: 0;
      padding: 4px 6px;
      transition: .6s;
      opacity: 0;
    }

    .music-content {
      height: 100%;
      width: 100%;
      border-radius: 28px;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      padding-right: 6px;
      display: flex;
      align-items: center;
      box-shadow: 0 0 6px rgba(0, 0, 0, .12);
      overflow: hidden;

      .music-content-cover {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
        animation: rotateZ 20s infinite linear;
        animation-play-state: paused;
        margin: 6px;

        img {
          height: 44px;
          width: 44px;
          border-radius: 50%;
        }
      }

      .music-content-main {
        flex: 1 0;
        align-self: flex-start;

        .music-content-name {
          font-size: 13px;
        }

        .music-content-time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;

          .music-progress {
            width: 60%;
            height: 4px;
            position: relative;

            input[type=range] {
              -webkit-appearance: none;
              background-color: rgba(255, 255, 255, 0) !important;
            }

            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              z-index: 999;
              position: relative;
              cursor: pointer;
            }

            input[type=range]::-webkit-slider-runnable-track {
              height: 4px;
              border-radius: 2px;
            }

            input[type=range]:focus {
              outline: none;
            }

            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 10px;
              width: 10px;
              margin-top: -3.2px; /*使滑块超出轨道部分的偏移量相等*/
              background: #1890ff;
              border-radius: 50%; /*外观设置为圆形*/
            }

            .main-trail {
              position: absolute;
              top: 0;
              width: 100%;
              height: 4px;
              border-radius: 2px;
            }

            .trail-current {
              position: absolute;
              width: 0;
              height: 4px;
              border-radius: 2px;
              background-color: #1890ff !important;
              z-index: -1;
            }

            .trail-total {
              position: absolute;
              width: 100%;
              height: 4px;
              border-radius: 2px;
              background-color: #F1F3F4 !important;
              z-index: -2;
            }
          }
        }

        .music-content-operation {
          position: relative;
          top: -2px;
          display: flex;
          justify-content: center;

          div {
            margin-right: 6px;
          }

          .i-icon {
            height: 18px;
            width: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
    }

    .music-list {
      position: relative;
      top: -56px;
      padding-top: 56px;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      z-index: -1;
      border-radius: 28px 28px 0 0;
      opacity: 1;
      transition: .3s;

      .list-body {
        height: 240px;
        width: 100%;
        overflow: auto;
        padding: 0 10px;
        transition: .3s;

        .music-list-item {
          height: 26px;
          line-height: 26px;
          display: flex;
          cursor: pointer;
          padding-left: 6px;
          font-size: 13px;

          &:first-child {
            margin-top: 3px;
          }

          .item-index {
            margin-right: 6px;
          }

          &:hover {
            background-color: rgba(153, 153, 153, 0.3);
            border-radius: 2px;
          }
        }
      }

      &.show-list {
        border-radius: 28px;
        opacity: 0;

        .list-body {
          height: 0;
          overflow: hidden;
        }
      }
    }
  }

  .fold {
    &.music-player {
      width: 56px;
    }
  }

  .i-icon {
    cursor: pointer;
  }

  .music-player {
    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      opacity: 0.2;
      background: #fff;
    }

    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
    }
  }

  .running {
    .music-content-cover {
      animation-play-state: running !important;
    }
  }

  @keyframes rotateZ {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
</style>
