<template>
    <div class="cur-time">
        <div class="cur-time-donate">
      <div class="time-donate">
        <!-- <div class="top"><span>实时播报</span></div> -->
        <div class="top"><span>{{curTimeTopContent}}</span><van-icon name="cross" size="20" @click="closeCurTime"/></div>
        <div class="donate-content" v-if="curTimeNoDataShow">
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
      curTimeDataList:[],
      curTimeParams:{
        page: 1, // 页数
        pageSize:3, // 偏移量
      },
      curTimeNoDataShow: false, // 实时捐赠无数据显示
      loadMore:true, //加载更多按钮
      showHome: true,
      
      flag: false, 
      noMore: false,
      isoneClosePoint:1,
      curTimeTopContent:"", // 实时资讯统计

    };
  },
  created() {
    this.getCurTimeDataList()
    this.getCurTimeContent()
		  window.addEventListener('scroll', this.scrollHandle, true)
  },
 mounted () {
  },
  methods:{
    getCurTimeContent(){
      this.$fetchGet("donateCount/findDonateCount").then(res=> {
        if (res&&res.length){

          this.curTimeTopContent=res[0].content
        }
      })
    },
    closeCurTime(){
      this.$router.push({path:"/"})
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
.cur-time {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow:scroll;
  .cur-time-donate{
    background: #f1f1f1;

  }
  .time-donate{
    .top{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display:flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 60px;
      background:url("../assets/image/curtime.png") no-repeat;
      background-size: 100% 60px;
      span{
        display: block;
        padding-right: 15px;
        width: 285px;
        font-size:13px;
        text-align: left;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:18px;
      }

    }
    .donate-content{
      padding-top: 80px;
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
