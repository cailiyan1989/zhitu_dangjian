<template>
    <div class="contact">
      <search
        @result-click="resultClick"
        @on-change="getResult"
        :results="results"
        v-model="value"
        position="absolute"
        auto-scroll-to-top
        top="46px"
        @on-submit="onSubmit"
        ref="search"></search>
      <group>
        <cell :title="item.title" v-for="(item,index) of partys" :key="index" :link="{name:'Personnel',params:{partyid:item.id}}">
          <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../common/image/logo.jpg">
        </cell>
      </group>
    </div>
</template>

<script>
  import { Search, Group, Cell} from 'vux'
  import { mapGetters } from 'vuex'
  import _ from 'lodash';
  export default {
    components: {
      Search,
      Group,
      Cell
    },
    computed: {
      ...mapGetters([
        'partysList',
        'searchInfo',

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
      partysList: function (val) {
        this.partys = val
      },
      searchInfo: function (val) {
        val.forEach(item => {
          this.results.push({
            title: item.username,
            id: item.id
          })
        })
      },
      errorContactMsg: function(val) {
        this.$vux.toast.text(val,'middle')
      }
    },
    methods: {
      resultClick (item) {
       this.$router.push({name:'PersonInfos',params:{personid:item.id}});
        // console.log(item)
      },
      getResult :_.debounce(function(val){
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
        partys:[],//党支部
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
  }
  
}
</style>
