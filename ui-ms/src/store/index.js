import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "flixio",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    auth: {
      user: null,
      token: null
    }
  },
  mutations: {
    SET_USER(state, info) {
      state.auth.user = info;
    },
    LOG_OUT(state) {
      state.auth.user = null;
      state.auth.token = null;
      localStorage.setItem("auth", "");
    },
    SET_TOKEN(state, info) {
      state.auth.token = info;
    },
    SET_PASSWORD_RESET_EMAIL_INFO(state, value) {
      state.password_reset_info = value;
    }
  },
  actions: {},
  modules: {},
  plugins: [vuexLocal.plugin]
});
