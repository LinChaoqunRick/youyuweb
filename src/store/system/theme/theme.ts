export default {
  state: () => ({
    theme: localStorage.getItem("theme")
  }),
  mutations: {
    changeTheme(state: { theme: any; }, theme: string) {
      state.theme = theme;
      document.documentElement.setAttribute("theme", theme);
      localStorage.setItem("theme", theme);
    }
  },
  actions: {},
  getters: {
    currentTheme(state) {
      return state.theme;
    }
  }
}
