<template>
<!-- 测试 -->
  <div class="test" id="myMap">
  </div>
</template>

<script>
 import data from './data.js'
export default {
  name: "about",
  components:{},
  data() {
    return {
    }
  },
  created() {
  },
 mounted () {
 console.log(data.data.data)
 this.initMap()
  },
  methods:{ 
      //是否看密码
      initMap(){
          let mydata=data.data.data
           var map = new BMap.Map("myMap", {});   
           var marker = new BMap.Marker(new BMap.Point(-0.120185,51.570987)); 
           map.addOverlay(marker);  // 创建点                     // 创建Map实例
           	var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    alert('您的位置：'+r.point.lng+','+r.point.lat);
                }
                else {
                    alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
            map.centerAndZoom(new BMap.Point(105.000, 38.000), 5);     // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom();                        //启用滚轮放大缩小
            if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
                var points = [];  // 添加海量点数据
                for (var i = 0; i < mydata.length; i++) {
                points.push(new BMap.Point(mydata[i][0], mydata[i][1]));
                }
                var options = {
                    size: BMAP_POINT_SIZE_BIGGER,
                    shape: BMAP_POINT_SHAPE_RHOMBUS,
                    color: '#d340c3'
                }
                var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
                pointCollection.addEventListener('click', function (e) {
                alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
                });
                map.addOverlay(pointCollection);  // 添加Overlay
            } else {
                alert('请在chrome、safari、IE8+以上浏览器查看本示例');
            }

      },

  }
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>

.test{
    width: 100%;
    height: 100%;
}
</style>
