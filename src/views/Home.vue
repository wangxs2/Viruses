<template>
  <div class="home">
    <div class="header">新型肺炎物资捐赠实时动态</div>
    <div id="myMap" class="container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "home",
  data() {
    return {
      myMap:null,
    };
  },
  created() {},
 mounted () {
   this.getMap()
  },
  methods:{
    getMap () {
      this.myMap = new AMap.Map("myMap", {
        animateEnable: false,
        resizeEnable: true,
        preloadMode: true,
        center:[114.423213,30.63943],
        zoom:6,
        mapStyle:'amap://styles/9fb204085bdb47adb66e074fca3376be',
      });
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
  }
}
</style>
