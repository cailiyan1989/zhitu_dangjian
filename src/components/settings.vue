<template>
  <div class="settings">
    <group>
      <cell title="更改密码" :link="{path: '/member/password/change'}"></cell>
    </group>
    <group>
      <cell title="退出登录" @click.native="logout"></cell>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, XButton } from 'vux'
  import api from '../fetch/api'
  export default {
    components: {
      Group,
      Cell,
      XButton
    },
    name: "settings",
    methods: {
      //退出登录
      logout() {
        const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
        this.$vux.confirm.show({
          title: '操作提示',
          content: '确认退出吗？',
          onConfirm() {
            api.get_user_out().then(res => {
              if (res.code == 1) {
                _this.$router.replace('/login')
              } else {
                _this.$toast.text(res.msg, 'middle')
              }
            })
          },
        })
      },
    }
  }
</script>

<style lang="less">
.settings {
  .weui-cells{
    margin-top: .7rem;
  }
  .vux-cell-bd {
    font-size: .7rem;
  }
}
</style>
