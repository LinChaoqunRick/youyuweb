<template>
  <div class="user-moment-list">
    <div class="moment-list-body">
      <ContentList :url="props.url" :params="params" auto-load ref="ContentListRef">
        <template v-slot="{list}">
          <MomentItem v-for="item in list"
                      :data="item"
                      :key="item.id"
                      @deleteSuccess="deleteSuccess"/>
        </template>
      </ContentList>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserMomentList"
}
</script>

<script setup lang="ts">
import {ref, computed, provide} from 'vue';
import {useStore} from 'vuex';
import type {momentType} from "@/views/moment/types";
import MomentItem from "./MomentItem.vue";
import ContentList from "@/components/common/system/ContentList.vue";

const {dispatch} = useStore();

const props = defineProps({
  userIds: {
    type: Number
  },
  url: {
    type: String,
    default: "momentList"
  },
  params: {
    type: Object
  }
})

const ContentListRef = ref(null);
const momentList = computed(() => ContentListRef.value.list);
const loading = ref<boolean>(false);
const activeId = ref<number>(-1);

const unshiftItem = (data: momentType) => {
  momentList.value.unshift(data);
}

const updateActiveId = (value: number) => {
  activeId.value = value;
}

const deleteSuccess = (moment) => {
  const index = momentList.value.findIndex(item => item.id === moment.id);
  momentList.value.splice(index, 1);
}

provide('active', {activeId, updateActiveId});


defineExpose({
  unshiftItem
})
</script>

<style lang="scss" scoped>
.user-moment-list {
  .moment-list-body {
    ::v-deep(.moment-item) {
      margin-top: 8px;
      border-radius: 4px;
      overflow: hidden;
    }
  }

  .load-more-box {
    height: 50px;
    background-color: var(--youyu-background1);
    border-radius: 4px;
    margin-top: 8px;
    overflow: hidden;

    > div {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ::v-deep(.ant-spin) {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loading-text {
      font-size: 14px;
      color: #1890ff;
      margin-left: 6px;
    }

    .retry-load {
      cursor: pointer;
    }

    .data-finished {
      color: var(--youyu-text1);
    }

    .no-data {
      color: var(--youyu-text1);
    }
  }
}


.momentSpin-enter-active,
.momentSpin-leave-active {
  transition: .6s ease-out;
}

.momentSpin-enter-from,
.momentSpin-leave-to {
  opacity: 0;
  height: 0;
}
</style>
