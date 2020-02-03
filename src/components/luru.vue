<template>
    <div class="luru">
      <!-- 防止过快的切换 -->
    <van-overlay :z-index="30" :show="showimg">
      <div class="wrapperfast" >
        <van-loading size="64px" color="#1989fa"></van-loading>
      </div>
    </van-overlay>
    <van-dialog v-model="showresult" title="提交成功">
      <div>我们将尽快与您联系<br>审核通过后，平台可见</div>
    </van-dialog>
    <!-- 防止过快的切换 -->
      <div class="reduce-content">
        <img style="" class="banner" src="../assets/image/banner.png" alt="">
        <div class="us-need-wrapper">
          <div class="us-need need">
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
                <van-field v-model="form1.address" type="text" readonly placeholder="省市" :error-message="errorMessage1.address" @click="showPicker = true"/>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar  :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
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

                    <van-radio :name="item.id" checked-color="#2D65E3" :label="item.name" @click="secectRadio(item.id)">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资对接情况</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form1.sup" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSupRadio" :key="i+item.name">
                    <van-radio :name="item.id" checked-color="#2D65E3" shape="square">{{item.name}}</van-radio>
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
                    <div class="comfirm-need-body" v-for="(iteam,index) in form1.materialDetails" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        <van-field class="sup-name" readonly v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center" @click="selectNeedName(index)"/>
                        <van-popup v-model="startTimePopNeedName" position="bottom">
                        <van-picker show-toolbar :columns="needList" @confirm="confirmNeedName" @cancel="cancleNeedName" @change="changeNeedName" />
                        </van-popup>
                      </div>
                      <div class="num"><van-field class="sup-num" v-model="iteam.needsNum" type="number" placeholder="请输入数字" testnum input-align="center" /><img @click="deleteDemand(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addDemand"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input" v-for="(item,i) in form1.contectTelList" :key="i">
                    <van-field class="contect" v-model="item.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="item.tel" type="text" placeholder="输入电话号码(建议手机)" @blur="linkTelBlur(1,item.tel)"/>
                    
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
                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">需求证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="form1.fileList"
                    multiple accept="image/*"
                    :after-read="xuRead" 
                    @delete="xudelete"
                    :max-count="5"
                  />
                </div>
                  <span class="desc">最多可上传5张</span>
              </div>
              <div class="confirm-btn" @click="confirmone">提交</div>
            </div>
            <div class="form-wrapper" v-if="curActiveIndex==1">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">提供方名称</span>
                <van-field v-model="form2.hispotalName" type="text" placeholder="请填写" :error-message="errorMessage2.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form2.address" type="text" readonly placeholder="省市" :error-message="errorMessage2.address" @click="showPicker1 = true"/>
                <van-popup v-model="showPicker1" position="bottom">
                    <van-picker show-toolbar :columns="columns" @cancel="onCancel1" @confirm="onConfirm1" @change="onChange1" />
                </van-popup>
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

                    <van-radio :name="item.id" checked-color="#2D65E3">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资提供方式</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.sup" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruSupRadio1" :key="i+item.name">
                    <van-radio :name="item.id" checked-color="#2D65E3" shape="square">{{item.name}}</van-radio>
                    </div>
                  </van-radio-group>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">是否需要物流</span>
                <div class="comfirm-radio">
                  <van-radio-group v-model="form2.sup1" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruneedRadio" :key="i+item.name">
                    <van-radio :name="item.id" checked-color="#2D65E3" shape="square">{{item.name}}</van-radio>
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
                    <div class="comfirm-need-body" v-for="(iteam,index) in form2.materialDetails" :key="index">
                      <div class="name">
                        <!-- <van-field class="sup-name" v-model="iteam.needsName" type="text" placeholder="输入物资名称"   input-align="center"/> -->

                        
                        <van-field class="sup-name" v-model="iteam.needsName" readonly type="text" placeholder="输入物资名称"   input-align="center" @click="selectNeedName1(index)"/>
                        <van-popup v-model="startTimePopNeedName" position="bottom">
                        <van-picker show-toolbar :columns="needList" @confirm="confirmNeedName1" @cancel="cancleNeedName" @change="changeNeedName1" />
                        </van-popup>
                      </div>
                      <div class="num"><van-field class="sup-num" v-model="iteam.needsNum" type="number" placeholder="请输入数字" testnum input-align="center" /><img @click="deleteDemand1(index)" style="" src="../assets/image/reduce1.png" alt=""></div>
                    </div>
                  </div>
                  <div class="comfirm-need-bottom" @click="addDemand1"><img style="" src="../assets/image/add1.png" alt="" >添加</div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input" v-for="(item,i) in form2.contectTelList" :key="i">
                    <van-field class="contect" v-model="item.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="item.tel" type="text" placeholder="输入电话号码(建议手机)"  @blur="linkTelBlur(2,item.tel)"/>
                    
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">物资提供时间</span>
                <van-field v-model="form2.startTime" placeholder="选择时间" readonly @click="startTimePopNeed = true"/>
                <van-popup v-model="startTimePopNeed" position="bottom">
                  <van-datetime-picker
                    v-model="currentDateNeed"
                    type="datetime"
                    :min-date="minDate"
                    @confirm="confirmTimeNeed"
                    @cancel="cancelTimeNeed"
                    :formatter="formatter"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">身份证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="form2.fileList"
                    multiple accept="image/*"
                    :after-read="tiRead" 
                    @delete="tidelete"
                    :max-count="2"
                  />
                </div>
                  <span class="desc">企业提供方请上传营业执照照片，非人提供方请上传身份证正反面照片</span>
              </div>
              <div class="confirm-btn" @click="confirmtwo">提交</div>
            </div>
            <div class="form-wrapper" v-if="curActiveIndex==2">
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">机构名称</span>
                <van-field v-model="form3.name" type="text" placeholder="请填写" :error-message="errorMessage3.hispotalName"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">所在地区</span>
                <van-field v-model="form3.address2" type="text" readonly placeholder="省市" :error-message="errorMessage3.address2" @click="showPicker = true"/>
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="columns" @cancel="onCancel" @confirm="onConfirm3" @change="onChange" />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">详细地址(门牌号)</span>
                <van-field v-model="form3.address" type="text" placeholder="街道、门牌号等" :error-message="errorMessage3.address"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">服务覆盖范围</span>
                <van-field v-model="form3.serviceRange" type="text" placeholder="输入例如：山东全省16个地市" :error-message="errorMessage3.serviceRange"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">请选择可提供服务的起始日期</span>
                <van-field v-model="form3.startTime" placeholder="选择时间" readonly @click="startTimePop3 = true"/>
                <van-popup v-model="startTimePop3" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate3"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :formatter="formatter1"
                    @confirm="quemsg"
                    @cancel="startTimePop3 = false"
                  />
                </van-popup>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">请选择可提供服务的结束日期</span>
                <van-field v-model="form3.endTime" placeholder="选择时间" readonly @click="startTimePop4 = true"/>
                <van-popup v-model="startTimePop4" position="bottom">
                  <van-datetime-picker
                    v-model="currentDate1"
                    type="date"
                    :min-date="minDate1"
                    @confirm="quemsg2"
                    @cancel="startTimePop4 = false"
                    :formatter="formatter1"
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
                <van-field v-model="form3.linkUrl" type="textarea" placeholder="请填写" :error-message="errorMessage3.linkUrl"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">联系人-联系方式</span>
                <div class="comfirm-input-wrapper">
                  <div class="comfirm-input" v-for="(item,i) in form3.contectTelList" :key="i">
                    <van-field class="contect" v-model="item.name" type="text" placeholder="输入联系人" />-
                    <van-field class="tel" v-model="item.tel" type="text" placeholder="输入电话号码(建议手机)" @blur="checkTel(i,item.tel)" />
                    
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">服务提供类型</span>
                <div class="comfirm-radio">
                  <van-checkbox-group @change="changetype" v-model="form3.materialDetails1" class="radio-group">
                    <div class="sig-radio" v-for="(item,i) in luruOriginizeSupRadio" :key="i+item.name">
                    <van-checkbox shape="square" checked-color="#2D65E3" :name="item.name">{{item.name}}</van-checkbox>
                    </div>
                   </van-checkbox-group>
                  <div class="author">
                    <span>备注(若选择其他，请填写备注)</span>
                    <van-field v-model="form3.needsDescr" type="textarea" class="author-textarea" placeholder="请输入例如：枢纽组织" :error-message="errorMessage3.author"/>
                  </div>
                </div>
              </div>
              <div class="form-input">
                <span>其他说明</span>
                <van-field v-model="form3.descr" type="textarea" placeholder="请填写" :error-message="errorMessage3.authorWrite"/>
              </div>
              <div class="form-input">
                <span><img style="" src="../assets/image/star.png" alt="">身份证明</span>
                <div class="need-img-wrapper">
                  <van-uploader
                    v-model="filst"
                    :after-read="saRead" 
                    @delete="sadelete"
                    :max-count="2"
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
      startTimePop3:false,
      startTimePop4:false,
      showPicker1:false,
      testindex:0,
      testindex1:0,
      testnum:'',
      form1:{ // 录入表单
      selectItem:'',
        hispotalName:'',
        province:'',//省
        city:'',//市
        address:'',
        addressArr:[],
        addressDetail:"",
        materialDetails:[
          {
            needsName:'',
            needsNum:'',
          }
        ],//需求表
        type:4,
        sup:1,
        needList:{
            name:'',
            num:'',
        },
        contectTelList:[
            {
                name:'',
                tel:'',
            },
            {
                name:'',
                tel:'',
            },
            {
                name:'',
                tel:'',
            },
        ],
        fileList:[],
        startTime:'',
        needOrgin:1,
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
      showresult:false,
      form2:{ // 录入表单
      selectItem:'',
        hispotalName:'',
        addressArr:[],
        province:'',//省
        city:'',//市
        address:'',
        addressDetail:"",
        type:3,
        sup:4,
        sup1:1,
        materialDetails:[
          {
            needsName:'',
            needsNum:'',
          }
        ],//需求表
        needList:{
            name:'',
            num:''
        },
        contectTelList:[
            {
                name:'',
                tel:'',
            },
            {
                name:'',
                tel:'',
            },
            {
                name:'',
                tel:'',
            },
        ],
        fileList:[],
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
      filst:[],
      form3:{ // 录入表单
        materialType:3,//民间组织
        name:'',//机构名称
        province:'',//省
        city:'',//市
        address2:'',
        address:'',//地址
        serviceRange:"",//覆盖范围
        picUrl:'',
        startTime:'',
        endTime:'',
        type:1,
        linkUrl:'',
        longitude:'',
        latitude:'',
        descr:'',//备注
       contectTelList:[
            {
                name:'',
                tel:'',
            },
            {
                name:'',
                tel:'',
            },
            {
                name:'',
                tel:'',
            }
        ],
        linkPeople:'',
        materialDetails:[],
        materialDetails1:[],
      },
      meedUrlArr:[],
      meedUrlArr1:[],
      meedUrlArr2:[],
      errorMessage3:{
        hispotalName:'',
        address:'',
        address2:'',
        addressDetail:"",
        serviceRange:'',
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
      showimg:false,
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
          id:4,
          name:"定点医院"
        },{
          id:5,
          name:"发热门诊"
        },{
          id:6,
          name:"防空指挥部"
        },{
          id:7,
          name:"普通医院"
        },
      ], 
      luruTypeRadio1:[ //录入类型单选数据
        {
          id:3,
          name:"企业"
        },{
          id:8,
          name:"个人"
        },{
          id:9,
          name:"公益组织"
        },{
          id:10,
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
          id:4,
          name:"捐赠"
        },{
          id:5,
          name:"采购"
        },
      ], 
      luruneedRadio:[ //录入需求来源单选数据
        {
          id:1,
          name:"是"
        },{
          id:0,
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
      maxDate: new Date(2025, 10, 1),
      startTimePop:false,
      currentDate1:new Date(),
      startTimePopNeed:false,
      currentDateNeed:new Date(),


      currentDate3:new Date(),
      startTime1:'',
      minDate1: new Date(),
      startTimePop1:false,
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
      columns:[
          
        {
            values: '',
            className: 'column1'
        },
        {
            values: '',
            className: 'column2',
            defaultIndex: 0
        },
      ],
      needList:["N95口罩","外科口罩","一次性医用口罩","隔离衣","一次性手术衣","医用帽","护目镜","防护眼罩","防护面罩","医用手套","防污染鞋套","长筒防护靴","测温仪","84消毒液","75%浓度酒精","一次性消毒床罩","消毒设备","对口药品","负压担架","负压救护车","消洗设备","全面型呼吸防护器","其他"],
      currentCity:[],
      startTimePopNeedName:false,
      selectIndex:0,
      selectIndex1:0,
      contectTelPoint:0,
      contectTelPoint1:0,

    };
  },
  props:['curTabIndex'],
  created() {
  },
  watch:{
    'curTabIndex':{
      deep:true,
      handler(newV,oldV){
        this.curActiveIndex=newV
      }
    }
  },
 computed: {
  curActiveIndex1: function () {
   return this.curActiveIndex // 监听switchStatusData 的变化
  }
 },
 mounted () {
//    this.curActiveIndex=this.curTabIndex
     this.columns[0].values = Object.values(this.allCity).map(function(e){
        return {text:e.name}
    })
    // 默认展示二级的数据
    if (this.allCity[0].city){
        this.columns[1].values = Object.values(this.allCity[0].city).map(function(e){
            return {text:e.name}
        })
    }
  },
methods:{
confirmNeedName(value){
  this.startTimePopNeedName=false
  this.form1.materialDetails[this.selectIndex].needsName=value

},
//地址解析
addresschange(address){
  var geocoder = new AMap.Geocoder();
  geocoder.getLocation(address, (status, result)=> {
      if (status === 'complete'&&result.geocodes.length) {
       
        let lnglat = result.geocodes[0].location
        //  return lnglat
         this.form3.longitude=lnglat.lng
         this.form3.latitude=lnglat.lat
         this.$fetchPost("material/save",this.form3,'json').then(res=> {
            this.$toast(res.message);
            if(res.code=="success"){
              this.showresult=true
            }
        })
         
      }else{
          // log.error('根据地址查询位置失败');
      }
  });
},
cancleNeedName(){
  this.startTimePopNeedName=false
},
changeNeedName(picker, value, index){
  this.form1.selectItem=value
},
selectNeedName(i){
  this.startTimePopNeedName=true
  this.selectIndex=i
},

confirmNeedName1(value){
  this.startTimePopNeedName=false
  this.form2.materialDetails[this.selectIndex1].needsName=value

},
cancleNeedName1(){
  this.startTimePopNeedName=false
},
changeNeedName1(picker, value, index){
  this.form2.selectItem=value
},
selectNeedName1(i){
  this.startTimePopNeedName=true
  this.selectIndex1=i
},
linkTelBlur(type,tel){
      
      var strTel=/^[\d\-]+$/g
        if (!strTel.test(tel)){
            this.contectTelPoint=1
            this.contectTelPoint1=1
            this.$toast('当前填写电话格式有误')
        }

    },
    secectRadio(index){
        this.form1.type=index
    },
    onConfirm(value){
        this.showPicker=false
        this.form1.address=value[0].text+value[1].text
        this.form1.province=value[0].text
        this.form1.city=value[1].text

    },
    onConfirm1(value){
        this.showPicker1=false
        this.form2.address=value[0].text+value[1].text
        this.form2.province=value[0].text
        this.form2.city=value[1].text

    },
    //验证手机号的格式
    checkTel(index,tel)
      {
        var strTel=/^[\d\-]+$/g
        if (!strTel.test(tel)){
            this.form3.contectTelList[index].tel=""
            this.$toast('当前填写电话格式有误')
        }
      },
    //添加需求表
    addDemand(){
      if(this.form1.materialDetails[this.testindex].needsName==''||this.form1.materialDetails[this.testindex].needsNum==''){
        this.$toast('请完善信息');
      }else{
        this.testindex++
        this.form1.materialDetails.push({
          needsName:'',
          needsNum:'',
        })
      }
    },
    //删除需求表
    deleteDemand(index){
      if(this.testindex<1){
        this.form1.materialDetails[index].needsName=''
        this.form1.materialDetails[index].needsNum=''
        this.$toast('至少添加一条需求');
      }else{
        this.form1.materialDetails.splice(index,1)
        this.testindex--
      }
      
    },
    //添加需求表
    addDemand1(){
      if(this.form2.materialDetails[this.testindex1].needsName==''||this.form2.materialDetails[this.testindex1].needsNum==''){
        this.$toast('请完善信息');
      }else{
        this.testindex1++
        this.form2.materialDetails.push({
          needsName:'',
          needsNum:'',
        })
      }
    },
    //删除需求表
    deleteDemand1(index){
      if(this.testindex1<1){
        this.form2.materialDetails[index].needsName=''
        this.form2.materialDetails[index].needsNum=''
        this.$toast('至少添加一条需求');
      }else{
        this.form2.materialDetails.splice(index,1)
        this.testindex1--
      }
    },
      
    //民间组织添加省市
    onConfirm3(value){
      this.showPicker=false
      this.form3.address2=value[0].text+value[1].text
      this.form3.province=value[0].text
      this.form3.city=value[1].text
    },
    //民间组织选择时间
    quemsg(val){
      this.startTimePop3 = false
      this.form3.startTime=this.utiltime(val)
    },
    // 民间组织选择时间
    quemsg2(val) {
      this.startTimePop4 = false;
     this.form3.endTime=this.utiltime(val)
    },
    //服务提供类型
    changetype(){
    },
    //格式化时间
    utiltime(date){
      let nstr = new Date(date) //当天时间
      let now_year = nstr.getFullYear() //年份
      let now_month =
        nstr.getMonth() + 1 < 10
          ? '0' + (nstr.getMonth() + 1)
          : nstr.getMonth() + 1 //月份
      let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() //日期
      return (
        now_year +
        '-' +
        now_month +
        '-' +
        now_day
      )
    },
    confirmTime31(val){

    },
    onChange(picker, values,index){
          picker.setColumnValues(1,this.cityDate(this.allCity,values[0].text))
          
        this.form1.addressArr=values
    }, 
    onChange1(picker, values,index){
          picker.setColumnValues(1,this.cityDate(this.allCity,values[0].text))
          
        this.form2.addressArr=values
    }, 
    cityDate(data,province){
          var x=[]
          data.forEach(function(res){
              if (res.city){

                  if(res.name == province){
                      for (let i = 0; i < res.city.length; i++) {
                          let obj = {}
                          obj.text = res.city[i].name
                          x.push(obj);
                      }
          
                      
                  }
              }
          })
          return x
      },
    onCancel(){
        this.showPicker=false
    },
    onCancel1(){
        this.showPicker1=false
    },
    // 录入需求提供切换
    needTi(type){
      this.curActiveIndex=type
    },
    //民间组织录入身份证明
    uploadImgsa (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPostFile("material/saveFiles",formdata1).then(res=> {
            this.$toast("图片上传成功");
            if(res.code=='success'){
              this.meedUrlArr.push(res.content)
              this.showimg=false
            }
            
        })
    },
    saRead(val){
      this.showimg=true
      console.log(val.content)
      this.uploadImgsa(val.file)
    },
    //删除图片的回调
    sadelete(val){
      this.showimg=true
      let formdata1 = new FormData();
      formdata1.append('files', val.file);
      this.$fetchPostFile("material/saveFiles",formdata1).then(res=> {
          if(res.code=='success'){
            this.$toast("图片删除成功");
            this.meedUrlArr.splice(this.meedUrlArr.findIndex(item => item === res.content), 1)
            this.showimg=false
          }
         
      })
    },
    confirmthree(){
      let arr=[]
      if(this.form3.name==""||this.form3.province==""||this.form3.city==""
      ||this.form3.address==""||this.form3.serviceRange==""||
      this.form3.startTime==""||this.form3.endTime==""||this.form3.materialDetails1.length==0||this.meedUrlArr.length==0){
        this.$toast('请完善信息');
      }else if(this.form3.contectTelList[0].tel==""&&this.form3.contectTelList[1].tel==""&&this.form3.contectTelList[2].tel==""){
        this.$toast('请至少输入一位联系人');
      }else{
        this.form3.materialDetails1.forEach(iteam=>{
          let obj={}
          if(iteam=="其他服务"){
            obj.needsName=iteam
            obj.needsNum=null
            obj.descr=this.form3.needsDescr
          }else{
            obj.needsName=iteam
            obj.needsNum=null
            obj.descr=null
          }
          this.form3.materialDetails.push(obj)
          
        }),
        this.form3.contectTelList.forEach(item=>{
          if(item.tel!==''){
            arr.push(item.name+":"+item.tel)
          }
        }),
        this.form3.linkPeople=arr.join(",")
        this.form3.picUrl=this.meedUrlArr.join(",")
        this.addresschange(this.form3.province+this.form3.city+this.form3.address)
        
      }
    },
    //民间组织录入身份证明
    uploadImg (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPostFile("material/saveFiles",formdata1).then(res=> {
            this.$toast(res.message);
            if(res.code=='success'){
              this.meedUrlArr.push(res.content)
              this.showimg=false
            }
        })
    },
    //需求方录入需求证明
    uploadImg1 (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPostFile("material/saveFiles",formdata1).then(res=> {
            this.$toast(res.message);
            if(res.code=='success'){
              this.meedUrlArr1.push(res.content)
              this.showimg=false
            }
        })
    },
    //提供方录入身份证明
    uploadImg2 (file) {
        let formdata1 = new FormData();
        formdata1.append('files', file);
        this.$fetchPostFile("material/saveFiles",formdata1).then(res=> {
            this.$toast(res.message);
            if(res.code=='success'){
              this.meedUrlArr2.push(res.content)
              this.showimg=false
            }
        })
    },
    xuRead(val){
      this.showimg=true
      this.uploadImg1(val.file)
    },
    tiRead(val){
      this.showimg=true
      this.uploadImg2(val.file)
    },
    //删除图片的回调
    xudelete(val){
      this.showimg=true
      let formdata1 = new FormData();
      formdata1.append('files', val.file);
      this.deleteImg(formdata1,1)
    },
    //删除图片的回调
    tidelete(val){
      this.showimg=true
      let formdata1 = new FormData();
      formdata1.append('files', val.file);
      this.deleteImg(formdata1,2)
    },
    deleteImg(params,type) {
      this.$fetchPostFile("material/saveFiles",params).then(res=> {
          if(res.code=='success'){
            this.$toast("删除成功");
            if (type==1){
              this.meedUrlArr1.splice(this.meedUrlArr1.findIndex(item => item === res.content), 1)
            }else if (type==2){
              this.meedUrlArr2.splice(this.meedUrlArr2.findIndex(item => item === res.content), 1)
            }
            this.showimg=false
          }
      })

    },
    confirmone(){
      let linkPeopleArr=[],fileImgArr=[]
         this.form1.contectTelList.forEach(v=> {
           if (v.name&&v.tel){
            linkPeopleArr.push(v.name+"-"+v.tel)
           }
         })
        if (this.form1.hispotalName==""||this.form1.province==""||this.form1.city==""|| this.form1.addressDetail==""||this.form1.materialDetails.length==0||this.form1.startTime==""||this.meedUrlArr1.length==0){
            this.$toast('请完善信息');
        }else if (this.form1.contectTelList[0].tel==''&&this.form1.contectTelList[1].tel==''&&this.form1.contectTelList[2].tel==''){
            this.$toast('请至少填写一位联系人');

        } else{
          
         console.log(this.form1.materialDetails,"hahaha")
          let params= { 
            materialType:1,
            name:this.form1.hispotalName,
            province:this.form1.province,
            city:this.form1.province,
            address:this.form1.addressDetail,
            materialDetails:this.form1.materialDetails,//需求表
            type:this.form1.type,
            status:this.form1.sup,
            linkPeople:linkPeopleArr.join(','),
            createTime:this.form1.startTime,
            source:this.form1.needOrgin,
            file:this.meedUrlArr1.join(','),
      
          }
          this.$fetchPost("material/save",params,'json').then(res=> {
            if (res.code=="success") {
              this.$toast(res.message);
              this.reduceShow=false
            } else  if (res.code=="error") {
              this.$toast(res.message);
            } else  if (res.code==504) {
              this.$toast(res.message);
            }
          })
        }
    },
    confirmtwo(){
      let linkPeopleArr=[],fileImgArr=[]
         this.form2.contectTelList.forEach(v=> {
           if (v.name&&v.tel){
            linkPeopleArr.push(v.name+"-"+v.tel)
           }
         })
      if (this.form2.hispotalName==""||this.form2.province==""||this.form2.city==""|| this.form2.addressDetail==""||this.form2.materialDetails.length==0||linkPeopleArr.length==0||this.form2.startTime==""||this.meedUrlArr2.length==0){
          this.$toast('请完善信息');
      }else if (this.form2.contectTelList[0].tel==''&&this.form2.contectTelList[1].tel==''&&this.form2.contectTelList[2].tel==''){
          this.$toast('请至少填写一位联系人');

      } else{
            let params= { 
              materialType:2,
              name:this.form2.hispotalName,
              province:this.form2.province,
              city:this.form2.city,
              address:this.form2.addressDetail,
              materialDetails:this.form2.materialDetails,//需求表
              type:this.form2.type,
              status:this.form2.sup,
              isLogistics:this.form2.sup1,
              linkPeople:linkPeopleArr.join(','),
              createTime:this.form2.startTime,
              file:this.meedUrlArr2.join(","),
        
            }
          this.$fetchPost("material/save",params,'json').then(res=> {
            if (res.code=="success") {
              this.$toast(res.message);
              this.reduceShow=false
            } else  if (res.code=="error") {
              this.$toast(res.message);
            } else  if (res.code==504) {
              this.$toast(res.message);
            }
          })
      }
          
    },
    // 点击确定
    confirmTime() {
        let MM=(Number(this.currentDate.getMonth()) + 1)>=10?(Number(this.currentDate.getMonth()) + 1):'0'+(Number(this.currentDate.getMonth()) + 1)
        let dd=this.currentDate.getDate()>=10?this.currentDate.getDate():'0'+this.currentDate.getDate()
        let hh=this.currentDate.getHours()>=10?this.currentDate.getHours():'0'+this.currentDate.getHours()
        let mm=this.currentDate.getMinutes()>=10?this.currentDate.getMinutes():'0'+this.currentDate.getMinutes()

      this.startTimePop = false;
      this.form1.startTime =
        this.currentDate.getFullYear() +
        "-" +
        MM +
        "-" +
        dd +
        " " +
        hh +
        ":" +
        mm;
    },
    // 点击取消
    cancelTime() {
      this.startTimePop = false;
    },
    
    // 点击确定
    confirmTimeNeed() {
        
        let MM=(Number(this.currentDate.getMonth()) + 1)>=10?(Number(this.currentDate.getMonth()) + 1):'0'+(Number(this.currentDate.getMonth()) + 1)
        let dd=this.currentDate.getDate()>=10?this.currentDate.getDate():'0'+this.currentDate.getDate()
        let hh=this.currentDate.getHours()>=10?this.currentDate.getHours():'0'+this.currentDate.getHours()
        let mm=this.currentDate.getMinutes()>=10?this.currentDate.getMinutes():'0'+this.currentDate.getMinutes()

      this.startTimePopNeed = false;
      this.form2.startTime =
        this.currentDate.getFullYear() +
        "-" +
        MM +
        "-" +
        dd +
        " " +
        hh +
        ":" +
        mm;
    },
    // 点击取消
    cancelTimeNeed() {
      this.startTimePopNeed = false;
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
    
    // 点击确定
    confirmTime2() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
    },
    // 点击确定
    confirmTime1() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
    },
    

    // 点击确定
    ddd() {
      this.startTimePop = false;
      this.startTime =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate()
    },
    // 处理控件显示的时间格式
    formatter1(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    // 点击取消
    cancelTime1() {
      this.startTimePop = false;
    },

  }
};
</script>
<style>
</style>
<style lang="scss" scoped>
.luru{
  .wrapperfast{
     display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
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
            // border-left: 1px solid #f1f1f1;
            // border-right: 1px solid #f1f1f1;
            background: #0F46C0;
            &:last-child{
              border-right: 0;
            }
            &:first-child{
              border-left: 0;
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
                margin-bottom:10px;
                &:last-child{
                  margin-bottom:0;
                }
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
            }
            .desc{
              font-size:12px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(118,160,255,1);
              line-height: 14px;
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
