<template>
  <div class="party">
    <div class="ximg-bg">
      <img src="../common/image/danghui@2x.png">
    </div>
    <div class="party_name">{{department.title}}</div>
    <div class="party_descript" v-html="department.desc"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'branch',

        'errorMemberMsg'
      ])
    },
    watch: {
      branch: function (val) {
        this.department = val
      },
      errorMemberMsg: function(val) {
        this.$vux.toast.text(val,'middle')
      }
    },
    created() {
      // let id = window.localStorage.getItem('department')
      
      // this.$store.dispatch('getBranchInfo', {id: id})
    },
    activated() {
      this.department = {}

      let id = this.$route.params.partyid
      this.$store.dispatch('getBranchInfo', {id: id})
    },
    name: "party-branch",
    data() {
      return {
        department:{},
        // src: require('../common/image/bg.png'),
      }
    }
  }
</script>

<style lang="less">
.party{
  width: 100%;
  height: 100% ;
  background: url('../common/image/zhibu.png') no-repeat;
  background-size: 100% 100%;
  .ximg-bg{
    display: flex;
    padding: 1.26rem 0 .512rem;
    justify-content: center;
    img{
      width: 1.408rem;
      height: 1.408rem;
    }
  }
  .party_name{
    font-size: 1.06rem;
    padding: 0 2.005rem;
    margin-bottom: 2.688rem;
    text-align: center;
  }
  .party_descript{
    font-size: .7rem;
    color: #000;
    line-height: .9rem;
    padding: 0 2.005rem;;
    // text-indent: 2em;
  }
}
</style>
