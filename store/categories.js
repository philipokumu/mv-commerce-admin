/* eslint-disable no-console */

export const state = () => ({
  categories: null,
  category: null,
  busy: false,
  errors: null
});

export const getters = {
  categories: state => state.categories,
  category: state => state.category,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },

  SET_CATEGORY(state, payload) {
    state.category = payload;
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

    let categories = getters.categories;

    if (!categories || categories.length === 0 || refresh) {
      const res = await this.$axios.get('/productCategories');
      categories = res.data.data;
    }

    commit('SET_CATEGORIES', categories);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, slug) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const categories = getters.categories;
    let category = null;

    if (!categories || categories.length === 0) {
      const res = await this.$axios.get(`/productCategories/${slug}`);
      category = res.data;
    } else {
      category = categories.find(cat => cat.data.attributes.slug === slug);
    }

    commit('SET_CATEGORY', category);
    commit('IS_BUSY', false);
  },

  async create({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/productCategories', data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/categories' });
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
      .patch(`/productCategories/${data.slug}`, data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/categories' });
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.log(err);
      });
  },

  async delete({ commit, dispatch }, slug) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/productCategories/${slug}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
