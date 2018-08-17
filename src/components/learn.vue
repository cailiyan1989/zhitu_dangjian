<template>
    <div class="vcr">
       <div class="title">广陵新城未来发展规划</div> 
       <div class="poster">发布：<span>广陵党支部</span></div>
       <div class="play">
           <video-player  class="video-player-box" ref="videoPlayer" :options="playerOptions"></video-player>
           <!-- <video id="v1" poster="../common/image/vcr1.png" src="http://vali-dns.cp31.ott.cibntv.net/677306667B73D718502E16860/03000A02005B2C56164BF5358DE04A2C508E29-D980-4DA7-810B-667593025D9D.mp4"></video>
           <div class="playPause"></div> -->
       </div>
       <div class="vcr_intro">
           <p>广陵新城是一座都市水城，一座产业新城，一座未来之城。广陵新城建设十多年来，新兴产业发展如火如荼，产业基地已集聚六百多家网络信息类、电子商务类、移动互联网类高科技企业，集聚一百多家金融类企业。新城10年是城市建设、项目建设、招商引资、基础设施建设突飞猛进的10年，也是党的基层组织迅速发展的10年。党的基层组织从1个发展到28个，党员人数从不足10人发展到513人。</p>
           <p>忆往昔峥嵘岁月，我们豪情满怀；望光辉未来，我们任重道远。未来我们将不忘初心，砥砺前行，坚持党建引领，发挥党组织的政治核心作用，发挥先进党员的模范作用。谱写新城发展新篇章，将广陵新城建设成我们最美的家乡。</p>
       </div>
    </div>
</template>

<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: "zh",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: "http://yf.ztemap.com:8091/dangjian/dangjian.mp4"
          }
        ],
        poster: require("../common/image/vcr1.png")
      }
    };
  }
};
</script>

<style lang="less">
.vcr {
  width: 100%;
  min-height: 100%;
  padding: 0.85rem 0.42rem 0;
  background: url("../common/image/vcr_bg.png");
  background-size: 100% 100%;
  box-sizing: border-box;
  .title {
    font-size: 0.81rem;
    color: #000;
    margin-bottom: 0.42rem;
  }
  .poster {
    font-size: 0.512rem;
    color: rgb(51, 51, 51);
    margin-bottom: 0.42rem;
    span {
      color: rgb(40, 86, 233);
    }
  }
  .play {
    width: 15.14rem;
    height: 8.36rem;
    position: relative;
    .video-player {
      width: 100%;
      height: 100%;
    }
    .video-js {
      width: 100%;
      height: 100%;
      .vjs-big-play-button {
        top: 50%;
        left: 50%;
        margin-left: -1.5em;
        margin-top: -0.75em;
      }
    }
  }
  .vcr_intro {
    font-size: 0.7rem;
    p {
      padding: 0.5rem;
      text-indent: 2em;
    }
  }
}
</style>
