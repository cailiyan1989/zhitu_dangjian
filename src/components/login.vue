<template>
  <div class="login">
    <div class="head">
      <img src="../common/image/logo.jpg" alt="">
    </div>
    <group label-margin-right="2em" label-align="right">
      <x-input title="用户名：" v-model="username" placeholder="请输入用户名" required>
        <img slot="label" style="padding-right:10px;display:block;" src="../common/image/user.png" width="24" height="24">
      </x-input>
      <x-input title="密 码：" type="password" placeholder="请输入密码" v-model="password" required>
        <img slot="label" style="padding-right:10px;display:block;" src="../common/image/mima.png" width="24" height="24">
      </x-input>
    </group>
     <x-button type="warn" :show-loading="showLoading" @click.native="login">登录</x-button>
    <flexbox justify="spaceBetweent">
      <flexbox-item>
        <div class="memory">
          <div class="check-btn">
            <input type="checkbox" class="weui-check" :checked="check">
            <i class="weui-icon-checked" @click.prevent="checkItem()"></i>
          </div>
          <div class="memory_content">记住账号</div>
        </div>
      </flexbox-item>
      <flexbox-item style="text-align: right;">
        <div class="forget">
          <i class="forget_icon"></i>
          <a @click.prevent="reset()">忘记密码?</a>
        </div>  
      </flexbox-item>
    </flexbox>
  
  </div>
</template>

<script>
  import { Group, XInput, XButton, Flexbox, FlexboxItem,} from 'vux'
  import api from '../fetch/api'
  import cookie from '../config/cookie'
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Flexbox,
      FlexboxItem,
    },
    data() {
      return {
        username:'',
        password:'',
        check: false,
        showLoading:false
      }
    },
    name: "login",
    created() {
      api.isLogin().then(res => {
        if(res.code === 1) {
          this.$store.dispatch('updateLoginStatus', {isLogin: true})
          window.localStorage.removeItem('user')
      
          window.localStorage.setItem('user', res.data.id)
      
          this.$router.replace('/home');
        } else if(res.code === 0) {
          let username = cookie.getCookie('This is username');
          this.username = username
        }
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      checkItem() {
        this.check = !this.check
        console.log(this.check)
      },
      reset() {
        if (this.username == '') {
          this.$vux.toast.text('请输入用户名', 'middle')
        } else {
          this.$vux.alert.show({
            content:'系统已为您重置了密码，30分钟内请注意查收邮箱！'
          })
        }
      },
      login() {
        if(this.username == ''){
          this.$vux.toast.text('请输入用户名', 'middle')
        } else if (this.password == ''){
          this.$vux.toast.text('请输入密码','middle')
        } else {
          const _this = this

          _this.showLoading = true

          let data = {
            'form[username]': _this.username,
            'form[password]': _this.password
          }

          if(this.check) {
            cookie.setCookie('This is username', _this.username, 7 )
          } else {
            cookie.delCookie()
          }

          api.login(data).then(res => {
            if (res.code === 1) {
              _this.showLoading=false
              _this.$store.dispatch('updateLoginStatus', { isLogin: true })
              window.localStorage.removeItem('user')

              window.localStorage.setItem('user', res.data.id)

              if (_this.$route.query.redirect) {
                _this.$router.replace(decodeURIComponent(_this.$route.query.redirect))
              } else {
                _this.$router.replace('/home')
              }

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
  .login {
    width: 100%;
    height: 100%;
    background: url('../common/image/bgd.png') no-repeat;
    background-size: 100% 100%;
    .weui-cells{
      margin: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      &::before, 
      &::after{
        display: none;
      }
    }
    .weui-cell_warn {
      color: #000;
    }
    .head {
      padding: 3.65rem 1rem 2.2875rem;
      display: flex;
      justify-content: center;
      img{
        width: 3.225rem;
        height: 3.225rem;
        border-radius: 0.375rem;
      }
    }
    .vux-x-input {
      font-size: .7rem;
      margin-bottom: 0.5625rem;
      width: 11.475rem;
      height: 1.875rem;
      box-sizing: border-box;
      border:1px solid rgb(217,213,213);
      border-radius: .1875rem
    }
    .weui-btn_warn{
      box-sizing: border-box;
      width: 11.475rem;
      height: 1.875rem;
      margin-top: 0.525rem;
      margin-bottom: 0.6375rem;
    }
    .weui-cells__title {
      margin: 0 1rem 1rem 1rem;
    }
    .vux-flexbox{
      width: 11.475rem;
      margin: 0 auto;
    }
    .vux-flexbox-item{
      font-size: .7rem;
    }
    .memory{
      display: inline-flex;
      width: 100%;
      align-items: center;
      color:rgb(102,102,102);
      font-size: 0.65rem;
      weui-cells {
        margin-top: 0;
        &:before {
          border: none;
        }
      }
      .check-btn {
        line-height: 2;
        margin-right: 5px;
      }
      .memory_content {
        flex: 1;
      }
    }
    .weui-check {
      position: absolute;
      left: -9999em;
    }
    [class^="weui-icon-"],
    [class*=" weui-icon-"] {
      display: inline-block;
      vertical-align: middle;
      font: normal normal normal 14px/1 "weui";
      font-size: inherit;
      text-rendering: auto;
    }
    .weui-check:checked+.weui-icon-checked:before {
      content: '\EA06';
      color: #09BB07;
    }
    .weui-icon-checked:before {
      content: '\EA01';
      color: #C9C9C9;
      font-size: 1rem;
      display: block;
    }
    .forget{
      display: inline-flex;
      width: 100%;
      align-items: center;
      justify-content: flex-end;
      .forget_icon{
        display: inline-block;
        width: 0.65rem;
        height: 0.65rem;
        margin-right: .4875rem;
        background: url('../common/image/wangji.png') no-repeat;
        background-size: 100% 100%;
      }
      a{
        color:rgb(102,102,102);
      }
    }
  }
</style>
