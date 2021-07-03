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
    },
    // ELIMINAR_USUARIO(state, index){
    //   console.log("soy el index antes de ser eliminado", index)
    //   console.log(state)
    //   console.log("soy el index eliminado", index)
    // }
  },
  actions: {
    // eliminarUsuario({commit}, index){
    //   commit('ELIMINAR_USUARIO', index);
    // }
    
  },
  modules: {}
});
