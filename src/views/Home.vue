<template>
  <div class="home">
    <div class="onebif">
      <div style="font-size:12px">全国工商联复工复产人才对接平台</div>
      <div style="font-size:12px;display:flex;justify-content: space-between;align-items: center"><span style="padding-right: 10px;">{{zanz.view}}次浏览</span></div>
    </div>
    <div class="twobif">{{zanz.encourage}}次</div>
    <div class="threebif" @click="dzanclick">
      <van-icon  name="good-job" :size="30" color="#ffffff" />
    </div>
    <transition name="likeAddAnimate">
     <div class="dzan" v-if="isdzan">+1</div>
    </transition>
    <!-- <div class="forew" v-if="seven">
      近一个月数据
    </div> -->
    <!-- 企业复工招聘 -->
    <div class="fugong-wrapper" v-if="fugongModel">
      <div class="fugong">
        <span class="title">企业复工招聘 全面启动</span>
        <div class="sub-title-btn">
          <span class="sub-title">企业用工专场招聘</span>
          <a class="btn" href="http://rescu" target="_blank">立即查看></a>
        </div>
        <div class="close-btn" @click="fugongModel=false">
          <van-icon name="cross" size="12" color="#ffffff"/>
        </div>
      </div>

    </div>

    <!-- 底部按钮 -->
    <div class="bottom-btn-write">
      <div class="bottom-btn">
        <div class="btn-list" v-for="(item,i) in bottomBtnList" :key="i" :style="item.backgroundImgStyle" @click="luruSelectBtn(item.type)">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="write-wrapper">
        <div class="write">
          <p>更多用工信息：全国工商联复工复产人才对接记录 <span style="color:#1989fa" @click="agreement=true">用户协议</span></p>
        </div>
        <div class="countbottom"><span style="color:#216AFF"><a href="http://www.acfic.org.cn">中华全国工商业联合会 </a></span>
         <!-- <span style="color:#216AFF"><a href="http://www.scf.org.cn">上海市慈善基金会</a></span> -->
          <span style="color:#216AFF"><a href="https://www.siti.sh.cn"> 上海产业技术研究院</a></span> 
         联合发布</div>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search-position">
      <div class="search-postion-content" @click="searchBtn">
        <img src="../assets/image/icon_search.png"/>
        <div class="search-position-input">
          <van-field v-model="searchText" placeholder="用工/工人/地区" readonly />
        </div>
        <!-- <span v-if="searchText">{{searchText}}</span>
        <span v-else>医院/物资/区域</span> -->
      </div>
      <van-icon name="cross" size="14" color="#FFC046" v-if="searchText" @click="clearSearchText"/>
    </div>
    <!-- 搜索框搜索数据 -->
    <div class="search-list" v-if="searchText">
      <span class="search-num">搜索到{{total || 0}}个查询结果</span>
      <div class="search-num search-info">
        <span style="padding-right:5px" @click="rightModel">查看明细</span>
      </div>
      <div class="arrow-up">
        <div class="triangle_border_up">
            <span></span>
        </div>
      </div>

    </div>
    <!-- 民间组织 三类 -->
    <div class="peopleTeam">
      <div class="txtimg" v-for="(iteam,index) in menuList"
        :key="index"
        @click="toRouterIndex(iteam,index)">
        <div :class="selectIndex==index?'imgbox txt-active':'imgbox'">{{iteam.name}}</div>
      </div>
    </div>
    <!-- 防止过快的切换 -->
    <van-overlay :z-index="2002" :show="showmap">
      <div class="wrapperfast" >
        <van-loading size="64px" color="#1989fa"></van-loading>
      </div>
    </van-overlay>
    <!-- 防止过快的切换 -->
    <!-- 民间组织 三类 -->
    <div id="myMap" class="container"></div>
    
    <!-- 医院的详情弹框 -->
    <van-overlay  :show="isDetail" :z-index="99" :duration="0"	>
      <div class="hospatilBox">
        <div class="contentDetail">
          <van-icon class="closeimg" @click="closeDetail" :size="24" name="cross" />
          <div style="font-size:17px;text-align:left">{{mapobj.hospitalName}}</div>
          <div class="address"> 
            <div class="left-font" v-if="mapobj.hospitalAddress!==undefined&&mapobj.hospitalAddress!==''" style="color:#666666;width:75%;word-wrap:break-word;text-align:left"><van-icon name="location-o" size="15" /> <div class="van-van-multi-ellipsis--l2" style="margin-left:2px;font-size:14px">{{mapobj.hospitalAddress}}</div></div>
            <div v-if="mapobj.type&&mapobj.type.length<=4" class="right-btn">{{mapobj.type}}</div>
            <!-- <div v-if="mapobj.type" class="right-btn right-btn1">发热门诊</div> -->
            <!-- <div v-if="mapobj.status&&mapobj.status==1" class="right-btn right-btn2">正常经营</div>
            <div v-if="mapobj.status&&mapobj.status==2" class="right-btn right-btn3">政府托管</div>
            <div v-if="mapobj.status&&mapobj.status==3" class="right-btn right-btn4">尚未核实</div> -->
          </div>
          <div class="link-go" v-if="mapobj.sourceLinkReg" @click="goHref(mapobj.sourceLinkReg)">
            <img src="../assets/image/link-icon.png"/>
            <span>点击查看企业</span>
          </div>
          <div class="address" style="font-size:12px"> 
            <div v-if="mapobj.source!==undefined&&mapobj.source!==''" style="color:#666666">信息来源：{{mapobj.source}}  <span style="color:#216AFF;cursor:pointer"> </span></div>
            <div v-if="mapobj.createTime!==undefined">发布日期：{{(mapobj.createTime).replace("+"," ")}}</div>
          </div>
          <div class="tel-phone" v-if="mapobj.linkTelarr1!==undefined&&mapobj.linkTelarr1.length > 0">
            <div class="left-font" v-for="(iteam,index) in mapobj.linkTelarr1"
                  :key="index" @click="dialPhoneNumber1(iteam)"><van-icon name="phone-o" size="20" /> <div style="font-size:15px;margin-left:4px">{{mapobj.linkPeoplearr1==undefined?"":mapobj.linkPeoplearr1[index]}}  {{iteam}}</div></div>
          </div>
          <!-- <div class="tel-desc" v-if="mapobj.linkTelarr1!==undefined&&mapobj.linkTelarr1.length > 0" style="display:flex;justify-content:flex-start;align-items:center;font-size:12px;line-height:15px;color:#216AFF;text-align:left;margin-bottom:12px;"> <van-icon name="warning-o" color="#216AFF"  size="12" style="margin-right:2px;"/><span>以上为虚拟号码，随时更新，真实号码已受保护！</span></div> -->
          <div class="service-title-time" v-if="query.orgType==3">
            <div class="service-title" style="color:#666" v-if="!mapobj.startTime&&!mapobj.endTime">
              暂未提供服务时间
            </div>
            <div class="service-title" v-else>
              服务时间段
              <span v-if="mapobj.timeStatus==1" style="color:#ff388c">(未来将提供服务)</span>
              <span v-else-if="mapobj.timeStatus==2" style="color:#999999">(过期)</span>
              <span v-else-if="mapobj.timeStatus==3" style="color:#D247FF">(正在提供服务)</span>
            </div>
            <div class="service-time">
              <div v-if="(mapobj.startTime&&!mapobj.endTime)||(!mapobj.startTime&&mapobj.endTime)">
                <span class="start-end-time" v-if="mapobj.startTime">{{mapobj.startTime}}</span>
                <span class="start-end-time" v-else-if="mapobj.endTime">{{mapobj.endTime}}</span>
                <span class="line">——</span>
                <span class="start-end-time"></span>
              </div>
              <div v-else-if="mapobj.startTime&&mapobj.endTime">
                <span class="start-end-time">{{mapobj.startTime}}</span>
                <span class="line">——</span>
                <span class="start-end-time">{{mapobj.endTime}}</span>
              </div>
              <div v-else-if="!mapobj.startTime&&!mapobj.endTime">
                <span class="start-end-time">暂无</span>
              </div>
            </div>
          </div>
          <!-- <span class="person">接受个人捐赠</span> -->
          <div v-if="mapobj.needsName!==undefined" style="display:flex;justify-content:flex-start;align-items:center;font-weight:bold;font-size:16px;text-align:left;margin-bottom:14px">{{query.orgType==1?'招聘岗位':query.orgType==4?'提供专业':'提供的岗位和服务'}} 
            <!-- <van-icon v-if="query.orgType==1" style="margin-left:10px;margin-right:1px" name="warning-o" color="#FF2727"  size="12" /> -->
            </div>

          <div class="table-wrapper-needs" v-if="mapobj.needsName!==undefined">
              <div class="table-wrapper">
                <div class="tab-head">
                  <div class="tab-items-name" v-if="query.orgType!=4">岗位名称</div>
                  <div class="tab-items-name" v-else>主要专业</div>
                  <div class="tab-items-num" v-if="query.orgType==1">需求数量</div>
                  <div class="tab-items-num" v-else-if="query.orgType==4">学生人数</div>
                  <div class="tab-items-num" v-else>提供岗位数量</div>
                </div>
                <div :class="[mapobj.needsDescrList.length<=4?'tab-body-noheight':'tab-body']">
                  <div class="tab-items" v-for="(item,i) in mapobj.needsDescrList" :key="i">
                    <div class="tab-items-name">{{item.name}}</div>
                    <div class="tab-items-num">{{item.num}}</div>
                  </div>
                </div>
              </div>

          </div>
          <div class="need-descr" v-if="mapobj.descr&&query.orgType==1">需求说明：{{mapobj.descr}}</div>
          <div class="need-descr" v-if="mapobj.descr&&query.orgType==2">提供岗位描述：{{mapobj.descr}}</div>
          <div class="need-descr" v-if="mapobj.descr&&query.orgType==3">提供服务描述：{{mapobj.descr}}</div>
          <div class="need-descr" v-if="mapobj.descr&&query.orgType==4">具体说明：{{mapobj.descr}}</div>
          <!-- <div class="material" v-if="mapobj.needsNamearr!==undefined">
            <div v-for="(item,index) in mapobj.needsNamearr"
                  :key="index" class="boll-item"><span class="boll"></span>{{item}}</div>
          </div> -->
          <!-- <div v-if="mapobj.needsDescrarr!==undefined&&mapobj.needsDescrarr!==''" v-for="(itrm,index) in mapobj.needsDescrarr"
                  :key="index" class="remark">{{itrm}}</div> -->
          <div v-if="mapobj.orgDescr!==undefined" style="font-size:12px;color:#999999;text-align:left">备注：{{mapobj.orgDescr}}</div>
          <div class="btnSty-wrapper">
            <div class="btnSty" v-if="mapobj.linkTelarr1!==undefined&&mapobj.linkTelarr1.length > 0"  style="margin-right:12px" @click="dialPhoneNumber()">我要联系</div>
            <div class="btnSty" style="background:linear-gradient(90deg,rgba(255,102,0,1),rgba(255,123,16,1));" @click="shakeTime(mapobj.hospitalName)"><van-icon color="#ffffff" size="20" name="good-job" /><span>点赞加油 {{mapobj.encourageNum}}次</span></div>
          </div>
        </div>
      </div>
    </van-overlay>
    <van-popup
        :z-index="100"
        v-model="phoneshow"
        position="right">
      <div style="padding:12px 24px" v-if="mapobj.linkTelarr1!==undefined&&mapobj.linkTelarr1.length > 0">
        <div class="left-font" v-for="(iteam,index) in mapobj.linkTelarr1"
                 :key="index" @click="dialPhoneNumber1(iteam)"><van-icon name="phone-o" color="#1989fa" size="34"  /> <div style="font-size:15px;margin-left:4px">{{mapobj.linkPeoplearr1==undefined?"":mapobj.linkPeoplearr1[index]}}  {{iteam}}</div></div>
      </div>
    </van-popup>
    <!-- 搜索部分 -->
    <van-popup v-model="show" position="bottom" :style="{height: heightCur }" :overlay="false" >
      <div class="search-wrapper">
        <div class="tab-item-list">
          <div class="go-back-home" @click="show=false">
              <van-icon name="arrow-left" color="#ffffff" size="20"/>
          </div>
          <div class="tab-all-wrapper">
            <div v-for="(item,i) in menuList" :key="i" @click="searchTabItem(i)" :class="selectIndex==i?'tab-item tab-item-span-active':'tab-item'">
            {{item.name}}
              
            </div>
          </div>
        </div>
        <div class="input-wrapper">
          <img src="../assets/image/search.png" alt="" @click="search">

          <form action="javascript:return true"> 
            <input type="search" placeholder="查询继续支援用工、工人、地区" v-model="searchText" @focus="inputFocus" @keyup.13="search" v-if="selectIndex==0"> 
            <input type="search" placeholder="查询继续支援用工、工人、地区" v-model="searchText" @focus="inputFocus" @keyup.13="search" v-if="selectIndex==1"> 
            <input type="search" placeholder="查询继续支援高校、专业、地区" v-model="searchText" @focus="inputFocus" @keyup.13="search" v-if="selectIndex==2">
            <input type="search" placeholder="查询继续支援用工、工人、地区" v-model="searchText" @focus="inputFocus" @keyup.13="search" v-if="selectIndex==3">
          </form>


          
        </div>
        <div class="tab-list-wrapper" v-if="!downUpImg">

            <p class="title" v-if="selectIndex!=2">用工</p>
            <p class="title" v-else>专业</p>
          <div class="list list1">
            <span v-for="(item,i) in wuziList" :key="i" @click="selectItem(item)" v-if="item">{{item}}</span>
          </div>
          <p class="title">地区</p>
          <div class="list list2">
            <span v-for="(item,i) in cityList" :key="i" @click="selectItem(item)" v-if="item">{{item}}</span>
          </div>
          
          <p class="title">发布时间查询</p>
          <div class="list list3">
            <span v-for="(item,i) in timeList" :key="i" @click="selectTimeItem(item)"><img src="../assets/image/time.png" alt="">{{item}}</span>
          </div>
        </div>
        <!-- <div class="down-up-wrapper" @click="downUp">
          <div class="img-write" v-if="downUpImg">

            <img class="down-up" src="../assets/image/down.png" alt="">  
            <span>收起</span>
          </div>
          <div class="img-write" v-else>
            <img class="down-up" src="../assets/image/up.png" alt="">
            <span>收起</span>
          </div>
        </div> -->
        
      </div>
      
    </van-popup>
    <!-- 搜索2右边弹框 -->
    <van-popup v-model="showModel" :z-index="89" position="right" :style="{ height: '100%' }">
      <div class="list-content">
        <div v-if="dataList.length">

          <div class="list-wrapper" v-for="(item,i) in dataList" :key="i" @click="detailright(item)">
            <div class="title">{{item.hospitalName}}</div>
            <div class="address-wrapper">

              <div class="address" v-if="item.hospitalAddress!==undefined&&item.hospitalAddress!==''">
                <van-icon name="location-o" size="14" />
                <div>{{item.hospitalAddress}}</div>
              </div>
              
              <div v-if="item.type==1" class="right-btn">定点医院</div>
              <div v-if="item.type==2" class="right-btn right-btn1">发热门诊</div>
              <div v-if="item.status&&item.status==1" class="right-btn right-btn2">正常经营</div>
              <div v-if="item.status&&item.status==2" class="right-btn right-btn3">政府托管</div>
              <div v-if="item.status&&item.status==3" class="right-btn right-btn4">尚未核实</div>

            </div>
            <div class="wuzi-list" v-if="item.needsName"><span v-for="(items,i) in item.needsName.split(',')" :key="i">{{items}}</span></div>

            

            <div class="time" v-if="item.createTime!==undefined&&item.createTime!==''">发布日期：{{item.createTime!==undefined?item.createTime.substring(0,16).replace("+"," "):''}}</div>
            <!-- <div class="phone" v-if="item.linkTelarr1!==undefined&&item.linkTelarr1.length > 0">
              <p  v-for="(items,i) in item.linkTelarr1" :key="i"><van-icon name="phone-o" size="20" /><span>{{item.linkPeoplearr1==undefined?"":item.linkPeoplearr1[i]}}</span><span @click="searchRightModelPhone(items)">{{items}}</span></p>
            </div> -->
          </div>
          </div>
        <div v-else>
          
          <div class="list-wrapper list-wrapper-no">
            <img class="down-up" src="../assets/image/reduce.png" alt="">
            <p>没有数据哦!</p>

          </div>
        </div>

      </div>
      
      
    </van-popup>


    <!-- 搜索录入图标 -->
    <div class="search-write">
      <div class="img-icon" @click="contectBtn">
        <img src="../assets/image/contect.png" />
        <span style="font-size:9px">联系我们</span>
      </div>
    </div>
    <!-- <div :class="[fugongModel?'icon-direction1':'icon-direction']" @click="getPosition" >
      <img  src="../assets/image/icon_direction.png" />
    </div> -->

    <!-- 录入缺省页 -->
    <van-popup v-model="reduceShow" position="bottom" :style="{ height: '100%' }">
      <luru @fatherMethod="fatherMethod" :curTabIndex="curTabIndex"></luru>
      
    </van-popup>

    <!-- 医院的详情弹框 -->
    <!-- 免责协议 -->
    <van-popup v-model="agreement" closeable position="bottom" :style="{ height: '100%' }">
      <div class="agreement-content">
        <div class="bigfont">用户使用协议</div>
        <div class="leftfont">第一条 协议订立</div>
        <div class="contentfont">1.1 用户在同意本网站：全国工商联复工复产人才对接平台(http://fgfchr.gslhr.org.cn:9966/visur/#/)的《用户使用协议》（以下简称“本协议”）后，方可使用本网络服务平台（以下简称“平台”)提供的人才需求与供应信息来源等相关服务（以下简称“服务”）。</div>
        <div class="contentfont">1.2 用户在使用本平台提供的服务前务必认真阅读本协议，一旦用户打开并浏览本平台提供的信息即表示用户同意与本平台签订本协议且同意受本协议之约束。</div>
        <div class="leftfont">第二条 服务说明</div>
        <div class="leftfont">本平台为公益性信息平台，仅提供如下服务：</div>
        <div class="contentfont">2.1 收集展示企业、地方政府、商协会等在各大官方平台发布的人才需求信息，提供人才需求信息的来源或获取该等信息的途径渠道，以便用户提出相关人才提供服务。本平台展示的需求信息均来自企业、地方政府、商协会等在各大官方平台发布的信息， 具体需求信息以用工方在各大官方平台发布信息为准。本平台与需求信息的提供方不存在委托、赠与等法律关系， 本平台亦不保证需求信息本身的真实性、合法性和有效性，用户如需提供相关人才供需服务的，请双方自行联系并核实相关信息的真实性、有效性。</div>
        <div class="contentfont">2.2 收集展示相关用户在本平台自行填写的提供人才或服务的用户供应信息，提供人才供应信息的来源或获取该等信息的途径渠道，以便用户与用工方完成人才供需服务的活动。本平台与供应信息的提供方不存在委托、赠与等法律关系，本平台展示的供应信息均为用户自行填写， 本平台亦不保证供应信息本身的真实性、合法性和有效性，请与人才供需双方自行联系并核实相关信息的真实性、有效性</div>
        <div class="leftfont">第三条 用户的权利和义务</div>
        <div class="contentfont">3.1 用户在进行人才服务前，应仔细阅读并接受双方所公示的内容。本协议不涉及人才供需双方之间权利义务的内容。</div>
        <div class="contentfont">3.2 用户因人才供需事宜产生争议，应自行协商解决。</div>
        <div class="contentfont">3.3 用户应自行与人才供应或需求方签订人才供需等相关服务协议，本平台不收取任何服务费用，亦不提供任何担保。</div>
        <div class="contentfont">3.4 用户保证向本平台提供的身份资料、资质证书等所有材料或信息的真实性、准确性、及时性和完整性。</div>
        <div class="contentfont">3.5 用户应特别注意平台发布信息的来源、时间及更新情况等，自行与相关主体核实信息的真实性、准确性、有效性等。</div>
        <div class="contentfont">3.6 未经本平台书面同意不得擅自使用本平台收集、编辑、汇编、整理的所有信息，不得利用网站平台信息从事任何商业或违法活动。</div>
        <div class="leftfont">第四条 免责说明</div>
        <div class="contentfont">4.1 本平台显示的信息仅供参考，最终以人才供需双方实际需求和实时更新的供应信息为准。</div>
        <div class="contentfont">4.2 本平台为公益性信息平台，供需双方产生任何纠纷与本平台无关。</div>
        <div class="contentfont">4.3 本平台会尽力维护平台信息的安全，但由于存在不可抗力因素，以及因为黑客入侵、计算机病毒、国家相关行业主管部门及电信运营商的调整、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路等原因造成用户资料泄露、丢失、被盗用、被篡改的，或者造成服务中断及不能满足用户要求的风险，本平台不承担任何责任。</div>
        <div class="contentfont">4.4 本平台仅提供技术服务，不是赠与法律关系的权利义务主体，不介入用户与相关方面之间的纠纷，但本平台将提供一切协助，保护用户的合法权益。</div>
        <div class="contentfont">4.5 本平台唯一官方网址：http://fgfchr.gslhr.org.cn:9966/visur/#/（全国工商联复工复产人才对接平台），如被第三方恶意篡改或假借名义进行不正当行为，与本平台无关，本平台不对用户或任何第三方受到的损害负责，但本平台保留对恶意第三方追究法律责任的权利。</div>
        <div class="leftfont">第五条 知识产权保护 </div>
        <div class="contentfont">5.1本平台上所有内容，包括但不限于著作、图片、网站架构、网站画面的安排、网页设计、数据（包含数据的分析、汇总等）及汇编后的信息（信息显示途径、方式等）均由本平台依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。</div>
        <div class="contentfont">5.2 非经本平台书面同意，任何人不得擅自使用、修改、复制、反向编译、公开本平台的程序，亦不得擅自使用或篡改本平台公布的内容。</div>
        <div class="leftfont">第六条 争议解决及法律适用  </div>
        <div class="contentfont">6.1 如果在本协议约定内容履行过程中，对相关事宜的履行发生争议，用户同意按照中华人民共和国现行有效的法律法规来解决争议，并由被告住所地有管辖权的人民法院管辖。</div>
        <div class="leftfont">第七条 其他  </div>
        <div class="contentfont">7.1 本平台完整协议由本协议条款内容及本平台不时公示的各项规则组成，本协议未约定的，以本平台不时公示的各项规则约定为准。本协议部分内容被法院认定为无效或未生效的，不影响本协议其他内容。</div>
        <div class="contentfont">7.2 用户认可本平台可适时调整更新本协议内容，并自愿接受更新后协议内容。</div>
        <div class="contentfont">7.3 本协议自用户打开并浏览本平台提供相关信息时即生效。</div>
      </div>
      
    </van-popup>
    <!-- 实时捐赠 -->
    <div class="cur-time-btn">
      <div class="cur-time-img" @click="curTimeBtn(0)">
        <img src="../assets/image/curtimewrite.png" alt="">
      </div>
      <div class="line"></div>
      <div class="cur-time-img" @click="helpInfoShow=true">
        <img src="../assets/image/use-icon.svg" alt="">
        <span>使用说明</span>
      </div>
    </div>

    <!-- 录入弹框 -->
    <div class="luru-model-wrapper" v-if="luruSelectModel">
      <div class="luru-model">
        <div class="luru-top-bg">
          <span class="luru-title">抗击肺炎物资需求申请</span>
        </div>
        <div class="luru-select">
          <span class="luru-btn" v-for="(item,i) in luruSelectData" :key="i" @click="luruSelectBtn(item.type)">{{item.name}}</span>
        </div>
        <div class="close-luru-model" @click="luruSelect"><van-icon name="cross" size="16" color="#fff"/></div>
      </div>
    </div>
    <!-- 联系人弹框 -->
    <div class="contect-model-wrapper" v-if="contectModel">
      <div class="contect-model">
        <div class="us-need us">
          <div class="title">
            <span class="dot" v-for="(item,i) in 3" :key="i+'s'"></span>
            <span class="title-name">联系我们</span>
            <span class="dot" v-for="(item,i) in 3" :key="i+'d'"></span>
          </div>
          <div class="message-wrapper">
            <div class="message" v-for="(item,i) in conUs" :key="i">
              <div class="message-content">
                <div class="name-tel">
                  <span class="name">{{item.name}}</span>
                  <span class="tel">{{item.tel}}</span>
                </div>
                <span class="job">({{item.job}})</span>
              </div>
              <span class="btn" @click="commitTel(item.tel)">立即拨打</span>
            </div>
            <div class="message">
              <div class="message-content">
                <div class="name-tel">
                  <span class="name">电子邮箱</span>
                  <span class="tel">gslhr@acfic.org.cn</span>
                </div>
              </div>
            </div>
          </div>
          <div class="code">
            
            <span class="btn">平台运营：全国工商联人才交流服务中心</span>
            <img style="" src="../assets/image/gzh2.jpg" alt="">
            <div class="btn">长按识别公众号</div>
            <!-- <div>长按识别公众号</div> -->
          </div>
        </div>
        <div class="close-luru-model" @click="contectSelect"><van-icon name="cross" size="16" color="#fff"/></div>
      </div>
    </div>
    <!-- 使用说明 -->
    <div class="show-help">

      <van-popup v-model="helpInfoShow" position="bottom" :style="{ height: '100%' }">
        <div class="help-wrapper">
          <div class="help-top">
            <div class="go-back" @click="helpInfoShow=false">
              <van-icon name="arrow-left" color="#fff" size="20"/>
            </div>
            <span>使用说明</span>
          </div>
          <div class="help-body">
            <div class="help-item" v-for="(item,i) in usedHelpInfo" :key="i">
              <div class="help-q">
                <span>Q</span>{{item.q}}
              </div>
              <div class="help-a">
                <span>A</span>{{item.a}}
              </div>
            </div>
          </div>
        </div>
        
      </van-popup>
    </div>


    <!-- 医护用品规则说明 -->

  </div>
</template>

<script>
 import encrypt from '@/libs/encrypt'
 import luru from '@/components/luru'
 import wx from 'weixin-js-sdk'
export default {
  name: "home",
  components:{
    luru,
  },
  data() {
    return {
      helpInfoShow:false,
      showmap:false,
      fenxi_img:'https://medicalsupplies.sitiits.com/share.png',
      fenxi_title:'企业复工复产人才对接平台',
      fenxi_desc:'由中华全国工商业联合会发布',
      menuList: [
        {
          id:1,
          name: "需方",
          imgUrl: [
            require("../assets/image/icon7.png"),
            require("../assets/image/list1.png")
          ],
        },
        {
          id:2,
          name: "供方",
          imgUrl: [
            require("../assets/image/list4.png"),
            require("../assets/image/list3.png")
          ],
        },
        {
          id:3,
          name: "高校",
          imgUrl: [
            require("../assets/image/list4.png"),
            require("../assets/image/list3.png")
          ],
        },
        {
          id:4,
          name: "出力方",
          imgUrl: [
            require("../assets/image/list6.png"),
            require("../assets/image/list5.png")
          ],
        },
      ],
      selectIndex:"",
      selectIndex1:"",
      heightCur:'0',
      seven:true,
      zanz:{},
      isone:true,
      myMap:null,
      mass:null,
      markerSa:null,
      pointGroup: new AMap.OverlayGroup(), // 省集合
      isDetail:false,
      agreement:false,
      specifications:false,//医用规则说明
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
      //头部的查询信息
      query:{
        content:'',
        hour:'',
        orgType:1,
      },
      curTabIndex:1, // 录入当前切换
      clickTabPoint:0, // 录入提交是否选择tab按钮指针
      conUs:[ // 录入联系人
        {
<<<<<<< HEAD
          job:"我要用工",
          name: "郭 伟",
          tel: "18513356222",
=======
          job:"需求对接",
          name: "王晓勃",
          tel: "13811968222",
>>>>>>> a98e528dc174247c8a79393bf66d899ec2207483
        },{
          job:"需求对接",
          name: "刘  帅",
          tel: "17310189770",
        },{
          job:"需求对接",
          name: "庞亚辉",
          tel: "13717571601",
        },{
          job:"技术维护",
          name: "夏存宏",
          tel: "13366016658",
        },{
          job:"资源调度",
          name: "王书柏",
          tel: "13683061817",
        },
      ],
      isdzan:false,
      styleUp:true,
      isoneClosePoint:1,
      curTimeTopContent:"", // 实时资讯统计
      luruSelectModel:false, //录入选择弹框
      contectModel:false, // 联系人弹框
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
      bottomBtnList:[
        {
          backgroundImgStyle:{
            backgroundImage:'url(' + require('../assets/image/image_1_1.png') + ')',
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 100%'
          },
          name: "我要用工",
          type:1
        },{
          backgroundImgStyle:{
            backgroundImage:'url(' + require('../assets/image/image_2_1.png') + ')',
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 100%'
          },
          name: "我有工人",
          type:2
        },{
          backgroundImgStyle:{
            backgroundImage:'url(' + require('../assets/image/image_3_1.png') + ')',
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 100%'
          },
          name: "校联招聘",
          type:3
        },{
          backgroundImgStyle:{
            backgroundImage:'url(' + require('../assets/image/image_4_1.png') + ')',
            backgroundRepeat:'no-repeat',
            backgroundSize:'100% 100%'
          },
          name: "我要出力",
          type:4
        },
        // {
        //   backgroundImgStyle:{
        //     backgroundImage:'url(' + require('../assets/image/image_3_1.png') + ')',
        //     backgroundRepeat:'no-repeat',
        //     backgroundSize:'100% 100%'
        //   },
        //   name: "实时资讯",
        //   type:4
        // },
      ],
      curSearchTabItem:0, //搜索当前选择组织
      fugongModel:false, // 复工
      usedHelpInfo:[
        {
          q:"平台的运行主体是什么？",
          a:"本平台系中华全国工商业联合会委托上海产业技术研究院联合开发的，具体由全国工商联人才交流服务中心运营管理。在使用过程中，如有疑问，可与运营方联系。",
        },
        {
          q:"平台的性质和作用是什么？",
          a:"本平台基于B2B运作模式的公益性共享服务平台，供地方政府、用工企业、人力资源机构等免费发布人才供求信息，为广大企业复工复产提供人力资源供需对接，促进国家“稳就业”工作和民营经济发展。",
        },
        {
          q:"机构名称怎么填？",
          a:"填写信息发布单位（用工企业、商协会或政府部门）的机构全称，与法人执照一致。",
        },
        {
          q:"为什么要填详细地址？",
          a:"用于在地图上精准定位、展示，便于用户搜索，精准匹配。",
        },
        {
          q:"所属行业领域怎么填？",
          a:"根据本单位所从事的主营业务领域据实填写，如：金属制品业、通用设备制造业、农业加工、生物制药等。",
        },
        {
          q:"发布时间指的是什么？",
          a:"是指所要发布信息的生效时间。",
        },
        {
          q:"提示递交失败是怎么回事？",
          a:"请检查录入的数据是否完整准确、是否超出字数限制。",
        },
        {
          q:"“链接”栏填写什么内容？",
          a:"填写本单位的官网地址或者在该项需求信息详情的链接。",
        },
        {
          q:"“我要出力”模块主要功能是什么？",
          a:"主要用于公益性组织、志愿者或能助力人才供需对接服务的第三方机构发布相关信息。",
        },
        {
          q:"人才对接成功的，要不要进行反馈？",
          a:"用户在线下进行人才对接成功后，需求双方应积极向运营方（E-mail:gslhr@acfic.org.cn）进行反馈，以便运营方及时掌握，提供更多服务，并可在“实时播报”以及其他相关媒体中进行宣传展示。",
        },
      ]
    }
  },
  created() {
    this.getDataList()
    this.getWuziList()
    this.getCityList()
    this.getCurTimeContent()
  },
 mounted () {
    this.getMap()
    var scrolltop = document.body.scrollTop;
    $('input').focus(function(){
    interval = setInterval(function(){
    document.body.scrollTop = document.body.scrollHeight;
    },100)
    }).blur(function(){
    clearInterval(interval);
    document.body.scrollTop =scrolltop;
    });
    this.WeChatshare()
    //地图的放大缩小
    // this.myMap.on("zoomend", () => {
    //   let numberMap = this.myMap.getZoom();
    //   if(numberMap>5||numberMap==5){
    //     this.pointGroup.clearOverlays()
    //     if(this.mass==null){
    //       this.getDataList()
    //     }
    //   }else{
    //     if(this.mass){
    //       alert(1)
    //         this.mass.clear()
    //         this.mass=null
    //       }
    //     if(this.pointGroup.Pw.length==0){
          
    //       if(this.query.orgType==1){
    //         this.getProvinMark("#216AFF")
    //       }else if(this.query.orgType==2){
    //         this.getProvinMark("#FF7550")
    //       }else{
    //         this.getProvinMark("#DE78FF")
    //       }
    //     }
       
    //   }
      
    // })
  },
  methods:{
    goHref(url){
      if (url.indexOf("http://") != -1 || url.indexOf("https://") != -1){

        var a=document.createElement('a')
        a.setAttribute('href',`${url}`)
        a.setAttribute('target','_blank');
        a.click();
        document.getElementsByTagName("body")[0].appendChild(a)
      } else {
        var p=window.location.protocol
        var a=document.createElement('a')
        a.setAttribute('href',`${p}//${url}`)
        a.setAttribute('target','_blank');
        a.click();
        document.getElementsByTagName("body")[0].appendChild(a)

      }

    },
    closeDetail(){
      this.isDetail=false
      if (this.mapobj.sourceLinkReg){

        let x=document.getElementsByTagName("body")[0].lastChild
        document.getElementsByTagName("body")[0].removeChild(x)
      }
    },
    //微信分享
      WeChatshare(){
        let that=this;
        let data={url:window.location.href.split('#')[0]};
        this.$fetchGet('signature/getSignature',data)
        .then((res)=>{
          wx.config({
            debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wxc941dba7ff69275c', //必填，公众号的唯一标识
            timestamp: res.content.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.content.noncestr, // 必填，生成签名的随机串
            signature: res.content.signature, // 必填，签名
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage',"onMenuShareQQ",'onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表
          });

          //拼接当前地址 
          let shareUrl=window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1];
          // shareUrl = shareUrl.split('#')[0] + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(shareUrl);

          wx.ready(function () {
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: that.fenxi_title,
              desc: that.fenxi_desc,
              link: shareUrl,
              imgUrl: that.fenxi_img,
              success: function (res) {
                that.$toast("分享成功！");
              },
              cancel:function(res){
                that.$toast("分享失败！");
              }
            })
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: that.fenxi_title,
              link: shareUrl,
              imgUrl: that.fenxi_img,
              success: function (res) {
                that.$toast("分享成功！");
              },
              cancel:function(res){
                that.$toast("分享失败！");
              }
            })
            //“分享到QQ
            wx.onMenuShareQQ({
              title: that.fenxi_title, // 分享标题
              desc: that.fenxi_desc, // 分享描述
              link: shareUrl, // 分享链接
              imgUrl: that.fenxi_img, // 分享图标
              success: function () {
              // 用户确认分享后执行的回调函数
              },
              cancel: function () {
              // 用户取消分享后执行的回调函数
              }
            });
            //“分享到分享到腾讯微博
            wx.onMenuShareWeibo({
              title: that.fenxi_title, // 分享标题
              desc: that.fenxi_desc, // 分享描述
              link: shareUrl, // 分享链接
              imgUrl: that.fenxi_img, // 分享图标
              success: function () {
              // 用户确认分享后执行的回调函数
              },
              cancel: function () {
              // 用户取消分享后执行的回调函数
              }
            });
            //“分享到QQ空间
            wx.onMenuShareQZone({
              title: that.fenxi_title, // 分享标题
              desc: that.fenxi_desc, // 分享描述
              link: shareUrl, // 分享链接
              imgUrl: that.fenxi_img, // 分享图标
              success: function () {
              // 用户确认分享后执行的回调函数
              },
              cancel: function () {
              // 用户取消分享后执行的回调函数
              }
            });
          });
        })
        .catch((res)=>{
        })
      },
    searchTabItem(index){
      if (index==2){
        this.query.orgType=4
      } else if (index==3){
        this.query.orgType=3
      } else {

        this.query.orgType=index+1
      }
      this.selectIndex=index
      this.dataList=[]
      this.getDataList()
      this.getWuziList()
      this.getCityList()
    },
    //一键关注
    yjgz(){
      window.open('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwMTUzNDg3OA==&scene=110#wechat_redirect')
    },
    //获取当前位置
    getPosition(){
      if(this.markerSa){
        this.markerSa.setMap(null);
      }
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        useNative: true,
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      geolocation.getCurrentPosition((status, result) => {
        if(status=='complete'){
          this.addMarker (result.position)
        }else{
          this.$toast("获取当前位置失败");
        }
      });
    },
    // 实例化当前点点标记
    addMarker (val) {
      var startIcon = new AMap.Icon({
        // 图标尺寸
          size: new AMap.Size(33, 33),
          // 图标的取图地址
          image: require('../assets/image/iconpr.png'),
          // 图标所用图片大小
          imageSize: new AMap.Size(33, 33),
          // 图标取图偏移量
          // imageOffset: new AMap.Pixel(-9, -3)
      });
      this.markerSa = new AMap.Marker({
        map: this.myMap,
        icon: startIcon,
        position: val,
        // offset: new AMap.Pixel(-10, -10)
      });
      this.myMap.setZoomAndCenter(8, val);
      this.markerSa.setMap(this.myMap);
    },
    clearSearchText(){
      this.total=''
      this.searchText=''
      this.query = {
        content:'',
        hour:'',
        orgType:this.query.orgType,
      }
      this.getDataList()
    },
    contectBtn(){
      this.contectModel=true
    },
    contectSelect(){
      this.contectModel=false
    },
    // 录入弹框隐藏
    luruSelect(){
      this.luruSelectModel=false
      this.curTabIndex=null
    },
    // 录入弹框选择
    luruSelectBtn(type) {
      // if (type!=4){

        this.curTabIndex=type
        // this.luruSelectModel=false
        this.reduceShow=true
      // }else{
      //   this.curTimeBtn(0)
      // }
    },
    getCurTimeContent(){
      this.$fetchGet("donateCount/findDonateCount").then(res=> {
        if (res&&res.length){

          this.curTimeTopContent=res[0].content
        }
      })
    },


    isoneClick(){
      this.isone=false
      this.styleUp=false
      this.isoneClosePoint=0

    },
    fatherMethod(){
      this.reduceShow=false
    },
    //三类民间组织
    toRouterIndex(iteam,index){
      if (index==2){
        this.query.orgType=4
      } else if (index==3){
        this.query.orgType=3
      } else {

        this.query.orgType=index+1
      }
      this.selectIndex=index
      // if(this.mass){
      //   this.mass.clear()
      //   this.mass=null
      // }
      // this.myMap.setZoomAndCenter(4,[111.160477,32.1624]);
      // if(index==0){
      //   this.getProvinMark("#216AFF")
      // }else if(index==1){
      //   this.getProvinMark("#FF7550")
      // }else{
      //   this.getProvinMark("#DE78FF")
      // }
      
      this.getDataList()
      this.getWuziList()
      this.getCityList()
    },
    // 实时资讯按钮
    curTimeBtn(data){
      this.$router.push({
        path:'/curTimeDo',
        query: {
          curIndex:data
        }
      })
    },
    // 录入立即拨打
    commitTel(tel){
      window.location.href = "tel:" + tel
    },
    // 搜索右边弹框电话立即拨打
    searchRightModelPhone(tel){
      window.location.href = "tel:" + tel
    },
    //大拇指点赞
    dzanclick(){
     this.isdzan=true
      this.$fetchGet("encourage/saveEncourage", {
        hospitalName:''
      }).then(res => {
        // this.zanz.encourage++
        // this.
        if(res.code=="success"){
          this.initMap()
           
        }else{
          this.$toast(res.message);
        }
        this.isdzan=false
        
       
      });
    },
    // 搜索按钮
    searchBtn(){
      this.show=true
      this.reduceShow=false
      this.downUpImg=false
      // this.selectIndex=this.selectIndex1
      this.heightCur="100%"

    },
    //加载海量点
    getmarkers(citys){
      const markerslist=[]
      citys.forEach(item => {
       
        if(item.gaodeLon){
          item.lnglat=[item.gaodeLon, item.gaodeLat]
          item.style= this.query.orgType==2?7:this.query.orgType==3?8:item.orgStatus
          if(this.query.orgType==2){
            item.style=2
          }else if(this.query.orgType==3){
            item.style=3
          }else if(this.query.orgType==4){
            item.style=12
          }else{
            item.style=1
          }

          markerslist.push(item)
          // 
        }
        
      })
      this.createMarks(markerslist)
      // this.showmap=false
      
    },
    createMarks(citys){
      let style = [{
            url: require('../assets/image/icon4.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        }, {
            url: require('../assets/image/xf1.svg'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        }, {
            url: require('../assets/image/gf2.svg'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        }, {
            url: require('../assets/image/cl3.svg'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        }, {
            url: require('../assets/image/icon51.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        }, {
            url: require('../assets/image/icon3.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        }, {
            url: require('../assets/image/icon1.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        }, {
            url: require('../assets/image/list4.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        }, {
            url: require('../assets/image/list6.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        },{
            url: require('../assets/image/list8.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        },{
            url: require('../assets/image/list9.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        },{
            url: require('../assets/image/list10.png'),
            anchor: new AMap.Pixel(9, 9),
            size: new AMap.Size(18, 18)
        },{
            url: require('../assets/image/icon-04.svg'),
            anchor: new AMap.Pixel(12, 12),
            size: new AMap.Size(24, 24)
        },
      ];
      this.mass = new AMap.MassMarks(citys, {
        zIndex: 111,
        cursor: 'pointer',
        style: style
        });
      this.mass.on("click", (e) => {
        this.isDetail=true
        if(e.data){
          let str=e.data
          this.mapobj=str
          if (str.needsName){
            this.mapobj.needsNamearr=str.needsName.split(",")
          }
          if (str.needsDescr){
            this.mapobj.needsDescrList1=str.needsDescr.split(",")
            let obj={}
            let x=this.mapobj.needsDescrList1
            for(let i=0;i<x.length;i++){
              x[i]=x[i].split(":")
            }
            this.mapobj.needsDescrList=this.jsonFormat(x)
          }
      
          if (str.sourceLink){
            var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
            var reg1 = /^\d+$/
            if(!reg.test(str.sourceLink)&&!reg1.test(str.sourceLink)){
            this.mapobj.sourceLinkReg=str.sourceLink
            } else {
              this.mapobj.sourceLinkReg=''
            }

          } else {
            this.mapobj.sourceLinkReg=''
          }
        }
      })
        this.mass.setMap(this.myMap);
    },
    //初始化 获取省的点
    getProvinMark(color){
      this.pointGroup.clearOverlays()
      this.$fetchGet("area/countByProvince",{
        orgType:this.query.orgType
      }).then(res=> {
        if (res.code=="success") {
          if(res.content.length>0){
            res.content.forEach(iteam=>{
              this.pointGroup.addOverlay(this.createdProvin(color,iteam))
            })
            this.myMap.add(this.pointGroup)
          }else{
            this.$toast("暂无数据");
          }
        }else{
          this.$toast(res.message);
        }
      })
    },
    //创建省的聚合点
    createdProvin(color,row){
      let marker = new AMap.Marker({
        position: new AMap.LngLat(row.longitude, row.latitude),
        offset: new AMap.Pixel(-40, -40),
        content: this.setContent(color, row),
        topWhenClick: true,
        extData: { row }
      })
    marker.on("click", (e) => {
      this.myMap.setZoomAndCenter(6, e.lnglat);
      this.getDataList()
    })
      return marker
    },
    //设置圆圈的颜色
    setContent(color, row) {
      return `<div style="box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.3);background-color: ${color};font-size:6px;color:#ffffff; height:60px; width:60px;border-radius:50%;">
            <p style="margin:0;padding-top:16px">${row.province}</p>
            <p style="margin:0">${row.countNum}家</p>
        </div>
      `
    },
    // 录入按钮
    writeBtn(){
      // this.show=false
      // this.reduceShow=!this.reduceShow
      // this.clickTabPoint=0

      this.luruSelectModel=true
      
      // this.clearErrorMessage()
    },
    // 物资
    getWuziList(){
      let params={
        top:6,
        orgType:this.query.orgType
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
        top:8,
        orgType:this.query.orgType
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
    getDataList(){
      this.showmap=true
      this.dataList=[]
      let phonearr=[]
      let monarr=[]
      if(this.mass){
       this.mass.clear()
       this.mass=null
      }
      this.$fetchGet("hospital/selectHospital",this.query).then(res=> {
        this.showmap=false
        if(res.content.length==0){
          if(this.mass){
            this.mass.clear()
            this.mass=null
            }
          this.total=0
          
          this.$toast('暂无数据！');
        }else{
          let arrsa=res.content
          arrsa.forEach(itam=>{
            if(itam.hospitalAddress){
              itam.hospitalAddress=decodeURIComponent(encrypt.Decrypt(itam.hospitalAddress))
            }
            if(itam.hospitalName){
              itam.hospitalName=decodeURIComponent(encrypt.Decrypt(itam.hospitalName))
            }
            if(itam.linkPeople!==undefined){
              monarr=itam.linkPeople.split(",")
              itam.linkPeoplearr1=[]
              monarr.forEach(iteam=>{
                itam.linkPeoplearr1.push(decodeURIComponent(encrypt.Decrypt(iteam)))
              })
            }
            if(itam.linkTel!==undefined){
              itam.linkTelarr1=[]
              phonearr=itam.linkTel.split(",")
              phonearr.forEach(itm=>{
                itam.linkTelarr1.push(decodeURIComponent(encrypt.Decrypt(itm)))
              })
            }
            if(itam.gaodeLat){
              itam.gaodeLat=decodeURIComponent(encrypt.Decrypt(itam.gaodeLat))
              itam.gaodeLon=decodeURIComponent(encrypt.Decrypt(itam.gaodeLon))
            }
            
          })
          this.total=arrsa.length
          this.dataList=arrsa
          this.getmarkers(arrsa)
        }
       
      })
    },
    // 选择时间
    selectTimeItem(item) {
      this.show=false
      // this.showSearch=true
      this.styleUp=true
      this.isone=false
      this.searchText=item
      this.seven=false
      this.query.hour=item.substring(2,4)
      this.query.content=''
      this.getDataList()

    },
    // 选择物资，城市
    selectItem(item) {
      this.show=false
      // this.showSearch=true
      this.styleUp=true
      this.isone=false
      this.searchText=item
      this.query.content=item
      this.query.hour=''
      this.getDataList()
    },
    // 右边弹框显示
    rightModel(){
      this.showDataLengthPoint=0
      this.showModel=true
    },
    downUp() {
      this.downUpImg=!this.downUpImg
      if (!this.downUpImg){
        this.heightCur="100%"
      }else {
        this.heightCur="0"
      }
    },
    search(){
      if (this.searchText){
        this.show=false
        // this.showSearch=true
        this.styleUp=true
        this.isone=false
        this.query.content=this.searchText
        this.getDataList()

      }else {
        this.$toast('请输入或选择搜索关键字');
      }
    },
    // 第一搜索获取焦点
    inputFocus() {
      this.downUpImg=false
      this.heightCur="100%"
    },
    goback(){
      this.show=true
      this.showSearch=false
      if (!this.isoneClosePoint){

        this.isone=false
      this.styleUp=false
      }else {
        this.isone=true
      this.styleUp=true
      }
      this.showDataLengthPoint=1
    },
    clearText(){
      this.searchText=""   
      this.showDataLengthPoint=1
      this.query.content=""
      this.query.hour=""
      this.getDataList() 
      this.showSearch=false
      this.styleUp=false
      if (!this.isoneClosePoint){
        this.isone=false
      }else {
        this.isone=true
      }
      if(!this.seven){
          this.seven=true
      }

    },
    shakeTime(val){
      this.$fetchGet("encourage/saveEncourage", {
        hospitalName:val
      }).then(res => {
        if(res.code=="success"){
         this.$toast('已经成功点赞');
         this.initMap()
         this.mapobj.encourageNum++
        }else{
          this.$toast('您已点赞，请稍后点赞');
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
      this.$fetchGet("recorder/savePhoneRecorder",{
        orgName:this.mapobj.hospitalName,
        type:this.query.orgType,
      }).then(res => {
        // this.zanz=res.content
      });
    },
    getMap () {
      this.myMap = new AMap.Map("myMap", {
        animateEnable: false,
        resizeEnable: true,
        // preloadMode: true,
        center:[111.160477,32.1624],
        zoom:3,
        mapStyle:'amap://styles/9fb204085bdb47adb66e074fca3376be',
      });
      this.getMiao()
      this.initMap()

    },
    getMiao(){
      new AMap.DistrictSearch({
          extensions:'all',
          subdistrict:0
      }).search('中国',(status,result)=>{
          // 外多边形坐标数组和内多边形坐标数组
          var outer = [
              new AMap.LngLat(-360,90,true),
              new AMap.LngLat(-360,-90,true),
              new AMap.LngLat(360,-90,true),
              new AMap.LngLat(360,90,true),
          ];
          var holes = result.districtList[0].boundaries

          var pathArray = [
              outer
          ];
          // pathArray.push.apply(pathArray,holes)
          pathArray=holes
          var polygon = new AMap.Polygon( {
              pathL:pathArray,
              strokeColor: '#00eeff',
              strokeWeight: 0,
              strokeOpacity:0,
              fillColor: '#ffefef',
              fillOpacity: 0.6
          });
          polygon.setPath(pathArray);
          this.myMap.add(polygon)
      })
    
    },

    jsonFormat (dataset) {
      const data = dataset
      let datajson = {}
      var jsonresult = []
      for (let i = 0; i < data.length; i++) {
        datajson.name=data[i][0]
        datajson.num=data[i][1]
        jsonresult.push(datajson)
        datajson = {}
      }
      return jsonresult
    },
    detailright(row){
      this.isDetail=true
      this.mapobj=row
      if (row.needsName){
        this.mapobj.needsNamearr=row.needsName.split(",")
      }
      if (row.needsDescr){
        this.mapobj.needsDescrList1=row.needsDescr.split(",")
        let obj={}
        let x=this.mapobj.needsDescrList1
        for(let i=0;i<x.length;i++){
          x[i]=x[i].split(":")
        }
        this.mapobj.needsDescrList=this.jsonFormat(x)
      }
      
      if (row.sourceLink){
        var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
        var reg1 = /^\d+$/
        if(!reg.test(row.sourceLink)&&!reg1.test(row.sourceLink)){
        this.mapobj.sourceLinkReg=row.sourceLink
        } else {
          this.mapobj.sourceLinkReg=''
        }

      } else {
        this.mapobj.sourceLinkReg=''
      }

    },
    mapinit(res){
     this.myMap.clearMap()
      const markerslist=[]
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
          item.lnglat=[item.gaodeLon, item.gaodeLat]
          markerslist.push(this.createPoint(item))
          // 
        }
        
      })
      this.myMap.add(markerslist)
      
    },

  initMap(){
    
    this.$fetchGet("view/viewCount").then(res => {
      if(res.code=="success"){
        this.zanz=res.content
      }
      
    });
  },
  
  createPoint(row) {
    let marker = new AMap.Marker({
      position: new AMap.LngLat(row.gaodeLon, row.gaodeLat),
      offset: new AMap.Pixel(-7, -7),
      icon: new AMap.Icon({
        size: new AMap.Size(14, 14),
        image:
          (row.type == 2&&row.isLack==1)
            ? require('../assets/image/icon4.png')
            : (row.type == 2&&row.isLack==0)?require('../assets/image/icon3.png')
            : (row.type == 1&&row.isLack==0)?require('../assets/image/icon1.png')
            :(row.type == 1&&row.isLack==1)?require('../assets/image/icon2.png'):require('../assets/image/icon5.png'),
        imageSize: new AMap.Size(14,14)
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
      if (str.needsName){
        this.mapobj.needsNamearr=str.needsName.split(",")
      }
      if (str.needsDescr){
        this.mapobj.needsDescrList1=str.needsDescr.split(",")
        let obj={}
        let x=this.mapobj.needsDescrList1
        for(let i=0;i<x.length;i++){
          x[i]=x[i].split(":")
        }
        this.mapobj.needsDescrList=this.jsonFormat(x)
      }
      
      
      if (str.sourceLink){
        var reg = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi; 
        var reg1 = /^\d+$/
        if(!reg.test(str.sourceLink)&&!reg1.test(str.sourceLink)){
        this.mapobj.sourceLinkReg=str.sourceLink
        } else {
          this.mapobj.sourceLinkReg=''
        }

      } else {
        this.mapobj.sourceLinkReg=''
      }
    })
     return marker
  }
  }
};
</script>
<style lang="scss">

.likeAddAnimate-enter-active, .likeAddAnimate-leave-active{
  transition: all 1.5s ease
}
.likeAddAnimate-enter,.likeAddAnimate-leave{
  transform: translate(0) scale(0);
  opacity: 1
}
.likeAddAnimate-enter-to, .likeAddAnimate-leave-to{
  transform: translate(0,-100px) scale(1.5);
  opacity: 0.8
}
.van-popup__close-icon--top-right{
  top: 9px!important;
  right: 3px!important;
}
.amap-logo{
  display:none !important;
}
.search-position-input .van-cell{
  height:34px;
  padding:0;
}
.search-position-input .van-field__body{
  height: 34px;
}
.show-help{
  .van-popup{
    background-color:#eee;
  }
}


</style>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  display:flex;
  position:relative;
  .wrapperfast{
     display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .peopleTeam{
    position:absolute;
    top:126px;
    left:0;
    z-index:10;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
    width:38px;
    height:220px;
    background:url("../assets/image/circle.png") no-repeat;
    background-size:38px 220px;
    padding: 20px 0;
    box-sizing:border-box;
    padding-right:8px;
    .txtimg{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      // border-bottom:1px solid #EAEAEA;
      // padding-bottom:4px;
      // margin-bottom:4px;
      .imgbox{
        width:16px;
        font-size:15px;
        font-family:PingFang SC;
        font-weight:500;
        color:#666666;
        padding:6px 0;
        padding-bottom:4px;
        text-align:center;
        border-radius: 8px;
        line-height:16px;
        &.txt-active{
          background:#216AFF;
          color:#fff;
        }
      }
      
    }
    .txtimg:last-child{
      // border-bottom:none;
      //  padding-bottom:0px;
      // margin-bottom:0px;
      }
  }
  .onebif{
    position:absolute;
    top:0px;
    left:0;
    right: 0;
    z-index:10;
    height:22px;
    background:rgba(0,0,0,1);
    box-shadow:0px 1px 0px 0px rgba(238,238,238,1);
    opacity:0.4;
    color:#ffffff;
    display:flex;
    justify-content:space-between;
    box-sizing:border-box;
    padding:0 13px;
    align-items:center;
  }
  .twobif{
    position:absolute;
    top:47px;
    right:48px;
    z-index:10;
    width:100px;
    height:24px;
    line-height:25px;
    font-size:12px;
    background:rgba(254,59,57,1);
    opacity:0.7;
    color:#ffffff;
    border-radius:12px;
    text-align:center;
    padding-left:6px;
    &.twobif1{
      position:absolute;
      top:90px;
      right:60px;

    }
    &.twobif2{
      position:absolute;
      top:40px;
      right:60px;

    }
  }
  .forew{
    position:absolute;
    top:80px;
    left:12px;
    z-index:10;
    color:#333333;
    width:100px;
    height:30px;
    font-size:14px;
    line-height:30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.32);
    border-radius:6px;
    &.forew1{
      position:absolute;
      top:90px;
      left:20px;

    }
    &.forew2{
      position:absolute;
      top:40px;
      left:20px;

    }
  }
  .dzan{
    position:absolute;
    top:62px;
    right:28px;
    z-index:11;
    width:20px;
    height:20px;
    background:rgba(51,51,51,1);
    color:#ffffff;
    font-size:12px;
    line-height:20px;
    border-radius:50%;
  }
  .threebif{
    position:absolute;
    top:37px;
    right:12px;
    z-index:10;
    width:44px;
    height:44px;
    line-height:44px;
    background:rgba(254,59,57,1);
    border:3px solid rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.32), 0px 0px 16px 0px rgba(221,2,0,1);
    border-radius:50%;
    box-sizing:border-box;
   
  }
  .threebif:active {
    top: 40px; /**向下偏移2px **/
  }
  table{
    td{
      font-size:12px;
      padding: 5px;
    }
    .td-1{
          width: 40px;
          text-align:center;
    }
    .td-2{
          width: 170px;
          text-align:center;
    }
    .td-3{
          width: 105px;
    }
  }
  .table-list{
    width: 100%;
    table{
      width: 100%;
      table-layout: fixed;
    }

  }
  .agreement-content{
    box-sizing: border-box;
    padding:20px 15px;
    .bigfont{
      font-size:18px;
      font-weight:bold;
    }
    .smallfont{
      font-size:12px;
      text-align:left;
      margin:4px 0;
    }
    .leftfont{
      font-size:16px;
      font-weight:bold;
      text-align:left;
      margin-top:8px;
    }
    .contentfont{
      font-size:15px;
      text-align:left;
      text-indent:20px;
      margin-top:8px;
      line-height:26px;
      color:#333333;
    }
    img{
      width: 100%;

    }
  }
  .writefont{
    position:absolute;
    bottom:4px;
    right:10px;
    z-index:10;
    color:#666666;
    font-size:12px;
  }
  .search-position{
    position:absolute;
    top:39px;
    left:12px;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    // width:210px;
    // height:36px;
    z-index:10;
    padding:3px 15px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.16);
    border-radius:26px;
    .search-postion-content{
      display:flex;
      justify-content:flex-start;
      align-items:center;

      img{
        width:15px;
        height:15px;
        // margin-left:15px;
        margin-right:10px;
      }
      
      .search-position-input{
        height:34px;
        // line-height:34px;
        width:120px;
        font-size:15px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);
      }
      span{
        height:34px;
        line-height:34px;
        text-align:left;
        width:130px;
        font-size:14px;
        font-family:PingFang SC;
        font-weight:500;
        color:#999;
        // background:none;  
        outline:none;  
        border:none;
      }
    }
  }
  .search-list{
    position:absolute;
    top:90px;
    left:12px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:220px;
    height:35px;
    background:rgba(0,0,0,1);
    opacity:0.4;
    border-radius:8px;
    z-index:10;
    padding:0 10px;
    .search-num{
      font-size:13px;
      color:#fff;
      &.search-info{
        display:flex;
        justify-content:center;
        align-items:center;
        color:#FFC046;
      }

    }
    
    .arrow-up{
      position:absolute;
      top:-45px;
      left:20px;

      .triangle_border_up{
        width:0;
        height:0;
        border-width:0 8px 8px;
        border-style:solid;
        border-color:transparent transparent rgba(0,0,0,.5);/*透明 透明  灰*/
        margin:40px auto;
        position:relative;
        span{
          display:block;
          width:0;
          height:0;
          border-width:0 8px 8px;
          border-style:solid;
          border-color:transparent transparent rgba(0,0,0,.5);/*透明 透明  黄*/
          position:absolute;
          top:0px;
          left:-8px;
        } 
      }
    }
  }
  .fugong-wrapper{
    position:absolute;
    bottom:140px;
    left:0;
    right: 0;
    z-index:10;
    .fugong{
      position:relative;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width:100%;
      height:110px;
      background:url("../assets/image/fugong.png") no-repeat;
      background-size: 100% 110px;
      .title{
        font-size:19px;
        font-family:PingFang SC;
        font-weight:800;
        color:rgba(255,255,255,1);
        margin-left: 25px;
      }
      .sub-title-btn{
        display:flex;
        justify-content: flex-start;
        align-items:center;
        font-size:12px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-bottom: 11px;
        margin-left: 25px;
        .sub-title{

        }
        .btn{
          margin-left:10px;
          padding:2px 5px;
          font-size:9px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(254,157,77,1);
          background:#fff;
          border-radius: 8px;
        }

      }
      .close-btn{
        position:absolute;
        top:0px;
        right:8px;
        padding:10px;
      }
    }
  }
  .bottom-btn-write{
    position:absolute;
    bottom:0;
    left:0;
    right: 0;
    height: 126px;
    background:#fff;
    z-index:10;
    .bottom-btn{
      display:flex;
      justify-content:space-between;
      align-items:center;
      height:82px;
      padding:0 12px;
      border-bottom:1px solid #DDDDDD;
        .btn-list{
          display:flex;
          flex-direction:column;
          width:80px;
          height: 68px;
          background-size:100% 100%;
          span{
            font-size:13px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            margin-top:44px;

          }
        }
        // .btn-list:nth-child(3){
        //   opacity:0.4;
        //   span{
        //     color:#dddddd;
        //   }
        // }
    }
    .write-wrapper{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      padding:5px 12px;

      .write{
        font-size:11px;
        width:100%;
        color:#999999;
        p{
          text-align:center;
          margin:0
        }
      }
      .countbottom{
        margin-top:5px;
        width:100%;
        font-size:11px;
        color:#999999;
        a{
          color:#216AFF;
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
          -webkit-user-select: none;
          -moz-user-focus: none;
          -moz-user-select: none;
        }
      }
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
  .hospatilBox{
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    .contentDetail{
      width:100%;
        // height:100%;
      padding: 12px;
      padding-top:20px;
      background:#fff;
      box-sizing: border-box;
      border-radius:10px;
      position:relative;
      .btnSty-wrapper{
        display:flex;
        justify-content:center;


        .btnSty{
          // display:inline-block;
          font-size:15px;
          padding:8px 16px;
          padding-top:6px;
          color:#FFFFFF;
          background:#216AFF;
          border-radius:18px;
          &:last-child{
            display:flex;
            justify-content: center;
            align-items:center;
          }
          
        }
      }
      .closeimg{
        position:absolute;
        top:10px;
        right:10px;
      }
      .link-go{
        display:flex;
        justify-content:flex-start;
        align-items:center;
        img{
          width:13px;
          height:13px;
        }
        span{
          font-size:12px;
          padding-left:8px;
          color: #216AFF
        }

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
          background:#a485fd;
          border-radius:10px;
          font-size:12px;
          color:#fff;
          text-align:center;
          line-height:20px;
        }
        .right-btn1{
          background:#ff9d28;
        }
        .right-btn2{
          background:#1bcc91;
        }
        .right-btn3{
          background:#6196ff;
        }
        .right-btn4{
          background:#ff7e69;
        }
      }
      .tel-phone{
        background: #F2F5FF;
        padding: 12px;
        font-size:15px;
          margin:14px 0 5px;
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
      .service-title-time{
        margin-bottom:19px;
        .service-title{
          display:flex;
          justify-content:flex-start;
          align-items:center;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(51,51,51,1);
          span{
            font-size:15px;
            font-family:PingFang SC;
            font-weight:500;
          }
        }
        .service-time{
          display:flex;
          justify-content:flex-start;
          align-items:center;
          font-size:15px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(102,102,102,1);
          margin-top:11px;
          .start-end-time{}
          .line{}

        }
      }
      .table-wrapper-needs{
        // width:306px;
        // height:150px;
        margin: 10px auto;
        // background:blue;
        border:1px solid #EEEEEE;
        .table-wrapper{
          .tab-head{
            display:flex;
            justify-content:flex-start;
            align-items:center;
            height:27px;
            background:#F2F5FF;
            font-size:12px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);

          }
          .tab-body{
            height:123px;
            overflow-y:scroll;
          }
          .tab-items{
            display:flex;
            justify-content:flex-start;
            align-items:center;
            // height:27px;
            font-size:13px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            border-bottom:1px solid #EEEEEE;

          }
          .tab-items-name{
            // height:27px;
            // line-height:27px;
            padding:5px 0;
            width:213px;
            border-right:1px solid #EEEEEE;

          }
          .tab-items-num{
            // height:27px;
            // line-height:27px;
            flex:1;
            padding:5px 0;
            
          }

        }

      }
      .need-descr{
        font-size:12px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        margin-top:5px;
        text-align:left;
        margin-bottom:15px;
      }


      .material{
        display: flex;
        flex-wrap: wrap;
        color: #216AFF;
        font-size: 14px;
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
 
  .search-wrapper{
    // position: absolute;
    // left:0;
    // bottom:0;
    // right:0;
    // background:#fff;
    // z-index:20;
    .img-write{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;

      .down-up{
        width:30px;
        height: 12px;
        padding:5px 20px;
      }
      span{
        font-size:12px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(170,170,170,1);
      }

    }
    .tab-item-list{

      display:flex;
      justify-content:space-between;
      align-items:center;
      height:44px;
      background:#216AFF;
      margin-bottom:12px;
      
      .go-back-home{
          display:flex;
          justify-content:center;
          align-items:center;
          width:35px;
          height:44px;
          background:#216AFF;

      }
      .tab-all-wrapper{
        flex:1;
        display:flex;
        justify-content:space-around;
        align-items:center;

        .tab-item{
          width:60px;
          height:44px;
          line-height:44px;
          text-align:center;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:500;
          color:#fff;
          background:#216AFF;
          box-sizing:border-box;
          &.tab-item-span-active{
            border-bottom:4px solid #fff;
            box-sizing:border-box;

          }
        }
      }
    }
    .tab-list-wrapper{
      font-size:16px;
      margin-bottom: 30px;
      padding:0 17px;
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
      height: 38px;
      background:rgba(242,245,255,1);
      border:1px solid rgba(224,224,224,1);
      border-radius:12px;
      margin:0 17px;
      img{
        width: 18px;
        height: 18px;
        padding: 9px 15px;
      }
      form{
        display:flex;
        justify-content: center;
        align-items: center;
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
    
  } 
  .van-popup--right{
    width:80%;
  }
  .list-content{
    padding:10px;
    .list-wrapper{
      padding:11px 0;
      border-bottom:1px solid #dddddd;
      &.list-wrapper-no{
        
          
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;

        img{
          width: 194px;
          height:147px;
        }
        p{
          font-size:15px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          margin-top:23px;

        }
      }
      &:last-child{
        border:0
      }
      .title{
        text-align:left;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-bottom:10px;
      }
      .wuzi-list{
        display:flex;
        flex-wrap:wrap;
        justify-content:flex-start;
        font-size:12px;
        color:#333;
        span{
          padding-right:10px;
        margin-bottom:5px;
        }
      }
      .address-wrapper{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:10px;
        .address{
          display:flex;
          justify-content:flex-start;
          align-items:center;
          flex:1;
          font-size:12px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(102,102,102,1);
          div{
            text-align:left;
          }
        }
        .right-btn{
          width:64px;
          height:18px;
          background:#a485fd;
          border-radius:10px;
          font-size:12px;
          color:#fff;
          line-height:18px;
          margin-left:10px;
        }
        .right-btn1{
          background:#ff9d28;
        }
        .right-btn2{
          background:#1bcc91;
        }
        .right-btn3{
          background:#6196ff;
        }
        .right-btn4{
          background:#ff7e69;
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
          flex-wrap: wrap;
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
            padding-left:7px;
          }
        }
      }
    }
  }
  .icon-direction{
    position:absolute;
    bottom:140px;
    right:12px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#fff;
    width:44px;
    height:44px;
    border-radius:50%;
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.16);
    img{
      width:23px;
      height: 23px;
    }
    img:active{
      width:13px;
      height:13px;
    }
  }
  .icon-direction1{
    position:absolute;
    bottom:270px;
    right:12px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#fff;
    width:44px;
    height:44px;
    border-radius:50%;
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.16);
    img{
      width:23px;
      height: 23px;
    }
    img:active{
      width:13px;
      height:13px;
    }
  }
  .help-wrapper{
    background:#EEEEEE;
    .help-top{
      position:relative;
      display:flex;
      justify-content:center;
      align-items:center;
      width:100%;
      height:44px;
      line-height:44px;
      text-align:center;
      border-bottom:1px solid #eee;
      background:#216AFF;
      .go-back{
        position:absolute;
        top:0;
        left:0;
        display:flex;
        justify-content:center;
        align-items:center;
        height:44px;
        width:34px;
      }
      span{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        color:#fff;
        
      }
    }
    .help-body{
      .help-item{
        text-align:left;
        padding:21px 10px;
        background:#fff;
        margin-bottom:5px;
        .help-q{
          font-size:15px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(51,51,51,1);
          span{
            font-size:13px;
            padding:0px 4px;
            background:rgba(255,173,15,1);
            border-radius:3px;
            color:#fff;
            margin-right:8px;

          }
        }
        .help-a{
          font-size:13px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(102,102,102,1);
          margin-top:16px;
          line-height:20px;
          span{
            padding:0px 4px;
            background:rgba(39,198,169,1);
            border-radius:3px;
            color:#fff;
            margin-right:8px;

          }
        }
      }
    }
  }
//   .icon-direction:active {
//     bottom:12px;
//   }
  .search-write{
    position: fixed;
    top: 190px;
    right: 12px;
    z-index:10;
    .img-icon{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // width: 40px;
      // height: 40px;
      padding:8px 4px ;
      border-radius: 6px;
      background: #fff;
      box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.32);
      // &:last-child{
        // margin-top:10px;
      // }
      img{
        width: 16.5px;
        height: 17px;
      }
      span{
        font-size: 8px;
        color: #216AFF;
        padding-top: 1px;
      }
    }
  }
  .cur-time-donate{
    background: #eee;

  }
  .time-donate{
    // .top{
    //   display: flex;
    //   justify-content: flex-start;
    //   align-items: center;
    //   height: 36px;
    //   font-size:16px;
    //   font-family:PingFang SC;
    //   font-weight:bold;
    //   color:rgba(51,51,51,1);
    //   padding: 0 12px;
    //   background: #fff;
    //   span{
    //     padding-left:10px;
    //     border-left: 3px solid #216AFF;
    //   }

    // }
    .top{
      display:flex;
      justify-content:space-between;
      align-items: center;
      width: 100%;
      background:linear-gradient(180deg,rgba(89,101,233,1) 0%,rgba(91,178,245,1) 100%);
      padding:15px 14px;
      box-sizing:border-box;
      img{
        width: 33px;
        height: 30px;
      }
      .top-content-write{
        display: block;
        width: 285px;
        font-size:13px;
        text-align: left;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:18px;
        padding-left: 15px;
        border-left:1px solid #F2F1F1;
      }

    }
    .tab-list-btn{
      display:flex;
      justify-content:space-around;
      // align-items:center;
      height:44px;
      background:rgba(255,255,255,1);
      span{
        font-size:15px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-top:15px;
        &.active{
          padding-bottom:12px;
          border-bottom: 4px solid rgba(33,106,255,1);
        }

      }
    }
    .renwu-list-wrapper{

      padding:0 12px;
      .renwu-list-item{
        position:relative;
        margin-top: 20px;
        padding: 12px;
        text-align:left;
        background:rgba(255,255,255,1);
        border-radius:4px;
        .list-item-top{
          .item-content{
            .title{
              font-size:15px;
              font-family:PingFang SC;
              font-weight:bold;
              color:rgba(51,51,51,1);
              padding-bottom:12px;
              .name{}
              .num{}

            }
            .money{
              font-size:13px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(102,102,102,1);
              padding-bottom:12px;

            }
            .direction{
              font-size:13px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(102,102,102,1);
              padding-bottom:12px;

            }

          }

        }
        .list-item-bottom{
          font-size:12px;
          font-family:PingFang SC;
          font-weight:500;
          color:rgba(153,153,153,1);
        }
        .tab{
          position: absolute;
          top:0;
          right:0;
          width:64px;
          height: 64px;
          img{
            width:64px;
            height: 64px;
          }
          // height: 30px; 
          // width: 80px; 
          // background: #f00;
          // text-align: center;
          // text-decoration: none;
          // font-size:12px;
          // color:#fff;
          // transform: rotate(45deg);
        }
      }
    }
    .donate-content{
      padding-top: 15px;
      &.donate-content-no{
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;

        img{
          width: 194px;
          height:147px;
        }
        p{
          font-size:15px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          margin-top:23px;

        }
      }
      .donate-list{
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        .time-wrapper{
          display: flex;
          flex-direction: column;
          .time-length{
            text-align: right;
            font-size:15px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
          .time-cur{
            text-align: right;
            font-size:12px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(102,102,102,1);
            margin-top: 8.5px;

          }
        }
        .line-split{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .dot{
            width:9px;
            height:9px;
            background:rgba(33,106,255,1);
            border-radius:50%;
          }
          .line{
            width: 2px;
            height: 100%;
            background:#E2E2E2;
          }
        }
        .main-content{
          width:232px;
          background:rgba(255,255,255,1);
          border-radius:4px;
          padding: 12px;
          margin-bottom: 15px;
          a{
            display:block;
            color:rgba(51,51,51,1);
            .title-wrapper{
              width:232px;
              line-height:20px;
              // height: 20px;
              text-align: left;
              // white-space:nowrap;
              // text-overflow:ellipsis;
              // overflow:hidden; 
              .tab-type{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(255,255,255,1);
                padding: 3px 4px;
                vertical-align:top;
                margin-right: 8px;
                &.por{
                  background: #9141FF;
                }
                &.new{
                  background: #ED563B;
                }
              }
              .title{
                width:175px;
                font-size:16px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1);
                vertical-align:top;
                // line-height:15px;

              }
            }
            .articl{
              font-size:13px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(102,102,102,1);
              line-height:15px;
              margin: 12px 0;
              text-align: left;

            }
            .origin{
              font-size:12px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(153,153,153,1);
              text-align: right;
              span {

              }
            }
          }
        }

      }
      .loading-more{
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #999;
        font-size: 14px;
        background: #f1f1f1;
        margin-top: 20px;
      }

    }



  }
  .cur-time-btn{
    position: fixed;
    top: 90px;
    right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center; 
    width:44px;
    height:88px;
    background:rgba(255,252,232,1);
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.32);
    border-radius:6px;
    z-index:10;
    .cur-time-img{
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width: 100%;
      height: 40px;
      img{
        width:28px;
        height: 26px;
      }
      &:last-child{
        img{
          width:18px;
          height: 17px;
        }
        span{
          font-size:9px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(255,111,24,1);
          padding-top:4px;
        }

      }
    }
    .line{
      width: 80%;
      height: 1px;
      background: #EAEAEA;
    }
  }
  .luru-model-wrapper{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right:0;
    z-index: 30;
    display:flex;
    justify-content: center;
    align-items: center;
    background:rgba(0,0,0,.5);

    .luru-model{
      position: relative;
      width: 327px;
      background: #fff;
      border-radius: 5px;
      .luru-top-bg{
        display: flex;
        justify-content: center;
        // align-items: center;
        width: 100%;
        height:130px;
        background-image:url("../assets/image/luru1.png");
        background-size: 100% 130px;
        .luru-title{
          font-size:24px;
          font-family:PingFang SC;
          font-weight:800;
          color:rgba(255,255,255,1);
          margin-top:30px;
        }
      }
      .luru-img{
        display: block;
        width: 187px;
        height: 181px;
        margin: 10px auto;
      }
      .luru-select{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        padding:30px 0;

        .luru-btn{
          width:200px;
          height:40px;
          text-align:center;
          line-height: 40px;
          background:#026FFD;
          border-radius:20px;
          width:200px;
          font-size:16px;
          font-family:PingFang SC;
          font-weight:800;
          color:rgba(255,255,255,1);
          margin-bottom: 15px;
          &:last-child{
            margin-bottom: 0;
          }

        }
      }
      .close-luru-model{
        position: absolute;
        top:4px;
        right: 12px;
      }
    }
  }
  
  .contect-model-wrapper{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right:0;
    z-index:30;
    display:flex;
    justify-content: center;
    align-items: center;
    background:rgba(0,0,0,.5);

    .contect-model{
      position: relative;
      width: 339px;
      background:#174FCE;
      border-radius: 5px;
      .us-need{
        border-radius:8px;
        &.us{}
        &.need{}
        .title{
          display:flex;
          justify-content: center;
          align-items:center;
          height: 60px;
          font-size:17px;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(255,255,255,1);
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
        .message-wrapper{
          border-radius: 5px;
          background: #3A6FE5;
          padding: 0 10px;
          margin: 0 20px;
          .message{
            display:flex;
            justify-content: space-between;
            align-items:center;
            font-size:15px;
            padding: 10px 0;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(232,245,255,1);
            border-bottom: 1px solid #174FCE;
            &:last-child{
              
              border-bottom: 0;
            }
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
        }
        .code{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items:center;
            padding: 18px 0 30px;
          img{
            width: 63px;
            height: 63px;
            margin-bottom:10px;
          }
          .btn{
            font-size:12px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            margin-bottom: 10px;
          }
        }

      }
      .close-luru-model{
        position: absolute;
        top:4px;
        right: 12px;
      }
    }
  }
}
</style>
