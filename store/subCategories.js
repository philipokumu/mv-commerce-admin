/* eslint-disable no-console */

export const state = () => ({
  subCategories: null,
  subCategory: null,
  busy: false,
  errors: null
});

export const getters = {
  subCategories: state => state.subCategories,
  subCategory: state => state.subCategory,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_SUB_CATEGORIES(state, payload) {
    state.subCategories = payload;
  },

  SET_SUB_CATEGORY(state, payload) {
    state.subCategory = payload;
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

  async get({ getters, commit }, { categorySlug, refresh }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let subCategories = getters.subCategories;

    if (!subCategories || subCategories.length === 0 || refresh) {
      const res = await this.$axios.get(
        `/productCategories/${categorySlug}/subCategories`
      );
      subCategories = res.data.data;
    }

    commit('SET_SUB_CATEGORIES', subCategories);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, { subCategorySlug, categorySlug }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const subCategories = getters.subCategories;
    let subCategory = null;

    if (!subCategories || subCategories.length === 0) {
      const res = await this.$axios.get(
        `/productCategories/${categorySlug}/subCategories/${subCategorySlug}`
      );
      subCategory = res.data;
    } else {
      subCategory = subCategories.find(
        cat => cat.data.attributes.slug === subCategorySlug
      );
    }

    commit('SET_SUB_CATEGORY', subCategory);
    commit('IS_BUSY', false);
  },

  async create({ rootGetters, commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/productCategories', data)
      .then(() => {
        const currentCategory = rootGetters['categories/category'];

        dispatch('get', {
          categorySlug: currentCategory.data.attributes.slug,
          refresh: true
        });
        this.$router.push(
          `/categories/${currentCategory.data.attributes.slug}`
        );
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.log(err);
      });
  },

  async update({ commit, dispatch, rootGetters }, { categorySlug, data }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post(`/productCategories/${categorySlug}?_method=PATCH`, data)
      .then(() => {
        const currentCategory = rootGetters['categories/category'];

        dispatch('get', {
          categorySlug: currentCategory.data.attributes.slug,
          refresh: true
        });
        this.$router.push({
          path: `/categories/${currentCategory.data.attributes.slug}`
        });
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.log(err);
      });
  },

  async delete({ commit, dispatch, rootGetters }, slug) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/productCategories/${slug}`)
      .then(() => {
        const currentCategory = rootGetters['categories/category'];

        dispatch('get', {
          categorySlug: currentCategory.data.attributes.slug,
          refresh: true
        });
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
