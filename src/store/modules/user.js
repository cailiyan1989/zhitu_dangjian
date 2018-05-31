import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  userInfo: {},

  branch: {},

  errorMemberMsg: ''
}

const actions = {
  getUserInfo({ commit }, params) {
    commit('clearMemberMsg')
    api.get_user_info(params).then(res => {
      commit(types.GET_USER_INFO, res)
    })
  },

  getBranchInfo({ commit }, params) {
    commit('clearMemberMsg')
    api.get_branch_info(params).then(res => {
      commit(types.GET_BRANCH_INFO, res)
    })
  },
}

const getters = {
  userInfo: state => state.userInfo,
  branch: state => state.branch,

  errorMemberMsg: state => state.errorMemberMsg
}

const mutations = {
  [types.GET_USER_INFO](state, res) {
    if (res.code == 0) {
      state.userInfo = {},
      errorMemberMsg = res.msg
    } else {
      state.userInfo = res.data
    }
  },
  [types.GET_BRANCH_INFO](state, res) {
    if (res.code == 0) {
      state.branch = {}
      errorMemberMsg = res.msg
    } else {
      state.branch = res.data
    }
  },
  

  clearMemberMsg(state) {
    state.errorMemberMsg = ''
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
