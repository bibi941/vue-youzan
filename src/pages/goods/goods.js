import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import minxin from 'js/mixin.js'
import qs from 'qs'
import mixin from '../../modules/js/mixin'
import Swiper from 'components/Swiper.vue'

let {id} = qs.parse(location.search.substr(1))

new Vue({
  el: '#app',
  data: {
    id,
    details: '',
    detailsTab: ['商品详情', '本店成交'],
    tabIndex: 0,
    dealLists: '',
    bannerLists: '',
    skuType: 1,
    shouwSkuAble: false,
    skuNumber: 1,
    isAddCart: false,
    ifAlertCart:false
  },
  created() {
    this.geDetails()
    this.getbannerLists()
  },
  methods: {
    getbannerLists() {
      axios.post(url.details, {
        id
      }).then(data => {
        this.bannerLists = []
        //把ajax传来的字符串数组改造成模块通用的数据结构
        data.data.data.imgs.map(url => {
          this.bannerLists.push({
            clickUrl: '#',
            image: url
          })
        })
      })
    },
    geDetails() {
      axios.post(url.details, {
        id
      }).then((data) => {
        this.details = data.data.data
      })
    },
    getDeal() {
      axios.post(url.deal, {id}).then((data) => {
        this.dealLists = data.data.data.list
      })
    },
    changeTab(index) {
      this.tabIndex = index
      if (index === 1) {
        this.getDeal()
      }
    },
    chooseSku(type) {
      this.skuType = type
      this.shouwSkuAble = true
    },
    changeSkuNumber(number) {
      if (number<0&&this.skuNumber===1) {
        return
      }this.skuNumber+=number
    },
    addCart() {
      console.log(1);
      axios.post(url.cart, { id, number: this.skuNumber }).then(
        data => {
          if (data.data.status === 200) {
            this.shouwSkuAble = false
            this.isAddCart = true
            this.ifAlertCart = true
            setTimeout(() => {
              this.ifAlertCart=false
            }, 1000)
          }
        }
      )
    }
  },
  components: {
    Swiper
  },
  watch: {
    //弹窗出现后，让页面不能滚动    
    shouwSkuAble(val, oldval) {
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  },
  mixins: [mixin],

})
