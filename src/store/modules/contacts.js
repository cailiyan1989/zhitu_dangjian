import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  partysList: [],
  personalList: [],

  otherInfo: {},
  searchInfo: {},

  errorContactMsg: ''

}

const actions = {
  getPartyList({ commit }, params) {
    commit('clearContactMsg')
    api.get_party_list(params).then(res => {
      commit(types.GET_PARTY_lIST, res)
    })
  },
  getPersonalList({ commit }, params) {
    commit('clearContactMsg')
    api.get_party_user(params).then(res => {
      commit(types.GET_PERSONAL_LIST, res)
    })
  },
  getOtherInfo({ commit }, params) {
    commit('clearContactMsg')
    api.get_other_info(params).then(res => {
      commit(types.GET_OTHER_INFO, res)
    })
  },
  getSearchInfo({ commit }, params) {
    commit('clearContactMsg')
    api.get_search_user(params).then(res => {
      commit(types.GET_SEARCH_USER, res)
    })
  }
}

const getters = {
  partysList: state => state.partysList,
  personalList: state => state.personalList,
  otherInfo: state => state.otherInfo,
  searchInfo: state => state.searchInfo,
  errorContactMsg: state => state.errorContactMsg

}

const mutations = {
  [types.GET_PARTY_lIST](state, res) {
    if(res.code == 0) {
      state.partysList = []
    } else {
      state.partysList = res.data
    }
  },
  [types.GET_PERSONAL_LIST](state,res) {
    if(res.code == 0) {
      state.personalList = []
    } else {
      state.personalList = res.data
    }
  },
  [types.GET_OTHER_INFO](state, res) {
    if(res.code == 0) {
      state.otherInfo = {}
      errorMemberMsg = res.msg
    } else {
      state.otherInfo = res.data
    }
  },
  [types.GET_SEARCH_USER](state, res) {
    if(res.code == 0) {
      state.searchInfo = {}
      errorMemberMsg = res.msg
    } else {
      state.searchInfo = res.data
    }
  },

  clearContactMsg(state) {
    state.errorContactMsg = ''
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
