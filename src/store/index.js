import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    favorites: []
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, { token, username }) {
      state.status = 'success'
      state.token = token
      state.username = username
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.username = ''
    },
    update_favorites (state, data) {
      state.favorites = data
    }
  },
  actions: {
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    },
    callback ({ commit }, data) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common.Authorization = 'Bearer ' + data.token
        commit('auth_success', data)
        resolve()
      })
    },
    updateFavorites ({ commit }) {
      return new Promise((resolve, reject) => {
        const config = {
          method: 'get',
          url: 'https://api.imgur.com/3/account/' + this.state.username + '/favorites/'
        }

        axios(config)
          .then(function (response) {
            commit('update_favorites', response.data.data)
          })
          .catch(function (error) {
            console.log(error)
          })
        resolve()
      })
    },
    toggleFavorite ({ dispatch }, id) {
      return new Promise((resolve, reject) => {
        const config = {
          method: 'post',
          url: 'https://api.imgur.com/3/image/' + id + '/favorite/'
        }

        axios(config)
          .then(function () {
            dispatch('updateFavorites')
          })
          .catch(function (error) {
            console.log(error)
          })
        resolve()
      })
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    username: state => state.username,
    token: state => state.token,
    getFavorite: (state) => (id) => {
      return state.favorites.find(favorite => favorite.id === id)
    }
  }
})
