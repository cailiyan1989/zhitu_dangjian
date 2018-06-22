<template>
    <div class="architec">
        <div class="partys">
            <group class="party_list">
                <cell :title="item.title" v-for="(item,index) of partys" :key="index" :link="{name: 'Party', params:{partyid: item.id}}" v-if="item.desc">
                    <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../common/image/dangzhibu@2x.png">
                </cell>
            </group>
        </div>
    </div>
</template>

<script>
import {Group, Cell} from 'vux'
import { mapGetters } from 'vuex'
export default {
    components: {
        Group,
        Cell
    },
    computed: {
      ...mapGetters([
        'partysList',

        'errorContactMsg'
      ])
    },
    activated() {
        this.partys = this.partysList
    },
    created() {
      this.$store.dispatch('getPartyList')
    },
    name: 'Architecture',
    watch: {
        partysList: function(val) {
            this.partys = val
        },
        errorContactMsg: function(val) {
            this.$vux.toast.text(val,'middle')
        }
    },
    data(){
        return {
            partys:[]
        }
    }
}
</script>

<style lang="less">
.architec{
    width: 100%;
    height: 100% ;
    background: url('../common/image/ditu11.png');
    background-size: 100% 100%;
    position: relative;
    .partys{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30%;
        overflow: auto;
    }
    .party_list{
        width: 100%;
        height: auto;
    }
    .vux-tap-active:active {
        background-color: rgba(0,0,0,.3);
    }
    .weui-cells{
        background: transparent;
        margin-top: 0;
        &::before,
        &::after{
            display: none;
        }
    }
    .weui-cell{
        &::before{
            display: none;
        }
    }
    .vux-label{
        color:rgb(255,255,255);
        font-size: 0.64rem;
    }
}
</style>

