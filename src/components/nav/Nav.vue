<template>
  <div class="nav">
    <div class="nav-box" v-for="(item,index) in tabs" @click="line_active(index)" :key="index">
      <router-link :class="['nav-item',item.nav]"  :to="item.goTo">
        {{item.name}}
      <i class="line" v-show="item.isShow"></i>
    </router-link>
    </div>
    <!-- <transition name="slide">
      <div class="nav-border" v-if="show" :style="'left:'+ juli + '%;'"></div>
    </transition> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
      juli: 13,
      show: true,
      c: 1,
      tabs:[
        {name:'点菜', isShow: true, nav: 'nav-active', goTo:'/goods'},
        {name:'评价', isShow: false, nav: '', goTo:'/ratings'},
        {name:'商家', isShow: false, nav: '', goTo:'/seller'}
      ],
    }
  },
  methods:{
    line_active:function(index){
      this.tabs.forEach((item,i)=>{
        this.tabs[i].nav = '';
        this.tabs[i].isShow = false;
      });
      this.tabs[index].nav = 'nav-active';
      this.tabs[index].isShow = true;
      if(index == 0){
        this.juli = 13;
      }else if(index == 1){
        this.juli = 46;
      }else{
        this.juli = 80;
      }
    }
  }
}

</script>

<style scoped>
@import url(Nav.css);
</style>
