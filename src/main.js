// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理
import store from './store/'
import './config/rem'
import  { AlertPlugin } from 'vux'
import { ToastPlugin } from 'vux'
import { ConfirmPlugin } from 'vux'
import Viewer from 'v-viewer'
// import VueScroller from 'vue-scroller'

// Vue.use(VueScroller) //使用vue-scroller

Vue.use(require('vue-wechat-title')) //微信动态改版头部

Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

Vue.use(Viewer, { 
  defaultOptions: {
    button: false,
    title: false,
    navbar:false,
    toolbar: false ,
    movable: false,
    rotatable: false
  }
})


FastClick.attach(document.body)


// 注册全局过滤器
filters(Vue)

const history = window.sessionStorage

history.clear()
let historyCount = history.getItem('count')*1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from ,next) {
  store.dispatch('updateLoadingStatus', { isLoading: true})

  //控制滑动效果
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex,10) > parseInt(fromIndex,10) || (toIndex === '0' && fromIndex ==='0')) {
      store.dispatch('updateDirection', { direction: 'forward' })
    } else {
      store.dispatch('updateDirection', { direction: 'reverse' })
    }
  } else {
    ++historyCount
    history.setItem('count',historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.dispatch('updateDirection', { direction: 'forward' })
   }

  next()

  //登录状态验证
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.common.isLogin) {
      next()
    } else {
      const user = window.localStorage.getItem('user');
      if (user) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.dispatch('updateLoadingStatus', { isLoading: false })
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
