/* eslint-disable no-console */

export const state = () => ({
  sellers: null,
  seller: null,
  busy: false,
  errors: null
});

export const getters = {
  sellers: state => state.sellers,
  seller: state => state.seller,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_SELLERS(state, payload) {
    state.sellers = payload;
  },

  SET_SELLER(state, payload) {
    state.seller = payload;
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

    let sellers = getters.sellers;

    if (!sellers || sellers.length === 0 || refresh) {
      const res = await this.$axios.get('/sellers');
      sellers = res.data.data;
    }

    commit('SET_SELLERS', sellers);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const sellers = getters.sellers;
    let seller = null;

    if (!sellers || sellers.length === 0) {
      const res = await this.$axios.get(`/sellers/${id}`);
      seller = res.data;
    } else {
      seller = sellers.find(slr => slr.data.seller_id === parseInt(id));
    }

    commit('SET_SELLER', seller);
    commit('IS_BUSY', false);
  },

  async create({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/sellers', data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/sellers' });
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.log(err);
      });
  },

  async update({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .patch(`/sellers/${data.id}`, data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/sellers' });
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.log(err);
      });
  },

  async delete({ commit, dispatch }, id) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/sellers/${id}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
