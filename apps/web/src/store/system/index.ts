import { defineStore } from 'pinia';

const useLoadingStore = defineStore('loadingStore', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => ({
    appLoading: false,
    contentLoading: false,
  }),
  actions: {
    setAppLoading(appLoading: boolean) {
      this.appLoading = appLoading;
    },
    setContentLoading(contentLoading: boolean) {
      this.contentLoading = contentLoading;
    },
  },
});

export { useLoadingStore };
