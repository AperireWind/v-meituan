<template>
  <div class="star">
    <span class="star-item" 
      v-for="(item,index) in itemClasses" 
      :key="index"
      :class="item"
      >
      </span>
  </div>
</template>

<script>
//星星长度
const LENGTH = 5

//星星状态
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props:{
    score:{
      type:Number
    }
  },
  computed:{
    itemClasses(){
      //最终存放class名的数组
      let result = []

      //4.7
      // let score = Math.floor(this.$parent.poiInfo1.wm_poi_score*2)/2

      let score = Math.floor(this.score*2)/2

      //半星
      let hasDecimal = score%1 !== 0

      //全星
      let integer = Math.floor(score)

      //遍历全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }

      //处理半星
      if (hasDecimal) {
        result.push(CLS_HALF);
      }

      //补齐
      while (result.length<LENGTH) {
        result.push(CLS_OFF)
      }

      return result
    }
  }
}
</script>

<style scoped>
.star{
  font-size: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.star .star-item{
	width: 10px;
	height: 10px;
	margin-right: 3px;
	background-repeat: no-repeat;
	background-size: 10px 10px;
}
.star .star-item:last-child{
	margin-right: 0;
}

.star .on{
  background-image: url(img/star24_on@2x.png);
}
.star .half{
  background-image: url(img/star24_half@2x.png);
}
.star .off{
  background-image: url(img/star24_off@2x.png);
}
</style>
