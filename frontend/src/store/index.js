import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    token: "",
    userId: null,
    userAuthLvl: null,
    userLoggedIn: false,
  },
  mutations: {
    setStateToken(state, token) {
      state.token = token;
      if (token) {
        state.userLoggedIn = true;
      } else {
        state.userLoggedIn = false;
      }
    },
    setStateUserId(state, userId) {
      state.userId = userId;
    },
    setStateUserAuthLvl(state, userAuthLvl) {
      state.userAuthLvl = userAuthLvl;
    },
  },
  actions: {
    storeToken({ commit }, token) {
      commit("setStateToken", token);
    },
    storeUserId({ commit }, userId) {
      commit("setStateUserId", userId);
    },
    storeUserAuthLvl({ commit }, userAuthLvl) {
      commit("setStateUserAuthLvl", userAuthLvl);
    },
  },
});
