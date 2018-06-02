import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  findsLists: [],
  findsTotal: 0,

  userFindsTotal: 0,
  userLists: [],

  commentList:[],

  errorTaskMsg: '',
}

const actions = {
  getFindsList({ commit }, params) {
    commit('clearTaskMsg')
    api.get_finds_list(params).then(res => {
      commit(types.GET_FINDS_LIST, res)
    })
  },
  getUserList({ commit }, params) {
    commit('clearTaskMsg')
    api.get_user_list(params).then(res => {
      commit(types.GET_USER_LIST, res)
    })
  },
  getCommentList({ commit },params) {
    commit('clearTaskMsg')
    api.get_comment(params).then(res => {
      commit(types.GET_COMMENT, res)
    })
  }
}

const getters = {
  findsLists: state => state.findsLists,
  findsTotal: state => state.findsTotal,

  userFindsTotal: state => state.userFindsTotal,
  userLists: state=>state.userLists,

  commentList: state => state.commentList,

  errorTaskMsg: state => state.errorTaskMsg
}

const mutations = {
  [types.GET_FINDS_LIST](state, res) {
    if (res.code == 0) {
      state.errorTaskMsg = res.msg
      state.findsLists = []
      state.findsTotal = 0
    } else {
      if (res.data.data.length !== 0 && res.data.current_page !== 1) {
        let end = res.data.current_page * 10
        let start = end - 10
        for (start; start < end; start++) {
          if(start < res.data.total) {
            let newIndex = start % 10;
            state.findsLists.push(res.data.data[newIndex])
          }
        }
      } else if (res.data.current_page == 1) {
        state.findsLists = res.data.data
        state.findsTotal = res.data.total
      }
    }
  },
  [types.GET_USER_LIST](state, res) {
    if (res.code == 0) {
      state.errorTaskMsg = res.msg
      state.userLists = []
      state.userFindsTotal = 0
    } else {
      if (res.data.data.length !== 0 && res.data.current_page !== 1) {
        let end = res.data.current_page * 10
        let start = end - 10
        for (start; start < end; start++) {
          if(start < res.data.total) {
            let newIndex = start % 10;
            state.userLists.push(res.data.data[newIndex])
          }
        }
      } else if (res.data.current_page == 1) {
        state.userLists = res.data.data
        state.userFindsTotal = res.data.total
      }
    }
  },
  [types.GET_COMMENT](state, res) {
    if (res.code == 0) {
      state.errorTaskMsg = res.msg
      state.commentList = []
    } else {
      state.commentList = res.data
    }
  },

  clearTaskMsg(state) {
    state.errorTaskMsg = ''
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
}
