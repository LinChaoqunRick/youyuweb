<template>
  <div class="search">
    <a-input-search
      v-model:value="text"
      placeholder="搜索有语"
      enter-button
      :maxlength="50"
      @search="handleSearch"
      @focus="onFocus"
      @blur="onBlur"
      :class="{'input-active': active}"
    />
  </div>
</template>

<script setup>
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';

  const text = ref("");
  const active = ref(false);

  const router = useRouter();

  const handleSearch = () => {
    if (text.value) {
      router.push(`/search?q=${text.value}&type=1`);
    }
  }

  const onFocus = (e) => {
    active.value = true;
  }

  const onBlur = (e) => {
    active.value = false;
  }
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-input-search) {
    .ant-input-search-button {
      padding: 4px 12px;
    }

    .ant-input-wrapper {
      display: flex;
      justify-content: flex-end;

      input {
        width: 180px;
        background-color: transparent;
        height: 36px;
        border-radius: 4px 0 0 4px;
        transition: .3s;
        font-size: 16px;
        color: #8a919f;
      }

      .ant-input-group-addon {
        display: inline-block;
        width: 50px;

        .ant-input-search-button {
          height: 36px;
          width: 50px;
        }
      }
    }

  }

  .input-active {
    ::v-deep(.ant-input-wrapper) {
      input {
        width: 300px;
      }
    }
  }
</style>
