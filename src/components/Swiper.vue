<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="banner in bannerlists">
        <a class="js-no-follow" :href="banner.clickUrl">
          <img class="goods-main-photo fadeIn" :src="banner.image">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'swiper',
  props: ['bannerlists'],
  mounted() {
    new Swiper('.swiper-container', {
      autoplay: true,
      loop:true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide img {
  height: 100%;
  width: 100%;
}
</style>
