<template>
    <div class="cur-time">
        <div class="cur-time-donate">
            <div class="time-donate">
                <div class="top"><span>实时播报</span> <div @click="closeCurTime"><van-icon name="cross" size="22"/></div></div>
                <div class="donate-content" id="div" v-if="curTimeNoDataShow">
                <div class="donate-list" v-for="(item, i) in curTimeDataList" :key="i">
                    <div class="time-wrapper">
                    <span class="time-length">{{item.duration}}</span>
                    <span class="time-cur" v-if="item.pubDate">{{item.pubDate.substring(5,16)}}</span>
                    </div>

                    <div class="line-split">
                    <span class="dot"></span>
                    <span class="line"></span>
                    </div>

                    <div class="main-content">
                    <a :href="item.url">

                        <div class="title-wrapper">
                        <span class="tab-type por" v-if="item.isTop&&item.isTop==1">置顶</span>
                        <span class="tab-type new" v-if="item.isNew&&item.isNew==1">最新</span>
                        <span class="title" v-if="(item.isTop||item.isNew)&&item.headline&&item.headline.length<10">{{item.headline}}</span>
                        <span class="title" v-else-if="(item.isTop||item.isNew)&&item.headline&&item.headline.length>10">{{item.headline.substring(0,11)}}...</span>
                        <span class="title" v-else-if="!item.isTop&&!item.isNew&&item.headline&&item.headline.length<14">{{item.headline}}</span>
                        <span class="title" v-else-if="!item.isTop&&!item.isNew&&item.headline&&item.headline.length>14">{{item.headline.substring(0,13)}}...</span>
                        </div>
                        <div class="articl">{{item.mainBody}}</div>
                        <div class="origin">信息来源：<span>{{item.publishSource}}</span></div>
                    </a>
                    </div>
                </div>

                </div>
                <div class="donate-content donate-content-no" v-else>
                <img class="down-up" src="../assets/image/reduce.png" alt="">
                <p>没有数据哦!</p>

                </div>
            </div>

        </div>

    </div>
</template> 

<script>
// @ is an alias to /src
export default {
  name: "curTime",
  data() {
    return {
      curTimeDonate:false, // 实时捐赠弹框
      curTimeDataList:[],
      // curTimeDataList:[
      //   {
      //     isTop: 1,
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额水水水水水",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     isNew: 1,
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉顶顶顶额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉顶顶顶顶额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      //   {
      //     duration: "30分钟前",
      //     pubDate:"2012-02-16 20:30:30",
      //     url:"https://www.baidu.com",
      //     headline: "事实上上等等大家都钉钉额",
      //     mainBody:"ss生生世世事实等等等等等等等等等等等等得到的上事实上事实上",
      //     publishSource:"sssss",
      //   },
      // ], // 实时捐赠信息列表
      curTimeParams:{
        page: 1, // 页数
        pageSize:2, // 偏移量
      },
      curTimeNoDataShow: false, // 实时捐赠无数据显示
      loadMore:true, //加载更多按钮
      showHome: true,
      
				flag: false, 
				noMore: false,

    };
  },
  created() {
    this.getCurTimeDataList()
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
  },
  methods:{
    closeCurTime(){
      this.curTimeDonate=false
      this.showHome=true
      this.curTimeParams.page=1
      this.curTimeDataList=[]
      this.getCurTimeDataList()

    },
    // 获取实时资讯数据
    getCurTimeDataList(){
      this.$fetchGet("donate/getInfo",this.curTimeParams).then(res=> {
        if (res.total){
          this.curTimeNoDataShow= true
          if (res.list&&res.list.length){

            this.curTimeDataList=this.curTimeDataList.concat(res.list)
          }else {
				 				this.noMore = true

          }
				 			this.flag = false // 数据加载完成之后放开节流阀
        } else {
          this.curTimeNoDataShow= false
        }

      })
  

    },
    // 加载更多
    loadMoreData(){
      this.curTimeParams.page++
      this.getCurTimeDataList()

    },
    // 实时资讯按钮
    curTimeBtn(){
      this.curTimeDonate=true
      this.showHome=false
      
		  window.addEventListener('scroll', this.scrollHandle, true)
    },
    scrollHandle(){
      // 获取页面页面的滚动高度
				let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight  
				// 获取页面滚动距离顶部的高度,  window.pageYOffse 兼容苹果
		   	 	let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop  
		    	// 获取页面的可视高度
          let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
          console.log(scrollHeight,scrollTop,clientHeight)

          // 我们可以在这里判断页面的滚动是否到了底部
				if (scrollTop + clientHeight === scrollHeight) {
					if (this.flag) return 
					this.flag = true
          this.curTimeParams.page++
			 		// 根据noMore 看是否还有数据  默认为false  
			 		if (!this.noMore) {
             // 滚动到底部执行数据加载
             this.getCurTimeDataList()
			 		}			 		
				 }
    },
  }
};
</script>
<style>
.bigbox{
  width: 100%;
  height:100%;
}

.van-popup__close-icon--top-right{
  top: 9px!important;
}
</style>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  display:flex;
  flex-direction: column;
  .onebif{
    position:fixed;
    top:6px;
    left:12px;
    z-index:10;
    width:350px;
    height:40px;
    background:linear-gradient(-90deg,rgba(252,110,40,1) 0%,rgba(255,141,29,1) 100%);
    opacity:0.8;
    border-radius:8px;
    color:#ffffff;
    display:flex;
    justify-content:space-between;
    box-sizing:border-box;
    padding:0 10px;
    align-items:center;
  }
  .twobif{
    position:fixed;
    top:140px;
    right:60px;
    z-index:10;
    width:100px;
    height:24px;
    line-height:24px;
    font-size:12px;
    background:rgba(254,59,57,1);
    opacity:0.7;
    color:#ffffff;
    border-radius:12px;
    text-align:center;
    padding-left:6px;
  }
  .forew{
     position:fixed;
    top:140px;
    left:20px;
    z-index:10;
    color:#333333;
    width:100px;
    height:30px;
    font-size:14px;
    line-height:30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.32);
    border-radius:6px;
  }
  .threebif{
    position:fixed;
    top:127px;
    right:24px;
    z-index:10;
    width:44px;
    height:44px;
    line-height:44px;
    background:rgba(254,59,57,1);
    border:3px solid rgba(255,255,255,1);
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.32), 0px 0px 16px 0px rgba(221,2,0,1);
    border-radius:50%;
    box-sizing:border-box;
    // padding-top:3px;
  }
  .two-dir{
    position:fixed;
    top:160px;
    left:20px;
    z-index:10;
    width:40px;
    padding: 0 3px;
    box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.32);
    border-radius:3px;
    font-size: 10px;
    background: #fff;
    .tab-type{
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3px;
      &:first-child{
        border-bottom: 1px solid #f1f1f1;
      }
      &.xu{
    color: #666;

      }
      &.ti{
    color: #666;

      }
      &.xu1{
    color: #0ff;

      }
      &.ti1{
    color: #0ff;

      }
      img{
        width: 18px;
        height: 18px;
      }
      span{
        margin-top:2px;
      }
    }
  }
  table{
    td{
      font-size:12px;
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
  }
  .writefont{
    position:fixed;
    bottom:4px;
    right:10px;
    z-index:10;
    color:#666666;
    font-size:12px;
  }
  .write{
    position:fixed;
    bottom:0px;
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
        .tab-btn {
          display: flex;
          justify-content: center;
          align-items:center;
          .tab-img{
            display: flex;
            justify-content: center;
            align-items:center;
            font-size:15px;
            font-family:PingFang SC;
            font-weight:bold;
            &:last-child{
              margin-left: 19px;
            }
            &.xu{
              background:url("../assets/image/xu2.png") no-repeat;
              width: 125px;
              height: 44px;
              background-size: 100% 100%;
              color:rgba(181,121,247,1);
            }
            &.xu1{
              background:url("../assets/image/xu1.png") no-repeat;
              width: 125px;
              height: 44px;
              background-size: 100% 100%;
              color:#fff;
            }
            &.ti{
              background:url("../assets/image/ti1.png") no-repeat;
              width: 125px;
              height: 44px;
              background-size: 100% 100%;
              color:#fff;
            }
            &.ti1{
              background:url("../assets/image/ti2.png") no-repeat;
              width: 125px;
              height: 44px;
              background-size: 100% 100%;
              color:rgba(181,121,247,1);
            }
            span{
              padding-left: 20px;            
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
  .cur-time-donate{
    background: #f1f1f1;

  }
  .time-donate{
    .top{

    position: fixed;
    top: 0;
    left: 0;
    right: 0;



      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 36px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:bold;
      color:rgba(51,51,51,1);
      padding: 0 12px;
      background: #fff;
      span{
        padding-left:10px;
        border-left: 3px solid #216AFF;
      }

    }
    .donate-content{
      padding-top: 51px;
      padding-bottom:15px;
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
              height: 20px;
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
    top: 190px;
    right: 17px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: 44px;
    height: 44px;
    background:rgba(255,252,232,1);
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.32);
    border-radius:50%;
    z-index:999;
    span{
      font-size: 14px;
      line-height: 15px;
      font-family:PingFang SC;
      font-weight:bold;
      font-style: italic;
      color: #FF4600;
      margin-right: 2px;
      &:last-child{
        color: #FF9100;
      }
      // background: linear-gradient(to bottom, #FF4600, #FF9100);
      // -webkit-background-clip: text;
      // color: transparent;

    }
  }
}
</style>
