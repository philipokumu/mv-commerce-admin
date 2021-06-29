/* eslint-disable no-console */

export const state = () => ({
  orders: null,
  busy: false
});

export const getters = {
  orders: state => state.orders,
  busy: state => state.busy
};

export const mutations = {
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },

  IS_BUSY(state, payload) {
    state.busy = payload;
  }
};

export const actions = {
  async get({ getters, commit }) {
    commit('IS_BUSY', true);

    let orders = getters.orders;

    if (!orders || orders.length === 0) {
      const res = await this.$axios.get('/purchased/cartItemByDay');
      [orders] = res.data;
    }

    commit('SET_ORDERS', orders);
    commit('IS_BUSY', false);
  }
};
