<template>
<div class="personal">
  <group>
    <cell v-for="(item,index) of lists" :key="index" :title="item.realname" :inline-desc="item.job">
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
        'personalList',

        'errorContactMsg'
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
      errorContactMsg: function(val) {
        this.$vux.toast.text(val,'middle')
      }
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
  .vux-label{
    font-size: .7rem;
  }
}
</style>
