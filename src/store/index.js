import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: "",
    careerSelected: ""
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setCareerSelected(state, payload) {
      state.careerSelected = payload;
    }
  },
  actions: {},
  modules: {}
});
