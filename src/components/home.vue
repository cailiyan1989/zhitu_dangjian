<template>
  <div class="home">
    <swiper loop auto :list="banner_list" :index="banner_index" @on-index-change="banner_onIndexChange"></swiper>
    <grid :cols="4">
      <grid-item label="党政公告" link="/dynamic/dynamic-news?category=notice">
        <img slot="icon" src="../common/image/gonggao2.png" />
      </grid-item>
      <grid-item label="党员学习" link="/dynamic/dynamic-news?category=learn">
        <img slot="icon" src="../common/image/xuexi2.png" />
      </grid-item>
      <grid-item label="百姓心声" link="/dynamic/dynamic-news?category=people">
        <img slot="icon" src="../common/image/xinsheng2.png" />
      </grid-item>
      <grid-item label="消息通知" link="/dynamic/dynamic-news?category=news">
        <img slot="icon" src="../common/image/xiaoxi2.png" />
      </grid-item>
    </grid>
    <div class="newsList">
      <group>
        <cell title="党建动态">
          <img slot="icon" width="5" style="display:block;margin-right:5px;" src="../common/image/border.png">
        </cell>
      </group>
      <template v-for="(item,index) of list">
        <router-link tag="div" class="list" :to="{name:'NewsDetail', params: {dynamicid: item.id, cate:'notice'}}" :key="index">
          <div class="list_content">
            <div class="list_title">{{item.title}}</div>
            <div class="list_time">{{item.create_time}}</div>
          </div>
          <div class="list_img">
            <span>Loading</span>
            <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo"  container="#vux_view_box_body"></x-img>
          </div>
        </router-link>
      </template>
    </div>
    <x-button plain type="primary" style="border-radius:99px;color:red;border-color:red;" link="/dynamic/dynamic-news?category=notice">查看更多</x-button>
  </div>
</template>

<script>
  import { Swiper,SwiperItem,Grid, GridItem,Group, Cell, XImg, XButton} from 'vux'
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters([
        'noticedNewsList'
      ])
    },
    created() {
      this.$store.dispatch('getNoticedNewsList')
    },
    watch: {
      noticedNewsList: function (val) {
        this.list = val.slice(0,9);
      }
    },
    name: "home",
    data() {
      return {
        banner_list: [{
          url: 'javascript:',
          img: require('../common/image/banner.png'),

        }, {
          url: 'javascript:',
          img: require('../common/image/banner2.png'),

        }, {
          url: 'javascript:',
          img: require('../common/image/banner3.png'),
        }],
        banner_index:0,
        items: [],
        src:require('../common/image/normal.png'),
        list: [],
      }
    },
    methods: {
      banner_onIndexChange(index) {
        this.banner_index = index
      },
      success (src, ele) {
        const span = ele.parentNode.querySelector('span')
        // console.log('success load', src,ele,span)
        span.style.display = 'none';
      },
      error (src, ele, msg) {
        // console.log('error load', msg, src)
        const span = ele.parentNode.querySelector('span')
        span.innerText = 'load error'
      }
    }
  }
</script>

<style lang="less">
.home{
  .weui-grids {
    background-color: #fff;
    &::before,
    &::after{
      display: none;
    }
    .weui-grid{
      &::before{
        display: none;
      }
    }
    .weui-grid__icon{
      width: 1.75rem;
      height: 1.75rem;
    }
    .weui-grid__label {
      font-size: .5rem;
      margin-top: .85rem;
      color:#333;
    }
  }
  .newsList{
    margin-top: .5rem;
    background: #fff;
    .weui-cells{
      &::before{
        display: none;
      }
    }
    .weui-cell{
      font-size: .7rem
    }
  }
  .list {
    display: flex;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    &:after{
      content:'';
      position: absolute;
      left:0;
      right:0;
      bottom: 0;
      height: 1px;
      color:#d9d9d9;
      transform-origin: 0px 100% 0px;
      transform: scaleY(0.5);
      border-bottom: 1px solid #d9d9d9;
    }
    .list_img{
      width: 4.625rem;
      height: 2.75rem;
      line-height: 3rem;
      text-align: center;
      margin-left: .4rem;
      .ximg-demo {
        width: 100%;
        height: 100%;
      }
    }
    .list_content {
      flex: 1;
      min-width: 0;
      .list_title{
        color:#000;
        width: auto;
        font-weight:400;
        font-size: .5rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .list_time{
        color:#333;
        font-size: 0.425rem;
        line-height: 1.2;
        margin-top: .5rem;
      }
    }
  }
  .weui-btn{
    margin-top: .5rem;
    font-size: .7rem
  }
}
</style>
