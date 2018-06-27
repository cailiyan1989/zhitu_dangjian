<template>
    <div class="care">
        <div class="tab">
            <tab :line-width=2 active-color='#fc378c' v-model="index">
                <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @on-item-click="handler(item)" :key="index">{{item}}</tab-item>
            </tab>
        </div>
        <div class="care_content">   
            <template v-if="$route.query.status=='relation'">
                <div class="rela_content">
                    <img src="../common/image/zhuan.jpg" alt="" width="100%">
                </div>
            </template>
            <template v-if="$route.query.status=='pay'">
                <div v-if="showLoading" class="showNull">
                  <load-more tip="正在加载"></load-more>
                </div>
                <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="newsID">
                  <div class="integral-item" v-for="(item,index) in currentNews" :key="index">
                    <!-- <span class="create_time">{{item.create_time}}</span> -->
                    <group>
                      <cell :title="item.realname">
                        <p slot="inline-desc">所在支部：{{item.title}}</p>
                        <p slot="inline-desc">缴纳时间：{{item.time}}</p>
                        <p class="pass">已缴纳 {{item.money}}</p>
                      </cell>
                    </group>
                  </div>
                </v-scroll>
            </template>
        </div>
    </div>
</template>

<script>
import {  Tab, TabItem,Group, Cell, LoadMore} from 'vux'
import { mapState, mapGetters } from 'vuex'
import VScroll from './pull-refresh'
import {fmtDate} from '../filters/date.js'

const list = () => ['组织转移', '党费缴纳']
export default {
    components: {
      Tab,
      TabItem,
      Group,
      Cell,
      LoadMore,
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
        src:require('../common/image/normal.png'),
        showLoading:''
      }
    },
    computed: {
      ...mapState({
        direction: state => state.common.direction
      }),
      ...mapGetters({
        'isLoaded': 'isLoaded',

        'errorMessageMsg': 'errorMessageMsg',

        'partyFees':'partyFees',

        'partyFeesTotal': 'partyFeesTotal',

        // 'feesScrollTop': 'feesScrollTop'
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
          if (this.partyFees.length == 0) {
            // this.$el.querySelector('.nullData').style.display = 'none';
            this.$store.dispatch('getPartyFees')
          }

          this.currentNews = this.partyFees
        }
      },
      isLoaded: function(val) {
        this.showLoading = val
      },
      errorMessageMsg: function (value) {
        this.$vux.toast.text(value, 'middle')
      },
      partyFees: function (value) {
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
        this.$store.dispatch('getPartyFees')
      }
    },
    mounted() {
      // this.$nextTick(() => {
      //   this.box = this.$el.querySelector('#newsID')
      //   this.box.addEventListener('scroll', this.scrollTop, false)
      // })
    },
    activated() {
      // this.$nextTick(() => {
      //   this.box = this.$el.querySelector('#newsID')
      //   this.box.scrollTop = this.feesScrollTop

      // })
    },
    methods: {
        // scrollTop() {
        //   this.box = document.querySelector('#newsID')
        //   this.$store.dispatch('updateFeesPosition', this.box.scrollTop)
        // },
        handler: function(item) {
            this.selected = item
            let path = this.$route.path;
            if (item === '组织转移') {
                this.$router.replace(`${path}?status=relation`)
            } else if (item === '党费缴纳') {
                this.$router.replace(`${path}?status=pay`)
                this.$store.dispatch('getPartyFees')
            }

        },
        onRefresh(done) { 
            this.$store.dispatch('getPartyFees')
            this.newsNewsedCounter = 1
            done(); // call done
        },
        onInfinite(done) {
            this.newsNewsedCounter++;
            let end = this.num * this.newsNewsedCounter;
            let i = end - this.num;
            let more = this.$el.querySelector('.load-more')

            this.$store.dispatch('getPartyFees', { page: this.newsNewsedCounter}).then(() => {
                for (i; i < end; i++) {
                  if (i >= this.partyFeesTotal) {
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
                // if (!this.newedNewsTotal) {
                //   this.$nextTick(() => {
                //       this.$el.querySelector('.nullData').style.display = 'none';
                //   })
                // } else {
                //   this.$nextTick(() => {
                //       this.$el.querySelector('.nullData').style.display = '';
                //   })
                // }
            })

            done();
        },
        // success (src, ele) {
        //     const span = ele.parentNode.querySelector('span')
        //     // console.log('success load', src,ele,span)
        //     span.style.display = 'none';
        // },
        // error (src, ele, msg) {
        //     // console.log('error load', msg, src)
        //     const span = ele.parentNode.querySelector('span')
        //     span.innerText = 'load error'
        // }
    },
    filters: {
      filterStatus(val) {
        if(val == 0) {
          return '未缴纳'
        }else if(val == 1){
          return '已缴纳'
        }
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
      justify-content: center;
      // &:before {
      //   content: '';
      //   display: inline-block;
      //   width: 5rem;
      //   height: 3rem;
      //   /*background-size: 70% !important;*/
      //   /*background: url(../common/images/nodata.gif) no-repeat center;*/
      // }
    }
    .yo-scroll {
      top: 2.3rem;
    }
    .vux-cell-bd { 
      font-size: .8rem;
      
    }
    .vux-label-desc{
       p {
        color: #666;
      }
      font-size: .7rem;
      line-height: 1.6;
    }
    .weui-cell__ft {
        .check {
            color: #E64340;
        }
        .pass {
            color: #1AAD19;
        }
        p {
            font-size: .7rem;
        }
    }
 }

</style>

