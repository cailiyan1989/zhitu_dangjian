<template>
  <div id="app" style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px" :class="{'hide':$route.path=='/login'}">
      <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#c50000;" :left-options="leftOptions" :title="title" :transition="headerTransition"></x-header>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <keep-alive>
          <router-view v-wechat-title="$route.meta.title" class="router-view"></router-view>
        </keep-alive>
      </transition>
      <!--底部导航 路由 -->
      <tabbar class="vux-demo-tabbar" v-show="!isTabbarDemo"  slot="bottom">
        <tabbar-item :selected="$route.path === '/home'" link="/home">
          <i slot="icon" class="iconfont icon-shouye"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :selected="$route.path === '/find'" link="/find">
          <i slot="icon" class="iconfont icon-faxian"></i>
          <span slot="label">发现</span>
        </tabbar-item>
        <tabbar-item :selected="$route.path === '/contacts'" link="/contacts">
          <i slot="icon" class="iconfont icon-tongxunlu"></i>
          <span slot="label">通讯录</span>
        </tabbar-item>
        <tabbar-item :selected="$route.path === '/member'" link="/member">
          <i slot="icon" class="iconfont icon-wode"></i>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>

    <transition mode="out-in" name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
      <router-view name="subPage"></router-view>
    </transition>
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import { Loading, ViewBox, XHeader, TransferDom, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'
import rem from './config/rem.js'
export default {
  directives: {
    TransferDom
  },
  components: {
    Loading,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  name: 'App',
  data() {
    return {
      "enterAnimate": "", //页面进入动效
      "leaveAnimate": ""
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.common.isLoading,
      direction: state => state.common.direction
    }),
    isTabbarDemo() {
      return this.$route.path.split('/').length > 2
    },
    leftOptions() {
      return {
        showBack: this.$route.path !== '/home' && this.$route.path !== '/find' && this.$route.path !== '/member' && this.$route.path !== '/contacts'
      }
    },
    headerTransition() {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    title() {
      if (this.$route.path === '/home') return '党建e家行'
      if (this.$route.path === '/intro') return '党建e家行'
      if (this.$route.path === '/dynamic-news') return '党建动态'
      // if (this.$route.path == '/dynamic/dynamic-news') return '党建动态'

      if (this.$route.path === '/find') return '党员动态'
      if (this.$route.path === '/find/my/all') return '我的动态'
      if (this.$route.path === '/find/my/add') return '发布动态'
      
      if (this.$route.path === '/architecture') return '支部情况'
      if (this.$route.path === '/care') return '党员关怀'
      if (this.$route.path === '/learn') return '在线学习'

      if (this.$route.path === '/announcement') return '公告信息'
      if (/announcement/.test(this.$route.path) && /detail/.test(this.$route.path)) return '新闻详情'

      if (this.$route.path === '/member') return '个人中心'
      if (this.$route.path === '/member/my/infos') return '我的信息'
      if (this.$route.path === '/member/party/branch') return '党支部'
      if (this.$route.path === '/member/my/integral') return '积分明细'
      if (this.$route.path === '/member/my/exam') return '考试中心'
      if (this.$route.path === '/member/party/fees') return '党费缴纳'
      
      if (this.$route.path === '/contacts') return '通讯录'
      if (this.$route.path === '/member/settings') return '设置'
      if (this.$route.path === '/member/password/change') return '更改密码'

      if (/contacts/.test(this.$route.path) && /personnel/.test(this.$route.path)) return '通讯录'
      if (/contacts/.test(this.$route.path) && /infos/.test(this.$route.path)) return '个人信息'

      if (/dynamic/.test(this.$route.path) && /detail/.test(this.$route.path)) return '新闻详情'
      // if (/guide/.test(this.$route.query.category)) return '办事指南'
      // if (/notice/.test(this.$route.query.category)) return '党政公告'
      // if (/learn/.test(this.$route.query.category)) return '基层党建'
      // if (/news/.test(this.$route.query.category)) return '消息通知'
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './common/style/animate.css';
  @import './common/font/iconfont.css';
  @import './common/style/common';
  body {
    background-color: #fbf9fe;
  }

  .vux-header {
    width: 100%;
    position: fixed !important;
    left: 0px;
    top: 0px;
    z-index: 100;
  }

  .weui-tabbar {
    position: fixed !important;
    background: red!important;
    &::before{
      display: none;
    }
  }

  .weui-btn {
    font-size: .7rem !important;
  }
  .weui-tabbar__item {
    &.weui-bar__item_on {
      .weui-tabbar__icon,
      .weui-tabbar__icon > i,
      .weui-tabbar__label {
        color: #fff!important;
      }
    }
  }
  i.weui-tabbar__icon, .weui-tabbar__icon > i{
    color:rgb(71,26,26)!important;
  }
  .weui-tabbar__label{
    color:rgb(71,26,26)!important;
    margin-top: 5px;
  }

  // .weui-tabbar__icon {
  //   width: 1.35rem !important;
  //   height: 1.35rem !important;
  // }
  // i.weui-tabbar__icon, 
  // .weui-tabbar__icon > i{
  //   font-size: 1.2rem !important;
  // }
  // .weui-tabbar__label{
  //   font-size: .5rem !important;
  // }

  .router-view {
    width: 100%; // padding-bottom: 55px;
  }

  .vux-tab-item {
    font-size: .7rem !important;
  }

  .vux-tab {
    height: 2.3rem !important;
    .vux-tab-item {
      line-height: 2.3rem !important;
    }
    .vux-tab-ink-bar{
      display: none !important;
    }
  }
  .vux-tab-container{
    height: 2.3rem !important;
  }
</style>
