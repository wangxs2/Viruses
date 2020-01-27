<template>
  <div class="home">
    <div class="header">新型肺炎物资捐赠实时动态</div>
    <div id="myMap" class="container">
      <div class="top-fix">定点物资缺乏地图</div>
    </div>
    <!-- 医院的详情弹框 -->
    <van-action-sheet  v-model="isDetail" :duration="0" title="">
      <div class="contentDetail">
        <div style="font-size:18px;text-align:left">{{mapobj.hospitalName}}</div>
        <div class="address"> 
          <div class="left-font" style="color:#666666"><van-icon name="location-o" size="20" /> <div style="margin-left:2px">武汉市硚口区解放大道1095号</div></div>
          <div v-if="mapobj.type==1" class="right-btn">定点医院</div>
          <div v-if="mapobj.type==2" class="right-btn right-btn1">发热门诊</div>
        </div>
        <div class="address" style="font-size:12px"> 
          <div v-if="mapobj.source!==undefined&&mapobj.source!==''" style="color:#666666">信息来源：{{mapobj.source}}  <span style="color:#216AFF;cursor:pointer"> 点击查看</span></div>
          <div v-if="mapobj.createTime!==undefined">发布日期：{{mapobj.createTime}}</div>
        </div>
        <div class="tel-phone" v-if="mapobj.linkTelarr!==undefined">
          <div class="left-font" v-for="(iteam,index) in mapobj.linkTelarr"
                 :key="index"><van-icon name="phone-o" size="20" /> <div style="font-size:15px;margin-left:4px">{{mapobj.linkPeoplearr[index]}}  {{iteam}}</div></div>
        </div>
        <!-- <span class="person">接受个人捐赠</span> -->
        <div v-if="mapobj.needsNamearr!==undefined" style="font-weight:bold;font-size:16px;text-align:left;margin-bottom:14px">所需疫情防控物资 </div>
        <div class="material" v-if="mapobj.needsNamearr!==undefined">
          <div v-for="(item,index) in mapobj.needsNamearr"
                 :key="index" class="boll-item"><span class="boll"></span>{{item}}</div>
          <div class="boll-item"><span class="boll"></span>医用一次性乳胶手套</div>
          <div class="boll-item"><span class="boll"></span>医用帽子</div>
          <div class="boll-item"><span class="boll"></span>一次性手术衣</div>
        </div>
        <div v-if="mapobj.needsDescrarr!==undefined" v-for="(itrm,index) in mapobj.needsDescrarr"
                 :key="index" class="remark">{{itrm}}</div>
        <van-divider />
        <div>
          <van-button v-if="mapobj.linkTelarr!==undefined" round color="#216AFF" style="margin-right:12px" @click="dialPhoneNumber()">我要联系</van-button>
          <van-button round color="linear-gradient(to right, #FF6600, #FF7B10)" @click="shakeTime(mapobj.id)" icon="good-job-o" type="info">为医院点赞加油 {{mapobj.encourageNum}}次</van-button>
        </div>
      </div>
    </van-action-sheet>
    <van-popup
        v-model="phoneshow"
        position="bottom"
        :style="{ height: '20%' }">
      <div style="padding:12px 24px">
        <div class="left-font" v-for="(iteam,index) in mapobj.linkTelarr"
                 :key="index"><van-icon name="phone-o" color="#1989fa" size="30" @click="dialPhoneNumber1(iteam)" /> <div style="font-size:15px;margin-left:4px">{{mapobj.linkPeoplearr[index]}}  {{iteam}}</div></div>
      </div>
    </van-popup>
      <div class="search-wrapper" v-if="show">
        <img class="down-up" @click="downUp" src="../assets/image/up.png" alt="" v-if="downUpImg">
        <img class="down-up" @click="downUp" src="../assets/image/down.png" alt="" v-else>
        <div class="input-wrapper">
          <img src="../assets/image/search.png" alt="" @click="search">
          <input type="text" placeholder="查询继续支援医院、物资、区域" v-model="searchText" >
        </div>
        <div class="tab-list-wrapper" v-if="!downUpImg">
          <p class="title">haha</p>
          <div class="list list1">
            <span v-for="(item,i) in wuziList" :key="i">{{item}}</span>
          </div>
          <p class="title">haha</p>
          <div class="list list2">
            <span v-for="(item,i) in cityList" :key="i">{{item}}</span>
          </div>
          
          <p class="title">haha</p>
          <div class="list list3">
            <span><img src="../assets/image/time.png" alt="">最近24小时</span>
            <span><img src="../assets/image/time.png" alt="">最近48小时</span>
            <span><img src="../assets/image/time.png" alt="">最近72小时</span>
          </div>
        </div>
        <div class="write">
          <p>更多疫情跟踪：武汉肺炎防疫全记录</p>
          <p>上海产业技术研究院出品</p>
        </div>
      </div>
      <div class="search-wrapper1">
        <div class="input-wrapper">
          <img class="right-btn" @click="goback" src="../assets/image/down.png" alt="" >
          
          <input type="text" placeholder="查询继续支援医院、物资、区域" v-model="searchText" >
          
          <img class="error" @click="clearText" src="../assets/image/down.png" alt="" >

        </div>
        <div class="btn" @click="rightModel" >
          <img class="icon-btn" src="../assets/image/down.png" alt="" >
          <span>11</span>

        </div>
      </div>
      <van-popup v-model="showModel" position="right" :style="{ height: '100%' }">
        <div class="list-wrapper">
          <p class="title">计算机世界上就能</p>
          <p class="address"><img class="right-btn" @click="goback" src="../assets/image/address.png" alt="" >sjsjsjsj</p>
          <p class="time">发布日期：1111111</p>
          <div class="phone">
            <p><img class="right-btn" @click="goback" src="../assets/image/phone.png" alt="" ><span>1122121212</span></p>
          </div>
        </div>
        <div class="list-wrapper">
          <p class="title">计算机世界上就能</p>
          <p class="address"><img class="right-btn" @click="goback" src="../assets/image/address.png" alt="" >sjsjsjsj</p>
          <p class="time">发布日期：1111111</p>
          <div class="phone">
            <p><img class="right-btn" @click="goback" src="../assets/image/phone.png" alt="" ><span>1122121212</span></p>
          </div>
        </div>
        <div class="list-wrapper">
          <p class="title">计算机世界上就能</p>
          <p class="address"><img class="right-btn" @click="goback" src="../assets/image/address.png" alt="" >sjsjsjsj</p>
          <p class="time">发布日期：1111111</p>
          <div class="phone">
            <p><img class="right-btn" @click="goback" src="../assets/image/phone.png" alt="" ><span>1122121212</span></p>
          </div>
        </div>
        <div class="list-wrapper">
          <p class="title">计算机世界上就能</p>
          <p class="address"><img class="right-btn" @click="goback" src="../assets/image/address.png" alt="" >sjsjsjsj</p>
          <p class="time">发布日期：1111111</p>
          <div class="phone">
            <p><img class="right-btn" @click="goback" src="../assets/image/phone.png" alt="" ><span>1122121212</span></p>
          </div>
        </div>
        <div class="list-wrapper">
          <p class="title">计算机世界上就能</p>
          <p class="address"><img class="right-btn" @click="goback" src="../assets/image/address.png" alt="" >sjsjsjsj</p>
          <p class="time">发布日期：1111111</p>
          <div class="phone">
            <p><img class="right-btn" @click="goback" src="../assets/image/phone.png" alt="" ><span>1122121212</span></p>
          </div>
        </div>
        <div class="list-wrapper">
          <p class="title">计算机世界上就能</p>
          <p class="address"><img class="right-btn" @click="goback" src="../assets/image/address.png" alt="" >sjsjsjsj</p>
          <p class="time">发布日期：1111111</p>
          <div class="phone">
            <p><img class="right-btn" @click="goback" src="../assets/image/phone.png" alt="" ><span>1122121212</span></p>
          </div>
        </div>
        
      </van-popup>

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
      phoneshow:false,
      downUpImg:true,
      wuziList:["hsh","hsh"],
      cityList:["hsh","hsh"],
      searchText:"",
      show:true,
      showModel:false,
      mapDate:[
      ],
      mapobj:{}
    };
  },
  created() {
   
  },
 mounted () {
  this.getMap()
  this.getDataList()
  },
  methods:{
    getDataList(data,type){
      let params={}
      if(type==1){
        params={
          content:data
        }
      } else if (type==2){
        params={
          hour:data
        }
      } else{
        params={}
      }

      this.$fetchGet("hospital/selectHospital",params).then(res=> {
        this.dataList=res
      })
    },
    // 选择时间
    selectTimeItem(item) {
      this.show=false
      this.showSearch=true
      this.searchText=item
      this.getDataList(item,2)

    },
    // 选择物资，城市
    selectItem(item) {
      this.show=false
      this.showSearch=true
      this.searchText=item
      this.getDataList(item,1)
    },
    // 右边弹框显示
    rightModel(){
      this.showModel=true
    },
    downUp() {
      this.downUpImg=!this.downUpImg
    },
    search(){
      this.show=false
    },
    goback(){
      this.show=true
    },
    clearText(){
      this.searchText=""     
      this.getDataList() 

    },
    shakeTime(val){
      this.$fetchGet("encourage/saveEncourage", {
        id:val
      }).then(res => {
        if(res.code=="success"){
         this.$toast('已经成功点赞');
         this.mapobj.encourageNum++
        }else{
          this.$toast('您已经点过赞了');
        }
        
      });

    },
    dialPhoneNumber(){
      this.phoneshow=true
    },
    dialPhoneNumber1(phoneNumber) {
      if (!phoneNumber) {
        this.$toast('无电话信息');
        return;
      }
      window.location.href = "tel:" + phoneNumber;
    },
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
      this.myMap.clearMap()
      const markerslist=[]
      // this.mapDate.forEach(item => {
      //   markerslist.push(this.createPoint(item))
      // })
      // this.myMap.add(markerslist)
      this.$fetchGet("hospital/selectHospital", {
        content:'',
        hour:'', 
      }).then(res => {
        if(res){
          res.forEach(item => {
            if(item.linkTel!==undefined){
              item.linkTelarr=item.linkTel.split("、")
            }
            if(item.linkPeople!==undefined){
              item.linkPeoplearr=item.linkPeople.split("、")
            }
            if(item.needsName!==undefined){
              item.needsNamearr=item.needsName.split(",")
            }
            if(item.needsDescr!==undefined){
              item.needsDescrarr=item.needsDescr.split(",")
            }
            markerslist.push(this.createPoint(item))
          })
          this.myMap.add(markerslist)
        }
        
      });
    },
    createPoint(row) {
    let marker = new AMap.Marker({
      position: new AMap.LngLat(row.longitude, row.latitude),
      offset: new AMap.Pixel(-12, -15),
      icon: new AMap.Icon({
        size: new AMap.Size(24, 31),
        image:
          (row.type == 2&&row.isLack==1)
            ? require('../assets/image/icon4.png')
            : (row.type == 2&&row.isLack==0)?require('../assets/image/icon3.png')
            : (row.type == 1&&row.isLack==0)?require('../assets/image/icon1.png')
            :(row.type == 1&&row.isLack==1)?require('../assets/image/icon2.png'):'',
        imageSize: new AMap.Size(24, 31)
      }), // 添加 Icon 图标 URL
      zIndex: 100,
      extData: { row }
    })
    // touchstart
    marker.on("touchstart", (e) => {
      this.isDetail=true
      let str=e.target.B.extData.row
      this.mapobj=str
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
  .left-font{
         display:flex;
         align-items: center;
       }
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
  .search-wrapper{
    padding:0 17px;
    background:#fff;
    .tab-list-wrapper{
      font-size:16px;
      .title{
        text-align:left;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);

      }
      .list{
        display:flex;
        span{

          font-family:PingFang SC;
          font-weight:500;
          color:rgba(33,106,255,1);
          text-align:center;
          img{
            width:17px;
            height:17px;
          }

        }
        &.list1{
          span{
            padding: 10px 15px;
            color:#216AFF;

            margin-right:15px;
            border:1px solid rgba(33,106,255,1);
            border-radius:10px;
          }
        }   
        &.list2{
          span {
          padding: 10px 15px;
            color:#FF7800;

          margin-right:15px;
            border:1px solid rgba(255,120,0,1);
            border-radius:18px;
          }
        }
        &.list3{
          display:flex;
          justify-content: space-between;
          align-items:center;
          span {
            display:flex;
            justify-content: flex-start;
            align-items:center;
            font-size:15px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
            img{
              padding-right:5px;
            }
          }
        }
      }
    }
    .down-up{
      width:30px;
      height: 12px;
    }
    .input-wrapper{
      display:flex;
      justify-content: flex-start;
      align-items:center;
      height: 44px;
      img{
        width: 18px;
        height: 18px;
        padding: 10px 15px;

      }
      input{
        // width: 590px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
      }
    }
    .write{
      
      font-size:12px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(170,170,170,1);
      line-height:12px;
      p{

      }
    }
  }
  .search-wrapper1{
    position:absolute;
    top:100px;
    left:17px;
    width:340px;
    .input-wrapper{
      display:flex;
      justify-content:space-around;
      align-items:center;
      background:#fff;
      height:44px;
      .right-btn{
        width:8px;
        height:14px;
        padding:10px;
      }
      input{
        width:250px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
      }
      .error{
        width:11px;
        height:11px;
        padding:10px;
      }
    }
    .btn {
      position:relative;
      display:flex;
      justify-content:center;
      align-items:center;
      width:50px;
      height:50px;
      background:#fff;
      margin-left:292.5px;
      margin-top:15px;
      border-radius:50%;

      .icon-btn{
        width:15px;
        height:15px;
      }
      span{
        position:absolute;
        top:10px;
        right:10px;
        font-size:10px;
        background:#FF1717;
        color:#fff;
      }

    }
  }
  .van-popup--right{
    width:80%;
  }
  .list-wrapper{
    padding:0 15px;
    .title{
      text-align:left;
      font-size:17px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
    .address{
      display:flex;
      align-items:center;
      font-size:15px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(102,102,102,1);
      img{
        width:16px;
        height:16px;
      }
    }
    .time{
      text-align:left;
      font-size:12px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(102,102,102,1);
    }
    .phone{
      display:flex;
      align-items:center;
      background:#F2F5FF;
      padding:10px;
      p{
        display:flex;
        align-items:center;
        margin:0;

        img{
          
          width:16px;
          height:16px;
        }
        span {
          font-size:15px;
          color:#333;
        }
      }
    }
  }
}
</style>
