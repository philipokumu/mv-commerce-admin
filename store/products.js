/* eslint-disable no-console */

export const state = () => ({
  products: null,
  sellerProducts: null,
  product: null,
  busy: false,
  errors: null
});

export const getters = {
  products: state => state.products,
  sellerProducts: state => state.sellerProducts,
  product: state => state.product,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },

  SET_SELLER_PRODUCTS(state, payload) {
    state.sellerProducts = payload;
  },

  SET_PRODUCT(state, payload) {
    state.product = payload;
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

    let products = getters.products;

    if (!products || products.length === 0 || refresh) {
      const res = await this.$axios.get('/products');
      products = res.data.data;
    }

    commit('SET_PRODUCTS', products);
    commit('IS_BUSY', false);
  },

  async getBySeller({ commit }, sellerId) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const res = await this.$axios.get(`/sellers/${sellerId}/products`);
    const products = res.data.data;

    commit('SET_SELLER_PRODUCTS', products);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, { productSlug, sellerId }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const products = getters.products;
    let product = null;

    if (!products || products.length === 0) {
      const res = await this.$axios.get(
        `/sellers/${sellerId}/products/${productSlug}`
      );
      product = res.data;
    } else {
      product = products.find(
        prod => prod.data.attributes.slug === productSlug
      );
    }

    commit('SET_PRODUCT', product);
    commit('IS_BUSY', false);
  },

  async create({ commit, dispatch }, product) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/products', product)
      .then(() => {
        dispatch('get', true);
        this.$router.push('/products');
      })
      .catch(err => {
        console.log(err);

        if (err.response.status === 422) {
          commit('SET_ERRORS', err.response.data.errors.meta);
        }

        commit('IS_BUSY', false);
      });
  },

  async update({ commit, dispatch }, { sellerId, productSlug, data }) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post(`/sellers/${sellerId}/products/${productSlug}?_method=PATCH`, data)
      .then(() => {
        dispatch('get', true);
        this.$router.push('/products');
      })
      .catch(err => {
        console.log(err);

        if (err.response.status === 422) {
          commit('SET_ERRORS', err.response.data.errors.meta);
        }

        commit('IS_BUSY', false);
      });
  },

  async delete({ commit, dispatch }, slug) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete(`/products/${slug}`)
      .then(() => {
        dispatch('get', true);
        this.$router.push('/products');
      })
      .catch(err => {
        console.log(err);

        if (err.response.status === 422) {
          commit('SET_ERRORS', err.response.data.errors.meta);
        }

        commit('IS_BUSY', false);
      });
  }
};
