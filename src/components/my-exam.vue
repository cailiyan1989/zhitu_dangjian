<template>
  <div class="my-exam">
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="messageID">
      <div class="exam-item" v-for="(item,index) in currentExam" :key="index">
        <group>
          <cell :title="item.title">
            <p slot="after-title">考试日期：{{item.create_time}}</p>
            <p slot="after-title">总分：{{item.turnout}} <span>得分：{{item.score}}</span></p>
            <x-button :type="{primary:item.status == 1, default:item.status==0}" link="">{{item.status|filterStatus}}</x-button>
            <!--<router-link :class="{'view':item.status==200, 'start':item.status==100}" tag="a" to="">{{item.status|filterStatus}}</router-link>-->
          </cell>
        </group>
      </div>
    </v-scroll>
  </div>
</template>

<script>
  import VScroll from './pull-refresh'
  import {Group, Cell,XButton} from 'vux'
  import {mapGetters} from 'vuex'
  export default {
    components:{
      Group,
      Cell,
      XButton,
      VScroll
    },
    computed: {
      ...mapGetters([
        'examList',
        'examTotal',

        'examScrollTop'
      ])
    },
    created() {
      this.$store.dispatch('getExamList')
    },
    watch: {
      examList: function (val) {
        this. currentExam = val
      }
    },
    name: "my-exam",
    data() {
      return {
        currentExam: [{title:'考试一',create_time:'2018-5-21',sum:'100',my_sum:'90',status:'200'}],
        counter: 1, //当前页
        num: 10, // 一页显示多少条
        scrollData: {
          noFlag: false //暂无更多数据显示
        }
      }
    },
    filters:{
      filterStatus(value) {
        if(value == 1) {
          return '开始答题'
        } else if(value == 0) {
          return '查看解析'
        }
      }
    },
    methods: {
      handler() {
        this.box = document.querySelector('#messageID')
        this.$store.dispatch('updateExamPosition', this.box.scrollTop)

      },
      onRefresh(done) {
        this.$store.dispatch('getExamList')
        this.counter = 1
        done(); // call done
      },
      onInfinite(done) {
        this.counter++;
        let end = this.num * this.counter;
        let i = end - this.num;
        let more = this.$el.querySelector('.load-more')

        this.$store.dispatch('getExamList', { page: this.counter }).then(() => {
          for (i; i < end; i++) {
            if (i >= this.examTotal) {
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
  .my-exam{
    .yo-scroll {
      // margin-top: -2rem;
    }
    .vux-cell-bd {
      p {
        color: #666;
      }
      font-size: .7rem;
      line-height: 1.6;
    }
    .weui-cell__ft {
      a {
        font-size: .7rem;
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        position: relative;
      }
      .start {
        color: #FFFFFF;
        background: #1AAD19;
      }
      .view {
        color: #000000;
        background: #F8F8F8;
      }
    }
    .vux-label {
      font-size: .8rem;
      color: #000;
      position: relative;
      &:before{
        display: block;
        content:'';
        position: absolute;
        top:0;
        left:0;
        width: 0.3rem;
        height: 100%;
        margin-left: -0.4rem;
        background: #c50000;
      }
    }
    .vux-label-desc {
      font-size: .7rem;
    }
  }
</style>

