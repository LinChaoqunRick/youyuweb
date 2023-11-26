<template>
  <div class="user-moment-list">
    <div class="moment-list-body mt-8">
      <ContentList
        :url="props.url"
        :params="params"
        auto-load
        data-text="时刻"
        ref="ContentListRef"
      >
        <template v-slot="{ list }">
          <MomentItem
            v-for="item in list"
            :data="item"
            :key="item.id"
            @deleteSuccess="deleteSuccess"
            @onEdit="onEdit"
          />
        </template>
        <template v-slot:loadMoreBox="{ restLoading }">
          <a-spin :spinning="restLoading"></a-spin>
          <span class="tip-text">加载中...</span>
        </template>
      </ContentList>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserMomentList",
};
</script>

<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import type { momentType } from "@/views/moment/types";
import MomentItem from "./MomentItem.vue";
import ContentList from "@/components/common/system/ContentList.vue";
import type { momentListType } from "@/views/moment/types";

const { dispatch } = useStore();

const router = useRouter();

const props = defineProps({
  userIds: {
    type: Number,
  },
  url: {
    type: String,
    default: "momentList",
  },
  params: {
    type: Object,
  },
});

const ContentListRef = ref(null);
const momentList = computed(() => ContentListRef.value.list);
const loading = ref<boolean>(false);
const activeId = ref<number>(-1);

const unshiftItem = (data: momentType) => {
  momentList.value.unshift(data);
};

const updateActiveId = (value: number) => {
  activeId.value = value;
};

const deleteSuccess = (moment: momentListType) => {
  const index = momentList.value.findIndex(
    (item: momentListType) => item.id === moment.id
  );
  momentList.value.splice(index, 1);
};

const onEdit = (data: momentListType) => {
  router.push({
    name: "MomentDetail",
    params: { momentId: data.id },
    query: { type: "edit" },
  });
};

provide("active", { activeId, updateActiveId });

defineExpose({
  unshiftItem,
});
</script>

<style lang="scss" scoped>
.user-moment-list {
  .moment-list-body {
    ::v-deep(.content-list) {
      .moment-item {
        margin-bottom: 8px;
        border-radius: 4px;
        overflow: hidden;

        .bottom-operation {
          min-height: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      .bottom-operation {
        min-height: 48px;
        border-radius: 4px;
        overflow: hidden;
        background-color: var(--youyu-background1);

        .ant-spin {
          font-size: 0;
        }
      }
    }

    .tip-text {
      margin-left: 6px;
    }
  }
}

.momentSpin-enter-active,
.momentSpin-leave-active {
  transition: 0.6s ease-out;
}

.momentSpin-enter-from,
.momentSpin-leave-to {
  opacity: 0;
  height: 0;
}
</style>
