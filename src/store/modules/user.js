import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  userInfo: {},

  branch: {},

  otherInfo: {},

  errorMemberMsg: ''
}

const actions = {
  getUserInfo({ commit }, params) {
    api.get_user_info(params).then(res => {
      commit(types.GET_USER_INFO, res)
    })
  },

  getBranchInfo({ commit }, params) {
    api.get_branch_info(params).then(res => {
      commit(types.GET_BRANCH_INFO, res)
    })
  },

  getOtherInfo({ commit }, params) {
    api.get_other_info(params).then(res => {
      commit(types.GET_OTHER_INFO, res)
    })
  }
}

const getters = {
  userInfo: state => state.userInfo,
  branch: state => state.branch,
  otherInfo: state => state.otherInfo,
  errorMemberMsg: state => state.errorMemberMsg
}

const mutations = {
  [types.GET_USER_INFO](state, res) {
    if (res.code == 0) {
      state.userInfo = {}
    } else {
      state.userInfo = res.data
    }
  },
  [types.GET_BRANCH_INFO](state, res) {
    if (res.code == 0) {
      state.branch = {}
    } else {
      state.branch = res.data
    }
  },
  [types.GET_OTHER_INFO](state, res) {
    if(res.code == 0) {
      state.otherInfo = {}
    } else {
      state.otherInfo = res.data
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
