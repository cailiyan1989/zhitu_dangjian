<template>
  <div class="announcement-detail">
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
  import api from '../fetch/api'
  export default {
    components:{
      Card
    },
    computed: {
      ...mapGetters([
        'policyNewsList',
        'deedsNewsList',
        'guideNewsList',
        // 'jobsNewsList',
        // 'democracyNewsList'
      ])
    },
    activated() {
      if (this.$route.params.state == 'policy') {
        this.policyNewsList.forEach((value, index) => {
          if (value.id == this.$route.params.announcementid) {
            this.news = value
          }
        })
        
        api.get_read_integral({id:this.$route.params.dynamicid}).then(res => {
          console.log(res)
        })
      } else if (this.$route.params.state == 'deeds') {
        this.deedsNewsList.forEach((value, index) => {
          if (value.id == this.$route.params.announcementid) {
            this.news = value
          }
        })

        api.get_read_integral({id:this.$route.params.dynamicid}).then(res => {
          console.log(res)
        })
      } else if (this.$route.params.state == 'guide') {
        this.guideNewsList.forEach((value, index) => {
          if (value.id == this.$route.params.announcementid) {
            this.news = value
          }
        })

        api.get_read_integral({id:this.$route.params.dynamicid}).then(res => {
          console.log(res)
        })
      }
      // else if (this.$route.params.state == 'jobs') {
      //   this.jobsNewsList.forEach((value, index) => {
      //     if (value.id == this.$route.params.announcementid) {
      //       this.news = value
      //     }
      //   })
      // } else if (this.$route.params.state == 'democracy') {
      //   this.democracyNewsList.forEach((value, index) => {
      //     if (value.id == this.$route.params.announcementid) {
      //       this.news = value
      //     }
      //   })
      // }

    },
    name: "announcement-detail",
    data() {
      return {
        news:[]   //详细动态
      }
    }
  }
</script>

<style lang="less">
.announcement-detail{
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
