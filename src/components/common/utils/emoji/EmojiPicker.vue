<template>
  <div class="emoji-picker">
    <div class="emoji-picker-header">
      <div class="emoji-switch emoji-first" :class="{ 'item-active': activeIndex === 0 }" @click="onSwitch(0)">
        <img :src="youyuEmojis[0].src" alt="" />
      </div>
      <div class="emoji-switch emoji-second" :class="{ 'item-active': activeIndex === 1 }" @click="onSwitch(1)">
        <div>😃</div>
      </div>
    </div>
    <div class="emoji-picker-body-wrapper youyu-scrollbar">
      <div class="emoji-picker-body">
        <div v-if="activeIndex === 0" class="list-youyu-emoji youyu-scrollbar" @click="onImagePick">
          <div v-for="item in youyuEmojis" :key="item.title" class="emoji-image">
            <img :src="item.src" :title="item.title" :alt="item.title" />
          </div>
        </div>
        <div v-else class="list-youyu-emoji youyu-scrollbar" @click="onEmojiPick">
          <div v-for="item in emojiList" :key="item.codes" class="emoji-image emoji-item">
            <span v-html="item.char" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { youyuEmojis } from '@/components/common/utils/emoji/youyu_emoji';
import emojis from '@/components/common/utils/emoji/data';

const emojiList = emojis.map(item => item.emojis).reduce((a, b) => a.concat(b));

const activeIndex = ref<number>(0);

const emit = defineEmits(['onImagePick', 'onEmojiPick']);

const onSwitch = (index: number) => {
  activeIndex.value = index;
};

const onImagePick = (event: MouseEvent) => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.tagName === 'IMG') {
    emit('onImagePick', eventTarget?.cloneNode());
  }
};

const onEmojiPick = (event: MouseEvent) => {
  const eventTarget = event.target as HTMLElement;
  if (eventTarget.tagName === 'SPAN') {
    emit('onEmojiPick', eventTarget.innerHTML);
  }
};
</script>

<style lang="scss" scoped>
.emoji-picker {
  width: 410px;
  background-color: var(--youyu-background1);

  .emoji-picker-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--youyu-border-color);
    padding: 8px;

    .emoji-switch {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 32px;
      border-radius: 4px;
      transition: background-color 0.3s;
      margin-right: 12px;

      &.item-active {
        background-color: var(--youyu-background2);
      }

      &:hover {
        background-color: var(--youyu-background2);
      }

      &.emoji-second {
        font-size: 20px;
      }

      img {
        max-height: 24px;
        max-width: 24px;
      }
    }
  }

  .emoji-picker-body-wrapper {
    height: 270px;
    overflow: auto;
    padding: 6px 0 6px 12px;

    .emoji-picker-body {
      .list-youyu-emoji {
        display: flex;
        flex-wrap: wrap;

        .emoji-image {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          width: 32px;
          cursor: pointer;
          margin: 0 7px 7px 0;
          transition: 0.3s;

          &.emoji-item {
            font-size: 24px;

            &:hover {
              transform: scale(1.1);
            }
          }

          &:hover {
            img {
              transform: scale(1.2);
            }
          }

          img {
            height: 28px;
            transition: 0.3s;
          }
        }
      }
    }
  }
}
</style>
