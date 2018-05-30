import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import dynamic from './modules/dynamic'
import find from './modules/find'
import announcement from './modules/announcement'
import user from './modules/user'
import integral from './modules/integral'
import exam from './modules/exam'
import contacts from './modules/contacts'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    dynamic,
    find,
    announcement,
    user,
    integral,
    exam,
    contacts
  }
})
