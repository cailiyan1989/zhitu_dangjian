<template>
  <div class="integral">
    <div class="userBox">
      <div class="ximg-bg">
        <img src="../common/image/findBg.png">
      </div>
      <div class="userImg">
        <div class="my-integral">我的积分：{{myScore.score}}</div>
        <div class="user">
          <img src="../common/image/head.png" class="img-user">
        </div>
        <div class="my-rank">我的排名：{{myScore.paiming}}</div>
      </div>
    </div>
    <div v-if="showLoading">
      <load-more tip="正在加载"></load-more>
    </div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="messageID">
      <div class="integral-item" v-for="(item,index) in currentMessage" :key="index">
        <!-- <span class="create_time">{{item.create_time}}</span> -->
        <group>
          <cell title="美文阅读" :value="'+'+item.score" :inline-desc="item.create_time|fmtDate"></cell>
        </group>
      </div>
    </v-scroll>
  </div>
</template>

<script>
  import VScroll from './pull-refresh'
  import {XImg, Group, Cell, LoadMore} from 'vux'
  import { mapGetters } from 'vuex'
  import {fmtDate} from '../filters/date.js'
  export default {
    components:{
      XImg,
      Group,
      Cell,
      LoadMore,
      VScroll
    },
    computed: {
      ...mapGetters([
        'isLoaded',
        'myIntegral',
        'integralDetails',
        'integralTotal',


        'integralScrollTop',

        'errorMessageMsg'
      ])
    },
    activated() {
      // this.currentMessage = this.integralDetails;
      setTimeout(() => {
        this.box.scrollTop = this.integralScrollTop
      }, 100)
    },
    watch: {
      isLoaded:function(val) {
        this.showLoading = val
      },
      myIntegral: function (val) {
        let id = window.localStorage.getItem('user')
        for (let item of val) {
          if (item.id == id) this.myScore = item
        }
      },
      integralDetails: function (value) {
        this.currentMessage = value;
      },
      errorMessageMsg: function(value) {
        this.$vux.toast.text(value,'middle')
      }
    },
    created() {
      let id = window.localStorage.getItem('user')

      this.$store.dispatch('getMyIntegral')
      this.$store.dispatch('getIntegralDetail', {id: id})
    },
    mounted() {
      this.$nextTick(() => {
        this.box = this.$el.querySelector('#messageID')
        this.box.addEventListener('scroll', this.handler, false)
      })
    },
    name: "my-integral",
    data() {
      return {
        // src: require('../common/image/findBg.png'),
        myScore:{},
        currentMessage: [],//当前项目消息列表,
        //下拉刷新和上拉加载数据字段
        counter: 1, //当前页
        num: 10, // 一页显示多少条
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        showLoading: ''
      }
    },
    filters: {
      fmtDate(time) {
        let date = new Date(time)
        return fmtDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      handler() {
        this.box = document.querySelector('#messageID')
        this.$store.dispatch('updateIntegralPosition', this.box.scrollTop)

      },
      onRefresh(done) {
        let id = window.localStorage.getItem('user')

        this.$store.dispatch('getIntegralDetail', {id: id})
        this.counter = 1
        done(); // call done
      },
      onInfinite(done) {
        this.counter++;
        let end = this.num * this.counter;
        let i = end - this.num;
        let more = this.$el.querySelector('.load-more')
        let id = window.localStorage.getItem('user')

        this.$store.dispatch('getIntegralDetail', { page: this.counter, id: id }).then(() => {
          for (i; i < end; i++) {
            if (i >= this.integralTotal) {
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
        })
        done();
      }
    }
  }
</script>

<style lang="less">
  .integral{
    .userBox {
      width: 100%;
      .ximg-bg {
        width: 100%;
        height: 5rem;
        background: rgb(247,247,247);
        img{
          width: 100%;
          height: 100%;
        }
      }
      .userImg {
        display: flex;
        justify-content: center;
        .user{
          height: 2rem;
          width: 2rem;
          margin: 0 .5rem;
          padding: 2px;
          display: flex;
          align-items: center;
          border:1px solid rgb(217, 217, 217);
          box-sizing: border-box;
          background: #fff;
          transform: translateY(-1.1rem);
          .img-user{
            width: 100%;
            height: 100%;
          }
        }
        .my-integral,
        .my-rank{
          color:#999;
          font-size: .7rem;
        }
      }
    }
    .yo-scroll{
      top:6.5rem;
    }
    .integral-item {
      margin-bottom: .7rem;
      .create_time {
        margin-left: .5rem;
        background-color: #999;
        font-size: .5rem;
        color: #fff;
        border-radius: .2rem;
        padding: .2rem;
      }
      .weui-cells{
        margin-top: .7rem;
      }
      .vux-label{
        font-size: .7rem
      }
      .vux-label-desc{
        font-size: .6rem
      }
      .weui-cell__ft{
        font-size: .6rem
      }
    }
  }
</style>
