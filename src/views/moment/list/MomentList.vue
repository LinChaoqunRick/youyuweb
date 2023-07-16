<template>
  <div class="moment-list mt-8">
    <div class="moment-middle">
      <MomentEditor @saveSuccess="saveSuccess"/>
      <UserMomentList ref="UserMomentListRef"/>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: "MomentList"
  }
</script>

<script setup lang="ts">
  import {ref, onBeforeUnmount} from 'vue';

  import MomentEditor from "../components/MomentEditor.vue";
  import UserMomentList from "@/views/moment/list/UserMomentList.vue";

  const UserMomentListRef = ref(null);

  const saveSuccess = (data) => {
    UserMomentListRef.value.unshiftItem(data);
  }

  onBeforeUnmount(()=>{
    console.log("onBeforeUnmount");
  })
</script>

<style lang="scss" scoped>
  .no-data {

  }

  .moment-list {
    display: flex;
    justify-content: center;

    .moment-middle {
      width: 750px;
    }
  }

</style>
