/* eslint-disable no-console */

export const state = () => ({
  reviews: null,
  review: null,
  busy: false,
  errors: null
});

export const getters = {
  reviews: state => state.reviews,
  review: state => state.review,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_REVIEWS(state, payload) {
    state.reviews = payload;
  },

  SET_REVIEW(state, payload) {
    state.review = payload;
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

    let reviews = getters.reviews;

    if (!reviews || reviews.data.length === 0 || refresh) {
      const res = await this.$axios.get('/productReviews');
      reviews = res.data;
    }

    commit('SET_REVIEWS', reviews);
    commit('IS_BUSY', false);
  },

  async updateStatus({ commit, dispatch }, { productSlug, reviewId, status }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .patch(`/products/${productSlug}/productReviews/${reviewId}`, status)
      .then(res => {
        console.log(res);
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  },

  async delete({ commit, dispatch }, { productSlug, reviewId }) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/products/${productSlug}/productReviews/${reviewId}`)
      .then(res => {
        console.log(res);
        dispatch('get', true);
      })
      .catch(err => {
        console.log(err);
        commit('IS_BUSY', false);
      });
  }
};
