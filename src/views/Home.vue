<template>
  <div class="home">
    <div class="write">
      <p>更多疫情跟踪： 新型肺炎需求捐赠记录</p>
      <p>上海产业技术研究院提供</p>
    </div>
    <!-- <div class="header">新型肺炎物资捐赠实时动态</div> -->
    <div id="myMap" class="container">
      <!-- <div class="top-fix">定点物资缺乏地图</div> -->
    </div>
    <!-- 医院的详情弹框 -->
    <van-popup  v-model="isDetail" :style="{width: '100%' }" round :duration="0">
      <div class="contentDetail">
        <div style="font-size:18px;text-align:left">{{mapobj.hospitalName}}</div>
        <div class="address"> 
          <div class="left-font" v-if="mapobj.hospitalAddress!==undefined&&mapobj.hospitalAddress!==''" style="color:#666666;width:75%;word-wrap:break-word;text-align:left"><van-icon name="location-o" size="20" /> <div class="van-van-multi-ellipsis--l2" style="margin-left:2px">{{mapobj.hospitalAddress}}</div></div>
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
    </van-popup>
    <van-popup
        v-model="phoneshow"
        position="bottom"
        :style="{ height: '20%' }">
      <div style="padding:12px 24px">
        <div class="left-font" v-for="(iteam,index) in mapobj.linkTelarr"
                 :key="index"><van-icon name="phone-o" color="#1989fa" size="34" @click="dialPhoneNumber1(iteam)" /> <div style="font-size:15px;margin-left:4px">{{mapobj.linkPeoplearr[index]}}  {{iteam}}</div></div>
      </div>
    </van-popup>
    <!-- 搜索部分 -->
    <van-popup v-model="show" position="bottom" :style="{height: heightCur }" :overlay="false" round>
      <div class="search-wrapper">
        <div class="down-up-wrapper" @click="downUp">
          <img class="down-up" src="../assets/image/up.png" alt="" v-if="downUpImg">
          <img class="down-up" src="../assets/image/down.png" alt="" v-else>
        </div>
        <div class="input-wrapper">
          <img src="../assets/image/search.png" alt="" @click="search">
          <input type="text" placeholder="查询继续支援医院、物资、区域" v-model="searchText" @focus="inputFocus" >
        </div>
        <div class="tab-list-wrapper" v-if="!downUpImg">

            <p class="title">疫情防控物资</p>
          <div class="list list1">
            <span v-for="(item,i) in wuziList" :key="i" @click="selectItem(item)">{{item}}</span>
          </div>
          <p class="title">疫情城市查询</p>
          <div class="list list2">
            <span v-for="(item,i) in cityList" :key="i" @click="selectItem(item)">{{item}}</span>
          </div>
          
          <p class="title">发布时间查询</p>
          <div class="list list3">
            <span v-for="(item,i) in timeList" :key="i" @click="selectTimeItem(item)"><img src="../assets/image/time.png" alt="">{{item}}</span>
          </div>
        </div>
        
      </div>
      
    </van-popup>
    <!-- 搜索2部分 -->
    <div class="search-wrapper1" v-if="showSearch">
      <div class="input-wrapper">
        <div class="go-back">
          <van-icon name="arrow-left" @click="goback" size="16"/>
        </div>
        <!-- <input type="text" v-model="searchText" @blur="blurSearch"> -->
        <span style="font-size:16px">{{searchText}}</span>
        <div class="go-back">
          <van-icon name="cross" @click="clearText" size="16" />
        </div>
      </div>
      <div class="btn" @click="rightModel" >
        <van-icon name="wap-nav" size="24"/>
        <span v-if="showDataLengthPoint" >{{total || 0}}</span>
      </div>
    </div>
    <!-- 搜索2右边弹框 -->
    <van-popup v-model="showModel" position="right" :style="{ height: '100%' }">
      <div class="list-content">

        <div class="list-wrapper" v-for="(item,i) in dataList" :key="i" @click="detailright(item)">
          <p class="title">{{item.hospitalName}}</p>
          <p class="address" v-if="item.hospitalAddress!==undefined&&item.hospitalAddress!==''"><van-icon name="location-o" size="20" /><span>{{item.hospitalAddress}}</span></p>
          <p class="time" v-if="item.createTime!==undefined&&item.createTime!==''">发布日期：{{item.createTime!==undefined?item.createTime.substring(0,16):''}}</p>
          <div class="phone" v-if="item.linkTelList!==undefined">
            <p  v-for="(items,i) in item.linkTelList" :key="i"><van-icon name="phone-o" size="20" /><span>{{items}}</span></p>
          </div>
        </div>
      </div>
      
    </van-popup>

    <!-- 搜索录入图标 -->
    <div class="search-write">
      <div class="img-icon" @click="searchBtn">
        <van-icon name="search" size="20" color="#216AFF"/>
        <span>搜索</span>
      </div>
      <div class="img-icon" @click="writeBtn">
        <van-icon name="records" size="20" color="#216AFF"/>
        <span>录入</span>
      </div>
    </div>

    <!-- 录入缺省页 -->
    
    <van-popup v-model="reduceShow" closeable position="bottom" :style="{ height: '100%' }">
      <div class="reduce-content">
        <!-- <img class="down-up" src="../assets/image/reduce.png" alt="">
        <p>正在加紧开发...</p>
        <p>联系电话：18368091476</p>
        <img style="width:160px;height:160px" src="../assets/image/gzh.jpg" alt=""> -->
        <img style="" class="banner" src="../assets/image/banner.png" alt="">
        <div class="us-need-wrapper">
          <div class="us-need us">
            <div class="title">
              <span class="dot" v-for="(item,i) in 3" :key="i+'s'"></span>
              <span class="title-name">联系我们</span>
              <span class="dot" v-for="(item,i) in 3" :key="i+'d'"></span>
            </div>
            <div class="message">
              <span class="name">柴田鑫</span>
              <span class="tel">{{commitMobile}}</span>
              <span class="btn" @click="commitTel(commitMobile)">立即拨打</span>
            </div>
            <div class="code">
              <img style="" src="../assets/image/gzh.jpg" alt="">
              <span class="btn">上海产业技术研究院智能工程交通中心</span>
            </div>
          </div>
          <div class="us-need need">

            <div class="title">
              <span class="dot" v-for="(item,i) in 3" :key="i+'f'"></span>
              <span class="title-name">需求填写</span>
              <span class="dot" v-for="(item,i) in 3" :key="i+'g'"></span>
            </div>
            <div class="form-wrapper">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">单位名称</span>
                <!-- <input type="text" v-model="searchText"> -->
                <van-field v-model="form.company" placeholder="请填写" :error-message="errorMessage.company"  @blur="formBlur(1)"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">地址</span>
                <van-field v-model="form.address" placeholder="请填写" :error-message="errorMessage.address"   @blur="formBlur(2)"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人</span>
                <van-field v-model="form.people" placeholder="请填写" :error-message="errorMessage.people"   @blur="formBlur(3)"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">电话</span>
                <van-field v-model="form.tel" placeholder="请填写" :error-message="errorMessage.tel"  @blur="formBlur(4)"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资需求</span>
                <van-field v-model="form.need" type="textarea" placeholder="请填写" :error-message="errorMessage.need" @blur="formBlur(5)"/>
              </div>
              <div class="confirm-btn" @click="confirm">提交</div>
            </div>

          </div>
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
      heightCur:'0',
      myMap:null,
      pointGroup: new AMap.OverlayGroup(), // 点集合
      isDetail:false,
      phoneshow:false,
      downUpImg:true,
      showSearch:false,
      reduceShow:false,
      showDataLengthPoint:1, //显示当前搜索数据是否点击指针
      wuziList:[],
      cityList:[],
      provinceList:[],
      timeList:["最近24小时","最近48小时","最近72小时"],
      phonwList:[],
      dataList:[],
      total:0,
      searchText:"",
      show:false,
      showModel:false,
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
      ],
      mapobj:{},
      form:{
        company:'',
        address:'',
        people:'',
        tel:'',
        need:''
      },
      errorMessage:{
        company:'',
        address:'',
        people:'',
        tel:'',
        need:''
      },
      commitMobile: "18368091476"
    };
  },
  created() {
   
  },
 mounted () {
   // H5 plus事件处理
			function plusReady() {
				// 设置系统状态栏背景为红色
				var type = plus.os.name;
				if(type == "iOS") {
					plus.navigator.setStatusBarBackground("#1989fa");
				} else {
					plus.navigator.setStatusBarBackground("#1989fa");
				}
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
			} 

  this.getMap()
  this.getDataList()
  this.getWuziList()
  this.getCityList()
  // this.getProvinceList()
  },
  methods:{
    commitTel(tel){
      window.location.href = "tel:" + tel
    },
    // 录入表单提交
    confirm(){
      if (this.form.company && this.form.address && this.form.people && this.form.tel && this.form.need) {

        let params= {
          cmpyName:this.form.company,
          address:this.form.address,
          linkPeople:this.form.people,
          linkTel:this.form.tel,
          descr:this.form.need,

        }
        
        this.$fetchPost("infoApply/save",params).then(res=> {
          if (res.code=="success") {
            this.$toast(res.message);
          } else  if (res.code=="error") {
            this.$toast(res.message);
          } else  if (res.code==504) {
            this.$toast(res.message);
          }
        })

      } else {
        this.$toast('请完善信息');
      }

    },
    // 提交非空验证
    formVil(){
      

      if (!this.form.company){
        this.errorMessage.company="请输入单位名称"
      } else {
        this.errorMessage.company=""

      }
      if (!this.form.address){
        this.errorMessage.address="请输入地址"
      } else {
        this.errorMessage.address=""

      }
      if (!this.form.people){
        this.errorMessage.people="请输入联系人"
      } else {
        this.errorMessage.people=""

      }
      if (!this.form.tel){
        this.errorMessage.tel="请输入电话"
      } else {
          this.errorMessage.tel=""
      }
      if ( !this.form.need){
        this.errorMessage.need="请输入物资需求"
      } else {
        this.errorMessage.need=""

      }
    },
    // input失焦非空验证
    formBlur(type){
        var strTel=/^[\d\-,]+$/g
      if (type==1 && !this.form.company){
        this.errorMessage.company="请输入单位名称"
      } else {
        this.errorMessage.company=""

      }
      if (type==2 && !this.form.address){
        this.errorMessage.address="请输入地址"
      } else {
        this.errorMessage.address=""

      }
      if (type==3 && !this.form.people){
        this.errorMessage.people="请输入联系人"
      } else {
        this.errorMessage.people=""

      }
      if (type==4 && !this.form.tel){
        this.errorMessage.tel="请输入电话"
      } else if (type==4 && this.form.tel) {
        // if (strTel.test(this.form.tel)) {

          this.errorMessage.tel=""
        // } else {
        //   this.errorMessage.tel="电话格式错误，多个电话中间用 , 隔开"
        // }

      }
      if (type==5 && !this.form.need){
        this.errorMessage.need="请输入物资需求"
      } else {
        this.errorMessage.need=""

      }
    },
    // 搜索按钮
    searchBtn(){
      this.show=true
      this.reduceShow=false
      this.downUpImg=false
      this.heightCur="80%"

    },
    // 录入按钮
    writeBtn(){
      this.show=false
      this.reduceShow=!this.reduceShow
    },
    // 物资
    getWuziList(){
      let params={
        top:6
      }
      this.$fetchGet("hospital/findTopSupplies",params).then(res=> {
        if (res) {
          this.wuziList=res
        }
      })
    },
    // 城市
    getCityList(){
      let params={
        top:8
      }
      this.$fetchGet("hospital/findTopCity",params).then(res=> {
        if (res){
          this.cityList=res
        }
      })
    },
    // 省份
    getProvinceList(){
      let params={
        top:8
      }
      this.$fetchGet("hospital/findTopProvince",params).then(res=> {
        if (res){
          this.provinceList=res
        }
      })
    },
    getDataList(data,type){
       this.myMap.clearMap()
      let params={}
      if(type==1){
        params={
          content:data
        }
      } else if (type==2){
        params={
          hour:data.substring(2,4)
        }
      } else{
        params={}
      }

      this.$fetchGet("hospital/selectHospital",params).then(res=> {
        res.forEach(item=> {
          if (item.linkTel){
            if (item.linkTel.indexOf(",") != -1 ||item.linkTel.indexOf("，") != -1) {
              item.linkTelList=item.linkTel.split(",") || item.linkTel.split("，") 
            } else if (item.linkTel.indexOf("、") != -1) {
              item.linkTelList=item.linkTel.split("、")
            }else if (item.linkTel.indexOf("\n") != -1) {
              item.linkTelList=item.linkTel.split("\n")
            }else if (item.linkTel.indexOf("；") != -1) {
              item.linkTelList=item.linkTel.split("；")
            }else if (item.linkTel.indexOf("/") != -1) {
              item.linkTelList=item.linkTel.split("/")
            }else {
              item.linkTelList=[item.linkTel]
            }
          }
        })
        this.dataList=res
        if (this.dataList) {
          this.total=this.dataList.length
        }
        this.mapinit(res)

      })
    },
    // 第二搜索失焦查询数据
    blurSearch(){
      this.getDataList(this.searchText,1)
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
      this.showDataLengthPoint=0
      this.showModel=true
    },
    downUp() {
      this.downUpImg=!this.downUpImg
      if (!this.downUpImg){
        this.heightCur="80%"
      }else {
        this.heightCur="0"
      }
    },
    search(){
      if (this.searchText){
        this.show=false
        this.showSearch=true
        this.getDataList(this.searchText,1)

      }else {
        this.$toast('请输入或选择搜索关键字');
      }
    },
    // 第一搜索获取焦点
    inputFocus() {
      this.downUpImg=false
      this.heightCur="80%"
    },
    goback(){
      this.show=true
      this.showSearch=false
      this.showDataLengthPoint=1
    },
    clearText(){
      this.searchText=""   
      this.showDataLengthPoint=1
      this.getDataList() 

      this.showSearch=false

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
        center:[111.160477,32.1624],
        zoom:4,
        mapStyle:'amap://styles/9fb204085bdb47adb66e074fca3376be',
      });
       AMap.plugin([
        'AMap.ToolBar',
    ], ()=>{
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        this.myMap.addControl(new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true,
            position:'LT'
        }));
    });
      // this.initMap()

    },
    detailright(row){
      this.isDetail=true
      this.mapobj=row

    },
    mapinit(res){
    //  alert(2)
     this.myMap.clearMap()
      const markerslist=[]
      let pointsa=[]
      const pointwe=[]
      res.forEach(item => {
        if(item.linkTel!==undefined){
          item.linkTelarr=item.linkTel.split(",")
        }
        if(item.linkPeople!==undefined){
          item.linkPeoplearr=item.linkPeople.split(",")
        }
        if(item.needsName!==undefined){
          item.needsNamearr=item.needsName.split(",")
        }
        if(item.needsDescr!==undefined){
          item.needsDescrarr=item.needsDescr.split(",")
        }
        if(item.longitude){
           markerslist.push(new AMap.LngLat(item.longitude,item.latitude))
        }
      })
       AMap.convertFrom(markerslist, 'baidu',  (status, result)=> {
        
          if(result.info=="ok"){
            pointsa=result.locations;
            res.forEach((itam,index)=>{
              itam.lacal=pointsa[index];
              pointwe.push(this.createPoint(itam))
            })
            console.log(pointwe)
            this.myMap.add(pointwe)
          }
        })
    },
    // 添加点集合
  addPointGroup(overlays) {
    this.pointGroup.addOverlays(overlays)
    this.myMap.add(this.pointGroup)
  },
  initMap(){
    this.myMap.clearMap()
    const markerslist=[]
    this.$fetchGet("hospital/selectHospital", {
      content:'',
      hour:'', 
    }).then(res => {
      if(res){
        res.forEach(item => {
          if(item.linkTel!==undefined){
            item.linkTelarr=item.linkTel.split(",")
          }
          if(item.linkPeople!==undefined){
            item.linkPeoplearr=item.linkPeople.split(",")
          }
          if(item.needsName!==undefined){
            item.needsNamearr=item.needsName.split(",")
          }
          if(item.needsDescr!==undefined){
            item.needsDescrarr=item.needsDescr.split(",")
          }
          if(item.longitude){
            markerslist.push(new AMap.LngLat(item.longitude,item.latitude))
            
            AMap.convertFrom([item.longitude,item.latitude], 'baidu',  (status, result)=> {
              if(result.info=="ok"){
                item.lacal=result.locations[0];
                // this.createPoint(item)
                // markerslist.push(this.createPoint(item))
                
                //  var path = [
                //     new AMap.LngLat(116.368904,39.913423),
                //     new AMap.LngLat(116.398258,39.904600)
                // ];
                // this.addPointGroup(markerslist);
              }
              //  this.createPoint(item)
              //  markerslist.push(this.createPoint(item))
            })
            
          }
          // console.log(markerslist)
          // this.myMap.add(markerslist)
          
        })
        
      }
      
    });
  },
    // lacal
    // new AMap.LngLat(row.longitude, row.latitude),
  createPoint(row) {
    let marker = new AMap.Marker({
      position: row.lacal,
      offset: new AMap.Pixel(-12, -16),
      icon: new AMap.Icon({
        size: new AMap.Size(24, 31),
        image:
          (row.type == 2&&row.isLack==1)
            ? require('../assets/image/icon4.png')
            : (row.type == 2&&row.isLack==0)?require('../assets/image/icon3.png')
            : (row.type == 1&&row.isLack==0)?require('../assets/image/icon1.png')
            :(row.type == 1&&row.isLack==1)?require('../assets/image/icon2.png'):require('../assets/image/icon5.png'),
        imageSize: new AMap.Size(24, 31)
      }), // 添加 Icon 图标 URL
      zIndex: 100,
      // map:this.myMap,
      extData: { row }
    })
    // touchstart
    marker.on("click", (e) => {
      // alert(2)
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
  .write{
    position:fixed;
    bottom:4px;
    left:0px;
    z-index:10;
    font-size:12px;
    font-family:PingFang SC;
    font-weight:500;
    width:100%;
    color:#666666;
    line-height:12px;
      p{
        text-align:center;
      }
    }
  .left-font{
    display:flex;
    align-items: center;
    margin-bottom:6px
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
    // margin-top:6px;
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
    // position: absolute;
    // left:0;
    // bottom:0;
    // right:0;
    padding:0 17px;
    // background:#fff;
    // z-index:20;
    .down-up{
      width:30px;
      height: 12px;
      padding:10px 20px;
    }
    .tab-list-wrapper{
      font-size:16px;
      margin-bottom: 80px;
      .title{
        text-align:left;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .list{
        display:flex;
        flex-wrap:wrap;
        span{
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(33,106,255,1);
          text-align:center;
          margin: 5px 0;
          img{
            width:17px;
            height:17px;
          }
        }
        &.list1{
          width:100%;
          span{
            padding: 8px 15px;
            color:#216AFF;
            margin-right:15px;
            border:1px solid rgba(33,106,255,1);
            border-radius:10px;
          }
        }   
        &.list2{
          span {
            padding: 8px 18px;
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
    .input-wrapper{
      display:flex;
      justify-content: flex-start;
      align-items:center;
      height: 44px;
      background:rgba(242,245,255,1);;
      border:1px solid rgba(224,224,224,1);
      border-radius:12px;
      img{
        width: 18px;
        height: 18px;
        padding: 10px 15px;
      }
      input{
        width: 280px;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
      }
    }
    
  }
  .search-wrapper1{
    position:absolute;
    top:10px;
    left:17px;
    width:340px;
    .input-wrapper{
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:#fff;
      height:44px;
      background:rgba(255,255,255,1);
      box-shadow:0px 1.5px 3.5px 0px rgba(0, 0, 0, 0.13);
      border-radius:6px;
      .go-back{
        display:flex;
        justify-content:center;
        align-items:center;
        padding: 10px;
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
        top:8px;
        right:5px;
        font-size:10px;
        padding:1px;
        height: 12px;
        line-height: 12px;;
        text-align: center;
        background:#FF1717;
        color:#fff;
        border-radius:12px;
      }
    }
  }
  .van-popup--right{
    width:80%;
  }
  .list-content{
    padding:20px 10px;
    .list-wrapper{
      padding-bottom: 15px;
      border-bottom:1px solid #dddddd;
      &:last-child{
        border:0
      }
      p{
        margin:13px 0;;
      }
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
          padding-right:8px;
        }
        span{
          text-align:left;
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
        background:#F2F5FF;
        padding:10px;
        p{
          display:flex;
          align-items:center;
          margin:0;
          margin-top:10px;
          &:first-child{
            margin-top:0;
          }
          img{
            
            width:16px;
            height:16px;
            padding-right:10px;
          }
          span {
            font-size:15px;
            color:#333;
          }
        }
      }
    }
  }
  .search-write{
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index:10;
    .img-icon{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #fff;
      box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.32);
      &:last-child{
        margin-top:10px;
      }
      span{
        font-size: 13px;
        color: #216AFF;
        padding-top: 1px;
      }
    }
  }
  .reduce-content{
    background:#2D65E3;
    padding-bottom:40px;
    .banner{
      width:100%;
      height: 125px;
    }
    .us-need-wrapper{
      margin: 0 12px;
      .us-need{
        background:#174FCE;
        border-radius:8px;
        margin-bottom: 15px;
        &.us{}
        &.need{}
        .title{
          display:flex;
          justify-content: center;
          align-items:center;
          height: 46px;
          font-size:17px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(255,255,255,1);
          color: #fff;
          .dot{
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #fff;
            margin-left: 3px;
          }
          .title-name{
            padding: 0 10px;
          }
        }
        .message{
          display:flex;
          justify-content: space-between;
          align-items:center;
          height:54px;
          margin: 0 29px;
          padding: 0 15px;
          font-size:15px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(232,245,255,1);
          background: #3A6FE5;
          border-radius: 3px;
          .name{}
          .tel{}
          .btn{
            display:flex;
            justify-content: center;
            align-items:center;
            width: 86px;
            height: 32.5px;
            background:url("../assets/image/block.png") no-repeat;
            background-size: 86px 32.5px;
            font-weight:bold;
            font-style:italic;
            
          }
        }
        .code{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items:center;
            padding-bottom: 18.5px;
          img{
            width: 63px;
            height: 63px;
            margin:10px 0;
          }
          .btn{
            font-size:12px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
          }
        }
        .form-wrapper{
          padding: 0 18.5px 30px;
          .van-cell{
            border-radius: 5px;
          }
          .form-input{
            display:flex;
            flex-direction:column;
            text-align: left;
            font-size:14px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            span{
              height: 39px;
              line-height: 39px;
              img{
                width: 10px;
                height: 10px;
                padding-right: 8px;
              }
            }
            input{

            }
          }
          .confirm-btn{
            width:150px;
            height:44px;
            text-align: center;
            line-height: 44px;
            color:#fff;
            font-size:18px;
            font-family:PingFang SC;
            font-weight:bold;
            background:linear-gradient(270deg,rgba(255,145,0,1) 0%,rgba(255,126,0,1) 53%,rgba(255,145,0,1) 100%);
            box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.05);
            border-radius:22px;
            margin: 30px auto 0;
          }
        }

      }
    }







    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    // margin-top: 100px;

    // img{
    //   width: 194px;
    //   height:147px;
    // }
    // p{
    //   font-size:15px;
    //   font-family:PingFang SC;
    //   font-weight:400;
    //   color:rgba(153,153,153,1);
    //   margin-top:23px;

    // }



  }
}
</style>
