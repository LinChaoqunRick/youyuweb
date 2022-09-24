export default {
  state: () => ({
    theme: "light"
  }),
  mutations: {
    changeTheme(state, theme) {
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
