<template>
  <div class="add-find">
    <group>
      <x-textarea :max="200" placeholder="这一刻想法..." v-model="myMessage"></x-textarea>
      <div class="weui-cells weui-cells_form" id="uploaderCustom">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderCustomFiles"></ul>
                <div class="weui-uploader__input-box">
                  <input id="uploaderCustomInput" multiple name="upimg[]" class="weui-uploader__input js_file" type="file">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </group>
    <x-button type="primary" :show-loading="showLoading" :disabled="!isClicked" @click.native="submit">发布</x-button>
  </div>
</template>

<script>
  import {Group, XTextarea, XButton } from 'vux'
  import api from '../fetch/api'
  import axios from 'axios'
  export default {
    components: {
      Group,
      XTextarea,
      XButton
    },
    activated() {
      this.myMessage = '';

      this.filesArr = [];

      this.$el.querySelector('#uploaderCustomFiles').innerHTML = '';
    },
    data() {
      return {
        myMessage: '',
        showLoading: false,
        isClicked: false,
        maxSize: 10240000,
        maxCount: 9,
        filesArr: []
      }
    },
    name: "add-find",
    mounted() {
      this.bindEvent()
    },
    watch:  {
      myMessage: function (val) {
        if(val){
          this.isClicked = true
        }
      },
      filesArr: function (val) {
        if(val) {
          this.isClicked = true
        }
        if(val.length >= this.maxCount) {
          let uploader = document.querySelector('.weui-uploader__input-box')
          uploader.style.display = 'none'
        } else {
          let uploader = document.querySelector('.weui-uploader__input-box')
          uploader.style.display = 'block'
        }
      }
    },
    methods: {
      bindEvent() {
        let self = this;
        let uploader = self.$el.querySelector('#uploaderCustomInput')

        // console.log(uploader)
        let arr =[]

        uploader.addEventListener('change', function (event) {
          let files = event.target.files;
          // 如果没有选中文件，直接返回
          if (files.length === 0) {
            return;
          }
          if(files.length >= self.maxCount) {
            self.$vux.toast.text(`最多上传${self.maxCount}张`, 'middle')
            return;
          }

          for (var i = 0; i < files.length; i++) {
            let file = files[i];
            
            for(var j = 0; j < self.filesArr.length; j++) {
              if(self.filesArr[j].name === file.name) {
                self.$vux.toast.text('不能上传同一张图片！', 'middle');
                return
              }
            }

            if (self.filesArr.length >= self.maxCount) {
              self.$vux.toast.text(`最多上传${self.maxCount}张`, 'middle')
              return;
            }

            self.filesArr.push(file)

            let reader = new FileReader();

            let uploader_files = self.$el.querySelectorAll('.weui_uploader_file')
            
            reader.onload = function (e) {
              var src = e.target.result;

              var maxWidth = 800, maxHeight = 800;
              var img = new Image();
              img.src = src;

              img.onload = function () {
                var width = img.width;
                var height = img.height;
                var shouldResize = (width > maxWidth) || (height > maxHeight);
                // if (!shouldResize) {
                //     // 无需压缩
                //     return;
                // }
                var newWidth, newHeight;
                // 等比压缩
                if (width > height) {
                    newHeight = height * (maxWidth / width);
                    newWidth = maxWidth;
                } else {
                    newWidth = width * (maxHeight / height);
                    newHeight = maxHeight;
                }

                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var w = newWidth;
                var h = newHeight;
                // 设置 canvas 的宽度和高度
                canvas.width = w;
                canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                var base64 = canvas.toDataURL(file.type);
   
                let uploaderCustomeFiles = self.$el.querySelector('#uploaderCustomFiles')

                var $preview = `<li class="weui_uploader_file weui_uploader_status" style="background-image:url(${base64})"></li>`;
                let preview = self.parseToDOM($preview)[0]

                uploaderCustomeFiles.append(preview);
                
              }
            }
            reader.readAsDataURL(file);
          }
        })
      },
      parseToDOM(str) {
        var ul = document.createElement("ul");
        if (typeof str == "string")
          ul.innerHTML = str;
        return ul.childNodes;
      },
      submit() {
        const _this = this

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        _this.showLoading = true

        let uploadData = new FormData()
        _this.filesArr.map((file) => {
          uploadData.append('upimg[]', file);
        })

        uploadData.append('form[content]',this.myMessage)

        let ax = axios.create();

        ax.post('/admin/index.php/portal/jishi/add',uploadData,config).then(res => {
          if(res.data.code === 1) {
            _this.showLoading=false

            _this.$router.replace('/find')
          } else {
            this.$vux.toast.text(res.data.msg, 'middle')
            _this.showLoading = false
          }
        })
      }
    }
  }
</script>

<style lang="less">
.add-find{
  font-size: .7rem;
  .weui-uploader__bd {
    margin-bottom: -4px;
    overflow: hidden;
  }
  .weui-cells_form .weui-cell{
    padding: .5rem .75rem;
  }
  .weui-uploader__input-box {
    float: left;
    position: relative;
    margin-bottom: .45rem;
    width: 4.4rem;
    height: 4.4rem;
    border: 1px solid #d9d9d9;
  }
  /* .weui-uploader__files{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  } */
  .weui_uploader_file {
    float: left;
    margin-right: .45rem;
    margin-bottom: .45rem;
    width: 4.5rem;
    height: 4.5rem;
    background: no-repeat center center;
    background-size: cover;
    list-style: none;
    &:nth-child(3n){
      margin-right: 0;
    }
  }

  .weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .weui-uploader__input-box:before {
    width: 2px;
    height: 1.975rem;
  }

  .weui-uploader__input-box:after {
    width: 1.975rem;
    height: 2px;
  }

  .weui-uploader__input-box:after,
  .weui-uploader__input-box:before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #d9d9d9;
  }
}
</style>
