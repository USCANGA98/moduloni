import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: [],
    careerSelected: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setCareerSelected(state, payload) {
      state.careerSelected = payload;
    },
    // ELIMINAR_USUARIO(state, index){
    //   state.user.splice(index, 1)
    // }
  },
  actions: {
    // eliminarUsuario({commit}, index){
    //   commit('ELIMINAR_USUARIO', index);
    // }
    
  },
  modules: {}
});
