<template>
  <div class="emoji-picker">
    <div class="emoji-picker-header">
      <div class="emoji-switch emoji-first" :class="{'item-active': activeIndex === 0}" @click="onSwitch(0)">
        <img :src="youyuEmojis[0].src"/>
      </div>
      <div class="emoji-switch emoji-second" :class="{'item-active': activeIndex === 1}" @click="onSwitch(1)">
        <div>😃</div>
      </div>
    </div>
    <div class="emoji-picker-body">
      <div v-if="activeIndex === 0" class="list-youyu-emoji youyu-scrollbar" @click="onImagePick">
        <div v-for="item in youyuEmojis" class="emoji-image">
          <img :src="item.src"  :title="item.title"/>
        </div>
      </div>
      <div v-else class="list-youyu-emoji youyu-scrollbar" @click="onEmojiPick">
        <div v-for="item in emojiList" class="emoji-image emoji-item">
          <span v-html="item.char" :title="item.title"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import {youyuEmojis} from "@/components/common/utils/emoji/youyu_emoji";
  import emojis from "@/components/common/utils/emoji/data";

  const emojiList = emojis.map(item => item.emojis).reduce((a, b) => a.concat(b));

  const activeIndex = ref<number>(0);

  const emit = defineEmits(['onImagePick', 'onImagePick']);

  const onSwitch = (index: number) => {
    activeIndex.value = index;
  }

  const onImagePick = (event: Event) => {
    if (event.target.tagName === "IMG") {
      emit("onImagePick", event.target.cloneNode());
    }
  }

  const onEmojiPick = (event: Event) => {
    if (event.target.tagName === "SPAN") {
      emit('onEmojiPick', event.target.innerHTML);
    }
  }

</script>

<style lang="scss" scoped>
  .emoji-picker {
    width: 416px;
    background-color: var(--youyu-background1);

    .emoji-picker-header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--youyu-border-color);
      padding: 0 12px;
      height: 48px;

      .emoji-switch {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 32px;
        border-radius: 4px;
        transition: background-color .3s;
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

    .emoji-picker-body {
      padding: 10px 2px 10px 10px;

      .list-youyu-emoji {
        display: flex;
        flex-wrap: wrap;
        height: 270px;
        overflow: auto;

        /* 滚动条整体部分 */
        ::-webkit-scrollbar {
          width: 20px;
          height: 20px;
        }

        /*滚动条轨道、滚动条*/
        ::-webkit-scrollbar-track,
        ::-webkit-scrollbar-thumb {
          border-radius: 50px;
          border: 5px solid transparent;
        }

        /*滚动条轨道*/
        ::-webkit-scrollbar-track {
          box-shadow: 1px 1px 10px #AAAAAA inset;
        }

        /*滚动条*/
        ::-webkit-scrollbar-thumb {
          min-height: 20px;

          background-clip: content-box;
          box-shadow: 0 0 0 5px #088 inset;
        }

        /*边角*/
        ::-webkit-scrollbar-corner {
          background: transparent;
        }

        .emoji-image {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          width: 32px;
          cursor: pointer;
          margin: 0 7px 7px 0;
          transition: .3s;

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
            transition: .3s;
          }
        }
      }
    }
  }
</style>
