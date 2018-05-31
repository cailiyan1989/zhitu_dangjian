import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  policyNewsList: [],
  deedsNewsList: [],
  guideNewsList: [],
  jobsNewsList: [],
  democracyNewsList: [],

  policyNewsTotal: 0,
  deedsNewsTotal: 0,
  guideNewsTotal: 0,
  jobsNewsTotal: 0,
  democracyNewsTotal: 0,

  errorAnNewsMsg: '',

  policyNewsScrollTop: 0,
  deedsNewsScrollTop: 0,
  guideNewsScrollTop: 0,
  jobsNewsScrollTop: 0,
  democracyNewsScrollTop: 0
}

const actions = {
  getPolicyNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_POLICY_NEWS_LIST, res)
    })
  },
  getDeedsNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_DEEDS_NEWS_LIST, res)
    })
  },
  getGuideNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_GUIDE_NEWS_LIST, res)
    })
  },
  getJobsNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_jobs_list(params).then(res => {
      commit(types.GET_JOBS_NEWS_LIST, res)
    })
  },
  getDemocracyNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_democracy_list(params).then(res => {
      commit(types.GET_DEMOCRACY_NEWS_LIST, res)
    })
  },

  updatePolicyNewsPosition({ commit }, top) {
    commit({ type: 'updatePolicyNewsPosition', top:top })
  },
  updateDeedsNewsPosition({ commit }, top) {
    commit({ type: 'updateDeedsNewsPosition', top:top })
  },
  updateGuideNewsPosition({ commit }, top) {
    commit({ type: 'updateGuideNewsPosition', top:top })
  },
  updateJobsNewsPosition({ commit }, top) {
    commit({ type: 'updateJobsNewsPosition', top:top })
  },
  updateDemocracyNewsPosition({ commit }, top) {
    commit({ type: 'updateDemocracyNewsPosition', top:top })
  },
}

const getters = {
  policyNewsList: state => state.policyNewsList,
  deedsNewsList: state => state.deedsNewsList,
  guideNewsList: state =>state.guideNewsList,
  jobsNewsList: state => state.jobsNewsList,
  democracyNewsList: state => state.democracyNewsList,

  policyNewsTotal: state => state.policyNewsTotal,
  deedsNewsTotal: state => state.deedsNewsTotal,
  guideNewsTotal: state => state.guideNewsTotal,
  jobsNewsTotal: state => state.jobsNewsTotal,
  democracyNewsTotal: state => state.democracyNewsTotal,

  policyNewsScrollTop: state => state.policyNewsScrollTop,
  deedsNewsScrollTop: state => state.deedsNewsScrollTop,
  guideNewsScrollTop: state => state.guideNewsScrollTop,
  jobsNewsScrollTop: state => state.jobsNewsScrollTop,
  democracyNewsScrollTop: state => state.democracyNewsScrollTop,

  errorAnNewsMsg: state => state.errorAnNewsMsg
}

const mutations = {
  [types.GET_POLICY_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorAnNewsMsg = res.msg
      state.policyNewsList = []
      state.policyNewsTotal = 0
    } else {
      state.policyNewsList = res.data
      state.policyNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.policyNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.policyNewsList = res.data.data
      //   state.policyNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.policyNewsList = res.data.data
      //   state.policyNewsTotal = res.data.total
      // }
    }
  },
  [types.GET_DEEDS_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorAnNewsMsg = res.msg
      state.deedsNewsList = []
      state.deedsNewsTotal = 0
    } else {
      state.deedsNewsList = res.data
      state.deedsNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.deedsNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.deedsNewsList = res.data.data
      //   state.deedsNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.deedsNewsList = res.data.data
      //   state.deedsNewsTotal = res.data.total
      // }
    }
  },
  [types.GET_GUIDE_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorAnNewsMsg = res.msg
      state.guideNewsList = []
      state.guideNewsTotal = 0
    } else {
      state.guideNewsList = res.data
      state.guideNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.guideNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.guideNewsList = res.data.data
      //   state.guideNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.guideNewsList = res.data.data
      //   state.guideNewsTotal = res.data.total
      // }
    }
  },
  [types.GET_JOBS_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorAnNewsMsg = res.msg
      state.jobsNewsList = []
      state.jobsNewsTotal = 0
    } else {
      state.jobsNewsList = res.data
      state.jobsNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.jobsNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.jobsNewsList = res.data.data
      //   state.jobsNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.jobsNewsList = res.data.data
      //   state.jobsNewsTotal = res.data.total
      // }
    }
  },
  [types.GET_DEMOCRACY_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorAnNewsMsg = res.msg
      state.democracyNewsList = []
      state.democracyNewsTotal = 0
    } else {
      state.democracyNewsList = res.data
      state.democracyNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.democracyNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.democracyNewsList = res.data.data
      //   state.democracyNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.democracyNewsList = res.data.data
      //   state.democracyNewsTotal = res.data.total
      // }
    }
  },

  clearNewsMsg(state) {
    state.errorAnNewsMsg = ''
  },

  updatePolicyNewsPosition(state, payload) {
    state.policyNewsScrollTop = payload.top
  },
  updateDeedsNewsPosition(state, payload) {
    state.deedsNewsScrollTop = payload.top
  },
  updateGuideNewsPosition(state, payload) {
    state.guideNewsScrollTop = payload.top
  },
  updateJobsNewsPosition(state, payload) {
    state.jobsNewsScrollTop = payload.top
  },
  updateDemocracyNewsPosition(state, payload) {
    state.democracyNewsScrollTop = payload.top
  },
}

export default {
  state,
  actions,
  getters,
  mutations,
}
