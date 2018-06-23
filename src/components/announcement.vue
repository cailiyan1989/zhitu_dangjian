<template>
<div class="announcement">
  <template v-if="$route.query.status=='policy'">
    <div v-show="!policyNewsTotal" class="showNull">
      <load-more tip="正在加载" v-if="showLoading"></load-more>
      <span v-else>暂时没有数据。。。</span>
    </div>
  </template>
  <template v-if="$route.query.status=='deeds'">
    <div v-show="!deedsNewsTotal" class="showNull">
      <load-more tip="正在加载" v-if="showLoading"></load-more>
      <span v-else>暂时没有数据。。。</span>
    </div>
  </template>
  <template v-if="$route.query.status=='guide'">
    <div v-show="!guideNewsList" class="showNull">
      <load-more tip="正在加载" v-if="showLoading"></load-more>
      <span v-else>暂时没有数据。。。</span>
    </div>
  </template>
  <!-- <template v-if="$route.query.status=='jobs'">
    <div v-show="!jobsNewsList" class="showNull">
      <span>暂时没有数据。。。</span>
    </div>
  </template>
  <template v-if="$route.query.status=='democracy'">
    <div v-show="!democracyNewsTotal" class="showNull">
      <span>暂时没有数据。。。</span>
    </div>
  </template> -->
  <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="newsID">
    <template v-for="(item,index) in currentNews">
      <router-link tag="div" class="list" :key="index" :to="{name:'announcementDetail',params:{announcementid:item.id,state:$route.query.status}}">
        <div class="list_time">{{item.create_time}}</div>
        <div class="list_body">
          <div class="list_bigimg">
            <div v-if="item.img" v-html="item.img"></div>
            <img v-else src="../common/image/big.png" alt="">
          </div>
          <div tag="div" class="list_content" >
            <div class="list_text">
              <div class="list_title">{{item.title}}</div> 
            </div>
            <!-- <div class="list_img">
              <img :src="src" class="ximg-demo">
            </div> -->
          </div>
        </div>
      </router-link>
      <!-- <router-link tag="div" class="list" :to="{name:'announcementDetail',params:{announcementid:item.id,state:$route.query.status}}" :key="index">
        <div class="list_img">
          <span>Loading</span>
          <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo"  container="#vux_view_box_body"></x-img>
        </div>
        <div class="list_content">
          <div class="list_title">{{item.title}}</div>
          <div class="list_time">{{item.create_time}}</div>
        </div>
      </router-link> -->
    </template>
  </v-scroll>
</div>
</template>

<script>
  import { LoadMore } from 'vux'
  import { mapGetters } from 'vuex'
  import VScroll from './pull-refresh'
  export default {
    components:{
      LoadMore,
      VScroll
    },
    data() {
      return {
        currentNews: [],//当前动态列表

        //下拉刷新和上拉加载数据字段
        // counter: 1, //当前页
        newsPolicyCounter: 1,
        newsDeedsCounter: 1,
        newsGuideCounter: 1,
        newsJobsCounter:1,
        newsDemocracyCounter:1,
        num: 10, // 一页显示多少条
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        src:require('../common/image/normal2.png'),
        showLoading:''
      }
    },
    computed: {
      ...mapGetters([
        'isLoaded',
        'policyNewsList',
        'deedsNewsList',
        'guideNewsList',
        'jobsNewsList',
        'democracyNewsList',

        'policyNewsTotal',
        'deedsNewsTotal',
        'guideNewsTotal',
        'jobsNewsTotal',
        'democracyNewsTotal',


        'errorAnNewsMsg',

        'policyNewsScrollTop',
        'deedsNewsScrollTop',
        'guideNewsScrollTop',
        'jobsNewsScrollTop',
        'democracyNewsScrollTop'
      ])
    },
    created() {
      if (this.$route.query.status == 'policy') {
        this.$store.dispatch('getPolicyNewsList', { 'type': 2, 'cate': 13})
      } else if (this.$route.query.status == 'deeds') {
        this.$store.dispatch('getDeedsNewsList', { 'type': 2, 'cate': 14 })
      } else if (this.$route.query.status == 'guide') {
        this.$store.dispatch('getGuideNewsList', { 'type': 2, 'cate': 15 })
      } 
      // else if (this.$route.query.status == 'jobs'){
      //   this.$store.dispatch('getJobsNewsList')
      // } else if (this.$route.query.status == 'democracy') {
      //   this.$store.dispatch('getDemocracyNewsList')
      // }
    },
    mounted() {
      this.$nextTick(() => {
        this.box = this.$el.querySelector('#newsID')
        this.box.addEventListener('scroll', this.handler, false)
      })
    },
    activated() {
      this.$nextTick(() => {
        this.box = this.$el.querySelector('#newsID')
        if (this.$route.query.status == "policy") {
          this.box.scrollTop = this.policyNewsScrollTop
        } else if (this.$route.query.status == "deeds") {
          this.box.scrollTop = this.deedsNewsScrollTop
        } else if (this.$route.query.status== "guide") {
          this.box.scrollTop = this.guideNewsScrollTop
        } 
        // else if (this.$route.query.status == 'jobs') {
        //   this.box.scrollTop = this.jobsNewsScrollTop
        // } else if (this.$route.query.status == 'democracy') {
        //   this.box.scrollTop = this.democracyNewsScrollTop()
        // }

      })
    },
    name: "announcement",
    watch: {
      isLoaded: function(val) {
        this.showLoading = val
      },
      errorAnNewsMsg: function (value) {
        this.$vux.toast.text(value, 'middle')
      },
      policyNewsList: function (value) {
        this.currentNews = value;
        // console.log(this.currentProject)
      },
      deedsNewsList: function (value) {
        // console.log(value)
        this.currentNews = value;
      },
      guideNewsList: function (value) {

        this.currentNews = value;
      },

      jobsNewsList: function (value) {
        this.currentNews = value;
      },

      democracyNewsList: function (value) {
        this.currentNews = value;
      },

      $route(to, from) {
        if (to.query.status == 'policy') {
          if (this.policyNewsList.length == 0) {
            this.$el.querySelector('.nullData').style.display = 'none';
            this.$store.dispatch('getPolicyNewsList', { 'type': 2,'cate':13 })
          }

          this.$nextTick(() => {
            this.box.scrollTop = this.policyNewsScrollTop
          })
          this.currentNews = this.policyNewsList
        } else if (to.query.status == 'deeds') {
          if (this.deedsNewsList.length == 0) {
            this.$el.querySelector('.nullData').style.display = 'none';
            this.$store.dispatch('getDeedsNewsList', { 'type':2,'cate':14 })
          }

          this.$nextTick(() => {
            this.box.scrollTop = this.deedsNewsScrollTop
          })
          this.currentNews = this.deedsNewsList
        } else if (to.query.status == 'guide') {
          if (this.guideNewsList.length == 0) {
            this.$el.querySelector('.nullData').style.display = 'none';
            this.$store.dispatch('getGuideNewsList', { 'type': 2, 'cate': 15 })
          }
          this.$nextTick(() => {
            this.box.scrollTop = this.guideNewsScrollTop
          })
          this.currentNews = this.guideNewsList
        } 
        // else if (to.query.status == 'jobs') {
        //   if (this.jobsNewsList.length == 0) {
        //     this.$el.querySelector('.nullData').style.display = 'none';
        //     this.$store.dispatch('getJobsNewsList')
        //   }
        //   this.$nextTick(() => {
        //     this.box.scrollTop = this.jobsNewsScrollTop
        //   })
        //   this.currentNews = this.jobsNewsList
        // } else if (to.query.status == 'democracy') {
        //   if (this.democracyNewsList.length == 0) {
        //     this.$el.querySelector('.nullData').style.display = 'none';
        //     this.$store.dispatch('getDemocracyNewsList')
        //   }
        //   this.$nextTick(() => {
        //     this.box.scrollTop = this.democracyNewsScrollTop
        //   })
        //   this.currentNews = this.democracyNewsList
        // }
      }
    },
    methods: {
      handler() {
        this.box = document.querySelector('#newsID')
        if (this.$route.query.status == "policy") {
          this.$store.dispatch('updatePolicyNewsPosition', this.box.scrollTop)
        } else if (this.$route.query.status == "deeds") {
          this.$store.dispatch('updateDeedsNewsPosition', this.box.scrollTop)
        } else if (this.$route.query.status == "guide") {
          this.$store.dispatch('updateGuideNewsPosition', this.box.scrollTop)
        } 
        // else if (this.$route.query.status == "jobs") {
        //   this.$store.dispatch('updateJobsNewsPosition', this.box.scrollTop)
        // } else if (this.$route.query.status == "democracy") {
        //   this.$store.dispatch('updateDemocracyNewsPosition', this.box.scrollTop)
        // }

      },
      onRefresh(done) {
        if (this.$route.query.status== 'policy') {
          this.$store.dispatch('getPolicyNewsList', { 'type': 2,'cate':13 })
          this.newsPolicyCounter = 1
        } else if (this.$route.query.status == 'deeds') {
          this.$store.dispatch('getDeedsNewsList', { 'type':2,'cate':14 })
          this.newsDeedsCounter = 1
        } else if (this.$route.query.status == 'guide') {
          this.$store.dispatch('getGuideNewsList', { 'type': 2, 'cate': 15 })
          this.newsGuideCounter= 1
        } 
        // else if (this.$route.query.status == 'jobs') {
        //   this.$store.dispatch('getJobsNewsList')
        //   this.newsJobsCounter = 1
        // } else if (this.$route.query.status == 'democracy') {
        //   this.$store.dispatch('getDemocracyNewsList')
        //   this.newsDemocracyCounter = 1
        // }
        done(); // call done
      },
      onInfinite(done) {
        if (this.$route.query.status == 'policy') {
          this.newsPolicyCounter++;
          let end = this.num * this.newsPolicyCounter;
          let i = end - this.num;
          let more = this.$el.querySelector('.load-more')

          this.$store.dispatch('getPolicyNewsList', { page: this.newsPolicyCounter, 'type': 2,'cate':13 }).then(() => {
            for (i; i < end; i++) {
              if (i >= this.policyNewsTotal) {
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
            if (!this.policyNewsTotal) {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = 'none';
              })
            } else {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = '';
              })
            }
          })
        } else if (this.$route.query.status == 'deeds') {
          this.newsDeedsCounter++;
          let end = this.num * this.newsDeedsCounter;
          let i = end - this.num;
          let more = this.$el.querySelector('.load-more')

          this.$store.dispatch('getDeedsNewsList', { page: this.newsDeedsCounter, 'type':2,'cate':14 }).then(() => {
            for (i; i < end; i++) {
              if (i >= this.deedsNewsTotal) {
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
            if (!this.deedsNewsTotal) {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = 'none';
              })
            } else {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = '';
              })
            }
          })



        } else if (this.$route.query.status == 'guide') {
          this.newsGuideCounter++;
          let end = this.num * this.newsGuideCounter;
          let i = end - this.num;
          let more = this.$el.querySelector('.load-more')

          this.$store.dispatch('getGuideNewsList', { page: this.newsGuideCounter, 'type': 2 ,'cate':15 }).then(() => {
            for (i; i < end; i++) {
              if (i >= this.guideNewsTotal) {
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
            if (!this.guideNewsTotal) {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = 'none';
              })
            } else {
              this.$nextTick(() => {
                this.$el.querySelector('.nullData').style.display = '';
              })
            }
          })

        } 
        // else if (this.$route.query.status == 'jobs') {
        //   this.newsJobsCounter++;
        //   let end = this.num * this.newsJobsCounter;
        //   let i = end - this.num;
        //   let more = this.$el.querySelector('.load-more')

        //   this.$store.dispatch('getJobsNewsList', { page: this.newsJobsCounter }).then(() => {
        //     for (i; i < end; i++) {
        //       if (i >= this.jobsNewsTotal) {
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
        //     if (!this.jobsNewsTotal) {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = 'none';
        //       })
        //     } else {
        //       this.$nextTick(() => {
        //         this.$el.querySelector('.nullData').style.display = '';
        //       })
        //     }
        //   })

        // } else if (this.$route.query.status == 'democracy') {
        //   this.newsDemocracyCounter++;
        //   let end = this.num * this.newsDemocracyCounter;
        //   let i = end - this.num;
        //   let more = this.$el.querySelector('.load-more')

        //   this.$store.dispatch('getDemocracyNewsList', { page: this.newsDemocracyCounter }).then(() => {
        //     for (i; i < end; i++) {
        //       if (i >= this.democracyNewsTotal) {
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
        //     if (!this.democracyNewsTotal) {
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
    }
  }
</script>

<style lang="less">
.announcement{
  overflow: hidden;
  .showNull {
    text-align: center;
    line-height: 3.5rem;
    display: flex;
    justify-content: center;
    // &:before {
    //   content: '';
    //   display: inline-block;
    //   width: 5rem;
    //   height: 3rem;
    //   /*background-size: 70% !important;*/
    //   /*background: url(../common/images/nodata.gif) no-repeat center;*/
    // }
    .vux-loadmore{
      z-index: 111;
    }
  }
  font-size: .7rem;
  padding-top: 2.3rem;
  padding-bottom: 2rem;
  .yo-scroll {
    top: 2.3rem;
    background: rgb(234,234,235);
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
      width:  6.4rem;
      height: .81rem;
      background: rgb(206,206,206);
      border-radius: .213rem;
      color:rgb(255,255,255);
      font-size: 0.55rem;
      line-height: 1.2;
      margin-bottom: .384rem;
      text-align: center;
    }
    .list_body{
      width: 15.15rem;
      height: 10.20rem;
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
      height: 3.75rem;
      // background: #fff;
      display: flex;
      padding: .768rem .683rem 0;
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
      width: 100%;
    }
    .list_title{
      color:rgb(51,51,51);
      font-weight:400;
      font-size: .64rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  
  }
}
</style>
