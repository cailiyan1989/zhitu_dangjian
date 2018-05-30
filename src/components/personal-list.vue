<template>
<div class="personal">
  <group>
    <cell v-for="(item,index) of lists" :key="index" :title="item.realname" :inline-desc="item.job" :link="{name:'PersonInfos',params:{personid:item.id}}">
      <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../common/image/head.png">
    </cell>
  </group>
</div>
</template>

<script>
  import {Group, Cell} from 'vux'
  import { mapGetters } from 'vuex'
  export default {
    components:{
      Group,
      Cell
    },
    computed: {
      ...mapGetters([
        'personalList'
      ])
    },
    created() {
      // this.$store.dispatch('getPersonalList', {id: this.$route.params.partyid})
    },
    activated() {
      this.lists = []

      this.$store.dispatch('getPersonalList', {id: this.$route.params.partyid})
    },
    watch: {
      personalList: function (val) {
        this.lists = val
      },
      // $route (to, from) {
      //   if(/personnel/.test(to.path)){
      //     this.$store.dispatch('getPersonalList', {id: to.params.partyid})
      //   }
      // }
    },
    data() {
      return {
        lists:[]
      }
    },
    name: "personal-list"
  }
</script>

<style lang="less">
.personal{
  .weui-cell_access .weui-cell__ft:after{
    display: none;
  }
}
</style>
