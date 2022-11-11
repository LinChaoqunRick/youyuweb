<template>
  <div class="music-player">
    <audio
      controls
      src="https://youyu-source.oss-cn-beijing.aliyuncs.com/youyu/music/%E9%9F%A9%E7%BA%A2%26%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E9%A3%9E%E4%BA%91%E4%B9%8B%E4%B8%8B.mp3"
      ref="player"/>
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
            <i-go-start theme="outline" size="16" fill="#999" title="上一首"/>
          </div>
          <div class="ope-play-pause">
            <i-play-one theme="outline" size="16" fill="#999" title="播放" v-if="!status" @click="status = true"/>
            <i-pause theme="outline" size="16" fill="#999" title="暂停" v-else @click="status = false"/>
          </div>
          <div class="ope-next">
            <i-go-end theme="outline" size="16" fill="#999" title="下一首"/>
          </div>
          <div class="ope-type">
            <i-play-cycle theme="outline" size="16" fill="#999" title="循环播放" v-if="!type" @click="type = true"/>
            <i-play-once theme="outline" size="16" fill="#999" title="单曲循环" v-else @click="type = false"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, reactive, onMounted} from 'vue';

  const player = ref(null);
  const status = ref(false);
  const type = ref(false);
  const progress = ref(0);
  const music = reactive({total: 0, currentTime: 0});
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
</script>

<style lang="scss" scoped>
  .music-player {
    .music-content {
      height: 56px;
      width: 240px;
      border-radius: 28px;
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      padding: 0 20px 0 10px;
      display: flex;
      align-items: center;

      .music-content-cover {
        width: 52px;

        img {
          height: 44px;
          width: 44px;
          border-radius: 50%;
        }
      }

      .music-content-main {
        flex: 1;
        align-self: flex-start;

        .music-content-name {
          font-size: 12px;
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
            margin: 0 6px;
          }

          .i-icon {
            height: 18px;
            width: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            border: 2px solid #999;
            cursor: pointer;
          }
        }
      }


    }
  }
</style>
