<template>
  <div class="password">
    <group label-margin-right="2em" label-align="right">
      <x-input title="账户" v-model="username" disabled></x-input>
      <x-input title="原始密码" type="password" placeholder="必填" v-model="oldPassword" required></x-input>
      <x-input title="新的密码" type="password" placeholder="必填" v-model="newPassword" :min="8" required></x-input>
      <x-input title="确认密码" type="password" placeholder="必填" v-model="confirmPassword" :min="8" required></x-input>
    </group>
    <x-button type="primary" :show-loading="showLoading" @click.native="changePassword">完成</x-button>
  </div>
</template>

<script>
  import { Group, XInput, XButton } from 'vux'
  import {mapGetters} from 'vuex'
  import api from '../fetch/api'
  export default {
    components: {
      Group,
      XInput,
      XButton
    },
    name: "change-password",
    computed: {
      ...mapGetters([

        'errorMemberMsg'
      ])
    },
    watch: {
      errorMemberMsg: function(val) {
        this.$vux.toast.text(val,'middle')
      }
    },
    data() {
      return {
        username: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        showLoading: false//提交按钮是否加载中
      }
    },
    created(){
      this.oldPassword='',
      this.newPassword='',
      this.confirmPassword=''

      this.username = window.localStorage.getItem('username');
    },
    methods: {
      changePassword() {
        if (this.oldPassword == '') {
          this.$vux.toast.text('请输入原密码', 'middle')
        } else if (this.newPassword == '') {
          this.$vux.toast.text('请输入新密码', 'middle')
        } else if (this.confirmPassword == '') {
          this.$vux.toast.text('请确认新密码', 'middle')
        } else if (this.confirmPassword !== this.newPassword) {
          this.$vux.toast.text('两次新密码输入不一致', 'middle')
        } else {
          const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向

          _this.showLoading = true
          //请求接口
          let data = {
            'form[old]': _this.oldPassword,
            'form[password]': _this.newPassword,
            'form[repassword]': _this.confirmPassword
          }
          api.get_password_change(data).then((res) => {
            if (res.code == 1) {
              _this.oldPassword = ''
              _this.newPassword = ''
              _this.confirmPassword = ''
              
              _this.$vux.toast.show({
                text: '密码修改成功',
                onHide() {
                  _this.showLoading = false;
                  _this.$router.replace('/login')
                }
              })
            } else {
              _this.showLoading = false;
              _this.vux.toast.text(res.msg,'middle')
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .password {
    .weui-cells{
      .vux-x-input{
        &:first-child{
          color:#888;
        }
      }
    }
    .weui-label{
      width: 5em!important;
      text-align: center!important;
    }
    .vux-x-input {
      font-size: .7rem;
    }
    .weui-btn_primary {
      margin-top: 40%;
    }
    .weui-cell_warn {
      color: #000;
    }
    .weui-cells__title {
      margin: 1rem;
    }
  }
</style>
