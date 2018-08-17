<template>
  <div class="find" @click.stop="findClick">
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
              <span class="list_date">{{item.create_time | fmtDate}}</span>
            </div>
            <div class="list_body">
              <div class="list_title">{{item.content}}</div>
              <div class="list_imgs" v-show="item.thumbs" v-viewer>
                <div class="previewer-demo-img" v-for="(src,i) of item.thumbs" :key="i">
                  <img  :src="src" alt="">
                </div>
              </div>
              <div class="commonbutton">
                <div class="button_right">
                  <svg class="button_svg" @click.stop="showDiscuss(item)">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use>
									</svg>

                  <div class="discuss" v-if="item.criticism" :class="{discusshow : item.reviewshow, discusshide : item.reviewhide}">
                    <div @click.stop="supportThing(item)" >
                      <svg fill="#fff" :class="{surportdiv : likediv}">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#like"></use>
                      </svg>
                      <span ref="suporttext">{{item.is_like | fmtHtml}}</span>
                    </div>
                    <div @click.stop="criticismThing(item)">
                      <svg fill="#fff">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#discuss"></use>
                      </svg>
                      <span>评论</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="list_footer">
              <div class="retext" v-show="item.likers || item.comment">
                <svg class="retext_trigon" fill="#efefef">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon"></use>
                </svg>

                <div class="retext_like clear" :class="{likeborder: item.comment.length > 0}" v-show="item.likers">
                  <svg class="retext_like_svg" fill="#8792b0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#like"></use>
                  </svg>
                  <span v-for="(name, i) of [item.likers]" :key="i">{{name}}<i>,</i> </span>
                </div>

                <div class="retext_revert" v-show="item.comment.length > 0">
                  <ul>
                    <li v-for="(value, index) of item.comment" :key="index" @click.stop="replySend(value)">
                      <span>{{value.realname}}</span>：{{value.content}}
                    </li>
                  </ul>
                </div>
              </div>
              <!-- <div class="like">
                <i class="iconfont" :class="item.is_like ? 'icon-like' : 'icon-aixin'"  @click="liking(item)"></i>
                <span>{{item.like || 0}}</span>
              </div>
              <div class="comment">
                <i class="iconfont icon-pinglun" @click="commented(item)"></i>
                <span>{{item.comments || 0}}</span>
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
              </div> -->
            </div>
          </div>
        </div>
      </template>
    </v-scroll>
    <div class="overplay" @click.stop="hideCriticism" v-if="criticismstate"></div>
    <section class="criticism" v-if="criticismstate">
      <div class="criticism_con">
        <textarea name="" id="" cols="30" rows="10" ref="textinput" v-model="postMessages" @input="inputCriticism" @keyup.enter="enterThing"></textarea>
        <span :class="{notempty:changeinput}" @click.stop="commentSend">发送</span>
      </div>
    </section>
    <router-link tag="div" to="/find/my/add" class="create_find">
      <!-- <div></div> -->
      <i class="add"><img src="../common/image/comment.png" alt=""></i>
    </router-link>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
import VScroll from "./pull-refresh";
import {
  TransferDom,
  Popup,
  Group,
  Cell,
  XButton,
  XInput,
  LoadMore
} from "vux";
import { mapGetters } from "vuex";
import api from "../fetch/api";
import { fmtDate } from "../filters/date.js";
import { clearTimeout, setTimeout } from "timers";
import { EHOSTUNREACH } from "constants";
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
      "isLoaded",
      "findsLists",
      "findsTotal",

      "commentList",

      "errorTaskMsg",

      "scrollTop"
    ])
  },
  watch: {
    isLoaded: function(val) {
      this.loading = val;
    },
    errorTaskMsg: function(value) {
      this.$vux.toast.text(value, "middle");
    },
    findsLists: function(value) {
      this.workList = value;
      this.copyList = new Array(value.length);
    },
    commentList: function(val) {
      this.currentComments = val;
    },
    workList: function(val) {
      val.forEach(item => {
        item.criticism == true;
      });
    }
  },
  data() {
    return {
      userId: "",
      username: "",
      // src: require('../common/image/findBg.png'),
      counter: 1, //当前页
      num: 10, //一页显示多少条数据，
      workList: [], //下拉更新数据存放数组
      copyList: [], //标识数组
      scrollData: {
        noFlag: false //暂无更多数据显示
      },
      timer: null,
      timers: null, //点赞定时器
      likediv: false, //点击svg图放大
      isComment: false,
      currentComments: [],
      showLoading: false,
      postMessages: "",
      changeinput: false, //控制发送按钮状态的改变
      criticismstate: false, //评论显隐
      itemlist: {}, //当前点击的动态信息
      imgBase: "http://yf.ztemap.com:8091/",
      clickedComment: null,
      loading: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.box = this.$el.querySelector("#findsID");
      this.box.addEventListener("scroll", this.handler, false);
    });
  },
  beforeDestroy() {
    this.box.removeEventListener("scroll", this.handler, false);
    clearTimeout(this.timer);
    clearTimeout(this.timers);
  },
  activated() {
    setTimeout(() => {
      this.box.scrollTop = this.scrollTop;
    }, 100);
    this.$store.dispatch("getFindsList");

    this.username = window.localStorage.getItem("username");
    this.userId = window.localStorage.getItem("user");
  },
  filters: {
    fmtDate(time) {
      let arr = time.split(/[- / :]/);
      let date = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);

      let publishTime = Date.parse(date) / 1000;
      let timeNow = Date.now() / 1000;

      let d = timeNow - publishTime,
        d_days = parseInt(d / 86400),
        d_hours = parseInt(d / 3600),
        d_minutes = parseInt(d / 60),
        d_seconds = parseInt(d);

      if (d_days > 0 && d_days < 3) {
        return d_days + "天前";
      } else if (d_days <= 0 && d_hours > 0) {
        return d_hours + "小时前";
      } else if (d_hours <= 0 && d_minutes > 0) {
        return d_minutes + "分钟前";
      } else if (d_seconds < 60) {
        if (d_seconds <= 0) {
          return "刚刚";
        } else {
          return d_seconds + "秒前";
        }
      } else if (d_days >= 3 && d_days < 30) {
        return fmtDate(publishTime, "MM-dd");
      } else if (d_days >= 30) {
        return fmtDate(publishTime, "yyyy-MM-dd");
      }
    },
    fmtHtml(val) {
      if (val) {
        return "取消";
      } else {
        return "赞";
      }
    }
  },
  methods: {
    handler() {
      this.box = document.querySelector("#findsID");
      // console.log(this.box.scrollTop)
      this.$store.dispatch("updatePosition", this.box.scrollTop);
    },
    onRefresh(done) {
      this.$store.dispatch("getFindsList");
      this.counter = 1;
      done(); // call done
    },
    onInfinite(done) {
      this.counter++;
      let end = this.num * this.counter;
      let i = end - this.num;
      let more = this.$el.querySelector(".load-more");
      // this.$store.dispatch('getTaskTimeList',{ page: this.counter });
      this.$store.dispatch("getFindsList", { page: this.counter }).then(() => {
        // if (res.code == 1) {
        for (i; i < end; i++) {
          if (i >= this.findsTotal || end >= this.findsTotal) {
            more.style.display = "none"; //隐藏加载条
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
            more.style.display = "none"; //隐藏加载条
          }
        }
      });

      done();
    },
    // liking(item){
    //   item.is_like = !item.is_like

    //   if (item.is_like) {
    //     this.$vux.toast.text('已点赞', 'middle')
    //     if(!item.like) {
    //       item.like = 1
    //     } else {
    //       item.like = Number(item.like) + 1
    //     }
    //   } else {
    //     this.$vux.toast.text('已取消', 'middle')
    //     item.like = Number(item.like) - 1
    //   }

    //   let author_uid = window.localStorage.getItem('user')

    //   api.isLiking({id: item.id, author_uid: author_uid}).then(res => {
    //     // item.like = res.data[0].like
    //   })
    // },
    // commented(item) {
    //   this.isComment = true

    //   this.clickedComment = item.id

    //   this.$store.dispatch('getCommentList',{id: item.id});
    // },
    // submit(commentid) {
    //   if (this.postMessages == '') {
    //     this.$vux.toast.text('请发表评论', 'middle')
    //   } else {
    //     const _this = this

    //     _this.showLoading = true

    //     let data = {
    //       realname: '党员',
    //       content: _this.postMessages
    //     }

    //     let author_uid = window.localStorage.getItem('user')
    //     api.add_comment({id: commentid, author_uid: author_uid, comment:_this.postMessages}).then(res => {
    //       if(res.code == 1) {
    //         _this.showLoading = false

    //         // _this.currentComments.push(data)

    //         _this.isComment = false

    //         _this.postMessages = ''
    //       } else {
    //         this.$vux.toast.text(res.msg, 'middle')
    //         _this.showLoading = false
    //       }
    //     }).catch(error => {

    //     })
    //   }
    // },
    commentShow(item) {
      item.criticism = true;
      item.reviewshow = true;
      item.reviewhide = false;
      item.flag = false;
      this.itemlist = item;
    },
    commentHide(item) {
      item.reviewshow = false;
      item.reviewhide = true;
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        item.criticism = false;
      }, 1000);
      item.flag = true;
      this.itemlist = {};
    },
    showDiscuss(item) {
      let i = this.workList.indexOf(item);
      this.copyList[i] = 1;
      if (item.flag) {
        this.commentShow(item);
      } else {
        this.commentHide(item);
      }
    },
    supportThing(item) {
      this.likediv = true;
      clearTimeout(this.timers);
      this.timers = setTimeout(() => {
        this.likediv = false;
      }, 200);
      this.commentHide(item);

      // let author_uid = window.localStorage.getItem('user')

      api.isLiking({ id: item.id, author_uid: this.userId }).then(res => {
        item.likers = res.data[0].likers;
        item.is_like = res.data[0].is_like;
      });
    },
    hideCriticism() {
      this.criticismstate = false;
      this.itemlist = {};
    },
    criticismThing(item) {
      this.itemlist = {};
      this.itemlist = item;
      this.criticismstate = true;
      this.$nextTick(() => {
        this.$refs.textinput.focus();
      });
      this.commentHide(item);
    },
    inputCriticism() {
      this.postMessages
        ? (this.changeinput = true)
        : (this.changeinput = false);
    },
    commentSend() {
      // let author_uid = window.localStorage.getItem('user')

      if (this.changeinput) {
        if (this.postMessages) {
          this.itemlist.comment.push({
            arc_id: this.itemlist.id,
            author_uid: author_uid,
            realname: this.username,
            content: this.postMessages
          });
        }

        api
          .add_comment({
            id: this.itemlist.id,
            author_uid: this.userId,
            comment: this.postMessages
          })
          .then(res => {
            if (res.code == 1) {
              this.criticismstate = false;
              this.postMessages = "";
              this.changeinput = false;
            } else {
              this.$vux.toast.text(res.msg, "middle");
            }
          })
          .catch(error => {});
      }
    },
    findClick() {
      this.itemlist.reviewshow = false;
      this.itemlist.reviewhide = true;
      this.timer = setTimeout(() => {
        clearTimeout(this.timer);
        this.itemlist.criticism = false;
      }, 1000);
      this.itemlist.flag = true;
    }
  }
};
</script>

<style lang="less">
.find {
  font-size: 0.7rem;
  .yo-scroll {
    top: 0;
  }
  .userBox {
    width: 100%;
    height: 8.576rem;
    position: relative;
    margin-bottom: 1.792rem;
    background: rgb(247, 247, 247);
    .ximg-bg {
      width: 100%;
      height: 100%;
    }
    .userImg {
      z-index: 2;
      display: flex;
      justify-content: flex-end;
      // padding-right: 10px;
      box-sizing: border-box;
      position: absolute;
      bottom: -1.365rem;
      right: 0.43rem;
      .name {
        color: #fff;
        font-size: 0.555rem;
        margin-right: 0.43rem;
      }
      .user {
        height: 2.73rem;
        width: 2.73rem;
        padding: 0.085rem;
        display: flex;
        align-items: center;
        border: 1px solid rgb(217, 217, 217);
        box-sizing: border-box;
        background: #fff;
        .img-user {
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
  .find_list {
    width: 100%;
    background: #fff;
    // margin-bottom: 10px;
    position: relative;
    display: flex;
    padding: 0.2rem 0.5rem;
    box-sizing: border-box;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      color: rgb(234, 234, 236);
      transform-origin: 0px 100% 0px;
      transform: scaleY(0.5);
      border-bottom: 2px solid rgb(234, 234, 236);
    }
    .find_user {
      width: 1.92rem;
      height: 1.92rem;
      margin-right: 0.256rem;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .find_list_content {
      flex: 1;
    }
    .list_header {
      width: 100%;
      height: 1.92rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 0.555rem;
      .list_poster {
        font-size: 0.6rem;
        color: rgb(240, 116, 48);
      }
      .list_date {
        color: rgb(115, 115, 115);
        font-size: 0.43rem;
      }
    }
    .list_body {
      width: 100%;
      height: auto;
      margin-bottom: 0.5rem;
      .list_title {
        font-size: 0.555rem;
        color: rgb(0, 0, 0);
        width: 100%;
        margin-bottom: 0.256rem;
      }
      .list_imgs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .previewer-demo-img {
          max-width: 30%;
          height: 4rem;
          margin-right: 0.3rem;
          margin-bottom: 0.3rem;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
      }
      .commonbutton {
        display: flex;
        justify-content: flex-end;
        .button_right {
          margin-top: 0.6826666667rem;
          position: relative;
          width: 0.93867rem;
          height: 0.64rem;
          .button_svg {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .discuss {
          position: absolute;
          width: 8.23467rem;
          height: 1.70667rem;
          background: #373b3e;
          border-radius: 3px;
          right: 1.408rem;
          top: -0.5973333333rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          div {
            width: 50%;
            float: left;
            display: flex;
            justify-content: center;
            svg {
              display: block;
              width: 0.768rem;
              height: 0.768rem;
              margin-right: 0.2133333333rem;
            }
            span {
              display: block;
              font-size: 0.55467rem;
              color: #fff;
            }
          }
          div:first-child {
            border-right: 2px solid #2f3336;
          }
          .surportdiv {
            animation: pulse 0.5s;
          }
        }
        .discusshow {
          animation: flipInX 1s 1 ease-in-out both;
        }
        .discusshide {
          animation: flipOutX 1s 1 ease-in-out both;
        }
      }
    }
    .list_footer {
      width: 100%;
      display: flex;
      align-items: center;
      .retext {
        margin-top: 0.128rem;
        width: 100%;
        .retext_trigon {
          display: block;
          width: 0.8rem;
          height: 0.4rem;
          margin-left: 0.4266666667rem;
        }
        .retext_like {
          background: #efefef;
          padding: 0.3413333333rem;
          .retext_like_svg {
            float: left;
            width: 0.512rem;
            height: 0.512rem;
            margin-right: 0.2133333333rem;
            margin-top: 0.064rem;
          }
          span {
            float: left;
            margin-right: 0.2133333333rem;
            font-size: 0.512rem;
            color: #8792b0;
          }
          span:last-child {
            font-size: 0.512rem;
            color: #8792b0;
            i {
              display: none;
            }
          }
        }
        .likeborder {
          border-bottom: 1px solid #e2e2e2;
        }
        .retext_revert {
          background: #efefef;
          ul {
            padding: 0.3413333333rem;
            li {
              border: 0;
              padding-bottom: 0.1rem;
              font-size: 0.55467rem;
              color: #333;
              span {
                display: inline-block;
                color: #8792b0;
              }
            }
          }
        }
      }
      .like,
      .comment {
        display: flex;
        align-items: center;
        i {
          font-size: 1rem;
          margin-right: 0.7rem;
          z-index: 10;
          color: red;
        }
      }
      .like {
        margin-right: 2rem;
      }
    }
  }
  .criticism {
    position: fixed;
    left: 0;
    z-index: 600;
    bottom: 0;
    width: 100%;
    background: #ebebeb;
    .criticism_con {
      padding: 0.5266666667rem 0.64rem;
      display: flex;
      justify-content: space-between;
      textarea {
        display: block;
        width: 12rem;
        height: 40px;
        max-height: 3.2rem;
        border: 0;
        border-bottom: 2px solid #18ae17;
        resize: none;
        font-size: 0.64rem;
        color: #333;
        line-height: 0.768rem;
        background: none;
        padding-top: 0.32rem;
        box-sizing: border-box;
      }
      span {
        display: block;
        width: 1.8rem;
        font-size: 0.55467rem;
        color: #d2d2d2;
        border: 1px solid #d7d7d7;
        text-align: center;
        border-radius: 5px;
        line-height: 1.7653333333rem;
      }
      .notempty {
        background: #18ae17;
        color: #fff;
        border-color: #3e8d3e;
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
      img {
        width: 100%;
      }
    }
  }
  .overplay {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 551;
  }
}
.vux-popup-dialog {
  background-color: #fff !important;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .weui-cells {
    margin: 0;
    font-size: 0.8rem;
  }
  .postComment {
    box-sizing: border-box;
    position: absolute;
    top: 0.5rem;
    width: 100%;
    box-shadow: 0px -2px 20px #666;
    background: #fff;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    z-index: 10;
    .weui-cells {
      border-top-left-radius: 0.4rem;
      border-top-right-radius: 0.4rem;
    }
  }
  .comment-title {
    font-size: 0.7rem;
    position: absolute;
    top: 3.5rem;
    left: 0.7rem;
    right: 0;
    z-index: 100;
  }
  .commentMsg {
    position: absolute;
    top: 4.5rem;
    right: 0;
    left: 0;
    bottom: 0.5rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .vux-label {
    font-size: 0.8rem;
    color: #000;
  }
  .vux-label-desc,
  .weui-cell__ft {
    font-size: 0.7rem;
  }
}

@keyframes flipInX {
  from {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  60% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  100% {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
}
@keyframes flipOutX {
  from {
    -webkit-transform: perspective(400px);
    transform: perspective(400px);
  }
  30% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}
@keyframes pulse {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
