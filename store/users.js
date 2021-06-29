/* eslint-disable no-console */
export const state = () => ({
  users: null,
  user: null,
  busy: false,
  errors: null
});

export const getters = {
  users: state => state.users,
  user: state => state.user,
  busy: state => state.busy,
  errors: state => state.errors
};

export const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },

  SET_USER(state, payload) {
    state.user = payload;
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

    let users = getters.users;

    if (!users || users.length === 0 || refresh) {
      const res = await this.$axios.get('/users');

      users = res.data.data;
    }

    commit('IS_BUSY', false);
    commit('SET_USERS', users);
  },

  async view({ commit, getters }, id) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    const users = getters.users;
    let user = null;

    if (!users || users.length === 0) {
      const res = await this.$axios.get(`/users/${id}`);

      user = res.data;
    } else {
      user = users.find(usr => usr.data.user_id === parseInt(id));
    }

    commit('IS_BUSY', false);
    commit('SET_USER', user);
  },

  async create({ commit, dispatch }, data) {
    commit('SET_ERRORS', null);
    commit('IS_BUSY', true);

    await this.$axios
      .post('/users', data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/users' });
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
      .patch(`/users/${data.id}`, data)
      .then(() => {
        dispatch('get', true);
        this.$router.push({ path: '/users' });
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
      .delete(`/users/${id}`)
      .then(() => {
        dispatch('get', true);
      })
      .catch(err => {
        commit('IS_BUSY', false);
        console.log(err);
      });
  }
};
