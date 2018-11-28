<template>
  <div class="cartcontrol">
    <!-- 减号 -->
    <div class="cart-decrease icon-remove_circle_outline"
    @click="decreaseCart"
    v-show="food.count"
    ></div>
    <!-- 数量 -->
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <!-- 加号 -->
    <div class="cart-add icon-add_circle"
    @click="increaseCart"
    >
      <i class="bg"></i>
    </div>
    
  </div>
</template>

<script>
export default {
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    
    decreaseCart(){
      this.food.count--
    },
    increaseCart(){
      // 给this.food添加count属性
      if(!this.food.count){
        this.$set(this.food,"count",1)
      }else{
        this.food.count++
      }
    }
  }
}
</script>

<style>
@import url(cartControl.css);
</style>
