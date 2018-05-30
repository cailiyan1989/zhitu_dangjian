<template>
  <div class="dynamic">
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

  const list = () => ['党政公告', '党员学习', '百姓心声', '消息通知']
  export default {
    components: {
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
    name: "dynamic",
    computed: {
      ...mapState({
        direction: state => state.common.direction
      }),
    },
    watch: {
      $route(to, from) {
        if (to.query.category == "notice") {
          this.selected = "党政公告"
          this.index = 0
        }else if (to.query.category == "learn") {
          this.selected = "党员学习"
          this.index = 1
        } else if (to.query.category == "people") {
          this.selected = "百姓心声"
          this.index  =2
        } else if (to.query.category == "news") {
          this.selected = "消息通知"
          this.index = 3
        }
      }
    },
    created() {
      let currentSelected = this.$route.query.category;
      if (currentSelected == 'notice') {
        this.selected = "党政公告"
      } else if (currentSelected == 'learn') {
        this.selected = "党员学习"
      } else if (currentSelected == 'people') {
        this.selected = "百姓心声"
      } else if (currentSelected == 'news'){
        this.selected = '消息通知'
      }
    },
    methods: {
      handler: function (item) {
        this.selected = item
        let path = this.$route.path;
        if (item == "党政公告") {
          if (this.$route.params.category) {
            this.$router.replace({ name: 'Status', params: { category: this.$route.params.category} });
          } else {
            this.$router.replace(`${path}?category=notice`)
          }

        } else if (item == "党员学习") {
          if (this.$route.params.category) {
            this.$router.replace({ name: 'Status', params: { category: this.$route.params.category} });
          } else {
            this.$router.replace(`${path}?category=learn`)
          }

        } else if (item == "百姓心声") {
          if (this.$route.params.category) {
            this.$router.replace({ name: 'Status', params: { category: this.$route.params.category} });
          } else {
            this.$router.replace(`${path}?category=people`)
          }

        } else if (item == '消息通知') {
          if (this.$route.params.category) {
            this.$router.replace({ name: 'Status', params: { category: this.$route.params.category} });
          } else {
            this.$router.replace(`${path}?category=news`)
          }
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/center.less';
  .dynamic{
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
