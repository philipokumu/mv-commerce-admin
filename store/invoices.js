/* eslint-disable no-console */

export const state = () => ({
  invoices: null,
  sellerInvoices: null,
  invoice: null,
  busy: false,
  errors: null
});

export const getters = {
  invoices: state => state.invoices,
  sellerInvoices: state => state.sellerInvoices,
  invoice: state => state.invoice,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_INVOICES(state, payload) {
    state.invoices = payload;
  },

  SET_SELLER_INVOICES(state, payload) {
    state.sellerInvoices = payload;
  },

  SET_INVOICE(state, payload) {
    state.invoice = payload;
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

    let invoices = getters.invoices;

    if (!invoices || invoices.length === 0 || refresh) {
      const res = await this.$axios.get('/unpaid/invoices');
      invoices = res.data.data;
    }

    commit('SET_INVOICES', invoices);
    commit('IS_BUSY', false);
  },

  async getBySeller({ commit }, sellerId) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const res = await this.$axios.get(`/sellers/${sellerId}/unpaid/invoices`);
    const invoices = res.data.data;

    commit('SET_SELLER_INVOICES', invoices);
    commit('IS_BUSY', false);
  },

  async view({ getters, commit }, invoiceId) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const invoices = getters.invoices;
    let invoice = null;

    if (!invoices || invoices.length === 0) {
      const res = await this.$axios.get(`invoices/${invoiceId}`);
      invoice = res.data;
    } else {
      invoice = invoices.find(
        inv => inv.data.invoice_id === parseInt(invoiceId)
      );
    }

    commit('SET_INVOICE', invoice);
    commit('IS_BUSY', false);
  },

  async complete({ commit, dispatch }, invoiceId) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .patch(`/unpaid/invoices/${invoiceId}`)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/invoices' });
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
