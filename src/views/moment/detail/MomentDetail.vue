<template>
  <div class="moment-detail mt-8">
    <div class="moment-detail-middle">
      <MomentItem :data="moment" @deleteSuccess="deleteSuccess" v-if="moment"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import type {PropType} from "vue";
  import {useStore} from "vuex";
  import {useRoute} from "vue-router";
  import type {momentListType} from "@/views/moment/types";
  import MomentItem from "../list/MomentItem.vue";

  const route = useRoute();
  const {dispatch} = useStore();

  const moment = ref<momentListType>(null);

  dispatch("getMoment", {momentId: route.params.momentId}).then(res => {
    moment.value = res.data;
  })

  const deleteSuccess = () => {

  }

</script>

<style lang="scss" scoped>
  .moment-detail {
    display: flex;
    justify-content: center;


    .moment-detail-middle {
      width: 750px;

      ::v-deep(.moment-item) {
        border-radius: 4px;
      }
    }
  }
</style>
