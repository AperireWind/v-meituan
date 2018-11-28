<template>
  <div class="header">
    <!-- {{poiInfo1.name}} -->
     <!-- 顶部通栏 开始 -->
    <div class="top-wrapper">
			<div class="back-wrapper">
				<span class="icon-arrow_lift"></span>
			</div>

			<form class="search-wrapper">
				<span class="search-icon"></span>
				<input class="search-bar" type="text" placeholder="搜索店内商品" />
			</form>

			<div class="more-wrapper">
				<a class="spelling-bt" href="#">拼单</a>
				<div class="more-bt">
					<i class="s-radius"></i>
					<i class="s-radius"></i>
					<i class="s-radius"></i>
				</div>
			</div>
		</div>

    <!-- 顶部通栏 结束 -->

    <!-- 主题内容 开始 -->
    <div class="content-wrapper">
			<div class="icon" :style="head_bg">
				
			</div>
			<div class="name">
				<h3>{{poiInfo1.name}}</h3>
			</div>
			<div class="collect">
				<img src="./img/star.png" />
				<span>收藏</span>
			</div>
		</div>

    <!-- 主题内容 结束 -->

    <!-- 公告内容 开始 -->
    <div class="bulletin-wrapper">
			<img class="icon" v-if="poiInfo1.discounts2" :src="poiInfo1.discounts2[0].icon_url" />

			<span class="text" v-if="poiInfo1.discounts2">{{poiInfo1.discounts2[0].info}}</span>
			<div class="detail" v-if="poiInfo1.discounts2" @click="showBulletin">
				{{poiInfo1.discounts2.length}}个活动
				<span class="icon-keyboard_arrow_right"></span>
			</div>
		</div> 

    <!-- 公告内容 结束 -->

    <!-- 公告详情 开始 -->
    <transition name="bulletin-detail">
      <!-- 遮罩层 -->
      <div class="bulletin-detail" v-show="isShow">
        <div class="detail-wrapper" :style="detail_bg">
          <!-- 相关内容容器 -->
          <div class="main-wrapper">
            <div class="icon" :style="head_bg"></div>
            <h3 class="name">{{poiInfo1.name}}</h3>
            <div class="score">
              <app-star class="star-item" :score="poiInfo1.wm_poi_score"></app-star>
              <span>{{poiInfo1.wm_poi_score}}</span>
            </div>
            <div class="tip">
              {{poiInfo1.min_price_tip}} 
              <i>|</i>
              {{poiInfo1.shipping_fee_tip}} 
              <i>|</i>
              {{poiInfo1.delivery_time_tip}}

            </div>
            <div class="time">配送时间:{{poiInfo1.shipping_time}}</div>
            <div class="discounts" v-if="poiInfo1.discounts2">
              <p>
                <img :src="poiInfo1.discounts2[0].icon_url" alt="">
                {{poiInfo1.discounts2[0].info}}
              </p>
            </div>
          </div>

          <!-- 关闭内容容器 -->
          <div class="close-wrapper" @click="closeBulletin">X</div>
        </div>
        
      </div>
    </transition>
    <!-- 公告详情 结束 -->

    <!-- 背景内容 开始 -->
    <div class="bg-wrapper" :style="head_pic_url1">
			
		</div>
    <!-- 背景内容 结束 -->

  </div>
</template>

<script>
import Star from '../star/star'
export default {
  data(){
    return {
      isShow: false
    }
  },
  props:{
    // 定义一个属性来接收后来接收来的数据
    poiInfo1:{
      type: Object,
      default:function(){}
    }
  },
  components:{
    "app-star":Star
  },
  computed:{
    head_pic_url1(){
      return "background-image: url("+this.poiInfo1.head_pic_url+");"
    },
    head_bg(){
      return "background-image: url("+this.poiInfo1.pic_url+");"
    },
    detail_bg(){
      return "background-image: url("+this.poiInfo1.poi_back_pic_url+");"
    }

  },
  methods:{
    showBulletin(){
      this.isShow=true;
    },
    closeBulletin(){
      this.isShow=false;
    }
  }
}
</script>

<style scoped>
@import url(./Header.css);

</style>

