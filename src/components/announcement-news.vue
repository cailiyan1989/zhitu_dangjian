<template>
    <div class="announcement-cate">
      <div class="tab">
        <tab :line-width=2 active-color='#fc378c' v-model="index">
          <tab-item class="vux-center" :selected="selected === item" v-for="(item, index) in list" @on-item-click="handler(item)" :key="index">{{item}}</tab-item>
        </tab>
      </div>
      <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
  import {  Tab, TabItem, } from 'vux'
  import { mapState } from 'vuex'

  const list = () => ['党政政策', '先锋事迹', '办事指南', '工作监办','民主评议']
  export default {
    components:{
      Tab,
      TabItem,
    },
    data() {
      return {
        list: list(),
        selected: '',
        index: 0
      }
    },
    name: "announcement-news",
    computed: {
      ...mapState({
        direction: state => state.common.direction
      }),
    },
    watch:{
      $route(to, from) {
        if (to.query.status == 'policy') {
          this.selected = '党政政策'
        }
      }
    },
    created() {
      let currentSelected = this.$route.query.status;
      if (currentSelected == 'policy') {
        this.selected = '党政政策'
      } else if (currentSelected == 'deeds') {
        this.selected = '先锋事迹'
      } else if (currentSelected == 'guide') {
        this.selected = '办事指南'
      } else if (currentSelected == 'jobs') {
        this.selected = '工作监办'
      } else if (currentSelected == 'democracy') {
        this.selected = '民主评议'
      }
    },
    methods: {
      handler: function (item) {
        this.selected = item
        let path = this.$route.path;

        if (item == "党政政策") {
          if (this.$route.params.status) {
            this.$router.replace({ name: 'Status', params: { status: this.$route.params.status} });
          } else {
            this.$router.replace(`${path}?status=policy`)
          }
        } else if (item == '先锋事迹') {
          if (this.$route.params.status) {
            this.$router.replace({ name: 'Status', params: { status: this.$route.params.status} });
          } else {
            this.$router.replace(`${path}?status=deeds`)
          }
        } else if (item == '办事指南') {
          if (this.$route.params.status) {
            this.$router.replace({ name: 'Status', params: { status: this.$route.params.status} });
          } else {
            this.$router.replace(`${path}?status=guide`)
          }
        } else if (item == '工作监办') {
          if (this.$route.params.status) {
            this.$router.replace({ name: 'status', params: { status: this.$route.params.status} });
          } else {
            this.$router.replace(`${path}?status=jobs`)
          }
        } else if (item == '民主评议') {
          if (this.$route.params.status) {
            this.$router.replace({ name: 'Status', params: { status: this.$route.params.status} });
          } else {
            this.$router.replace(`${path}?status=democracy`)
          }
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/center.less';
  .announcement-cate{
    margin-top: 2.3rem;
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
      margin-top: -2.3rem;
    }
  }
</style>
