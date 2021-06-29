/* eslint-disable no-console */

export const state = () => ({
  popularByAmount: null,
  popularByQuantity: null,
  popularByOrder: null,
  popularSellerByProduct: null,
  busy: false
});

export const getters = {
  popularByAmount: state => state.popularByAmount,
  popularByQuantity: state => state.popularByQuantity,
  popularByOrder: state => state.popularByOrder,
  popularSellerByProduct: state => state.popularSellerByProduct,
  busy: state => state.busy
};

export const mutations = {
  SET_BY_AMOUNT(state, payload) {
    state.popularByAmount = payload;
  },

  SET_BY_QUANTITY(state, payload) {
    state.popularByQuantity = payload;
  },

  SET_ORDER(state, payload) {
    state.popularByOrder = payload;
  },

  SET_SELLER(state, payload) {
    state.popularSellerByProduct = payload;
  },

  IS_BUSY(state, payload) {
    state.busy = payload;
  }
};

export const actions = {
  async get({ commit }, medium) {
    commit('IS_BUSY', true);

    let res;

    if (medium === 'amount') {
      res = await this.$axios.get('/popularByAmount/products');
      commit('SET_BY_AMOUNT', res.data.data);
    }

    if (medium === 'quantity') {
      res = await this.$axios.get('/popularByQuantity/products');
      commit('SET_BY_QUANTITY', res.data.data);
    }

    if (medium === 'order') {
      res = await this.$axios.get('/popularByOrder/products');
      commit('SET_ORDER', res.data.data);
    }

    if (medium === 'seller') {
      res = await this.$axios.get('/popular/sellers');
      commit('SET_SELLER', res.data.data);
    }

    commit('IS_BUSY', false);
  }
};
