<template>
  <div class="theme-switch">
    <div class="switch-button" @click="handleSwitch">
      <transition name="fade" mode="out-in">
        <a-switch v-model:checked="checked">
          <template #checkedChildren>
            <icon-sun-one/>
          </template>
          <template #unCheckedChildren>
            <icon-moon/>
          </template>
        </a-switch>
      </transition>
    </div>
  </div>
</template>

<script setup>
  import {ref, computed} from "vue";
  import {useStore} from "vuex";

  const theme = ref("light");
  const {commit} = useStore();
  const checked = computed(() => theme.value === 'light');

  theme.value = localStorage.getItem("theme") || 'light';
  document.documentElement.setAttribute("theme", theme.value);

  const handleSwitch = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    commit("changeTheme", theme.value)
  }
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-switch) {
    box-sizing: content-box;
    border: var(--theme-switch-border);
  }
</style>
