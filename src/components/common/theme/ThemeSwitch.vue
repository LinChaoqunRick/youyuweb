<template>
  <div class="theme-switch">
    <div class="switch-button" @click="handleSwitch">
      <transition name="fade" mode="out-in">
        <a-switch v-model:checked="checked">
          <template #checkedChildren>
            <i-sun-one />
          </template>
          <template #unCheckedChildren>
            <i-moon />
          </template>
        </a-switch>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const { state, commit } = useStore();

let theme: string = state.theme.theme;
const checked = ref<boolean>(theme === 'light');

const handleSwitch = () => {
  theme = theme === 'light' ? 'dark' : 'light';
  checked.value = theme === 'light';
  commit('changeTheme', theme);
  document.documentElement.className = (theme === 'light') ? 'light-theme' : 'dark-theme';
  // addSkin(checked.value ? light : dark);
};

const addSkin = (content: string) => {
  let head = document.getElementsByTagName('head')[0];
  const styleList = head.getElementsByTagName('style');
  // 查找style是否存在，存在的话需要删除dom
  if (styleList.length > 0) {
    for (let i = 0; i < styleList.length; i++) {
      if (styleList[i].getAttribute('data-type') === 'theme') {
        styleList[i].remove();
      }
    }
  }
  // 最后加入对应的主题和加载less的js文件
  let styleDom = document.createElement('style');
  styleDom.dataset.type = 'theme';
  styleDom.innerHTML = content;
  head.appendChild(styleDom);
};

document.documentElement.setAttribute('theme', theme);
document.documentElement.className = (theme === 'light') ? 'light-theme' : 'dark-theme';
// addSkin(checked.value ? light : dark);
</script>

<style lang="scss" scoped>
::v-deep(.ant-switch) {
  box-sizing: content-box;
  border: var(--theme-switch-border);
}
</style>
