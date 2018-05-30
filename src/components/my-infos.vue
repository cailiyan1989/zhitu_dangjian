<template>
    <div class="my-infos">
      <group>
        <cell title="头像" :isLink="isadmin == (users.id) ? true:false" class="headImg">
          <div class="show">
            <div class="picture" :style="'backgroundImage:url('+headerImage+')'">
            </div>
            <!--<span v-else>上传头像</span>-->
            <input type="file" accept="image" @change="change" :disabled="isadmin == (users.id) ? false:true" style=" position: absolute;
                                                                                                    left: 0; top:0;width:100%;height:100%;opacity: 0;">
          </div>
        </cell>
        <cell title="姓名" :value="users.realname"></cell>
        <cell title="性别" :value="users.sex|filterSex"></cell>
      </group>
      <group>
        <cell title="所在公司" :value="users.company"></cell>
        <cell title="岗位" :value="users.job"></cell>
        <cell title="所在党支部" :value="users.title"></cell>
        <cell title="政治面貌" :value="users.political|filterStatus"></cell>
        <cell title="手机号" :value="users.mobile"></cell>
        <cell title="邮箱" :value="users.email"></cell>
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
  import {Group, Cell, TransferDom, Popup} from 'vux'
  import Cropper from 'cropperjs'//上传头像插件
  import { mapGetters } from 'vuex'
  import api from '../fetch/api'
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
        if (value == 0) {
          return '女'
        } else if (value == 1) {
          return '男'
        }
      },
      filterStatus(value) {
        if(value == 1) {
          return '党员'
        } else if (value == 2) {
          return '预备党员'
        } else if (value == 3) {
          return '共青团员'
        } else if (value == 4) {
          return '群众'
        }
      }
    },
    computed: {
      ...mapGetters([
        'otherInfo',
        'errorMemberMsg'
      ])
    },
    watch: {
      errorMemberMsg: function (value) {
        this.$vux.toast.text(value, 'middle')
      },
      otherInfo: function (val) {
        this.users = val[0]
      },
    },
    activated() {
      this.users = []

      let userid = this.$route.params.personid

      this.$store.dispatch('getOtherInfo', {id: userid})
    },
    created() {
      this.isadmin = window.localStorage.getItem('user')

      // let id = this.$route.params.personid
      // this.$store.dispatch('getOtherInfo', {id: id})
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
    name: "my-infos",
    data() {
      return {
        //上传头像字段
        users:{},
        headerImage: require('../common/image/head.png'),
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        url: '',
        isadmin:''
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
  .my-infos{
    .headImg {
      .show {
        width: 2rem;
        height: 2rem;
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
    }
    .weui-cell__ft{
      font-size: .6rem;
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
