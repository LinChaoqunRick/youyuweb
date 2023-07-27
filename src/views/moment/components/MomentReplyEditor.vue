<template>
  <div class="reply-editor">
    <div class="editor-box">
      <div class="login-mask" @click="toLogin" v-if="!isLogin"></div>
      <ContentEditableDiv v-model="reply.content" :row="1" ref="richEditor" :maxLength="300"/>
    </div>
    <div class="image-wrapper" v-if="reply.images?.length">
      <div v-for="item in reply.images" class="image-item">
        <img :src="item"/>
        <div class="image-delete" @click="onImageDelete(index)">
          <i-close theme="outline" size="10" fill="currentColor" :strokeWidth="2"/>
        </div>
      </div>
    </div>
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
        <div class="tool-item" v-login="onClickEmoji" style="cursor: pointer">
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
                :loading="loading"
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
  import {cloneDeep} from 'lodash';
  import {vOnClickOutside} from '@vueuse/components'
  import ContentEditableDiv from "@/components/common/utils/contenteditable/ContentEditableDiv.vue";
  import UploadFile from '@/components/common/utils/upload/UploadFile.vue';
  import EmojiPicker from "@/components/common/utils/emoji/EmojiPicker.vue";


  const {getters, commit} = useStore();

  const emit = defineEmits(['onSubmit']);

  const userInfo = computed(() => getters['userInfo']);
  const isLogin = computed(() => getters['isLogin']);

  const emojiVisible = ref(false);
  const richEditor = ref(null);
  const reply = reactive({
    userId: userInfo.value.id,
    content: '',
    images: []
  });
  const uploadDisabled = computed(() => reply.images.length >= 1 || !isLogin.value);
  const currentLength = computed(() => richEditor.value?.totalStrLength);
  const contentLengthExceed = computed(() => richEditor.value?.contentLengthExceed);
  const loading = ref<boolean>(false);

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

  const onImageDelete = (index: number) => {
    reply.images.splice(index, 1);
  }

  const toLogin = () => {
    commit("changeLogin", true);
  }

  const onSubmit = () => {
    loading.value = true;
    const successCallback = () => {
      richEditor.value.clearContent();
      reply.content = '';
      reply.images = [];
      loading.value = false;
    }
    const failedCallback = () => {
      loading.value = false;
    }
    emit("onSubmit", cloneDeep(reply), successCallback, failedCallback)
  }

  defineExpose({
    reply
  })
</script>

<style lang="scss" scoped>
  .reply-editor {

    .editor-box {
      position: relative;

      .login-mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
      }
    }

    .image-wrapper {
      display: flex;
      flex-wrap: wrap;

      .image-item {
        position: relative;
        margin: 8px 8px 0 0;

        img {
          height: 80px;
          width: 80px;
          object-fit: cover;
        }

        .image-delete {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: 18px;
          height: 18px;
          position: absolute;
          top: 4px;
          right: 4px;
          border-radius: 50%;
          border: 1px solid #c5c5c5;
          background: rgba(0, 0, 0, .4);

          &:hover {
            background: rgba(0, 0, 0, .3);
          }

          .i-icon {
            color: white;
          }
        }
      }

      .upload-image {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        width: 80px;
        border: 1px dashed #c5c5c5;
        margin: 8px 8px 8px 0;
        background: rgba(248, 248, 249, 0.2);
        transition: .3s;

        &:hover {
          background: rgba(248, 248, 249, 0.3);
        }
      }
    }

    .reply-box-bottom {
      margin-top: 12px;
      display: flex;
      align-items: center;

      .tool-item {
        display: flex;
        align-items: center;
        cursor: inherit;
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
