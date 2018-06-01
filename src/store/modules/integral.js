import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  myIntegral: {},
  integralDetails: [],
  integralTotal: 0,
  errorMessageMsg: '',

  integralScrollTop: 0
}

const actions = {
  getMyIntegral({ commit }, params) {
    commit('clearMessageMsg')
    api. get_integral_list(params).then(res => {
      commit(types.GET_INTEGRAL_LIST, res)
    })
  },
  getIntegralDetail({ commit }, params) {
    commit('clearMessageMsg')
    api.get_integral_detail(params).then(res => {
      commit(types.GET_INTEGRAL_DETAIL, res)
    })
  },
  updateIntegralPosition({ commit }, top) {
    commit({type: 'updateIntegralPosition', top: top})
  }
}

const getters = {
  myIntegral: state => state.myIntegral,
  integralDetails: state => state.integralDetails,
  integralTotal: state => state.integralTotal,
  errorMessageMsg: state => state.errorMessageMsg,

  integralScrollTop:state => state.integralScrollTop
}

const mutations = {
  [types.GET_INTEGRAL_LIST](state, res) {
    if(res.code == 0) {
      state.errorMessageMsg = res.msg
    }else {
      state.myIntegral = res.data
    }
  },
  [types.GET_INTEGRAL_DETAIL](state, res) {
    if (res.code == 0) {
      state.errorMessageMsg = res.msg
    } else {
      state.integralDetails = res.data
      state.integralTotal = res.data.length
      // if (res.data.data.length !==0 && res.data.current_page !== 1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++) {
      //     if(start < res.data.total) {
      //       let newIndex = start % 10;
      //       state.integralDetails.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if (res.data.current_page == 1 && res.data.data.length !==0) {
      //   state.integralDetails = res.data.data
      //   state.integralTotal = res.data.total
      // } else if (res.data.current_page == 1 && res.data.total == 0) {
      //   state.integralDetails = res.data.data
      //   state.integralTotal = res.data.total
      // }
    }
  },

  clearMessageMsg(state) {
    state.errorMessageMsg = ''
  },

  updateIntegralPosition (state, payload) {
    state.integralScrollTop = payload.top
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
}
