<template>
  <div class="reply-editor">
    <ContentEditableDiv v-model="reply.content" :row="1" ref="richEditor" :maxLength="300"/>
    <div class="reply-box-bottom">
      <a-popover placement="bottomLeft"
                 overlayClassName="emoji-picker-popover"
                 :getPopupContainer="triggerNode=>triggerNode.parentNode"
                 :visible="emojiVisible">
        <template #content>
          <EmojiPicker
            @onImagePick="onImagePick"
            @onEmojiPick="onEmojiPick"
            v-on-click-outside="onEmojiClose"/>
        </template>
        <div class="tool-item" v-login="onClickEmoji">
          <i-emotion-happy theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">表情</span>
        </div>
      </a-popover>
      <UploadFile accept=".jpg, .jpeg, .png" @uploadSuccess="uploadSuccess" :disabled="uploadDisabled">
        <div class="tool-item item-upload-image" @click="onCheckLogin">
          <i-add-picture theme="outline" size="16" fill="currentColor" :strokeWidth="3"/>
          <span class="tool-title">图片</span>
        </div>
      </UploadFile>
      <a-button type="primary"
                :disabled="!isLogin || !currentLength || contentLengthExceed"
                @click="onSubmit"
                class="submit-btn">
        发表评论
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "ReplyEditor"
  }
</script>

<script setup lang="ts">
  import {computed, reactive, ref} from "vue";
  import {useStore} from "vuex";
  import {onCheckLogin} from "@/assets/utils/utils";
  import {vOnClickOutside} from '@vueuse/components'
  import ContentEditableDiv from "@/components/common/utils/contenteditable/ContentEditableDiv.vue";
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
  import EmojiPicker from "@/components/common/utils/emoji/EmojiPicker.vue";

  const {getters} = useStore();

  const userInfo = computed(() => getters['userInfo']);
  const isLogin = computed(() => getters['isLogin']);

  const emojiVisible = ref(false);
  const richEditor = ref(null);
  const reply = reactive({
    userId: userInfo.value.id,
    content: '',
    images: []
  });

  const uploadDisabled = computed(() => reply.images.length >= 1);
  const currentLength = computed(() => richEditor.value?.totalStrLength);
  const contentLengthExceed = computed(() => richEditor.value?.contentLengthExceed);

  const onClickEmoji = () => {
    emojiVisible.value = true;
  }

  const onEmojiClose = () => {
    emojiVisible.value = false;
  }

  const onImagePick = (value: HTMLElement | string) => {
    richEditor.value.insertHtml(value)
  }

  const onEmojiPick = (value: string) => {
    richEditor.value.insertText(value)
  }

  const uploadSuccess = (fileList: []) => {
    const url = fileList[0].url + '?x-oss-process=style/smallThumb';
    reply.images.push(url);
  }

  const onSubmit = () => {

  }
</script>

<style lang="scss" scoped>
  .reply-editor {
    .reply-box-bottom {
      margin-top: 12px;
      display: flex;
      align-items: center;

      .tool-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 16px;
        transition: .3s;

        .i-icon {
          position: relative;
          top: .5px;
        }

        .tool-title {
          font-size: 13px;
          padding-left: 4px;
        }

        &:hover {
          color: #1890ff;
        }
      }

      ::v-deep(.avatar-uploader) {
        display: flex;
      }

      .submit-btn {
        margin-left: auto;
      }
    }
  }
</style>
