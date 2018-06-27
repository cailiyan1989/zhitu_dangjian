<template>
  <div class="find">
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData" id="findsID">
      <div class="userBox">
        <img src="../common/image/banner@2x.png" class="ximg-bg">
        <router-link tag="div" class="userImg" to="/find/my/all">
          <div class="name">{{username}}</div>
          <div class="user">
            <img src="../common/image/userhead@2x.png" class="img-user">
          </div>
        </router-link>
      </div>
      <div v-show="!findsTotal" class="showNull">
        <load-more tip="正在加载" v-if="loading"></load-more>
        <span v-else>暂时没有数据。。。</span>
      </div>
      <template v-for="(item,index) in workList">
        <div class="find_list" :key="index">
          <div class="find_user"><img src="../common/image/normal-head.png" alt=""></div>
          <div class="find_list_content">
            <div class="list_header">
              <span class="list_poster">{{item.realname}}</span>
              <span class="list_date">{{item.create_time|fmtDate}}</span>
            </div>
            <div class="list_body">
              <div class="list_title">{{item.content}}</div>
              <div class="list_imgs" v-viewer>
                <div class="previewer-demo-img" v-for="(src,i) of item.images" :key="i">
                  <img  :src="src" alt="">
                </div>
              </div>
            </div>
            <div class="list_footer">
              <div class="like">
                <i class="iconfont" :class="item.is_like ? 'icon-like' : 'icon-aixin'"  @click="liking(item)"></i>
                <span>{{item.like || 0}}</span>
              </div>
              <div class="comment">
                <i class="iconfont icon-pinglun" @click="commented(item)"></i>
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
                        <cell v-for="(comment, i) in currentComments" :key="i" :title="comment.realname" align-items="flex-start" :value="comment.create_time">
                          <p slot="after-title" class="vux-label-desc">{{comment.content}}</p>
                        </cell>
                      </group>
                    </popup>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </v-scroll>
    <router-link tag="div" to="/find/my/add" class="create_find">
      <!-- <div></div> -->
      <i class="add"><img src="../common/image/comment.png" alt=""></i>
    </router-link>
  </div>
</template>

<script>
  import 'viewerjs/dist/viewer.css'
  import VScroll from './pull-refresh'
  import { TransferDom,  Popup, Group, Cell, XButton, XInput, LoadMore} from 'vux'
  import { mapGetters } from 'vuex'
  import api from '../fetch/api'
  import {fmtDate} from '../filters/date.js'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Popup,
      Group,
      Cell,
      XButton,
      XInput,
      LoadMore,
      VScroll
    },
    computed: {
      ...mapGetters([
        'isLoaded',
        'findsLists',
        'findsTotal',

        'commentList',

        'errorTaskMsg',

        'scrollTop'
      ])
    },
    watch: {
      isLoaded: function(val) {
        this.loading = val;
      },
      errorTaskMsg: function (value) {
        this.$vux.toast.text(value,'middle')
      },
      findsLists: function (value) {
        this.workList = value
      },
      commentList: function (val) {
        this.currentComments = val
      }
    },
    data() {
      return {
        username:'',
        // src: require('../common/image/findBg.png'),
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
        clickedComment:null,
        loading:''

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.box = this.$el.querySelector('#findsID')
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
      this.$store.dispatch('getFindsList')

      this.username =window.localStorage.getItem('username');
    },
    filters: {
      fmtDate(time) {
        let arr = time.split(/[- / :]/);
        let date = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        
        let publishTime = Date.parse(date)/1000;
        let timeNow = Date.now()/1000;

        let d = timeNow - publishTime,
          d_days = parseInt(d / 86400),
          d_hours = parseInt(d / 3600),
          d_minutes = parseInt(d / 60),
          d_seconds = parseInt(d);

        if (d_days > 0 && d_days < 3) {
          return d_days + '天前';
        } else if (d_days <= 0 && d_hours > 0) {
          return d_hours + '小时前';
        } else if (d_hours <= 0 && d_minutes > 0) {
          return d_minutes + '分钟前';
        } else if (d_seconds < 60) {
          if (d_seconds <= 0) {
            return '刚刚';
          } else {
            return d_seconds + '秒前';
          }
        } else if (d_days >= 3 && d_days < 30) {
          return fmtDate(publishTime, 'MM-dd');
        } else if (d_days >= 30) {
          return fmtDate(publishTime, 'yyyy-MM-dd')
        } 
      }
    },
    methods: {
      handler() {
        this.box = document.querySelector('#findsID')
        // console.log(this.box.scrollTop)
        this.$store.dispatch('updatePosition', this.box.scrollTop)
      },
      onRefresh(done) {
        this.$store.dispatch('getFindsList');
        this.counter = 1;
        done(); // call done
      },
      onInfinite(done) {
        this.counter++;
        let end = this.num * this.counter;
        let i = end - this.num;
        let more = this.$el.querySelector('.load-more')
        // this.$store.dispatch('getTaskTimeList',{ page: this.counter });
        this.$store.dispatch('getFindsList', { page: this.counter }).then(() => {
        
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
      },
      
    }
  }
</script>

<style lang="less">
  .find{
    font-size: .7rem;
    .yo-scroll{
      top:0;
    }
    .userBox{
      width: 100%;
      height: 8.576rem;
      position: relative;
      margin-bottom: 1.792rem;
      background: rgb(247,247,247);
      .ximg-bg{
        width: 100%;
        height: 100%;
      }
      .userImg{
        z-index: 2;
        display: flex;
        justify-content: flex-end;
        // padding-right: 10px;
        box-sizing: border-box;
        position: absolute;
        bottom: -1.365rem;
        right:.43rem;
        .name{
          color:#fff;
          font-size: 0.555rem;
          margin-right: .43rem;
        }
        .user{
          height: 2.73rem;
          width: 2.73rem;
          padding: 0.085rem;
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
    .showNull {
      text-align: center;
      line-height: 3.5rem;
      display: flex;
      justify-content: center;
      // &:before {
      //   content: '';
      //   display: inline-block;
      //   width: 5rem;
      //   height: 3rem;
      //   background-size: 70% !important;
      //   /*background: url(../common/images/nodata.gif) no-repeat center;*/
      // }
    }
    .find_list{
      width: 100%;
      background: #fff;
      // margin-bottom: 10px;
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
        height: 2px;
        color:rgb(234, 234, 236);
        transform-origin: 0px 100% 0px;
        transform: scaleY(0.5);
        border-bottom: 2px solid rgb(234, 234, 236);
      }
      .find_user{
        width: 1.92rem;
        height: 1.92rem;
        margin-right: 0.256rem;
        border-radius: 50%;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .find_list_content{
        flex: 1;
      }
      .list_header{
        width: 100%;
        height: 1.92rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 0.555rem;
        .list_poster{
          font-size: 0.6rem;
          color:rgb(240,116,48);
        }
        .list_date{
          color:rgb(115,115,115);
          font-size: 0.43rem;
        }
      }
      .list_body{
        width: 100%;
        height: auto;
        margin-bottom: .5rem;
        .list_title{
          font-size: 0.555rem;
          color:rgb(0,0,0);
          width: 100%;
          margin-bottom: 0.256rem;
        }
        .list_imgs{
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .previewer-demo-img{
            max-width: 30%;
            height: 4rem;
            margin-right: .3rem;
            margin-bottom: .3rem;
            overflow: hidden;
            img{
              height: 100%;
            }
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
    .create_find {
      position: fixed;
      right: 1rem;
      bottom: 3rem;
      border-radius: 50%;
      z-index: 100;
      div {
        background-color: #fff;
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        top: 0;
        z-index: 2;
        border-radius: 50%;
      }
      i.add {
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        color: red;
        z-index: 10;
        position: relative;
        img{
          width: 100%;
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
      box-shadow: 0px -2px 20px #666;
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
