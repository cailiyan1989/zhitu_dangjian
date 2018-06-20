<template>
  <div class="member">
    <div class="headImg">
      <div class="show">
        <div class="picture" :style="'backgroundImage:url('+headerImage+')'">
        </div>
        <!--<span v-else>上传头像</span>-->
        <input type="file" accept="image" @change="change" style=" position: absolute;left: 0; top:0;width:100%;height:100%;opacity: 0;">
      </div>
      <div class="myInfo">{{myInfo.realname}} {{myInfo.sex|filterSex}}</div>
    </div>
    <group>
      <cell title="个人信息" :link="{name:'MyInfos', params:{personid: myInfo.id}}">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../common/image/geren@2x.png">
      </cell>
      <cell title="政企党支部" :link="{path:'/member/party/branch'}">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../common/image/dang@2x.png">
      </cell>
    </group>
    <group>
      <cell title="我的积分" :link="{path:'/member/my/integral'}">
        <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../common/image/jifen@2x.png">
      </cell>
      <!-- <cell title="我的考试" :link="{path:'/member/my/exam'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../common/image/kaoshi.png">
      </cell>
      <cell title="党费缴纳" :link="{path:'/member/party/fees'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../common/image/dangfei.png">
      </cell> -->
    </group>
    <!-- <group>
      <cell title="通讯录" :link="{path:'/member/contacts'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../common/image/tongxun.png">
      </cell>
    </group> -->

    <group>
      <cell title="设置" :link="{path:'/member/settings'}">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../common/image/sezhi@2x.png">
      </cell>
    </group>
    <div class="imgPopup" v-transfer-dom>
      <!-- 遮罩层 -->
      <popup class="container" v-show="panel" height="100%">
        <div class="popup">
          <img id="image" :src="url" alt="Picture">
        </div>
        <div class="operate">
          <button type="button" @click="panel=false">取消</button>
          <button type="button" @click="crop">确定</button>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
  import { Group, Cell, TransferDom, Popup } from 'vux'
  import Cropper from 'cropperjs'//上传头像插件
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Group,
      Cell,
      Popup
    },
    directives: {
      TransferDom
    },
    filters: {
      filterSex(value) {
        if (value == 1) {
          return '女'
        } else if (value == 0) {
          return '男'
        }
      }
    },
    computed: {
      ...mapGetters([
        'userInfo',

        'errorMemberMsg'
      ])
    },
    watch: {
      errorMemberMsg: function (value) {
        this.$vux.toast.text(value, 'middle')

      },
      userInfo: function (val) {
        if (val) {
          let id = window.localStorage.getItem('user')
          for (let item of val) {
            if (item.id == id) this.myInfo = item
          }
          window.localStorage.setItem('department',this.myInfo.department_id)
          window.localStorage.setItem('username', this.myInfo.username);
        }
      }
    },
    created() {
      let id = window.localStorage.getItem('user')
      this.$store.dispatch('getUserInfo', {id: id});
    },
    mounted() {
      //初始化这个裁剪框
      var self = this;
      var image = document.getElementById('image');
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        zoomable: false,
        ready: function () {
          self.croppable = true;
        }
      });
    },
    data() {
      return {
        //上传头像字段
        myInfo: '未登录',
        headerImage: require('../common/image/head.png'),
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        url: ''
      }
    },
    methods: {
      getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      change(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.panel = true;
        this.picValue = files[0];

        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if (this.cropper) {
          this.cropper.replace(this.url);
        }
        // this.panel = true;

      },
      crop() {
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        // console.log(this.cropper)
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.headerImage = roundedCanvas.toDataURL();
        this.postImg()

      },
      getRoundedCanvas(sourceCanvas) {

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        return canvas;
      },
      postImg() {
        //这边写图片的上传
      }
    }
  }
</script>

<style lang="less">
  @import '../common/style/uploadImg.less';
  .member {
    .weui-cells{
      margin-top: .7rem;
    }
    .vux-cell-bd {
      font-size: .7rem;
    }
    .weui-cell__ft {
      font-size: .7rem;
    }
    .headImg {
      width: 100%;
      height: 5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .show {
        width: 3rem;
        height: 3rem;
        overflow: hidden;
        position: relative;
        border-radius: 50%;
        border: 1px solid #d5d5d5;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .picture {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      }
      .myInfo{
        font-size: .8rem;
      }
    }
  }

  .imgPopup {
    .container {
      background: rgba(105, 105, 105, 1);
    }

    #image {
      max-width: 100%;
    }
    .popup {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: fixed;
      bottom: 0;
      background: rgba(0, 0, 0, .4);
      width: 100%;
      display: flex;
      text-align: center;
      height: 2rem;
      button {
        flex: 1;
        background: none;
        color: #fff;
        font-size: .7rem;
      }
    }
  }
</style>
