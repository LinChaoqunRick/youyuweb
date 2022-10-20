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

  const {state, commit} = useStore();

  let theme = state.theme.theme;
  const checked = ref(theme === 'light');

  document.documentElement.setAttribute("theme", theme);

  const handleSwitch = () => {
    theme = theme === 'light' ? 'dark' : 'light';
    checked.value = theme === 'light';
    commit("changeTheme", theme);
  }
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-switch) {
    box-sizing: content-box;
    border: var(--theme-switch-border);
  }
</style>
