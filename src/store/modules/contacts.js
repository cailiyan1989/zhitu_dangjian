import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  partysList: [],
  personalList: [],

}

const actions = {
  getPartyList({ commit }, params) {
    api.get_party_list(params).then(res => {
      commit(types.GET_PARTY_lIST, res)
    })
  },
  getPersonalList({ commit }, params) {
    api.get_party_user(params).then(res => {
      commit(types.GET_PERSONAL_LIST, res)
    })
  }
}

const getters = {
  partysList: state => state.partysList,
  personalList: state => state.personalList,

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
}

export default {
  state,
  actions,
  getters,
  mutations
}
