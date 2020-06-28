import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../libs/axios';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'SKLM_ADMIN',
    storage: window.localStorage
  })],
  state: {
    user: {},
    options: []
  },
  mutations: {
    LOGIN: (state, data) => {
      state.user = data;
    },
    LOGOUT: (state) => {
      state.user = {};
      localStorage.clear();
    }
  },
  actions: {
    async postData({
      // eslint-disable-next-line no-unused-vars
      rootState
    }, {
      url,
      data
    }) {
      // eslint-disable-next-line no-useless-catch
      try {
        let res = await axios.post(axios.baseURL + url, data);
        let resData = res.data;
        if (resData.resultCode === 200) {
          return resData;
        } else {
          throw new Error(resData.message);
        }
      } catch (error) {
        throw error;
      }
    },
    // eslint-disable-next-line no-empty-pattern
    async getData({ }, {
      url,
      data
    }) {
      // eslint-disable-next-line no-useless-catch
      try {
        let res = await axios.get(axios.baseURL + url, {
          // let res = await axios.get(url, {
          params: data
        });
        let resData = res.data;
        if (resData.resultCode === 200) {
          return resData;
        } else {
          throw new Error(resData.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async putData({
      // eslint-disable-next-line no-unused-vars
      rootState
    }, {
      url,
      data
    }) {
      // eslint-disable-next-line no-useless-catch
      try {
        let res = await axios.put(axios.baseURL + url, data);
        let resData = res.data;
        if (resData.resultCode === 200) {
          return resData;
        } else {
          throw new Error(resData.message);
        }
      } catch (error) {
        throw error;
      }
    },
    async deleteData({
      // eslint-disable-next-line no-unused-vars
      rootState
    }, {
      url,
      data
    }) {
      // eslint-disable-next-line no-useless-catch
      try {
        let res = await axios.delete(axios.baseURL + url, data);
        let resData = res.data;
        if (resData.resultCode === 200) {
          return resData;
        } else {
          throw new Error(resData.message);
        }
      } catch (error) {
        throw error;
      }
    },
    setUser({
      commit
    }, data) {
      commit('LOGIN', data);
    }
  }
});