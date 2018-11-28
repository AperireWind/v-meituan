<template>
  <div class="ratings">
    <div class="rating-wrapper">
      <div class="overview">
        <!-- 左侧 -->
        <div class="overview-left">
          <div class="comment-score">
            <p class="score">{{ratings.comment_score}}</p>
            <p class="text">商家评分</p>
          </div>
          <div class="other-score">
            <div class="quality-score item">
              <span class="text">口味</span>
              <app-star :score="ratings.quality_score"></app-star>
            </div>
            <div class="pack-score item">
              <span class="text">包装</span>
              <app-star :score="ratings.pack_score"></app-star>
            </div>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="overview-right">
          <div class="delivery-score">
            <p class="score">{{ratings.delivery_score}}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <app-split></app-split>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
import Star from '../star/star'
import Split from '../split/Split'
export default {
  data(){
    return{
      ratings:{}
    }
  },
  components:{
    "app-split":Split,
    "app-star":Star
  },
  created(){
    fetch("/api/ratings")
    .then(res => {
      return res.json()
    })
    .then(response =>{
      if (response.code == 0) {
        this.ratings = response.data
        this.$nextTick(()=>{
          
        })
      }
    })
  }
}
</script>

<style lang="less">
@import url(Ratings.less);
</style>

