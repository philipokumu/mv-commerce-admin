/* eslint-disable no-console */

export const state = () => ({
  busy: false,
  errors: null
});

export const getters = {
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
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

  async create({ commit, dispatch }, { sellerId, productSlug, data }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post(`/sellers/${sellerId}/products/${productSlug}/images`, data)
      .then(() => {
        dispatch('products/get', true, { root: true });
        this.$router.push('/products');
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async delete({ commit, dispatch }, { sellerId, productSlug, imageId }) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/sellers/${sellerId}/products/${productSlug}/images/${imageId}`)
      .then(() => {
        dispatch('products/get', true, { root: true });
        this.$router.push('/products');
      })
      .catch(err => {
        console.log(err);

        commit('IS_BUSY', false);
      });
  }
};
