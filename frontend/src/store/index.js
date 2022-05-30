import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    token: "",
    userId: "",
  },
  mutations: {
    setStateToken(state, token) {
      state.token = token;
    },
    setStateUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    storeToken({ commit }, token) {
      commit("setStateToken", token);
    },
    storeUserId({ commit }, userId) {
      commit("setStateUserId", userId);
    },
  },
});
