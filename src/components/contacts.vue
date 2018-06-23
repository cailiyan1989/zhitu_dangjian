<template>
    <div class="contact">
      <!-- <search
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        auto-scroll-to-top
        @on-submit="onSubmit"
        ref="search"></search> -->
      <div v-if="showLoading">
        <load-more tip="正在加载"></load-more>
      </div>
      <group>
        <cell :title="item.title" v-for="(item,index) of partys" :key="index" :link="{name:'Personnel',params:{partyid:item.id}}" v-if="item.title">
          <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../common/image/logo.jpg">
        </cell>
      </group>
    </div>
</template>

<script>
  import { Search, Group, Cell, LoadMore} from 'vux'
  import { mapGetters } from 'vuex'
  import _ from 'lodash';
  export default {
    components: {
      Search,
      Group,
      Cell,
      LoadMore
    },
    computed: {
      ...mapGetters([
        'isLoaded',
        'partysList',
        // 'searchInfo',

        'errorContactMsg'
      ])
    },
    created() {
      this.$store.dispatch('getPartyList')
    },
    activated() {
      this.value = ''
      this.results = []
      this.searchInfo = []
      this.partys = this.partysList
    },
    watch: {
      isLoaded:function(val) {
        this.showLoading = val
      },
      partysList: function (val) {
        this.partys = val
      },
      // searchInfo: function (val) {
      //   val.forEach(item => {
      //     this.results.push({
      //       title: item.username,
      //       id: item.id
      //     })
      //   })
      // },
      errorContactMsg: function(val) {
        this.$vux.toast.text(val,'middle')
      }
    },
    methods: {
      resultClick (item) {
        
       this.$router.push({name:'PersonInfos',params:{personid:item.id}});
      },
      getResult :_.debounce(function(val) {
        this.results = []

        if (val !== '') {
          this.$store.dispatch('getSearchInfo', {con: val})
        }  
      }, 500) ,
      onSubmit () {
        this.$refs.search.setBlur()
        
        // this.$store.dispatch('getPersonalList', {id: this.value})
      },
    },
    data() {
      return {
        results: [],//搜索结果
        value:'',//输入neirong
        partys:[],//党支部,
        showLoading: ''
      }
    },
    name: "contacts"
  }
</script>

<style lang="less">
.contact{
  font-size: .7rem;
  .weui-cell{
    &::before{
      display: none;
    }
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      border:1px solid #d9d9d9;
      color:#d9d9d9;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
      right: .75rem;
      left: .75rem;
    }
    .vux-label{
      font-size: .7rem
    }
  }
  .weui-search-bar__box{
    padding: 0 1.5rem;
  }
  .weui-icon-search{
    font-size: .7rem
  }
  .weui-search-bar__box{
    .weui-icon-search{
      line-height: 1.4rem;
    }
    .weui-search-bar__input{
      font-size:.7rem;
    }
    .weui-icon-clear{
      line-height: 1.4rem;
    }
  }
  .weui-search-bar__label span{
    font-size: .7rem
  } 
  .weui-search-bar__cancel-btn{
    line-height: 1.4rem;
  }
  
}
</style>
