<template>
    <div class="care">
        <div class="tab">
            <tab :line-width=2 active-color='#fc378c' v-model="index">
                <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @on-item-click="handler(item)" :key="index">{{item}}</tab-item>
            </tab>
        </div>

        <div class="care_content">   
            <template v-if="$route.query.status=='relation'">
                <div class="showNull">
                    <img src="../common/image/zhuan.jpg" alt="" width="100%">
                </div>
            </template>
            <template v-if="$route.query.status=='pay'">
                <div v-if="!newedNewsTotal" class="showNull">
                    <span>暂时没有数据。。。</span>
                </div>
                <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="newsID">
                    <template v-for="(item,index) in currentNews">
                        <router-link tag="div" class="list" :to="{name:'NewsDetail', params: {dynamicid: item.id}}"  :key="index">
                        <div class="list_img">
                            <span>Loading</span>
                            <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo"  container="#vux_view_box_body"></x-img>
                        </div>
                        <div class="list_content">
                            <div class="list_title">{{item.title}}</div>
                            <div class="list_time">{{item.create_time|fmtDate}}</div>
                        </div>
                        </router-link>
                    </template>
                </v-scroll>
            </template>
        </div>
    </div>
</template>

<script>
import {  Tab, TabItem, XImg} from 'vux'
import { mapState, mapGetters } from 'vuex'
import VScroll from './pull-refresh'
import {fmtDate} from '../filters/date.js'

const list = () => ['组织转移', '党费缴纳']
export default {
    components: {
      Tab,
      TabItem,
      XImg,
      VScroll
    },
    data() {
      return {
        list: list(),
        selected: '',
        index: 0,

        currentNews: [],
        newsNewsedCounter:1,
        num: 10,
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        src:require('../common/image/normal.png')
      }
    },
    computed: {
      ...mapState({
        direction: state => state.common.direction
      }),
      ...mapGetters({

        'newedNewsList':'newedNewsList',

        'newedNewsTotal':'newedNewsTotal',


        'errorNewsMsg':'errorNewsMsg',

        'newedNewsScrollTop': 'newedNewsScrollTop'
      })
    },
     watch: {
      $route(to, from) {
        if (to.query.status  == "relation") {
          this.selected = "组织转移"
          this.index = 0
        }else if (to.query.status == "pay") {
          this.selected = "党费缴纳"
          this.index = 1
          if (this.newedNewsList.length == 0) {
            // this.$el.querySelector('.nullData').style.display = 'none';
            this.$store.dispatch('getNewedNewsList', { 'type': 0, 'cate':2 })
          }

          this.currentNews = this.newedNewsList
        }
      },
      errorNewsMsg: function (value) {
        this.$vux.toast.text(value, 'middle')
      },
      newedNewsList: function (value) {
        this.currentNews = value;
        // console.log(this.currentProject)
      },
    },
    created() {
      let currentSelected = this.$route.query.status;
      if (currentSelected == 'relation') {
        this.selected = "组织转移"
      } else if (currentSelected == 'pay') {
        this.selected = "党费缴纳"
        this.$store.dispatch('getNewedNewsList', { 'type':0,'cate':2 })
      }
    },
    mounted() {
    //   this.$nextTick(() => {
    //     this.box = this.$el.querySelector('#newsID')
    //     this.box.addEventListener('scroll', this.handler, false)
    //   })
    },
    activated() {
    //   this.$nextTick(() => {
    //     this.box = this.$el.querySelector('#newsID')
    //     this.box.scrollTop = this.newedNewsScrollTop

    //   })
    },
    methods: {
        handler: function(item) {
            this.selected = item
            let path = this.$route.path;
            if (item === '组织转移') {
                this.$router.replace(`${path}?status=relation`)
            } else if (item === '党费缴纳') {
                this.$router.replace(`${path}?status=pay`)
                this.$store.dispatch('getNewedNewsList', { 'type':0,'cate':2 })
            }

        },
        onRefresh(done) { 
            this.$store.dispatch('getNewedNewsList',{ 'type':0,'cate':2})
            this.newsNewsedCounter = 1
            done(); // call done
        },
        onInfinite(done) {
            this.newsNewsedCounter++;
            let end = this.num * this.newsNewsedCounter;
            let i = end - this.num;
            let more = this.$el.querySelector('.load-more')

            this.$store.dispatch('getNewedNewsList', { page: this.newsNewsedCounter, 'type':0,'cate':2 }).then(() => {
                for (i; i < end; i++) {
                if (i >= this.newedNewsTotal) {
                    more.style.display = 'none'; //隐藏加载条
                    //走完数据调用方法
                    this.scrollData.noFlag = true;
                    break;
                } else {
                    // let newIndex = i % 10
                    // if (res.data.data.length !== 0) {
                    //     this.currentTime.push(res.data.data[newIndex])
                    // }
                    more.style.display = 'none'; //隐藏加载条
                }
                }
                if (!this.newedNewsTotal) {
                this.$nextTick(() => {
                    this.$el.querySelector('.nullData').style.display = 'none';
                })
                } else {
                this.$nextTick(() => {
                    this.$el.querySelector('.nullData').style.display = '';
                })
                }
            })

            done();
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
    },
    filters: {
      fmtDate(time) {
        let date = new Date(time)
        return fmtDate(date, 'yyyy-MM-dd')
      }
    },
    
}
</script>

<style lang="less">
 @import '~vux/src/styles/center.less';
 .care{
    .box {
      padding: 15px;
    }
    .tab-swiper {
      background-color: #fff;
      height: 100px;
    }
    .tab {
      position: fixed;
      z-index: 10;
      width: 100%;
    }
    .care_content{
        font-size: .7rem;
        padding-top: 2.3rem;
        padding-bottom: 2rem;
        overflow: hidden;
    }
    .showNull {
      text-align: center;
      line-height: 3.5rem;
      display: flex;
      &:before {
        content: '';
        display: inline-block;
        width: 5rem;
        height: 3rem;
        /*background-size: 70% !important;*/
        /*background: url(../common/images/nodata.gif) no-repeat center;*/
      }
    }
    .yo-scroll {
      top: calc(2.3rem + 60px);
    }
    .list {
      display: flex;
     /*  align-items: center; */
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
        line-height: 2.75rem;
        text-align: center;
        margin-right: .4em;
        font-size: .7rem;
        .ximg-demo {
          width: 100%;
          height: 100%;
        }
      }
      .list_content {
        flex: 1;
        min-width: 0;
        .list_title{
          width: auto;
          font-weight:400;
          font-size: .6rem;
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
 }

</style>

