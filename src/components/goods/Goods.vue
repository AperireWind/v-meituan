<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuScroll">
      <ul >
        <!-- 专场-->
        <li 
          class="menu-item"
          :class="{'current':currentIndex === 0}"
          @click="selectMenu(0)"
          >
          <p class="text">
            <img :src="container.tag_icon" class="icon" v-if="container.tag_icon">
            {{container.tag_name}}
          </p>
        </li>

        <li 
          class="menu-item" 
          :class="{'current':currentIndex === index+1}" 
          v-for="(item,index) in goods"
          :key="index"
          @click="selectMenu(index+1)"
          >
          <p class="text">
            <img :src="item.icon" class="icon" v-if="item.icon">
            {{item.name}}
          </p>
          <i class="num" v-show="calculateCount(item.spus)">
            {{calculateCount(item.spus)}}
          </i>
        </li> 
      </ul>
    </div>

    <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container-list food-list-hook">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src="item.pic_url">
          </div>
        </li>

        <!-- 具体分类 -->
        <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>

          <!-- 具体商品列表 -->
          <ul >
            <li v-for="(food,i) in item.spus" 
            :key="i" 
            class="food-item"
            >
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content" @click="showDetail(food)">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                  <div class="saled">{{food.month_saled_content}}</div>
                  <div class="praise">{{food.praise_content}}</div>
                </div>
                <img :src="food.product_label_picture" alt="" class="product">
                <p class="price">
                  <span class="text">￥{{food.min_price}}</span>
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
              <div class="cartcontrol-wrapper">
                <app-cartcontrol :food="food"></app-cartcontrol>
              </div>
            </li>
          </ul>
        </li>

      </ul>
    </div>

    <!-- 购物车 -->
    <app-shopcart :poiInfo2="poiInfo" :selectFoods="selectFoods"></app-shopcart>
    <!-- 商品详情 -->
    <app-productDcetail :food="selectFood" ref="foodView"></app-productDcetail>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from '../cartControl/cartControl'
import ShopCart from '../shopcart/ShopCart'
import ProductDetail from '../productDetail/ProductDetail'

export default {
  data(){
    return {
      poiInfo: {},
      goods: [],
      container: {},
      menuScroll:{},
      foodScroll:{},
      scrollY: 0,
      listHeight:[],
      selectFood:{}
    }
  },
  components:{
    "app-cartcontrol":CartControl,
    "app-shopcart":ShopCart,
    "app-productDcetail":ProductDetail
  },
  // 计算属性是不能够接收参数的
  methods:{
    head_bg(imageName){
      return "background-image:url("+imageName+");"
    },
    initScroll(){
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        probeType:3,//probeType是为了实时获取scroll事件，即获取滚动位置
        click:true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll,{
        probeType:3,//probeType是为了实时获取scroll事件，即获取滚动位置
        click:true
      })
      this.foodScroll.on("scroll",(pos)=>{
        //取移动位距离的整数绝对值
        this.scrollY=Math.abs(Math.round(pos.y))
      })
    },
    // 获取单个列表区的高度
    calculateHeight(){
      //获取元素
      let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
      let height= 0
      this.listHeight.push(height)

      for (let i = 0; i < foodlist.length; i++) {
        let item = foodlist[i]
        height += item.clientHeight
        this.listHeight.push(height)
        
      }
      // console.log(this.listHeight)
    },
    // 点击左侧列表，右侧显示对应内容区
    selectMenu(index){
      let foodlist = this.$refs.foodScroll.getElementsByClassName("food-list-hook")
      let element = foodlist[index]
      // 滚动到对应元素的位置
      this.foodScroll.scrollToElement(element,250)
    },
    // 这儿返回的count 是左假列表单个元素的选单数量之和
    calculateCount(spus){
      let count = 0
      spus.forEach((food)=>{
        if (food.count > 0) {
          count += food.count
        }
      })
      return count
    },
    showDetail(food){
      this.selectFood = food
      this.$refs.foodView.showView()
    }

  },
  computed:{
    //判断商品列表对应的号
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++) {
        // 获取商品区间的范围
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i+1]

        // 是否在上述区间中
        if(!height2|| this.scrollY >= height1 && this.scrollY < height2){
          return i
        }
      }
      return 0
    },
    selectFoods(){
      let foods = []
      this.goods.forEach((myfoods) => {
        myfoods.spus.forEach((food) => {
          if(food.count > 0){
            foods.push(food)
          }
        })
      })
      return foods
    }
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
        this.goods = response.data.food_spu_tags
        this.container = response.data.container_operation_source

        this.$nextTick(()=>{
          this.initScroll()

          this.calculateHeight()
        })

      }
    })
  }
}
</script>

<style scoped>
@import url(Goods.css);
</style>

