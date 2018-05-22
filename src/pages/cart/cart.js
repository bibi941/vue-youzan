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
    total: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData:'',
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
      set(newval) {
        this.lists.map(shop => {
          shop.checked = newval
          shop.goodsList.map(good => {
            good.checked = newval
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          //商铺点选，则商铺高亮
          return this.editingShop.removeChecked
        }
        return false
      },
      set(newval) {
        if (this.editingShop) {
          //商铺全选则商品和全选按钮高亮
          this.editingShop.removeChecked = newval
          this.editingShop.goodsList.forEach((good) => {
            good.removeChecked = newval
          })
        }
      }
    },
    selectLists() {
      if (this.lists && this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good)
              total += good.price * good.number
            }
          })
        })
        this.total = total
        return arr
      }
      return []
    },
    removeLists() {
      if (this.editingShop) {
        let arr = []
        this.editingShop.goodsList.forEach((good) => {
          if (good.removeChecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  methods: {
    getList() {
      axios.post(url.cartList).then(data => {
        let lists = data.data.cartList
        lists.map(shop => {
          //商铺默认状态
          shop.checked = true
          shop.editing = false
          shop.editingMsg = '编辑'
          shop.removeChecked = false
          shop.goodsList.map(good => {
            //商品默认状态
            good.checked = true
            good.removeChecked = false
          })
        })
        this.lists = lists
      })
    },
    selectGood(shop, good) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      good[attr] = !good[attr]
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })
    },
    selecShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.map(good => {
        //商品全选=店铺选中
        good[attr] = shop[attr]
      })
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
      this[attr] = !this[attr]
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing
      shop.editingMsg = shop.editing ? '完成' : '编辑'
      this.lists.forEach((item, index) => {
        //非编辑状态下的其他店铺状态
        if (shopIndex !== index) {
          item.editing = false
          item.editingMsg = shop.editing ? '' : '编辑'
        }
      })
      //全局数据
      this.editingShop = shop.editing ? shop : null
      this.editingShopIndex = shop.editing ? shopIndex : -1
    },
    reduce(good) {
     if (good.number===1) 
       return
      axios.post(url.cartReduce, {
        id: good.id,
       number:1 
      }).then(data => {
       good.number-=1
     })
     },
    add(good) {
       axios.post(url.cartAdd, {
        id: good.id,
        number:1
      }).then((data) => {
        good.number+=1
      })
    },
    removeConfirm() {
      let{shop, shopIndex, good, goodIndex}=this.removeData
      axios.post(url.cartRemove, {
        id: good.id
      }).then(data => {
        shop.goodsList.splice(goodIndex, 1)
        if (shop.goodsList.length===0) {
          this.lists.splice(shopIndex, 1)
          this.removeShop()
        }
        this.removePopup=false
      })
    },
    removeShop() {
      //店铺所有商品被删除完后，删除店铺，恢复初始状态
      this.editingShop = '',
      this.editingShopIndex=-1  
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg='编辑'
      })
    },
    //删除商品
    remove(shop, shopIndex, good, goodIndex) {
      this.removePopup = true
      this.removeData={shop, shopIndex, good, goodIndex}
    }
  },
  mixins: [mixin]
})
