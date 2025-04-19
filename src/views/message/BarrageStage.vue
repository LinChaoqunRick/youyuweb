<template>
  <div class="barrage-wrapper" ref="barrageWrapperRef">
    <div
      v-for="item in showData"
      :id="`barrage_${item.id}`"
      class="barrage-item"
      :style="{top: `${item.y}px`}"
      :key="item.id"
      v-barrage-move="{id: item.id}"
    >
      <slot :data="item">
        <div class="barrage-item-detail">
          <div class="barrage-avatar">
            <img
              :src="(item.userId ? item?.userInfo?.avatar : item.avatar) || '/static/images/avatar/default_avatar.png'"
              alt="头像"
            />
          </div>
          <div class="barrage-nickname">{{ item.userId ? item?.userInfo?.nickname : item.nickname }}：</div>
          <div class="barrage-content">{{ item.content }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import type { Barrage } from '@/views/message/types';
import type { DirectiveBinding } from 'vue';

const barrageWrapperRef = ref<HTMLDivElement | null>(null);
const channelHeight = 40;
let idleTracks = ref<number[]>([]); // 空闲的轨道
const allData: Barrage[] = []; // 已显示的弹幕
const showData = ref<Barrage[]>([]); // 正在显示的弹幕
const waitingData = ref<Barrage[]>([]); // 等待显示的弹幕

const DURATION = 18 * 1000;
const animationMap = new WeakMap();

const emit = defineEmits(['onEmpty']);

onMounted(() => {
  initTracks();
});

function initTracks() {
  if (barrageWrapperRef.value) {
    const height = barrageWrapperRef.value.getBoundingClientRect().height - 80; // 80 下方定位按钮高度
    const trackCount = Math.floor(height / channelHeight);
    idleTracks.value = generateRandomArray(0, trackCount);
  }
}

watchEffect(() => {
  if (idleTracks.value.length > 0 && waitingData.value.length) {
    addToShow(waitingData.value.shift()!);
  }
});

watch(() => waitingData.value.length, (val) => {
  if (val === 0) {
    emit('onEmpty');
  }
});

const add = (data: Barrage[]) => {
  waitingData.value.push(...data);
};

const addToShow = (barrage: Barrage) => {
  getRandomDelayPromise().then(() => {
    const popTrackId = idleTracks.value.shift();
    barrage.trackId = popTrackId;
    barrage.y = popTrackId! * channelHeight + 6;
    showData.value.push(barrage);
  });
};

// 自定义指令
const vBarrageMove = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { id } = binding.value;
    const rect = el.getBoundingClientRect();
    const animation = el.animate(
      [
        {
          transform: `translateX(100vw)`
        },
        {
          transform: `translateX(calc(0vw - ${rect.width + 20}px))`
        }
      ],
      {
        duration: DURATION,
        easing: 'linear',
        fill: 'forwards'
      }
    );

    const pause = () => {
      animation.pause();
    };

    const play = () => {
      animation.play();
    };

    // 当前弹幕速度
    const v = (window.innerWidth + el.clientWidth) / DURATION;   // v = s / t
    // 当前走出屏幕用时(即弹幕最右端出现，轨道空闲)
    const t = el.clientWidth / v; // t = s / v;

    setTimeout(() => {
      const item = showData.value.find(item => item.id === id);
      idleTracks.value.push(item?.trackId as number);
    }, t + 1000);

    animation.bindPause = pause;
    animation.bindPlay = play;

    animationMap.set(el, animation);
    animation.play();

    el.addEventListener('mouseover', animation.bindPause, false);
    el.addEventListener('mouseout', animation.bindPlay, false);

    animation.onfinish = () => {
      el.removeEventListener('mouseover', animation.bindPause, false);
      el.removeEventListener('mouseout', animation.bindPlay, false);
      showData.value = showData.value.filter(item => item.id !== id);
    };
  }
};

// 生成无序轨道
function generateRandomArray(min: number, max: number) {
  // 处理参数顺序
  if (min > max) [min, max] = [max, min];

  // 生成连续整数数组
  const arr = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  // Fisher-Yates洗牌算法实现随机排序
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 获取一个随机延时
function getRandomDelayPromise(min: number = 50, max: number = 200): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.random() * max + min);
  });
}

defineExpose({
  add
});
</script>

<style scoped lang="scss">
.barrage-wrapper {
  height: 100%;

  .barrage-item {
    position: absolute;

    .barrage-item-detail {
      display: flex;
      align-items: center;
      background-color: var(--mask-background);
      padding: 4px;
      border-radius: 36px;
      color: #ffffff;
      cursor: pointer;
      overflow: hidden;

      .barrage-avatar {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .barrage-nickname {
        padding-left: 6px;
        white-space: nowrap;
      }

      .barrage-content {
        padding-right: 6px;
        white-space: nowrap;
      }
    }
  }
}
</style>
