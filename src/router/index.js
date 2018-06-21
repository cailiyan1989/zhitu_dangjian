import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        'subPage': resolve => require(['../components/login'], resolve)
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title:'智慧党建',
        requiresAuth: true
      }
    },
    {
      path: '/intro',
      component: resolve => require(['../components/intro'], resolve),
      meta: {
        title:'e家行',
        requiresAuth: true
      }
    },
    {
      path: '/dynamic-news',
      name: 'dynamicNews',
      component: resolve => require(['../components/dynamic-news'],resolve),
      meta: {
        title:'党建动态',
        requiresAuth: true
      }
    },
    {
      path: '/dynamic/detail/:dynamicid',
      name: 'NewsDetail',
      component: resolve => require(['../components/dynamic-detail'],resolve),
      meta: {
        title: '新闻详情',
        requiresAuth: true
      }
    },
    {
      path: '/home/architecture',
      name: 'Architecture',
      component: resolve => require(['../components/architecture'], resolve),
      meta: {
        title: '组织架构',
        requiresAuth: true
      }
    },
    {
      path: '/care',
      name: 'Care',
      component: resolve => require(['../components/care'], resolve),
      meta: {
        title: '党员关怀',
        requiresAuth: true
      }
    },
    // {
    //   path: '/learn',
    //   name: 'Learn',
    //   component: resolve => require(['../components/learn'], resolve),
    //   meta: {
    //     title: '在线学习',
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/learn',
      component: resolve => require(['../components/announcement-news'], resolve),
      children: [{
        path: '/',
        name: 'Announcement',
        component: resolve => require(['../components/announcement'], resolve),
        meta: {
          title:'在线学习',
          requiresAuth: true
        }
      }]
    },
    {
      path:'/learn/detail/:announcementid/:state',
      name: 'announcementDetail',
      component: resolve => require(['../components/announcement-detail'],resolve),
      meta: {
        title: '新闻详情',
        requiresAuth: true
      }
    },
    {
      path:'/vcr',
      name:'Vcr',
      component: resolve => require(['../components/learn.vue'],resolve),
      meta: {
        title: '新闻详情',
        requiresAuth: true
      } 
    },
    {
      path: '/find',
      name: 'Find',
      component: resolve => require(['../components/find'],resolve),
      meta: {
        title:'党员动态',
        requiresAuth: true
      }
    },
    {
      path: '/find/my/all',
      name: 'MyFind',
      component: resolve => require(['../components/my-find'],resolve),
      meta: {
        title: '我的动态',
        requiresAuth: true
      }
    },
    {
      path: '/find/my/add',
      name: 'AddFind',
      component: resolve => require(['../components/add-find'], resolve),
      meta: {
        title: '发布',
        requiresAuth:true
      }
    },
    {
      path:'/contacts',
      name: 'Contact',
      component: resolve => require(['../components/contacts'], resolve),
      meta: {
        title: '通讯录',
        requiresAuth: true
      }
    },
    {
      path:'/contacts/personnel/:partyid',
      name:'Personnel',
      component:resolve => require(['../components/personal-list'], resolve),
      name: 'Personnel',
      meta: {
        title:'通讯录',
        requiresAuth:true
      }
    },
    {
      path:'/contacts/infos/:personid',
      name: 'PersonInfos',
      component: resolve => require(['../components/my-infos'], resolve),
      meta: {
        title: '个人资料',
        requiresAuth: true
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: resolve => require(['../components/member'], resolve),
      meta: {
        title:'个人中心',
        requiresAuth: true
      }
    },
    {
      path: '/member/my/infos/:personid',
      name: 'MyInfos',
      component: resolve => require(['../components/my-infos'], resolve),
      meta: {
        title: '我的信息',
        requiresAuth: true
      }
    },
    {
      path:'/member/party/branch/:partyid',
      name:'Party',
      component: resolve => require(['../components/party-branch'], resolve),
      meta: {
        title:'党支部',
        requiresAuth: true
      }
    },
    {
      path:'/member/my/integral',
      name:'Integral',
      component: resolve => require(['../components/my-integral'], resolve),
      meta: {
        title:'积分明细',
        requiresAuth: true
      }
    },
    {
      path: '/member/my/exam',
      name: 'Exam',
      component: resolve => require(['../components/my-exam'], resolve),
      meta: {
        title: '考试中心',
        requiresAuth: true
      }
    },
    {
      path: '/member/party/fees',
      name: 'Fees',
      component: resolve => require(['../components/party-fees'], resolve),
      mate: {
        title: '党费缴纳',
        requiresAuth:true
      }
    },
    {
      path: '/member/settings',
      name: 'Settings',
      component: resolve => require(['../components/settings'], resolve),
      meta: {
        title: '设置',
        requiresAuth:true
      }
    },
    {
      path: '/member/password/change',
      name: 'Password',
      component: resolve => require(['../components/change-password'], resolve),
      meta: {
        title:'更改密码',
        requiresAuth: true
      }
    }
  ]
})
