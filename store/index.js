export const state = () => ({
  sidebar: false
});

export const getters = {
  sidebar: state => state.sidebar
};

export const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.sidebar = !state.sidebar;
  },
  CLOSE_SIDEBAR(state) {
    state.sidebar = false;
  }
};

export const actions = {
  toggleSidebar({ commit, getters }) {
    if (process.browser) {
      if (!getters.sidebar) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    }

    commit('TOGGLE_SIDEBAR');
  },

  closeSidebar({ commit }) {
    if (process.browser) {
      document.body.classList.remove('overflow-hidden');
    }

    commit('CLOSE_SIDEBAR');
  }
};
