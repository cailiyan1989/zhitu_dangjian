import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
  noticedNewsList: [],
  learnedNewsList: [],
  peopledNewsList: [],
  newedNewsList: [],

  noticedNewsTotal: 0,
  learnedNewsTotal: 0,
  peopledNewsTotal: 0,
  newedNewsTotal: 0,

  errorNewsMsg: '',

  noticedNewsScrollTop: 0,
  learnedNewsScrollTop: 0,
  peopledNewsScrollTop: 0,
  newedNewsScrollTop: 0
}

const actions = {
  getNoticedNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_NOTICED_NEWS_LIST, res)
    })
  },
  getLearnedNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_LEARNED_NEWS_LIST, res)
    })
  },
  getPeopledNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_PEOPLED_NEWS_LIST, res)
    })
  },
  getNewedNewsList({commit}, params) {
    commit('clearNewsMsg')

    api.get_news_list(params).then(res => {
      commit(types.GET_NEWED_NEWS_LIST, res)
    })
  },

  updateNoticedNewsPosition({ commit }, top) {
    commit({ type: 'updateNoticedNewsPosition', top:top })
  },
  updateLearnedNewsPosition({ commit }, top) {
    commit({ type: 'updateLearnedNewsPosition', top:top })
  },
  updatePeopledNewsPosition({ commit }, top) {
    commit({ type: 'updatePeopledNewsPosition', top:top })
  },
  updateNewedNewsPosition({ commit }, top) {
    commit({ type: 'updateNewedNewsPosition', top:top })
  }

}

const getters = {
  noticedNewsList: state => state.noticedNewsList,
  learnedNewsList: state => state.learnedNewsList,
  peopledNewsList: state => state.peopledNewsList,
  newedNewsList: state => state.newedNewsList,

  noticedNewsTotal: state => state.noticedNewsTotal,
  learnedNewsTotal: state => state.learnedNewsTotal,
  peopledNewsTotal: state => state.peopledNewsTotal,
  newedNewsTotal: state => state.newedNewsTotal,

  errorNewsMsg: state => state.errorNewsMsg,

  noticedNewsScrollTop: state => state.noticedNewsScrollTop,
  learnedNewsScrollTop: state => state.learnedNewsScrollTop,
  peopledNewsScrollTop: state => state.peopledNewsScrollTop,
  newedNewsScrollTop: state => state.newedNewsScrollTop
}

const mutations = {
  [types.GET_NOTICED_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorNewsMsg = res.msg
      state.noticedNewsList = []
      state.noticedNewsTotal = 0
    } else {
      // state.noticedNewsList = res.data
      // state.noticedNewsTotal = res.data.length
      if (res.data.length !== 0 && res.data.current_page !==1) {
        let end = res.data.current_page * 10
        let start = end - 10
        for(start; start < end; start++){
          if(start < res.data.total) {
            let newIndex = start%10;
            state.noticedNewsList.push(res.data.data[newIndex])
          }
        }
      } else if(res.data.current_page ==1 && res.data.length !==0) {
        state.noticedNewsList = res.data.data
        state.noticedNewsTotal = res.data.total
      } else {
        state.noticedNewsList = res.data.data
        state.noticedNewsTotal = res.data.total
      }
    }
  },
  [types.GET_LEARNED_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorNewsMsg = res.msg
      state.learnedNewsList = []
      state.learnedNewsTotal = 0
    } else {
      state.learnedNewsList = res.data
      state.learnedNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.learnedNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.learnedNewsList = res.data.data
      //   state.learnedNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.learnedNewsList = res.data.data
      //   state.learnedNewsTotal = res.data.total
      // }
    }
  },
  [types.GET_PEOPLED_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorNewsMsg = res.msg
      state.peopledNewsList = []
      state.peopledNewsTotal = 0
    } else {
      state.peopledNewsList = res.data
      state.peopledNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.peopledNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.peopledNewsList = res.data.data
      //   state.peopledNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.peopledNewsList = res.data.data
      //   state.peopledNewsTotal = res.data.total
      // }
    }
  },
  [types.GET_NEWED_NEWS_LIST](state, res) {
    if(res.code == 0){
      state.errorNewsMsg = res.msg
      state.newedNewsList = []
      state.newedNewsTotal = 0
    } else {
      state.newedNewsList = res.data
      state.newedNewsTotal = res.data.length
      // if (res.data.data.length !== 0 && res.data.current_page !==1) {
      //   let end = res.data.current_page * 10
      //   let start = end - 10
      //   for(start; start < end; start++){
      //     if(start < res.data.total) {
      //       let newIndex = start%10;
      //       state.newedNewsList.push(res.data.data[newIndex])
      //     }
      //   }
      // } else if(res.data.current_page ==1 && res.data.data.length !==0) {
      //   state.newedNewsList = res.data.data
      //   state.newedNewsTotal = res.data.total
      // } else if (res.data.current_page ==1 && res.data.total == 0){
      //   state.newedNewsList = res.data.data
      //   state.newedNewsTotal = res.data.total
      // }
    }
  },

  clearNewsMsg(state) {
    state.errorNewsMsg = ''
  },

  updateNoticedNewsPosition(state, payload) {
    state.noticedNewsScrollTop = payload.top
  },
  updateLearnedNewsPosition(state, payload) {
    state.learnedNewsScrollTop = payload.top
  },
  updatePeopledNewsPosition(state, payload) {
    state.peopledNewsScrollTop = payload.top
  },
  updateNewedNewsPosition(state,payload) {
    state.newedNewsScrollTop = payload.top
  }
}

export default {
  state,
  actions,
  getters,
  mutations,
}
