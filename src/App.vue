<template>
  <div id="app">
    <!-- :poiInfo1="poiInfo"这个地方主要用来给子组件传递数据 -->
    <app-header :poiInfo1="poiInfo"></app-header>
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header/Header'
import Nav from './components/nav/Nav'

export default {
  name: 'App',
  data(){
    return{
      poiInfo:{}
    }
  },
  components:{
    "app-header": Header,
    "app-nav": Nav,
  },
  // 获取商品数据
  created(){
    fetch("api/goods")
    .then(res=>{
      return res.json()
    })
    .then(response => {
      if(response.code == 0){
        this.poiInfo = response.data.poi_info
      }
    })
  }
}
</script>


<style>
@import url(./common/css/icon.css);
</style>
