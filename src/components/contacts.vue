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
  export default {
    components: {
      Search,
      Group,
      Cell
    },
    computed: {
      ...mapGetters([
        'partysList',
        'personalList'
      ])
    },
    created() {
      this.$store.dispatch('getPartyList')
    },
    activated() {
      this.partys = this.partysList
    },
    watch: {
      partysList: function (val) {
        this.partys = val
      },
      // personalList:function (val) {
      //   this.results = val
      // }
    },
    methods: {
      resultClick (item) {
       this.$router.push({name:'PersonInfos',params:{personid:item.id}});
        console.log(item)
      },
      getResult (val) {

        this.$store.dispatch('getPersonalList', {id: val})

        this.personalList.forEach(item => {
          this.results.push({
            title: item.realname,
            other: item.id
          });
        });
        this.results = []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        
        this.$store.dispatch('getPersonalList', {id: this.value})

        this.personalList.forEach(item => {
          this.results.push({
            title: item.realname,
            other: item.id
          });
        });
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
  .weui-cell_access .weui-cell__ft:after{
    display: none;
  }
}
</style>
