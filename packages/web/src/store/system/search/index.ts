function getLocalHistory() {
  try {
    return JSON.parse(localStorage.getItem("searchHistory") || "[]");
  } catch (e) {
    return [];
  }
}

interface SearchHistoryType {
  searchHistory: string[];
  searchHistoryMaxLength: number;
}

export default {
  state: (): SearchHistoryType => ({
    searchHistory: getLocalHistory(),
    searchHistoryMaxLength: 10,
  }),
  mutations: {
    addHistory(state: SearchHistoryType, text: string) {
      const isExistIndex = state.searchHistory.indexOf(text);
      if (isExistIndex > -1) {
        state.searchHistory.splice(isExistIndex, 1);
      }
      state.searchHistory.unshift(text);
      if (state.searchHistory.length > state.searchHistoryMaxLength) {
        state.searchHistory = state.searchHistory.slice(
          0,
          state.searchHistoryMaxLength
        );
      }
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(state.searchHistory)
      );
    },
    clearHistory(state: { searchHistory: any }) {
      state.searchHistory = [];
      localStorage.removeItem("searchHistory");
    },
    deleteHistory(state: { searchHistory: any }, text: string) {
      const isExistIndex = state.searchHistory.indexOf(text);
      if (isExistIndex > -1) {
        state.searchHistory.splice(isExistIndex, 1);
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.searchHistory)
        );
      }
    },
  },
  actions: {},
  getters: {
    getSearchHistory(state: { searchHistory: any }) {
      return state.searchHistory;
    },
  },
};
