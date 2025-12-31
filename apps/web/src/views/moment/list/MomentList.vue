<template>
  <div class="moment-list">
    <div class="moment-list-center mr-8">
      <moment-editor class="mb-8" @save-success="saveSuccess" />
      <base-layout ref="baseLayoutRef" />
    </div>
    <div class="moment-list-right mr-8">
      <div v-side-fixed>
        <announcement />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Announcement from '@/components/common/share/announcement/index.vue';
import BaseLayout from '@/components/common/system/BaseLayout.vue';
import MomentEditor from '../components/MomentEditor.vue';
import type { MomentVo } from '@youyu/shared/types/vo';

const route = useRoute();
const baseLayoutRef = ref<InstanceType<typeof BaseLayout> | null>(null);

const saveSuccess = (data: MomentVo) => {
  if (route.name === 'MomentListNew') {
    baseLayoutRef.value.Component.unshiftItem(data);
  }
};
</script>

<style lang="scss" scoped>
.moment-list {
  display: flex;
  justify-content: center;
  padding: 8px 0;

  .moment-list-right {
    position: relative;
    width: 290px;
  }

  .moment-list-center {
    width: 850px;
  }
}
</style>
