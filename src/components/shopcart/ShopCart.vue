<template>
<div class="shopcart">
  <div class="shopcart-wrapper">
    <!-- 底部左侧 -->
    <div class="content-left">
      <div class="logo-wrapper"
      :class="{'highligh':totalCount>0}">
        <span class="icon-shopping_cart logo"
        :class="{'highligh':totalCount>0}"
         @click="shopListClick()"></span>
        <!-- 购物车上显示数字 -->
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="total-price" v-show="totalPrice">
          ￥{{totalPrice}}
        </p>
        <p class="tip" 
        :class="{'highligh':totalCount>0}">
          另需{{poiInfo2.shipping_fee_tip}}
        </p>
        
      </div>
    </div>
    <!-- 底部右侧 -->
    <div class="content-right" :class="{'highligh':totalCount>0}">
      {{payStr}}
    </div>
    <!-- 购物车列表 -->
    <div 
      class="shopcart-list"
      v-show="listShow"
      :class="{'show':listShow}"
      >
      <!-- 顶部活动内容 -->
      <div class="list-top" v-if="poiInfo2.discounts2">
        {{poiInfo2.discounts2[0].info}}
      </div>
      <!-- 头部内容 -->
      <div class="list-header">
        <h3 class="title">1号口袋</h3>
        <div class="empty">
          <img src="./img/ash_bin.png" >
          <span @click="clearAll()">清空购物车</span>
        </div>
      </div>
      <!-- 具体选中菜单内容 -->
      <div class="list-content" ref="listContent">
        <ul>
          <li
          class="food-item"
          v-for="(item,index) in selectFoods" 
          :key="index">
            <div class="desc-wrapper">
              <div class="desc-left">
                <p class="name">{{item.name}}</p>
                <p class="unit" v-if="!item.description">{{item.unit}}</p>
                <p class="description" v-if="!item.unit">{{item.description}}</p>
              </div>
              <div class="desc-right">
                ￥{{item.min_price}}
              </div>
            </div>
              <div class="cartcontrol-wrapper">
                <app-cartControl :food="item"></app-cartControl>
              </div>
              
            
          </li>
        </ul>
      </div>
      <!-- 底部内容 -->
      <div class="list-bottom"></div>
    </div>
  </div>
  <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '../cartControl/cartControl'

export default {
  data(){
    return {
      fold:true
    }
  },
  components:{
    "app-cartControl": CartControl
  },
  props:{
    poiInfo2:{
      type:Object,
      default:{}
    },
    selectFoods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  
  computed:{
    totalCount(){
      let num = 0
      this.selectFoods.forEach((food) => {
        num += food.count
      })
      return num
    },
    payStr(){
      if(this.totalCount > 0){
        return "去结算"
      }else{
        return this.poiInfo2.min_price_tip
      }
    },
    totalPrice(){   
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total += food.min_price*food.count    
      })
      return total
    },
    listShow(){
      if (!this.totalCount){
        this.fold = true;
        return false
      }
      let show = !this.fold
      if(show){
				this.$nextTick(() => {
					if(!this.shopScroll){
						this.shopScroll = new BScroll(this.$refs.listContent,{
							click:true
						})
					}else{
						this.shopScroll.refresh()
					}
				})
			}
      return show
    }
  },
  methods:{
    shopListClick(){
      if(!this.totalCount){
        return;
      }
      this.fold = !this.fold;
    },
    clearAll(){
      this.selectFoods.forEach((food)=>{
        food.count = 0;
      })
    },
    hideMask(){
      this.fold= true;
    }
  }
  
}
</script>

<style>
@import url(ShopCart.css);
</style>
