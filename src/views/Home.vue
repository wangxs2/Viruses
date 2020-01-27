<template>
  <div class="home">
    <div class="header">新型肺炎物资捐赠实时动态</div>
    <div id="myMap" class="container">
      <div class="top-fix">定点物资缺乏地图</div>
    </div>
    <!-- 医院的详情弹框 -->
    <van-action-sheet v-model="isDetail" :duration="0" title="">
      <div class="contentDetail">
        <div style="font-size:18px;text-align:left">华中科技大学同济医院附属同济医院{{message}}</div>
        <div class="address"> 
          <div class="left-font" style="color:#666666"><van-icon name="location-o" size="20" /> <div style="margin-left:2px">武汉市硚口区解放大道1095号</div></div>
          <!-- <div class="right-btn">定点医院</div> -->
          <div class="right-btn right-btn1">发热门诊</div>
        </div>
        <div class="address" style="font-size:12px"> 
          <div style="color:#666666">信息来源：人民网  <span style="color:#216AFF;cursor:pointer"> 点击查看</span></div>
          <div>发布日期：2020-01-26 22:27</div>
        </div>
        <div class="tel-phone">
          <div class="left-font"><van-icon name="phone-o" size="20" /> <div style="font-size:15px;margin-left:4px">张医生  (027)83662688</div></div>
        </div>
        <div style="font-weight:bold;font-size:16px;text-align:left;margin-bottom:14px">所需疫情防控物资 <span class="person">接受个人捐赠</span></div>
        <div class="material">
          <div class="boll-item"><span class="boll"></span>N95防护口罩</div>
          <div class="boll-item"><span class="boll"></span>医用一次性乳胶手套</div>
          <div class="boll-item"><span class="boll"></span>医用帽子</div>
          <div class="boll-item"><span class="boll"></span>一次性手术衣</div>
        </div>
        <div class="remark">医用防护口罩GB 19083-2010</div>
        <div class="remark">医用外科口罩YY0469-2010</div>
        <div class="remark">防护服 符合《医用一次性防护服技术要求》GB19082-2003</div>
        <van-divider />
        <div>
          <van-button round color="#216AFF" style="margin-right:12px">我要联系</van-button>
          <van-button round color="linear-gradient(to right, #FF6600, #FF7B10)" icon="good-job-o" type="info">为医院点赞加油 162,803,106次</van-button>
        </div>
      </div>
    </van-action-sheet>
    <!-- 医院的详情弹框 -->
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      myMap:null,
      isDetail:false,
      message:'',
      mapDate:[
      {
        centerLng:114.378779,
        centerLat:30.582411,
        onLineStatus:"on",
        message:1
      },
      {
        centerLng:114.341786,
        centerLat:30.602507,
        onLineStatus:"up",
        message:2
      }
      ]
    };
  },
  created() {
   
  },
 mounted () {
  this.getMap()
  },
  methods:{
    getMap () {
      this.myMap = new AMap.Map("myMap", {
        animateEnable: false,
        resizeEnable: true,
        // preloadMode: true,
        center:[114.423213,30.63943],
        // zoom:6,
        mapStyle:'amap://styles/9fb204085bdb47adb66e074fca3376be',
      });
         this.initMap()

    },
    initMap(){
      const markerslist=[]
      this.mapDate.forEach(item => {
        markerslist.push(this.createPoint(item))
      })
      this.myMap.add(markerslist)
    },
    createPoint(row) {
    let marker = new AMap.Marker({
      position: new AMap.LngLat(row.centerLng, row.centerLat),
      offset: new AMap.Pixel(-19, -25),
      icon: new AMap.Icon({
        size: new AMap.Size(38, 50),
        image:
          row.onLineStatus == 'on'
            ? require('../assets/image/icon_2.png')
            : require('../assets/image/icon_3.png'),
        imageSize: new AMap.Size(38, 50)
      }), // 添加 Icon 图标 URL
      zIndex: 100,
      extData: { row }
    })
    marker.on("touchstart", (e) => {
      this.isDetail=true
      console.log(e.target.B.extData)
      let str=e.target.B.extData.row
      console.log(str)
      this.message=str.message
    })
    return marker
  }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  display:flex;
   flex-direction: column;
  .header {
    width: 100%;
    height: 44px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    line-height: 44px;
    font-size: 18px;
  }
  .container{
    flex:1;
    margin-top:6px;
    position:relative;
    .top-fix{
      position:absolute;
      top:0;
      left:0;
      z-index:10;
      font-size:14px;
      text-align:left;
      width:100%;
      height:30px;
      line-height:30px;
       box-sizing: border-box;
       padding-left:12px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1px 0px 0px rgba(238,238,238,1);

    }
  }
  .contentDetail{
     padding: 12px;
     padding-top:20px;
     box-sizing: border-box;
      .left-font{
         display:flex;
         align-items: center;
       }
     .address{
       margin-top:14px;
       font-size:15px;
       display:flex;
       justify-content:space-between;
       align-items: center;
      
       .right-btn{
        width:64px;
        height:20px;
        background:linear-gradient(90deg,rgba(255,122,15,1),rgba(255,188,60,1));
        border-radius:10px;
        font-size:12px;
        color:#fff;
        line-height:21px;
       }
       .right-btn1{
         background:linear-gradient(90deg,rgba(232,52,248,1),rgba(209,97,255,1));
       }
     }
     .tel-phone{
       background: #F2F5FF;
       padding: 12px;
       font-size:15px;
        margin:14px 0;
     }
     .person{
       display: inline-block;
       width:90px;
        height:22px;
        background:linear-gradient(90deg,rgba(130,124,255,1),rgba(164,119,255,1));
        border-radius:0px 11px 11px 11px;
        color:#fff;
        font-size:12px;
        font-weight:none;
        text-align:center;
        line-height:22px;
        margin-left:6px;
     }
     .material{
       display: flex;
       flex-wrap: wrap;
       color: #216AFF;
        font-size: 15px;
        margin-bottom: 6px;
      .boll{
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #216AFF;
        margin-right: 6px;
      }
      .boll-item{
        display: flex;
        align-items: center;
        width: 50%;
        margin-bottom: 8px;
      }
     }
     .remark{
       color: #999999;
       font-size: 12px;
       text-align: left;
       margin-bottom: 6px;
     }
  }
}
</style>
