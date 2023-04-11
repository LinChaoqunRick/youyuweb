<template>
  <div class="note-item-body">
    <div class="note-item">
      <div class="item-cover">
        <img :src="data.cover"/>
      </div>
      <div class="item-info">
        <div class="info-view">{{data.viewCount}} views</div>
        <div class="info-more" v-if="userInfo.id===data.userId">
          <a-popover v-model:visible="visible" trigger="click" placement="bottom" overlayClassName="note-popover">
            <template #content>
              <a-button type="link" @click="handleEdit">编辑</a-button>
            </template>
            <i-more theme="outline" size="24" fill="currentColor"/>
          </a-popover>
        </div>
      </div>
    </div>
    <div class="note-title">《{{data.name}}》</div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import type {PropType} from 'vue';
  import type {note} from "../../type";
  import {useStore} from "vuex";
  import {computed} from "vue";

  const emit = defineEmits(["handleEdit"])
  const {getters, dispatch} = useStore();
  const userInfo = computed(() => getters['userInfo']);
  const visible = ref(false);

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
    .note-item {
      display: flex;
      flex-direction: column;
      height: 225px;
      width: 146px;
      background-color: var(--youyu-background1);
      border-radius: 4px;
      cursor: pointer;
      margin: 0 auto;

      .item-cover {
        height: 170px;
        width: 130px;
        margin: 8px;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .item-info {
        display: flex;
        flex: 1;
        background-color: var(--youyu-background2);
        border-radius: 0 0 4px 4px;
        color: var(--youyu-body-text2);
        text-align: center;

        .info-view {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .info-more {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          border-left: var(--youyu-border);
        }
      }
    }

    .note-title {
      margin-top: 4px;
      text-align: center;
      font-weight: bold;
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
