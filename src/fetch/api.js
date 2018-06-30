import axios from 'axios'
import qs from 'qs'
import store from '../store/'

// axios 配置
axios.defaults.timeout = 8000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['x-requested-with'] = 'xmlhttprequest';//ajax请求
axios.defaults.headers.get['x-requested-with'] = 'xmlhttprequest';//ajax请求
axios.defaults.headers.common['ZT-Mobile'] = 'weixin';

// axios.defaults.baseURL = './';

// post传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  store.dispatch('showLoaded', {isLoaded: true})
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
  store.dispatch('showLoaded', {isLoaded: false})
  return res;
}, (error) => {
  return Promise.reject(error)
});

export function fetch(url, params, method,config) {
  return new Promise((resolve, reject) => {
    if (method == 'get') {
      axios({
        url: url,
        params: params,
        method: method
      }).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error);
      })
    } else if (method == 'post') {
      axios.post(url,params,config).then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
    }
  })
}

export default {
  isLogin(params) {
    return fetch('/admin/index.php/base/login/is_login', params, 'post')
  },
  login(params) {
    return fetch('/admin/index.php/base/login/index', params, 'post');
  },


  //获取公告列表,党员学习,消息通知,党政政策,先锋事迹,办事指南
  get_news_list(params) {
    return fetch('/admin/index.php/index/post/index', params, 'post')
  },
  get_news_list2(params) {
    return fetch('/admin/index.php/index/post/index1', params, 'post')
  },
  //获取百姓
  get_people_list(params) {
    return fetch('/admin/index.php/index/xinsheng/index',params,'get')
  },

  //获取工作监办
  get_jobs_list(params) {
    return fetch('/admin/index.php/index/jianban/index',params, 'post')
  },

  //获取评议列表
  get_democracy_list(params) {
    return fetch('/admin/index.php/index/pingyi/index',params, 'post')
  },

  //获取党员动态
  get_finds_list(params) {
    return fetch('/admin/index.php/index/jishi/index', params, 'post')
  },

  //获取我的动态
  get_user_list(params) {
    return fetch('/admin/index.php/portal/jishi/my', params, 'post')
  },
  //删除我的动态
  delete_myFind(params) {
    return fetch('/admin/index.php/portal/jishi/delete',params,'post')
  },
  //发布我的动态
  add_myList(params,config) {
    return fetch('/admin/index.php/portal/jishi/add', params, 'post', config)
  },

  //获取评论
  get_comment(params) {
    return fetch('/admin/index.php/portal/jishi/index', params, 'post')
  },
  //发表评论
  add_comment(params) {
    return fetch('/admin/index.php/portal/jishi/addComment',params,'post')
  },
  //点赞
  isLiking(params) {
    return fetch('/admin/index.php/portal/jishi/like',params,'post')
  },


  // 获取用户信息
  get_user_info(params) {
    return fetch('/admin/index.php/base/admin/index', params, 'post')
  },
  //获取党支部
  get_branch_info(params) {
    return fetch('/admin/index.php/base/company/view',params, 'post')
  },
  //我的积分
  get_integral_list(params) {
    return fetch('/admin/index.php/index/score/index', params, 'post')
  },
  //积分明细
  get_integral_detail(params) {
    return fetch('/admin/index.php/index/score/details',params, 'post')
  },
  //我的考试
  get_exam_list(params) {
    return fetch('/admin/index.php/test/admin/index', params,'post')
  },
  //通讯录
  get_party_list(params) {
    return fetch('/admin/index.php/base/company/index',params,'post')
  },
  //获取组员信息
  get_party_user(params) {
    return fetch('/admin/index.php/base/admin/getGroupMember', params, 'post')
  },
  //获取其他用户信息
  get_other_info(params) {
    return fetch('/admin/index.php/base/admin/getInfo', params, 'post')
  },
  //搜索用户
  get_search_user(params) {
    return fetch('/admin/index.php/base/admin/getFuzzyQuery', params, 'post')
  },

  //修改密码
  get_password_change(params) {
    return fetch('/admin/index.php/base/user/changePw', params,'post')
  },
  //退出
  get_user_out(params) {
    return fetch('/admin/index.php/base/login/logout', params, 'post')
  },
  //党费
  get_party_fee(params) {
    return fetch('/admin/index.php/index/dang/index', params, 'post')
  },
  //阅读获取积分
  get_read_integral(params) {
    return fetch('/admin/index.php/portal/neirong/view', params, 'post')
  }
}
