<template>
  <div class="party">
    <img src="../common/image/bg.png" class="ximg-bg">
    <div class="party_name">{{department.title}}</div>
    <div class="party_descript">{{department.desc}}</div>
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
      let id = window.localStorage.getItem('department')
      
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
  .ximg-bg{
    width: 100%;
    height: 6rem;
    margin-bottom: 1rem;
  }
  .party_name{
    font-size: 1rem;
    margin-bottom: 1.2rem;
    text-align: center;
  }
  .party_descript{
    font-size: .7rem;
    color: #999999;
    line-height: .8rem;
    padding: 0 1rem;
    text-indent: 2em;
  }
}
</style>
