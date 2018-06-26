<template>
  <div class="dynamic-news">
    <div v-show="!noticedNewsTotal" class="showNull">
      <load-more tip="正在加载" v-if="showLoading"></load-more>
      <span v-else>暂时没有数据。。。</span>
    </div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="newsID">
      <template v-for="(item,index) in currentNews">
        <router-link tag="div" class="list" :key="index" :to="{name:'NewsDetail', params: {dynamicid: item.id}}">
          <div class="list_time">{{item.create_time}}</div>
          <div class="list_body">
            <div class="list_bigimg">
              <div v-if="item.img" v-html="item.img"></div>
              <img v-else src="../common/image/dongtai.png" alt="">
            </div>
            <div class="list_content">
              <div class="list_text">
                <div class="list_title">{{item.title}}</div> 
              </div>
              <!-- <div class="list_img">
                <img :src="src" class="ximg-demo">
              </div> -->
            </div>
          </div>
        </router-link>
      </template>
    </v-scroll>
  </div>
</template>

<script>
  import {  LoadMore } from 'vux'
  import { mapGetters } from 'vuex'
  import VScroll from './pull-refresh'
  import {fmtDate} from '../filters/date.js'
  export default {
    components:{
      LoadMore,
      VScroll
      // 'v-scroll': require("./pull-refresh").default
    },
    data() {
      return {
        currentNews: [],//当前动态列表

        //下拉刷新和上拉加载数据字段
        // counter: 1, //当前页
        newsNoticedCounter: 1,
        // newsLearnedCounter: 1,
        // newsPeopledCounter: 1,
        // newsNewsedCounter:1,
        num: 10, // 一页显示多少条
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        src:require('../common/image/7878.png'),
        showLoading:''
      }
    },
    computed: {
      ...mapGetters([
        'isLoaded',
        'noticedNewsList',
        // 'learnedNewsList',
        // 'peopledNewsList',
        // 'newedNewsList',

        'noticedNewsTotal',
        // 'learnedNewsTotal',
        // 'peopledNewsTotal',
        // 'newedNewsTotal',


        'errorNewsMsg',

        'noticedNewsScrollTop',
        // 'learnedNewsScrollTop',
        // 'peopledNewsScrollTop',
        // 'newedNewsScrollTop'
      ])
    },
    created() {
      // if (this.$route.query.category == 'notice') {
        this.$store.dispatch('getNoticedNewsList', { 'type': 0,'cate':1 })
      // } else if (this.$route.query.category == 'learn') {
      //   this.$store.dispatch('getLearnedNewsList', { 'type': 2,'cate':13  })
      // } else if (this.$route.query.category == 'guide') {
      //   this.$store.dispatch('getPeopledNewsList', { 'type': 1, 'cate': 6 })
      // } else if (this.$route.query.category == 'news'){
      //   this.$store.dispatch('getNewedNewsList', { 'type':0,'cate':2 })
      // }

    },
    mounted() {
      this.$nextTick(() => {
        // if (this.$route.path == "/administration/project") {
        //   this.$el.querySelector('.yo-scroll').style.top = "4.3rem"
        // }
        this.box = this.$el.querySelector('#newsID')
        this.box.addEventListener('scroll', this.handler, false)
      })
    },
    activated() {
      this.$nextTick(() => {
        this.box = this.$el.querySelector('#newsID')
        // if (this.$route.query.category == "notice") {
          this.box.scrollTop = this.noticedNewsScrollTop
        // } else if (this.$route.query.category == "learn") {
        //   this.box.scrollTop = this.learnedNewsScrollTop
        // } else if (this.$route.query.category == "guide") {
        //   this.box.scrollTop = this.peopledNewsScrollTop
        // } else if (this.$route.query.category == 'news') {
        //   this.box.scrollTop = this.newedNewsScrollTop
        // }

      })
    },
    name: "dynamic-news",
    watch: {
      isLoaded: function(val) {
        this.showLoading = val
      },
      errorNewsMsg: function (value) {
        this.$vux.toast.text(value, 'middle')
      },
      noticedNewsList: function (value) {
        this.currentNews = value;
        // console.log(this.currentProject)
      },
      // learnedNewsList: function (value) {
      //   // console.log(value)
      //   this.currentNews = value;
      // },
      // peopledNewsList: function (value) {

      //   this.currentNews = value;
      // },

      // newedNewsList: function (value) {
      //   this.currentNews = value;
      // },

      $route(to, from) {
        // if (to.query.category == 'notice') {
          if (this.noticedNewsList.length == 0) {
            this.$el.querySelector('.nullData').style.display = 'none';
            this.$store.dispatch('getNoticedNewsList', { 'type': 0, 'cate':1 })
          }

          this.$nextTick(() => {
            this.box.scrollTop = this.noticedNewsScrollTop
          })
          this.currentNews = this.noticedNewsList
        // } else if (to.query.category == 'learn') {
        //   if (this.learnedNewsList.length == 0) {
        //     this.$el.querySelector('.nullData').style.display = 'none';
        //     this.$store.dispatch('getLearnedNewsList', { 'type': 2,'cate':13 })
        //   }

        //   this.$nextTick(() => {
        //     this.box.scrollTop = this.learnedNewsScrollTop
        //   })
        //   this.currentNews = this.learnedNewsList
        // } else if (to.query.category == 'guide') {
        //   if (this.peopledNewsList.length == 0) {
        //     this.$el.querySelector('.nullData').style.display = 'none';
        //     this.$store.dispatch('getPeopledNewsList', { 'type': 1, 'cate': 6 })
        //   }
        //   this.$nextTick(() => {
        //     this.box.scrollTop = this.peopledNewsScrollTop
        //   })
        //   this.currentNews = this.peopledNewsList
        // } else if (to.query.category == 'news') {
        //   if (this.newedNewsList.length == 0) {
        //     this.$el.querySelector('.nullData').style.display = 'none';
        //     this.$store.dispatch('getNewedNewsList', { 'type':0,'cate':2})
        //   }
        //   this.$nextTick(() => {
        //     this.box.scrollTop = this.newedNewsScrollTop
        //   })
        //   this.currentNews = this.newedNewsList
        // }
      }
    },
    methods: {
      handler() {
        this.box = document.querySelector('#newsID')
        // if (this.$route.query.category == "notice") {
          this.$store.dispatch('updateNoticedNewsPosition', this.box.scrollTop)
        // } else if (this.$route.query.category == "learn") {
        //   this.$store.dispatch('updateLearnedNewsPosition', this.box.scrollTop)
        // } else if (this.$route.query.category == "guide") {
        //   this.$store.dispatch('updatePeopledNewsPosition', this.box.scrollTop)
        // } else if (this.$route.query.category == "news") {
        //   this.$store.dispatch('updateNewedNewsPosition', this.box.scrollTop)
        // }

      },
      onRefresh(done) {
        // if (this.$route.query.category == 'notice') {
          this.$store.dispatch('getNoticedNewsList', { 'type':0, 'cate':1 })
          this.newsNoticedCounter = 1
        // } else if (this.$route.query.category == 'learn') {
        //   this.$store.dispatch('getLearnedNewsList', { 'type': 2,'cate':13 })
        //   this.newsLearnedCounter = 1
        // } else if (this.$route.query.category == 'guide') {
        //   this.$store.dispatch('getPeopledNewsList', { 'type': 1, 'cate': 6 })
        //   this.newsPeopledCounter = 1
        // } else if (this.$route.query.category == 'news') {
        //   this.$store.dispatch('getNewedNewsList',{ 'type':0,'cate':2})
        //   this.newsNewsedCounter = 1
        // }
        done(); // call done
      },
      onInfinite(done) {
        // if (this.$route.query.category == 'notice') {
          this.newsNoticedCounter++;
          let end = this.num * this.newsNoticedCounter;
          let i = end - this.num;
          let more = this.$el.querySelector('.load-more')

          this.$store.dispatch('getNoticedNewsList', { page: this.newsNoticedCounter, 'type': 0, 'cate':1}).then(() => {
            for (i; i < end; i++) {
              if (i >= this.noticedNewsTotal) {
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
            if (!this.noticedNewsTotal) {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = 'none';
              })
            } else {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = '';
              })
            }
          })
        // } else if (this.$route.query.category == 'learn') {
        //   this.newsLearnedCounter++;
        //   let end = this.num * this.newsLearnedCounter;
        //   let i = end - this.num;
        //   let more = this.$el.querySelector('.load-more')

        //   this.$store.dispatch('getLearnedNewsList', { page: this.newsLearnedCounter, 'type': 2,'cate':13}).then(() => {
        //     for (i; i < end; i++) {
        //       if (i >= this.learnedNewsTotal) {
        //         more.style.display = 'none'; //隐藏加载条
        //         //走完数据调用方法
        //         this.scrollData.noFlag = true;
        //         break;
        //       } else {
        //         // let newIndex = i % 10
        //         // if (res.data.data.length !== 0) {
        //         //     this.currentTime.push(res.data.data[newIndex])
        //         // }
        //         more.style.display = 'none'; //隐藏加载条
        //       }
        //     }
        //     if (!this.learnedNewsTotal) {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = 'none';
        //       })
        //     } else {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = '';
        //       })
        //     }
        //   })



        // } else if (this.$route.query.category == 'guide') {
        //   this.newsPeopledCounter++;
        //   let end = this.num * this.newsPeopledCounter;
        //   let i = end - this.num;
        //   let more = this.$el.querySelector('.load-more')

        //   this.$store.dispatch('getPeopledNewsList', { page: this.newsPeopledCounter, 'type': 1, 'cate': 6 }).then(() => {
        //     for (i; i < end; i++) {
        //       if (i >= this.peopledNewsTotal) {
        //         more.style.display = 'none'; //隐藏加载条
        //         //走完数据调用方法
        //         this.scrollData.noFlag = true;
        //         break;
        //       } else {
        //         // let newIndex = i % 10
        //         // if (res.data.data.length !== 0) {
        //         //     this.currentTime.push(res.data.data[newIndex])
        //         // }
        //         more.style.display = 'none'; //隐藏加载条
        //       }
        //     }
        //     if (!this.peopledNewsTotal) {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = 'none';
        //       })
        //     } else {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = '';
        //       })
        //     }
        //   })

        // } else if (this.$route.query.category == 'news') {
        //   this.newsNewsedCounter++;
        //   let end = this.num * this.newsNewsedCounter;
        //   let i = end - this.num;
        //   let more = this.$el.querySelector('.load-more')

        //   this.$store.dispatch('getNewedNewsList', { page: this.newsNewsedCounter, 'type':0,'cate':2 }).then(() => {
        //     for (i; i < end; i++) {
        //       if (i >= this.newedNewsTotal) {
        //         more.style.display = 'none'; //隐藏加载条
        //         //走完数据调用方法
        //         this.scrollData.noFlag = true;
        //         break;
        //       } else {
        //         // let newIndex = i % 10
        //         // if (res.data.data.length !== 0) {
        //         //     this.currentTime.push(res.data.data[newIndex])
        //         // }
        //         more.style.display = 'none'; //隐藏加载条
        //       }
        //     }
        //     if (!this.newedNewsTotal) {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = 'none';
        //       })
        //     } else {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = '';
        //       })
        //     }
        //   })

        // }
        done();
      },
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
    },
  }
</script>

<style lang="less">
  .dynamic-news {
    overflow: hidden;
    .showNull {
      text-align: center;
      line-height: 3.5rem;
      display: flex;
      justify-content: center;
    }
    font-size: .7rem;
    // padding-top: 2.3rem;
    padding-bottom: 2rem;
    height: 100%;
    background: rgb(234,234,235);
    .yo-scroll {
      top: 0;
    }
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: .43rem;
      box-sizing: border-box;
      // background-color: #fff;
      position: relative;
      margin-bottom: 1.32rem;
      // &:after{
      //   content:'';
      //   position: absolute;
      //   left:0;
      //   right:0;
      //   bottom: 0;
      //   height: 1px;
      //   color:#d9d9d9;
      //   transform-origin: 0px 100% 0px;
      //   transform: scaleY(0.5);
      //   border-bottom: 1px solid #d9d9d9;
      // }
      .list_time{
        width: 6.4rem;
        height: .81rem;
        background: rgb(206,206,206);
        border-radius: .213rem;
        color:rgb(255,255,255);
        font-size: 0.55rem;
        line-height: 1.2;
        margin-bottom: .384rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .list_body{
        width: 15.15rem;
        // height: 10.20rem;
        border-radius: .43rem;
        background: rgb(255,255,255);
        overflow: hidden;
      }
      .list_bigimg{
        width: 100%;
        height: 6.44rem;
        background: rgb(247, 247, 247);
        overflow: hidden;
        div,
        img{
          width: 100%;
          height: 100%;
        }
      }
      .list_content{
        width: 100%;
        // height:3.75rem;
        // background: #fff;
        display: flex;
        padding: .683rem;
        box-sizing: border-box;
      }
      .list_img{
        width: 2.56rem;
        height: 2.56rem;
        line-height: 2.56rem;
        text-align: center;
        margin-left: 1.24rem;
        font-size: .7rem;
        background: rgb(247, 247, 247);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .list_text{
        display: flex;
        width: 100%;
        align-items: center;
      }
      .list_title{
        color:rgb(51,51,51);
        width: auto;
        font-weight:400;
        font-size: .74rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    
    }
  }
</style>
