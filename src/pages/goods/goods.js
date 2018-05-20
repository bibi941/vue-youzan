import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import minxin from 'js/mixin.js'
import qs from 'qs'
import mixin from '../../modules/js/mixin';

let {id}=qs.parse(location.search.substr(1))

new Vue({
  el: '#app',
  data: {
    details: '',
    detailsTab: ['商品详情', '本店成交'],
    tabIndex: 0,
    dealLists:'',
  },
  created() {
    this.geDetails()
   },
  methods: {
    geDetails() {
      axios.post(url.details, { id }).then((data) => {
        this.details=data.data.data
      })
    },
    getDeal() {
      axios.post(url.deal, { id }).then((data) => {
        this.dealLists=data.data.data.list
      })
    },
    changeTab(index) {
      this.tabIndex = index
      if (index===1) {
        this.getDeal()
      }
    }
  },
  mixins:[mixin]
})
