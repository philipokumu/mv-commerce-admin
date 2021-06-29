/* eslint-disable no-console */
export const state = () => ({
  admins: null,
  admin: null,
  busy: false,
  errors: null
});

export const getters = {
  admins: state => state.admins,
  admin: state => state.admin,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_ADMINS(state, payload) {
    state.admins = payload;
  },

  SET_ADMIN(state, payload) {
    state.admin = payload;
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

  async get({ commit, getters }, refresh) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    let admins = getters.admins;

    if (!admins || admins.length === 0 || refresh) {
      const res = await this.$axios.get('/admins');

      admins = res.data.data;
    }

    commit('IS_BUSY', false);
    commit('SET_ADMINS', admins);
  },

  async view({ commit, getters }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const admins = getters.admins;
    let admin = null;

    if (!admins || admins.length === 0) {
      const res = await this.$axios.get(`/admins/${id}`);
      admin = res.data;
    } else {
      admin = admins.find(admin => admin.data.admin_id === parseInt(id));
    }

    commit('IS_BUSY', false);
    commit('SET_ADMIN', admin);
  },

  async create({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/admins', data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/admins' });
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
      .patch(`/admins/${data.id}`, data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/admins' });
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
      .delete(`/admins/${id}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
