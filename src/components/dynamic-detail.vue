<template>
  <div class="dynamic-detail">
    <card>
      <div slot="header" class="detail_title">{{news.title}}</div>
      <div slot="content" class="card-padding">
        <p class="detail_date"><span style="margin-right: 15px">{{news.create_time}}</span><span>{{news.realname}}</span></p>
        <p style="font-size:14px;line-height:1.2;padding: .4rem" v-html="news.content"></p>
      </div>
    </card>
  </div>
</template>

<script>
  import { Card } from 'vux'
  import { mapGetters } from 'vuex'
  import {fmtDate} from '../filters/date.js'
  export default {
    components:{
      Card
    },
    computed: {
      ...mapGetters([
        'noticedNewsList',
        // 'learnedNewsList',
        // 'peopledNewsList',
        // 'newedNewsList',
      ])
    },
    activated() {
      // if (this.$route.params.cate == 'notice') {
        this.noticedNewsList.forEach((value, index) => {
          if (value.id == this.$route.params.dynamicid) {
            this.news = value
          }
        })
      // } else if (this.$route.params.cate == 'learn') {
      //   this.learnedNewsList.forEach((value, index) => {
      //     if (value.id == this.$route.params.dynamicid) {
      //       this.news = value
      //     }
      //   })
      // } else if (this.$route.params.cate == 'people') {
      //   this.peopledNewsList.forEach((value, index) => {
      //     if (value.id == this.$route.params.dynamicid) {
      //       this.news = value
      //     }
      //   })
      // } else if (this.$route.params.cate == 'news') {
      //   this.newedNewsList.forEach((value, index) => {
      //     if (value.id == this.$route.params.dynamicid) {
      //       this.news = value
      //     }
      //   })
      // }

    },
    name: "dynamic-detail",
    data() {
      return {
        news:{}   //详细动态
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
  .dynamic-detail{
    .weui-panel{
      padding: 10px 5px;
    }
    .detail_title{
      font-size: .9rem;
      width:100%;
      display:block;
      text-align: center;
      font-weight: 400;
      margin-bottom: .8em;
    }
    .detail_date{
      font-size: .7rem;
      color:#999;
      margin-bottom: 1rem;
    }
  }
</style>
