<template>
  <div class="emoji-container">
    <div class="carousel-indicators">
      <div class="carousel-button" :class="{active:index === curIndex}" @click="clickItem(index)"
           v-for="(item,index) in emojis">{{ item.label }}
      </div>
    </div>
    <div class="emoji-items" @click.stop="emojiHandler">
      <div class="emoji-list" v-show="curIndex === index" v-for="(item,index) in emojis">
        <div class="emoji-item" v-for="emoji in item.emojis"
             :title="emoji.name"
             :key="emoji.codes"
             :class="emoji.codes">
          {{ emoji.char }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emojis from './data';
import { ref } from 'vue';

const curIndex = ref(0);

const emit = defineEmits(['emojiHandler']);

function clickItem(index: number) {
  curIndex.value = index;
}

function emojiHandler(event: Event) {
  emit('emojiHandler', (event.target as HTMLElement)?.innerHTML);
}

</script>

<style lang="scss" scoped>
.emoji-container {
  border: 1px solid var(--md-border-color);
  height: 196px;
  width: 305px;
  border-radius: 4px;

  .carousel-indicators {
    padding: 3px 4px;
    display: flex;
    align-items: center;

    .carousel-button {
      padding: 2px 3px;
      cursor: pointer;
    }

    .active {
      color: var(--youyu-body-text);
      pointer-events: none;
      font-weight: bold;
    }
  }

  .emoji-items {
    height: 170px;
    overflow: auto;
    padding: 0 4px 4px 4px;

    .emoji-list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      .emoji-item {
        height: 32px;
        width: 32px;
        cursor: pointer;
        font-size: 22px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #eaeaea;
        }
      }
    }
  }

  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 9px;
    height: 9px
  }

  /*定义滚动条轨道*/
  ::-webkit-scrollbar-track {
    background-color: transparent;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    /*background-color: rgba(144,147,153,.3);*/
    background-color: rgb(196, 197, 200);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em
  }

  /*网站滚动条样式*/
}
</style>
