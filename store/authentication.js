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

  async login({ commit }, user) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$auth
      .loginWith('local', { data: user })
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  },

  async register({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/register', data)
      .then(() => {
        dispatch('login', data);
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  },

  async update({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .patch('/auth/admin', data)
      .then(async () => {
        commit('IS_BUSY', false);
        await this.$auth.fetchUser();
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  },

  async requestPasswordReset({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/forgot-password', data)
      .then(res => {
        commit('IS_BUSY', false);
        if (res.status === 200) {
          return this.$router.push('/auth/password-reset-link-sent');
        }
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  },

  async resetPassword({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/reset-password', data)
      .then(res => {
        commit('IS_BUSY', false);
        if (res.status === 200) {
          return this.$router.push('/auth/login');
        }
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  },

  async updatePassword({ commit }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .patch('/auth/update-password', data)
      .then(async () => {
        commit('IS_BUSY', false);
        await this.$auth.fetchUser();
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  },

  async logout({ commit }) {
    commit('IS_BUSY', true);

    await this.$auth
      .logout()
      .then(() => {
        commit('IS_BUSY', false);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.warn(err);
      });
  },

  async delete({ commit, dispatch }) {
    if (!confirm('Are you sure?')) return;

    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .delete('/auth/admin')
      .then(() => {
        dispatch('logout');
      })
      .catch(err => {
        commit('IS_BUSY', false);

        if (err.response.status === 422) {
          return commit('SET_ERRORS', err.response.data.errors.meta);
        }

        console.warn(err);
      });
  }
};
