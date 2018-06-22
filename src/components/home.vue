<template>
  <div class="home">
    <!-- <div style="text-align:center;color:#fff;">智慧党建</div> -->
    <!-- <swiper loop auto :aspect-ratio="361/750" :list="banner_list" :index="banner_index" @on-index-change="banner_onIndexChange"></swiper> -->
    <grid :cols="3">
      <grid-item label="e家行" link="/intro">
        <img slot="icon" src="../common/image/e@2x.png" />
      </grid-item>
      <grid-item label="党建动态" link="/dynamic-news">
        <img slot="icon" src="../common/image/d@2x.png" />
      </grid-item>
      <grid-item label="支部情况" link="/home/architecture">
        <img slot="icon" src="../common/image/z@2x.png" />
      </grid-item>
      <grid-item label="党员关怀" link="/care?status=relation">
        <img slot="icon" src="../common/image/dy@2x.png" />
      </grid-item>
      <grid-item label="在线学习" link="/learn?status=policy">
        <img slot="icon" src="../common/image/zz@2x.png" />
      </grid-item>
      <grid-item label="VCR视频" link="/vcr">
        <img slot="icon" src="../common/image/vcr@2x.png" />
      </grid-item>
    </grid>
    <!-- <div class="newsList">
      <group>
        <cell title="党建动态">
          <img slot="icon" width="5" style="display:block;margin-right:5px;" src="../common/image/border.png">
        </cell>
      </group>
      <template v-for="(item,index) of list">
        <router-link tag="div" class="list" :to="{name:'NewsDetail', params: {dynamicid: item.id}}" :key="index">
          <div class="list_img">
            <span>Loading</span>
            <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo"  container="#vux_view_box_body"></x-img>
          </div>
          <div class="list_content">
            <div class="list_title">{{item.title}}</div>
            <div class="list_time">{{item.create_time}}</div>
          </div>
        </router-link>
      </template>
    </div>
    <x-button plain type="primary" style="border-radius:99px;color:red;border-color:red;" link="/dynamic-news">查看更多</x-button> -->
  </div>
</template>

<script>
  import { Swiper,SwiperItem,Grid, GridItem,Group, Cell, XImg, XButton} from 'vux'
  import { mapGetters } from 'vuex'
  import {fmtDate} from '../filters/date.js'
  export default {
    components: {
      Swiper,
      SwiperItem,
      Grid,
      GridItem,
      Group,
      Cell,
      XImg,
      XButton
    },
    // computed: {
    //   ...mapGetters([
    //     'errorNewsMsg',

    //     'noticedNewsList'
    //   ])
    // },
    created() {
      // this.$store.dispatch('getNoticedNewsList',{ 'type': 0,'cate':1 })
    },
    watch: {
      // errorNewsMsg: function (value) {
      //   this.$vux.toast.text(value, 'middle')
      // },
      // noticedNewsList: function (val) {
      //   this.list = val;
      // }
    },
    name: "home",
    data() {
      return {
        // banner_list: [{
        //   url: 'javascript:',
        //   img: require('../common/image/banner.png'),

        // }, {
        //   url: 'javascript:',
        //   img: require('../common/image/banner45.png'),

        // }],
        // banner_index:0,
        // items: [],
        // src:require('../common/image/78781.png'),
        // list: [],
      }
    },
    methods: {
      // banner_onIndexChange(index) {
      //   this.banner_index = index
      // },
      // success (src, ele) {
      //   const span = ele.parentNode.querySelector('span')
      //   // console.log('success load', src,ele,span)
      //   span.style.display = 'none';
      // },
      // error (src, ele, msg) {
      //   // console.log('error load', msg, src)
      //   const span = ele.parentNode.querySelector('span')
      //   span.innerText = 'load error'
      // }
    },
    filters: {
      fmtDate(time) {
        let date = new Date(time)
        return fmtDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style lang="less">
.home{
  width: 100%;
  height: 100%;
  background: url('../common/image/homebg.png');
  background-size: 100% 100%;
  .weui-grids {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 11rem 1rem 0;
    // background-color: #fff;
    &::before,
    &::after{
      display: none;
    }
    .weui-grid{
      width:4.4rem;
      height: 4.4rem;
      padding: .21rem .768rem;
      background: rgba(255,255,255,0.5);
      margin-bottom: 20px;
      border-radius: .43rem;
      &::before,
      &::after{
        display: none;
      }
    }
    .weui-grid__icon{
      width: 2.79rem;
      height: 2.79rem;
    }
    .weui-grid__label {
      font-size: 0.597rem;
      margin-top: .34rem;
      color:rgb(51,51,51);
    }
  }
  // .newsList{
  //   margin-top: .5rem;
  //   background: #fff;
  //   .weui-cells{
  //     &::before{
  //       display: none;
  //     }
  //   }
  //   .weui-cell{
  //     font-size: .7rem
  //   }
  // }
  // .list {
  //   display: flex;
  //  /*  align-items: center; */
  //   padding: .75rem;
  //   box-sizing: border-box;
  //   background-color: #fff;
  //   position: relative;
  //   &:after{
  //     content:'';
  //     position: absolute;
  //     left:.75rem;
  //     right:.75rem;
  //     bottom: 0;
  //     height: 1px;
  //     color:#d9d9d9;
  //     transform-origin: 0px 100% 0px;
  //     transform: scaleY(0.5);
  //     border-bottom: 1px solid #d9d9d9;
  //   }
  //   .list_img{
  //     width: 4.625rem;
  //     height: 2.75rem;
  //     line-height: 2.75rem;
  //     text-align: center;
  //     margin-right: .4rem;
  //     font-size: .7rem;
  //     .ximg-demo {
  //       width: 100%;
  //       height: 100%;
  //     }
  //   }
  //   .list_content {
  //     flex: 1;
  //     min-width: 0;
  //     .list_title{
  //       color:#000;
  //       width: auto;
  //       font-weight:400;
  //       font-size: .6rem;
  //       display: -webkit-box;
  //       -webkit-box-orient: vertical;
  //       -webkit-line-clamp: 2;
  //       overflow: hidden;
  //     }
  //     .list_time{
  //       color:#333;
  //       font-size: 0.425rem;
  //       line-height: 1.2;
  //       margin-top: .4rem;
  //     }
  //   }
  // }
  // .weui-btn{
  //   margin-top: .5rem;
  //   font-size: .7rem !important;
  // }
}
</style>
