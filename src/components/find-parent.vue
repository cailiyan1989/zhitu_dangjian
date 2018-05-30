<template>
  <div class="find_parent">
    <div class="userBox">
      <x-img :src="src" :webp-src="`${src}?type=webp`" class="ximg-bg" :offset="-100" container="#vux_view_box_body"></x-img>
      <router-link tag="div" class="userImg" to="/find/my/all">
        <!--<div class="name">admin</div>-->
        <div class="user">
          <img src="../common/image/head.png" class="img-user">
        </div>
      </router-link>
    </div>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { XImg } from 'vux'
  import { mapState } from 'vuex'
  export default {
    components: {
      XImg
    },
    name: "find-parent",
    computed: {
      ...mapState({
        direction: state => state.common.direction
      }),
    },
    data() {
      return {
        src: require('../common/image/findBg.png')
      }
    }
  }
</script>

<style lang="less">
.find_parent{
  .userBox{
    width: 100%;
    .ximg-bg{
      width: 100%;
      height: 5rem;
    }
    .userImg{
      z-index: 2;
      display: flex;
      justify-content: flex-end;
      padding-right: 1rem;
      box-sizing: border-box;
      transform: translateY(-1.6rem);
      .name{
        /*color:#fff;*/
        font-size: .8rem;
        margin-right: .4rem;
      }
      .user{
        height: 2rem;
        width: 2rem;
        padding: 2px;
        display: flex;
        align-items: center;
        border:1px solid rgb(217, 217, 217);
        box-sizing: border-box;
        background: #fff;
        .img-user{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
