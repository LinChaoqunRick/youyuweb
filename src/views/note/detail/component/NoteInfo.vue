<template>
  <div class="note-info">
    <div class="author-info">
      <div class="info-top">
        <div class="info-avatar">
          <img :src="author.avatar" @click="handleProfile"/>
          <div class="user-gender" v-if="author.sex!=null">
            <i-female v-if="author.sex == 1" theme="outline" size="14" fill="#ffc0cb"/>
            <i-male v-else theme="outline" size="14" fill="#00CFF3"/>
          </div>
        </div>
        <div class="info-nickname" @click="handleProfile">{{author.nickname}}</div>
        <div class="info-extra">
          <div class="extra-item">{{author.extraInfo?.fansCount}}</div>
          <div class="extra-item">{{author.extraInfo?.likeCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {inject, computed} from 'vue';
  import {useRouter} from "vue-router";

  const router = useRouter();
  const note = inject('note');
  const chapter = inject('chapter');

  const author = computed(() => chapter.value?.user ?? {});

  function handleProfile() {
    router.push(`/user/${chapter.value.user.id}/moment`)
  }
</script>

<style lang="scss" scoped>
  .note-info {
    width: 100%;

    .author-info {
      padding: 16px;

      .info-top {
        display: flex;
        flex-direction: column;
        align-items: center;

        .info-avatar {
          position: relative;
          height: 100px;
          width: 100px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            border: 6px solid var(--youyu-border-color);
            cursor: pointer;
          }

          .user-gender {
            height: 22px;
            width: 22px;
            position: absolute;
            top: 3px;
            right: 3px;
            border: 3px solid var(--youyu-border-color);
            border-radius: 50%;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--youyu-body-background2);
          }
        }

        .info-nickname {
          margin-top: 10px;
          font-weight: bold;
          font-size: 18px;
        }

        .info-extra {
          display: flex;
          width: 100%;
          margin-top: 10px;

          .extra-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            border-radius: 6px;
            background-color: var(--youyu-body-background3);
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 0 12px rgba(0, 0, 0, .12);

            &:nth-child(n+2) {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
</style>
