<template>
  <div class="message">
    <a-form layout="inline" :model="formState" name="basic" autocomplete="off">
      <a-form-item label="昵称" name="nickname" :rules="[{ required: true, message: 'Please input your nickname!' }]">
        <a-input v-model:value="formState.nickname" />
      </a-form-item>

      <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const formState = reactive({
  nickname: '',
  email: '',
});
</script>

<style scoped lang="scss"></style>