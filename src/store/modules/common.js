import * as types from '../mutation-types';

const state = {
  isLoading:false,
  direction:'forward',
  isLogin:false,
  scrollTop:0,
  isLoaded:false
}

const actions = {
  updateLoadingStatus({ commit }, payload) {
    commit(types.COMMON_LOADING_STATUS, payload)
  },
  updateDirection({ commit }, status) {
    commit(types.UPDATE_DIRECTION, status)
  },
  updateLoginStatus({ commit }, status) {
    commit(types.UPDATE_LOGIN,status)
  },
  updatePosition({ commit }, top) {
    commit({ type:'updatePosition',top:top })
  },
  showLoaded({ commit }, payload) {
    commit(types.COMMON_PAGE_LOADED, payload)
  }
}

const getters = {
  isLoading: state => state.isLoading,
  direction: state => state.direction,
  isLogin: state => state.isLogin,
  isLoaded: state => state.isLoaded,
  scrollTop: state => state.scrollTop
}

const mutations = {
  [types.COMMON_LOADING_STATUS](state, payload) {
    state.isLoading = payload.isLoading
  },
  [types.UPDATE_DIRECTION](state, payload) {
    state.direction = payload.direction
  },
  [types.UPDATE_LOGIN](state, payload) {
    state.isLogin = payload.isLogin
  },
  [types.COMMON_PAGE_LOADED](state, payload) {
    state.isLoaded = payload.isLoaded
  },
  updatePosition(state, payload) {
    state.scrollTop = payload.top
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
}