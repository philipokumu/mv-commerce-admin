/* eslint-disable no-console */

export const state = () => ({
  orders: null,
  order: null,
  busy: false,
  errors: null
});

export const getters = {
  orders: state => state.orders,
  order: state => state.order,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },

  SET_ORDER(state, payload) {
    state.order = payload;
  },

  IS_BUSY(state, payload) {
    state.busy = payload;
  },

  SET_ERRORS(state, payload) {
    state.errors = payload;
  }
};

export const actions = {
  clearErrors({ commit }) {
    return commit('SET_ERRORS', null);
  },

  async get({ getters, commit }, refresh) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let orders = getters.orders;

    if (!orders || orders.length === 0 || refresh) {
      const res = await this.$axios.get('/orders');
      orders = res.data.data;
    }

    commit('SET_ORDERS', orders);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, { orderId, userId }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const orders = getters.orders;
    let order = null;

    if (!orders || orders.length === 0) {
      const res = await this.$axios.get(`/users/${userId}/orders/${orderId}`);
      order = res.data;
    } else {
      order = orders.find(odr => odr.data.order_id === parseInt(orderId));
    }

    commit('SET_ORDER', order);
    commit('IS_BUSY', false);
  },

  async delete({ commit, dispatch }, id) {
    if (!confirm('Are you sure? ')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`orders/${id}`)
      .then(() => {
        dispatch('get', true);
        this.$router.push('/orders');
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
