<template>
    <div class="vcr">
       <div class="title">广陵新城未来发展规划</div> 
       <div class="poster">发布：<span>广陵党支部</span></div>
       <div class="play">
           <video-player  class="video-player-box" ref="videoPlayer" :options="playerOptions"></video-player>
           <!-- <video id="v1" poster="../common/image/vcr1.png" src="http://vali-dns.cp31.ott.cibntv.net/677306667B73D718502E16860/03000A02005B2C56164BF5358DE04A2C508E29-D980-4DA7-810B-667593025D9D.mp4"></video>
           <div class="playPause"></div> -->
       </div>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
      videoPlayer
  },
  data() {
      return {
        playerOptions: {
          // videojs options
          muted: true,
          language: 'zh',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: "http://vjs.zencdn.net/v/oceans.mp4"
          }],
          poster: require("../common/image/vcr1.png"),
        }
      }
  }  
}
</script>

<style lang="less">

.vcr{
    width: 100%;
    height: 100%;
    padding: .85rem .42rem 0;
    background: url('../common/image/vcr_bg.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    .title{
        font-size: .81rem;
        color:#000;
        margin-bottom: .42rem;
    }
    .poster{
        font-size: .512rem;
        color:rgb(51,51,51);
        margin-bottom: .42rem;
        span{
            color:rgb(40,86,233);
        }
    }
    .play{
        width: 15.14rem;
        height: 8.36rem;
        position: relative;
        .video-player{
            width: 100%;
            height: 100%;
        }
        .video-js{
            width: 100%;
            height: 100%;
            .vjs-big-play-button{
                top:50%;
                left:50%;
                margin-left: -1.5em;
                margin-top: -.75em;
            }
        }
    }
}
</style>
