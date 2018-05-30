import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  examList: [],
  examTotal: 0,

  examScrollTop: 0
}

const actions = {
  getExamList({ commit }, params) {
    api.get_exam_list(params).then(res => {
      commit(types.GET_EXAM_LIST, res)
    })
  },
  updateExamPosition({ commit }, top) {
    commit({type: 'updateExamPosition', top: top})
  }
}

const getters = {
  examList: state => state.examList,
  examTotal: state => state.examTotal,

  examScrollTop:state => state.examScrollTop
}

const mutations = {
  [types.GET_EXAM_LIST](state, res) {
    if (res.code == 0) {
      state.errorMessageMsg = res.msg
    } else {
      if (res.data.data.length !==0 && res.data.current_page !== 1) {
        let end = res.data.current_page * 10
        let start = end - 10
        for(start; start < end; start++) {
          if(start < res.data.total) {
            let newIndex = start % 10;
            state.examList.push(res.data.data[newIndex])
          }
        }
      } else if (res.data.current_page == 1 && res.data.data.length !==0) {
        state.examList = res.data.data
        state.examTotal = res.data.total
      } else if (res.data.current_page == 1 && res.data.total == 0) {
        state.examList = res.data.data
        state.examTotal = res.data.total
      }
    }
  },

  updateExamPosition (state, payload) {
    state.examScrollTop = payload.top
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
}
