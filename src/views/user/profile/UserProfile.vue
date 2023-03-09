<template>
  <div class="user-profile">
    <!--    <div class="user-banner"></div>-->
    <div class="user-main">
      <div class="user-left">
        <UserInfoPanel v-aside2="{header: 268}" :id="userId"/>
      </div>
      <div class="user-content">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useRouter} from "vue-router";
  import UserInfoPanel from "@/views/post/detail/child/UserInfoPanel.vue";

  const router = useRouter();

  const userId = router.currentRoute.value.params.userId;

  console.log(userId);

</script>

<style lang="scss" scoped>
  .user-profile {
    .user-banner {
      height: 100px;
      background-color: skyblue;
    }

    .user-main {
      max-width: 1300px;
      display: flex;
      margin: 8px auto;
      justify-content: center;

      .user-left {
        position: relative;
        width: 300px;
      }

      .user-content {
        width: 75%;
        height: 2000px;
        margin-left: 8px;
        background-color: #fff;
      }
    }
  }
</style>
