import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import mixin from 'js/mixin.js'
import url from 'js/api.js'

new Vue({
  el: '.container',
  data: {
    lists: '',
    total:0,
  },
  created() { 
    this.getList()
    
  },
  computed: {
    allSelected: {
      get() {
       if (this.lists && this.lists.length) {
         return this.lists.every(shop => {
           //每一个店铺被选中，才能让全选高亮
           return shop.checked
         })
       }
        return false
       },
      set(newval){
        this.lists.map(shop => {
          shop.checked = newval
          shop.goodsList.map(good => {
            good.checked=newval
          })
        })
      }
    },
    selecLists() {
      
    }

  },
  methods: {
    getList() {
      axios.post(url.cartList).then(data => {
        let lists = data.data.cartList
        lists.map((shop) => {
          shop.checked=true
          shop.goodsList.map(good => {
           good.checked=true
         })
       }) 
        this.lists=lists
      })
    },
    selectGood(shop,good) {
      good.checked = !good.checked
      shop.checked = shop.goodsList.every((good) => {
        return good.checked
      })
    },
    selecShop(shop) {
      shop.checked = !shop.checked
      shop.goodsList.map(good => {
        //商品全选=店铺选中
        good.checked=shop.checked
      })
    },
    selectAll() {
      this.allSelected=!this.allSelected
    }
   
  },
  mixins:[mixin],
})
