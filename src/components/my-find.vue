<template>
  <div class="myFind">
    <div v-show="!userFindsTotal" class="showNull">
      <span>暂时没有数据。。。</span>
    </div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="myID">
      <swipeout>
        <transition v-for="(item,index) in workList" :key="index" name="custom-classes-transition" leave-active-class="vux-pop-out">
          <swipeout-item transition-mode="follow" :class="{'item-hide':item.deleteMsg}">
            <div slot="right-menu">
              <swipeout-button @click.native="deleteItem(item)" type="warn">删除</swipeout-button>
            </div>
            <div slot="content" class="find_list" :key="index">
              <div class="find_user"><img src="../common/image/head.png" alt=""></div>
              <div class="find_list_content">
                <div class="list_header">
                  <span class="list_poster">{{username}}</span>
                  <span class="list_date">{{item.create_time|fmtDate}}</span>
                </div>
                <div class="list_body">
                  <div class="list_title">{{item.content}}</div>
                  <div class="list_imgs">
                    <img v-for="(src,index) of item.img"  :src="imgBase+src.slice(16)" alt="" :key="index">
                  </div>
                </div>
                <div class="list_footer">
                  <div class="like">
                    <i class="iconfont" :class="item.is_like?'icon-dianzanjihuob':'icon-dianzanb'" @click="liking(item)"></i>
                    <span>{{item.like || 0}}</span>
                  </div>
                  <div class="comment">
                    <i class="iconfont icon-liaotian" @click="commented(item)"></i>
                    <!-- <span>{{item.comments || 0}}</span> -->
                    <div v-transfer-dom>
                      <popup v-model="isComment" position="bottom" height="50%" should-scroll-top-on-show>
                        <group class="postComment">
                          <x-input class="postMsg weui-vcode" placeholder="评论" v-model="postMessages" @on-enter="submit(clickedComment)" ref="postmessage">
                            <x-button slot="right" @click.native="submit(clickedComment)" :show-loading="showLoading" plain type="primary" mini>发送</x-button>
                          </x-input>
                        </group>
                        <div class="comment-title">评论专区</div>
                        <group class="commentMsg">
                          <cell v-for="(comment, index) in currentComments" :key="index" :title="comment.realname" align-items="flex-start" :value="item.create_time">
                            <p slot="after-title" class="vux-label-desc">{{comment.content}}</p>
                          </cell>
                        </group>
                      </popup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </swipeout-item>
        </transition>
      </swipeout>
    </v-scroll>
  </div>
</template>

<script>
  import VScroll from './pull-refresh'
  import { Swipeout, SwipeoutItem, SwipeoutButton, TransferDom,  Popup, Group, Cell, XButton, XInput } from 'vux'
  import api from '../fetch/api'
  import { mapGetters } from 'vuex'
  import {fmtDate} from '../filters/date.js'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Popup,
      Group,
      Cell,
      XButton,
      XInput,
      VScroll
    },
    computed: {
      ...mapGetters([
        'userLists',
        'userFindsTotal',

        'commentList',

        'errorTaskMsg',

        'scrollTop'
      ])
    },
    watch: {
      errorTaskMsg: function (value) {
        this.$vux.toast.text(value,'middle')
      },
      userLists: function (value) {
        this.workList = value
      },
      commentList: function (val) {
        this.currentComments = val
      }
    },
    name: "my-find",
    data() {
      return {
        username:'',
        counter: 1, //当前页
        num: 10, //一页显示多少条数据，
        workList: [], //下拉更新数据存放数组
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        isComment:false,
        currentComments: [],
        showLoading:false,
        postMessages:'',
        imgBase:'http://yf.ztemap.com:8091/',
        clickedComment:null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.box = this.$el.querySelector('#myID')
        this.box.addEventListener('scroll', this.handler, false)
      })
    },
    beforeDestroy() {
      this.box.removeEventListener('scroll', this.handler, false)
    },
    activated() {
      setTimeout(() => {
        this.box.scrollTop = this.scrollTop
      }, 100)
      this.$store.dispatch('getUserList')

      this.username =window.localStorage.getItem('username');
    },
    filters: {
      fmtDate(time) {
        let date = new Date(time)
        return fmtDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {
      handler() {
        this.box = document.querySelector('#myID')
        // console.log(this.box.scrollTop)
        this.$store.dispatch('updatePosition', this.box.scrollTop)
      },
      onRefresh(done) {
        this.$store.dispatch('getUserList');
        this.counter = 1;
        done(); // call done
      },
      onInfinite(done) {
        this.counter++;
        let end = this.num * this.counter;
        let i = end - this.num;
        let more = this.$el.querySelector('.load-more')
        // this.$store.dispatch('getTaskTimeList',{ page: this.counter });
        this.$store.dispatch('getUserList', { page: this.counter }).then(() => {
          // if (res.code == 1) {
          for (i; i < end; i++) {
            if (i >= this.findsTotal) {
              more.style.display = 'none'; //隐藏加载条
              //走完数据调用方法
              this.scrollData.noFlag = true;
              break;
            } else {
              // let newIndex = i%10
              // if(res.data.data.length!==0){
              //     this.workList.push(res.data.data[newIndex])
              // }
              //  console.log(newIndex)
              // res.data.data.forEach((value, index) => {
              //     if (this.workList.indexOf(value) == -1) {
              //         this.workList.push(value)
              //     }
              //     console.log(this.workList.indexOf(value))
              // })
              more.style.display = 'none'; //隐藏加载条
            }
          }
        })

        done();
      },
      liking(item){
        item.is_like = !item.is_like
        if (item.is_like) {
          this.$vux.toast.text('已点赞', 'middle')
          if(!item.like) {
            item.like = 1
          } else {
            item.like = Number(item.like) + 1
          }
        } else {
          this.$vux.toast.text('已取消', 'middle')
          item.like = Number(item.like) - 1
        }

        let author_uid = window.localStorage.getItem('user')
        api.isLiking({id: item.id, author_uid: author_uid}).then(res => {
          // item.like = res.data[0].like
        })
      },
      commented(item) {
        this.isComment = true

        this.clickedComment = item.id

        this.$store.dispatch('getCommentList',{id: item.id});
      },
      deleteItem(item) {
        //请求接口
        // console.log(item.deleteMsg + '+++++++++')
        api.delete_myFind({ id: item.id }).then(res => {
          if (res.code == 1) {
            item.deleteMsg = true;

            this.$store.dispatch('getUserList');
            this.counter = 1;
          } else {
            this.$vux.toast.text(res.msg, 'middle')
          }
        })
        // const _this = this
        // this.$vux.confirm.show({
        //     title: '操作提示',
        //     content: '确认删除吗？',
        //     onConfirm() {
        //         //请求接口

        //         _this.$vux.toast.show({
        //             text: '删除成功',
        //         })
        //     }
        // })

      },
      submit(commentid) {
        if (this.postMessages == '') {
          this.$vux.toast.text('请发表评论', 'middle')
        } else {
          const _this = this

          _this.showLoading = true

          let data = {
            realname: '党员',
            content: _this.postMessages
          }

          let author_uid = window.localStorage.getItem('user')
          api.add_comment({id: commentid, author_uid: author_uid, comment:_this.postMessages}).then(res => {
            if(res.code == 1) {
              _this.showLoading = false

              // _this.currentComments.push(data)

              _this.isComment = false

              _this.postMessages = ''
            } else {
              this.$vux.toast.text(res.msg, 'middle')
              _this.showLoading = false
            }
          }).catch(error => {

          })
        }
      }
    }
  }
</script>

<style lang="less">
.myFind{
  font-size: .7rem;
  /*padding-top: 2.3rem;*/
  /*padding-bottom: 2rem;*/
  .yo-scroll {
    top: 3.3rem;
  }
  .showNull {
    text-align: center;
    line-height: 3.5rem;
    display: flex;
    &:before {
      content: '';
      display: inline-block;
      width: 5rem;
      height: 3rem;
      background-size: 70% !important;
      /*background: url(../common/images/nodata.gif) no-repeat center;*/
    }
  }
  .find_list{
    width: 100%;
    background: #fff;
    margin-bottom: 10px;
    position: relative;
    display: flex;
    padding: .2rem 1rem;
    box-sizing: border-box;
    overflow: hidden;
    &:after{
      content:'';
      position: absolute;
      left:0;
      right:0;
      bottom: 0;
      height: 1px;
      color:rgb(217, 217, 217);
      transform-origin: 0px 100% 0px;
      transform: scaleY(0.5);
      border-bottom: 1px solid rgb(217, 217, 217);
    }
    .find_user{
      width: 2rem;
      height: 2rem;
      margin-right: .5rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .find_list_content{
      flex: 1;
    }
    .list_header{
      width: 100%;
      height: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list_date{
        color:#999999;
        font-size: .7rem;
      }
    }
    .list_body{
      width: 100%;
      height: auto;
      margin-bottom: .5rem;
      .list_title{
        width: 100%;
        margin-bottom: .5rem;
      }
      .list_imgs{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        img{
          width: 30%;
          height: 4rem;
          margin-right: .3rem;
          margin-bottom: .3rem;
        }
      }
    }
    .list_footer{
      width: 100%;
      display: flex;
      align-items: center;
      .like,
      .comment{
        display: flex;
        align-items: center;
        i{
          font-size: 1rem;
          margin-right: .7rem;
          z-index: 10;
          color:red
        }
      }
      .like{
        margin-right: 2rem;
      }
    }
  }
}
.vux-popup-dialog{
    background-color: #fff !important;
    border-top-left-radius:.4rem;
    border-top-right-radius: .4rem;
    .weui-cells {
      margin: 0;
      font-size: .8rem;
    }
    .postComment{
      box-sizing: border-box;
      position: absolute;
      top: .5rem;
      width: 100%;
      box-shadow: 0px -3px 10px #333;
      background: #fff;
      border-top-left-radius: .4rem;
      border-top-right-radius: .4rem;
      z-index: 10;
      .weui-cells {
        border-top-left-radius: .4rem;
        border-top-right-radius: .4rem;
      }
    }
    .comment-title{
      font-size: .7rem;
      position: absolute;
      top:3.5rem;
      left:.7rem;
      right:0;
      z-index: 100;
    }
    .commentMsg{
      position: absolute;
      top:4.5rem;
      right: 0;left:0;
      bottom:.5rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .vux-label {
      font-size: .8rem;
      color: #000;
    }
    .vux-label-desc,
    .weui-cell__ft {
      font-size: .7rem;
    }
  }
</style>
