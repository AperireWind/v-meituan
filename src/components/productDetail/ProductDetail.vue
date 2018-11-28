<template>
<transition name="food-detail">
  <div class="food" ref="foodView" v-show="showFlag" >
    <div class="food-wrapper" ref="foodView">
      <div class="food-content">
        <div class="img-wrapper">
          <img class="food-img" :src="food.picture">
          <div class="close-bt icon-close" @click="closeView"></div>
          <img src="./img/share.png" alt="" class="share-bt">
          <img src="./img/more.png" alt="" class="more-bt">
        </div>
        <div class="content-wrapper">
          <h3 class="name">{{food.name}}</h3>
          <p class="saled">{{food.month_saled_content}}</p>
          <img :src="food.product_label_picture" v-show="food.product_label_picture" class="product">
          <p class="price">
            <span class="text">￥{{food.min_price}}</span>
            <span class="unit">/{{food.unit}}</span>
          </p>
          <div class="cartcontrol-wrapper">
            <app-cartcontrol :food="food"></app-cartcontrol>
          </div>
          <div class="buy"
          @click="addProduct"
          v-show="!food.count">
            选规格
          </div>
        </div>
      </div>
      

      <app-split></app-split>
      <!-- 外卖评价 -->
      <div class="rating-wrapper">
        <!-- 评价头部 -->
        <div class="rating-title">
          <div class="like-ratio" v-if="food.rating">
            <span class="title">{{food.rating.title}}</span>
            <span class="retio">
              (
                {{food.rating.like_ratio_desc}}
                <i>{{food.rating.like_ratio}}</i>
              )
            </span>
          </div>
          <div class="snd-title" v-if="food.rating">
            <span class="text">{{food.rating.snd_title}}</span>
            <span class="icon icon-keyboard_arrow_right"></span>
          </div>
        </div>
        <ul class="rating-content" v-if="food.rating">
          <li 
          v-for="(comment,index) in food.rating.comment_list"
          :key="index"
          class="comment-item"
          >
            <div class="comment-header">
              <img :src="comment.user_icon" v-if="comment.user_icon" />
              <img src="./img/anonymity.png" v-if="!comment.user_icon" />
            </div>
            <div class="comment-main">
              <div class="user">{{comment.user_name}}</div>
              <div class="time">{{comment.comment_time}}</div>
              <div class="content">{{comment.comment_content}}</div>
              
            </div>

          </li>
        </ul>
      </div>
    </div>

  </div>
</transition>
</template>

<script>
import Vue from 'vue'
import Split from '../split/Split'
import CartControl from '../cartControl/cartControl'
import BScroll from 'better-scroll'

export default {
  data(){
    return{
      showFlag:false
    }
    
  },
  components:{
    "app-split":Split,
    "app-cartcontrol":CartControl
  },
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    showView(){
      this.showFlag = true

      this.$nextTick(()=>{
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodView,{
            click:true
          })
        }else{
          this.scroll.refresh()
        }
      })
    },
    closeView(){
      this.showFlag = false
    },
    addProduct(){
      // 如果此时未增加数量，则food没有count属性，因此得设置属性
      Vue.set(this.food,"count",1)
    }
  }
  

}
</script>

<style>
@import url(ProductDetail.css);

</style>
