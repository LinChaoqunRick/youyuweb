<template>
  <div class="note-item-body">
    <div class="item-cover">
      <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
        <img :src="data.cover"/>
      </RouterLink>
    </div>
    <div class="item-bottom">
      <RouterLink :to="{name: 'NoteDetail', params: {noteId: data.id}}">
        <div class="item-title" :title="data.name">{{data.name}}</div>
      </RouterLink>
      <RouterLink :to="`/user/${data.user.id}`">
        <div class="item-author">
          <div class="author-avatar">
            <img :src="data.user.avatar"/>
          </div>
          <div class="author-nickname">{{data.user.nickname}}</div>
        </div>
      </RouterLink>
      <div class="item-info">
        <div class="info-view" title="阅读">
          <i-preview-open theme="outline" size="18" fill="currentColor"/>
          {{data.viewCount}}
        </div>
        <div class="info-chapter" title="章节">
          <i-list-view theme="outline" size="17" fill="currentColor"/>
          {{data.chapterCount}}
        </div>
        <div class="info-more" v-if="userInfo.id===data.userId">
          <a-popover v-model:open="visible" trigger="click" placement="bottom" overlayClassName="note-popover">
            <template #content>
              <a-button type="link" @click="handleEdit">编辑</a-button>
            </template>
            <i-more theme="outline" size="24" fill="currentColor"/>
          </a-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import type {PropType} from 'vue';
  import type {note} from "../../type";
  import {useStore} from "vuex";
  import {useRouter, RouterLink} from "vue-router";
  import {computed} from "vue";

  const emit = defineEmits(["handleEdit"])
  const {getters, dispatch} = useStore();
  const userInfo = computed(() => getters['userInfo']);
  const visible = ref(false);
  const router = useRouter();

  const props = defineProps({
    data: {
      type: Object as PropType<note>
    }
  })

  function handleEdit() {
    emit("handleEdit", props.data);
    visible.value = false;
  }
</script>

<style lang="scss" scoped>
  .note-item-body {
    width: 220px;
    cursor: pointer;
    transition: box-shadow .3s, border-color .3s;

    &:hover {
      .item-title {
        color: #1890ff;
      }
    }

    .item-cover {
      height: 130px;
      width: 100%;
      overflow: hidden;

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border-radius: 2px 2px 0 0;
        transition: .3s;
        cursor: pointer;
      }
    }

    .item-bottom {
      background-color: var(--youyu-background1);
      border-width: 0 1px 1px 1px;
      border-style: solid;
      border-color: var(--youyu-border-color2);

      a {
        color: var(--youyu-text) !important;
      }

      .item-title {
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        padding: 8px 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: var(--youyu-border2);
        transition: .3s;
        cursor: pointer;
      }

      .item-author {
        display: flex;
        align-items: center;
        padding: 6px 12px;
        border-bottom: var(--youyu-border2);

        img {
          display: inline-block;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          cursor: pointer;
        }

        .author-nickname {
          display: inline-block;
          margin-left: 8px;
          font-weight: bold;
          cursor: pointer;
        }
      }

      .item-info {
        padding: 4px 0;
        display: flex;
        color: var(--youyu-body-text2);
        text-align: center;

        > div {
          padding-left: 14px;

          .i-icon {
            margin-right: 10px;
          }

          &:nth-child(n+2) {
            border-left: var(--youyu-border2);
          }
        }

        .info-view {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .info-chapter {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .info-more {
          width: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          border-left: var(--youyu-border);

          .i-icon {
            margin-right: 0;
          }
        }
      }
    }

    &:hover {
      box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;

      .item-cover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }
</style>

<style lang="scss">
  .note-popover {
    .ant-popover-inner-content {
      padding: 2px 8px;
    }
  }
</style>
