<template>
    <div class="luru">
      <div class="reduce-content">
        <!-- <img class="down-up" src="../assets/image/reduce.png" alt="">
        <p>正在加紧开发...</p>
        <p>联系电话：18368091476</p>
        <img style="width:160px;height:160px" src="../assets/image/gzh.jpg" alt=""> -->
        <img style="" class="banner" src="../assets/image/banner.png" alt="">
        <div class="us-need-wrapper">
          <div class="us-need need">

            <!-- <div class="title">
              <span class="dot" v-for="(item,i) in 3" :key="i+'f'"></span>
              <span class="title-name">需求填写</span>
              <span class="dot" v-for="(item,i) in 3" :key="i+'g'"></span>
            </div> -->
            <div class="tab-btn">
              <span :class="curActiveIndex==i?'active':''" v-for="(item,i) in luruSelectData" :key="item.type+'tab'" @click="needTi(i)">{{item.name}}</span>
            </div>
            
            <div class="form-wrapper" v-if="curActiveIndex==0">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">医院名称</span>
                <van-field v-model="form1.hispotalName" type="text" placeholder="请填写" :error-message="errorMessage1.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form1.address" type="text" placeholder="省市" :error-message="errorMessage1.address"/>
                 <van-field readonly  clickablelabel="城市" placeholder="选择城市" @click="showPicker = true"/>
                    <van-popup v-model="showPicker" position="bottom">
                        <!-- vant Picker 根据 绑定的columns数据，来渲染几级联动，这里我们使用的是三级联动 -->
                        <van-picker v-if="pageShow" show-toolbar :columns="columns" @cancel="onCancel"
            @confirm="onConfirm" @change="onChange" :item-height="35" />
                    </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form1.addressDetail" type="text" placeholder="街道、门牌号等" :error-message="errorMessage1.addressDetail"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">类型</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form1.type" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruTypeRadio" :key="i+item.name">

                    <van-radio :name="item.i" checked-color="#07c160">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资对接情况</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form1.sup" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSupRadio" :key="i+item.name">
                    <van-radio :name="item.i" checked-color="#07c160" shape="square">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求表</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top">

                    <div class="comfirm-need-head">
                      <div class="name">物资名称</div>
                      <div class="num">需求数量</div>
                    </div>
                    <div class="comfirm-need-body">
                      <div class="name"><van-field class="sup-name" v-model="form1.needList.name" type="text" placeholder="输入物资名称" input-align="center"/></div>
                      <div class="num"><van-field class="sup-num" v-model="form1.needList.num" type="text" placeholder="请输入" input-align="center" /><img style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom"><img style="" src="../assets/image/add1.png" alt="">添加</div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input">
                    <van-field class="contect" v-model="form1.contectTelList.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="form1.contectTelList.tel" type="text" placeholder="输入电话号码(建议手机)" />
                    
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求发布时间</span>
                <van-field v-model="form1.startTime" placeholder="选择时间" readonly @click="startTimePop = true"/>
                <van-popup v-model="startTimePop" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @confirm="confirmTime"
                    @cancel="cancelTime"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求来源</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form1.needOrgin" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSourceRadio" :key="i+item.name">
                    <van-radio :name="item.i" checked-color="#07c160">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求证明</span>
                <div class="need-img-wrapper">
                  <img style="" src="../assets/image/reduce2.png" alt="">
                  <div class="need-img-list">
                    <img style="" src="../assets/image/add2.png" alt="">
                  </div>
                  <img style="" src="../assets/image/add2.png" alt="">
                  <span>最多可上传5张</span>
                </div>
              </div>
              <div class="confirm-btn" @click="confirm">提交</div>
            </div>
            <div class="form-wrapper" v-if="curActiveIndex==1">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">提供方名称</span>
                <van-field v-model="form2.hispotalName" type="text" placeholder="请填写" :error-message="errorMessage2.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form2.address" type="text" placeholder="省市" :error-message="errorMessage2.address"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form2.addressDetail" type="text" placeholder="街道、门牌号等" :error-message="errorMessage2.addressDetail"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">类型</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.type" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruTypeRadio1" :key="i+item.name">

                    <van-radio :name="item.i" checked-color="#07c160">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资提供方式</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.sup" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSupRadio1" :key="i+item.name">
                    <van-radio :name="item.i" checked-color="#07c160" shape="square">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">是否需要物流</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.sup1" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruneedRadio" :key="i+item.name">
                    <van-radio :name="item.i" checked-color="#07c160" shape="square">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求表</span>
                <div class="comfirm-need-input-wrapper">
                  <div class="comfirm-need-top">

                    <div class="comfirm-need-head">
                      <div class="name">物资名称</div>
                      <div class="num">需求数量</div>
                    </div>
                    <div class="comfirm-need-body">
                      <div class="name"><van-field class="sup-name" v-model="form2.needList.name" type="text" placeholder="输入物资名称" input-align="center"/></div>
                      <div class="num"><van-field class="sup-num" v-model="form2.needList.num" type="text" placeholder="请输入" input-align="center" /><img style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom"><img style="" src="../assets/image/add1.png" alt="">添加</div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input">
                    <van-field class="contect" v-model="form2.contectTelList.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="form2.contectTelList.tel" type="text" placeholder="输入电话号码(建议手机)" />
                    
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资提供时间</span>
                <van-field v-model="form2.startTime" placeholder="选择时间" readonly @click="startTimePop = true"/>
                <van-popup v-model="startTimePop" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @confirm="confirmTime"
                    @cancel="cancelTime"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span>身份证明</span>
                <div class="need-img-wrapper">
                  <img style="" src="../assets/image/reduce2.png" alt="">
                  <div class="need-img-list">
                    <img style="" src="../assets/image/add2.png" alt="">
                  </div>
                  <img style="" src="../assets/image/add2.png" alt="">
                  <span>企业提供方请上传营业执照照片，非人提供方请上传身份证正反面照片</span>
                </div>
              </div>
              <div class="confirm-btn" @click="confirm">提交</div>
            </div>
            <div class="form-wrapper" v-if="curActiveIndex==2">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">机构名称</span>
                <van-field v-model="form3.hispotalName" type="text" placeholder="请填写" :error-message="errorMessage3.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form3.address" type="text" placeholder="省市区" :error-message="errorMessage3.address"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form3.addressDetail" type="text" placeholder="街道、门牌号等" :error-message="errorMessage3.addressDetail"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">服务覆盖范围</span>
                <van-field v-model="form3.rang" type="text" placeholder="输入例如：山东全省16个地市" :error-message="errorMessage3.rang"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">请选择可提供服务的起始日期</span>
                <van-field v-model="form3.startTiTime" placeholder="选择时间" readonly @click="startTimePop = true"/>
                <van-popup v-model="startTimePop" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @confirm="confirmTime"
                    @cancel="cancelTime"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">请选择可提供服务的结束日期</span>
                <van-field v-model="form3.endTiTime" placeholder="选择时间" readonly @click="startTimePop = true"/>
                <van-popup v-model="startTimePop" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @confirm="confirmTime"
                    @cancel="cancelTime"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">机构类型</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form3.type" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruOriginizeTypeRadio" :key="i+item.name">

                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span>链接</span>
                <van-field v-model="form3.linkUrl" type="textarea" placeholder="请填写" :error-message="errorMessage3.linkUrl" @blur="formBlur(5)"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input">
                    <van-field class="contect" v-model="form3.contectTelList.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="form3.contectTelList.tel" type="text" placeholder="输入电话号码(建议手机)" />
                    
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">服务提供类型</span>
                <div class="comfirm-radio">
                  <van-checkbox-group v-model="form3.supContect" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruOriginizeSupRadio" :key="i+item.name">
                    <van-checkbox shape="square" checked-color="#2D65E3" :name="item.id">{{item.name}}</van-checkbox>
                    </div>
                   </van-checkbox-group>
                  <div class="author">
                    <span>备注(若选择其他，请填写备注)</span>
                    
                    <van-field v-model="form3.author" type="textarea" class="author-textarea" placeholder="请输入例如：枢纽组织" :error-message="errorMessage3.author" @blur="formBlur(5)"/>
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span>其他说明</span>
                <van-field v-model="form3.authorWrite" type="textarea" placeholder="请填写" :error-message="errorMessage3.authorWrite" @blur="formBlur(5)"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">身份证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="form3.fileList"
                    multiple
                    :max-count="2"
                    :after-read="afterRead"
                  />
                  <!-- <span>企业提供方请上传营业执照照片，非人提供方请上传身份证正反面照片</span> -->
                </div>
              </div>
              <div class="confirm-btn" @click="confirmthree">提交</div>
            </div>

          </div>
        </div>
        
        
      </div>
    </div>
</template> 

<script>
import json from "@/libs/city_code.json"
export default {
  data() {
    return {
      allCity:json,
      showPicker:false,
      pageShow:false,
      form1:{ // 录入表单
        hispotalName:'',
        address:'',
        addressDetail:"",
        type:'',
        sup:'',
        needList:{
            name:'',
            num:'',
        },
        contectTelList:{
            name:'',
            tel:'',
        },
        startTime:'',
        needOrgin:'',
        needImg:'',

      },
      errorMessage1:{
        hispotalName:'',
        address:'',
        addressDetail:"",
        type:'',
        sup:'',
        needList:{
            name:'',
            num:''
        },
        contectTelList:{
            name:'',
            tel:''
        },
        startTime:'',
        needOrgin:'',
        needImg:'',
      },
      form2:{ // 录入表单
        hispotalName:'',
        address:'',
        addressDetail:"",
        type:'',
        sup:'',
        sup1:'',
        needList:{
            name:'',
            num:''
        },
        contectTelList:{
            name:'',
            tel:''
        },
        startTime:'',
        needOrgin:'',
        needImg:'',

      },
      errorMessage2:{
        hispotalName:'',
        address:'',
        addressDetail:"",
        type:'',
        sup:'',
        needList:{
            name:'',
            num:'',
        },
        contectTelList:{
            name:'',
            tel:'',
        },
        startTime:'',
        needImg:'',
      },
      form3:{ // 录入表单
        materialType:3,//民间组织
        name:'',//机构名称
        province:'',//省
        city:'',//省
        address:'',//地址
        serviceRange:"",//覆盖范围
        rang:'',
        startTiTime:'',
        endTiTime:'',
        type:'',
        linkUrl:'',
        contectTelList:{
            name:'',
            tel:'',
        },
        fileList:[],
        supContect:[],
        author:'',
        authorWrite:'',

      },
      errorMessage3:{
        hispotalName:'',
        address:'',
        addressDetail:"",
        rang:'',
        startTiTime:'',
        endTiTime:'',
        type:'',
        linkUrl:'',
        
        contectTelList:{
            name:'',
            tel:'',
        },
        startTime:'',
        supContect:[],
        author:'',
        authorWrite:'',
      },
      luruSelectData:[ //录入选择数据
        {
          name: "我是需求方",
          type:1
        },{
          name: "我是提供方",
          type:2
        },{
          name: "我是民间组织",
          type:3
        }
      ],
      luruTypeRadio:[ //录入类型单选数据
        {
          id:1,
          name:"定点医院"
        },{
          id:2,
          name:"发热门诊"
        },{
          id:3,
          name:"防空指挥部"
        },{
          id:4,
          name:"普通医院"
        },
      ], 
      luruTypeRadio1:[ //录入类型单选数据
        {
          id:1,
          name:"企业"
        },{
          id:2,
          name:"个人"
        },{
          id:3,
          name:"公益组织"
        },{
          id:4,
          name:"海外组织"
        },
      ], 
      luruSupRadio:[ //录入物资对接情况单选数据
        {
          id:1,
          name:"接受个人捐赠"
        },{
          id:2,
          name:"接受企业捐赠"
        },{
          id:3,
          name:"接受采购"
        },
      ], 
      luruSupRadio1:[ //录入物资对接情况单选数据
        {
          id:1,
          name:"捐赠"
        },{
          id:2,
          name:"采购"
        },
      ], 
      luruneedRadio:[ //录入需求来源单选数据
        {
          id:1,
          name:"是"
        },{
          id:2,
          name:"否"
        }
      ],
      luruSourceRadio:[ //录入需求来源单选数据
        {
          id:1,
          name:"政府发布"
        },{
          id:2,
          name:"医院官方渠道"
        },{
          id:3,
          name:"公益平台"
        },{
          id:4,
          name:"微信公众号"
        },{
          id:5,
          name:"其他"
        },
      ],
      currentDate:new Date(),
      startTime:'',
      minDate: new Date(),
      startTimePop:false,
      curActiveIndex:0, // 录入头部切换当前index
      luruOriginizeTypeRadio:[ // 录入机构类型单选数据
        {
          id:1,
          name:"民间组织"
        },{
          id:2,
          name:"志愿者团队"
        },{
          id:3,
          name:"企业"
        },

      ],
      luruOriginizeSupRadio:[ // 录入机构类型单选数据
        {
          id:1,
          name:"医疗救助"
        },{
          id:2,
          name:"心理干预"
        },{
          id:3,
          name:"物资发放"
        },{
          id:4,
          name:"疫情排查"
        },{
          id:5,
          name:"宣传倡导"
        },{
          id:6,
          name:"社区服务"
        },{
          id:7,
          name:"其他服务"
        },

      ],

    };
  },
  created() {
  },
 mounted () {
     console.log(this.allCity)
  },
  methods:{
    // 录入需求提供切换
    needTi(type){
      this.curActiveIndex=type
    },
    //民间组织上传图片之后
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(this.form3.fileList);
    },
    confirmthree(){
        console.log(this.form3.fileList);
    },
    // 录入表单提交
    confirm(){
      if (this.clickTabPoint) {

        this.formVil()
        if (this.form.company && this.form.address && this.form.people && this.form.tel && this.form.need) {
  
          let params= {
            cmpyName:this.form.company,
            address:this.form.address,
            linkPeople:this.form.people,
            linkTel:this.form.tel,
            descr:this.form.need,
            mark:this.curTabIndex
  
          }
          
          this.$fetchPost("infoApply/save",params).then(res=> {
            if (res.code=="success") {
              this.$toast(res.message);
              this.form.company=''
              this.form.address=''
              this.form.people=''
              this.form.tel=''
              this.form.need=''
              this.reduceShow=false
            } else  if (res.code=="error") {
              this.$toast(res.message);
            } else  if (res.code==504) {
              this.$toast(res.message);
            }
          })
  
        } else {
          this.$toast('请完善信息');
        }
      } else {
          this.$toast('请选择提交申请方');

      }

    },
      
    // 点击确定
    confirmTime() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate() +
        " " +
        this.currentDate.getHours() +
        ":" +
        this.currentDate.getMinutes();
    },
    // 处理控件显示的时间格式
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
    // 点击取消
    cancelTime() {
      this.startTimePop = false;
    },

  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
.luru{
    
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
        .tab-btn {
          display:flex;
          justify-content: space-between;
          align-items:center;
          height: 40px;
          span{
            width: 33%;
            font-size:16px;
            text-align: center;
            line-height: 40px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(80,133,252,1);
            border-right: 1px solid #fff;
            background: #0F46C0;
            &:last-child{
              border: 0;
            }
            &.active{
              background: #174FCE;
              color: #fff;
              border: 0;
            }

          }

        }
        .message{
          display:flex;
          justify-content: space-between;
          align-items:center;
          margin: 0 29px;
          padding: 10px;
          font-size:15px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(232,245,255,1);
          background: #3A6FE5;
          border-radius: 3px;
          // border-top-left-radius: 3px;
          // border-top-right-radius: 3px;
          // &:first-child {
            margin-bottom:1px;
            // border-bottom-right-radius: 3px;
            // border-bottom-left-radius: 3px;
          // }
          .message-content{
            display:flex;
            flex-direction: column;
            justify-content: flex-start;
            .name-tel{
            display:flex;
            justify-content: flex-start;

              .name{}
              .tel{
                padding-left: 10px;
              }
            }
            .job{
              font-size: 13px;
              text-align:left;
            }
          }
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
            .comfirm-radio{
              background: #fff;
              border-radius: 5px;
              padding: 6px 10px;
              .radio-group{
                display:flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .sig-radio{
                  width: 50%;
                  padding: 6px 0;
                }
              }
              .author{
                span{
                  font-size:13px;
                  font-family:PingFang SC;
                  font-weight:500;
                  color:rgba(153,153,153,1);
                }
                .author-textarea{
                  background: #F2F2F2;
                }
              }
            }
            .comfirm-input-wrapper{
              .comfirm-input{
                display:flex;
                justify-content: space-between;
                align-items: center;
                .contect{
                  width: 105px;
                }
                .tel{
                  width: 192px;
                }
              }
            }
            .comfirm-need-input-wrapper{
              background:#fff;
              border-radius: 5px;
              font-size:15px;
              font-family:PingFang SC;
              font-weight:400;
              color:rgba(51,51,51,1);
              .comfirm-need-top{
                .name{
                  display: flex;
                  justify-content: center;
                  align-items:center;
                  width: 189px;
                  border-right: 1px solid #F1F2F5;
                }
                .num{
                  display: flex;
                  justify-content: center;
                  align-items:center;
                  width: 124px;

                }
                .comfirm-need-head{
                  display: flex;
                  justify-content: flex-start;
                  height: 30px;
                  background:#E5EAF2;
                  border-top-left-radius:5px;
                  border-top-right-radius:5px;
                  border-bottom: 1px solid #F1F2F5;
                  .name{}
                  .num{}

                }
                .comfirm-need-body{
                  display: flex;
                  justify-content: flex-start;
                  border-bottom: 1px solid #F1F2F5;
                  .name{
                    .sup-name{}
                  }
                  .num {
                    display: flex;
                    justify-content: center;
                    align-items:center;
                    .sup-num,.sup-name {
                      text-align:center;

                    }
                    img{
                      width:15px;
                      height: 15px;
                      padding-right: 5px;

                    }
                  }
                  
                }
              }
              .comfirm-need-bottom{
                height: 30px;
                display: flex;
                justify-content:center;
                align-items:center;
                font-size:15px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(102,102,102,1);
                img{
                  width: 15px;
                  height: 15px;
                  margin-right:5px;
                }

              }

            }
            .need-img-wrapper{
              display:flex;
              justify-content: flex-start;
              img{
                width:44px;
                height:44px;
                border-radius:5px;
                margin-right: 5px;
              }
              span{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(118,160,255,1);
                line-height: 14px;
              }
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
