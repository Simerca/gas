import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    user: {},
  },
  mutations: {
    SET_TOKEN(state, token){
      state.token = token
    },
    SET_USER(state, user){
      state.user = user
    }
  },
  actions: {
    setToken({commit}, token){
      localStorage.setItem('token', token);
      commit('SET_TOKEN', token);
    },
    setUserData({commit}, user){
      localStorage.setItem('user', JSON.stringify(user));
      commit('SET_USER', user);
    },
    async getToken({commit}){
      return new Promise((resolve, reject)=>{
        if(localStorage.getItem('token')){
          commit('SET_TOKEN', localStorage.getItem('token'));
          resolve(localStorage.getItem('token'));
        }else{
          reject('no token');
        }
      })
    },
    async getUser({commit}){
      return new Promise((resolve, reject)=>{
        if(localStorage.getItem('user')){
          commit('SET_USER', JSON.parse(localStorage.getItem('user')));
          resolve(JSON.parse(localStorage.getItem('user')));
        }else{
          reject('no user');
        }
      })
    }

  },
  modules: {
  }
})
