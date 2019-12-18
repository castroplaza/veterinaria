import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from "../router"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isLoggedIn: false,
    from: null
  },
  getters: {
    getUser: (state) => state.user
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    setLogged: (state, isLoggedIn, from) => {
      state.isLoggedIn = isLoggedIn,
      state.from = from
    }
  },
  actions: {
    async autoLogin ({ commit }, from) {
      let token = localStorage.getItem('token')
      if (token) {
        commit('setUser', await decode(token))
        commit('setLogged', true, from)
      }
    },
    salir ({ commit }) {
      commit('setUser', null )
      commit('setLogged', false)
      localStorage.removeItem('token')
      router.push('/')
    }
  },
  modules: {
  }
})
