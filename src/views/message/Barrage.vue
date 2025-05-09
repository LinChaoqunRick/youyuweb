<template>
  <div class="barrage-wrapper" ref="barrageWrapperRef">
    <div
      v-for="item in props.modelValue"
      :id="`barrage_${item.id}`"
      class="barrage-item"
      :key="item.id"
      v-barrage-move="onShowFinish(item)"
    >
      <slot :data="item">
        <div class="barrage-item-detail">
          <div class="barrage-avatar">
            <img
              :src="(item.userId ? item.userInfo.avatar : item.avatar) || '/static/images/avatar/default_avatar.png'"
              alt="头像"
            />
          </div>
          <div class="barrage-nickname">{{ item.userId ? item.userInfo.nickname : item.nickname }}：</div>
          <div class="barrage-content">{{ item.content }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Message } from '@/views/message/types';
import type { DirectiveBinding } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array<Message>,
    default: () => [],
  },
});

const barrageWrapperRef = ref<HTMLDivElement | null>(null);
let channelNumber = 1;
const channelHeight = 40;

const DURATION = 18 * 1000;
const animationMap = new WeakMap();

const onShowFinish = (item: Message) => {
  return () => {
    const barrageItem = barrageWrapperRef.value?.querySelector(`#barrage_${item.id}`) as HTMLElement;
    barrageWrapperRef.value?.removeChild(barrageItem);
  };
};

// 自定义指令
const vBarrageMove = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const rect = el.getBoundingClientRect();
    const translateX = Math.floor(Math.random() * channelNumber) * channelHeight + 4;
    const animation = el.animate(
      [
        {
          transform: `translateX(100vw) translateY(${translateX}px)`,
        },
        {
          transform: `translateX(calc(0vw - ${rect.width + 20}px)) translateY(${translateX}px)`,
        },
      ],
      {
        duration: DURATION,
        easing: 'linear',
        fill: 'forwards',
      }
    );

    const pause = () => {
      animation.pause();
    };
    const play = () => {
      animation.play();
    };
    animation.bindPause = pause;
    animation.bindPlay = play;

    animationMap.set(el, animation);
    animation.play();
    animation.onfinish = () => {
      binding?.value();
      el.removeEventListener('mouseover', animation.bindPause, false);
      el.removeEventListener('mouseout', animation.bindPlay, false);
    };

    el.addEventListener('mouseover', animation.bindPause, false);
    el.addEventListener('mouseout', animation.bindPlay, false);
  },

  unmounted(el: HTMLElement) {
    const animation = animationMap.get(el);
    el.removeEventListener('mouseover', animation.pause, false);
    el.removeEventListener('mouseout', animation.play, false);
  },
};

onMounted(() => {
  if (barrageWrapperRef.value) {
    const height = barrageWrapperRef.value.getBoundingClientRect().height - 80; // 80 下方定位按钮高度
    channelNumber = Math.floor(height / channelHeight);
  }
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
      }

      .barrage-content {
        padding-right: 6px;
      }
    }
  }
}
</style>
