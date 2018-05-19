import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'
let app = new Vue({
  el: '#app',
  data: {
    topLists: '',
    topIndex: 0,
    subData: '',
    rankData: '',
  },
  created() {
    this.getToplists()
    this.getSubList(0) //默认index，显示综合排行
  },
  methods: {
    //左侧导航栏
    getToplists() {
      axios.post(url.topList).then(data => {
        this.topLists = data.data.lists
      })
    },
    //二级菜单
    getSubList(index, id) {
      this.topIndex = index
      //综合排行
      if (index === 0) {
        this.getRank()
      } else {
        axios.post(url.subList, {
          id
        }).then(data => {
          this.subData = data.data.data
        })
      }
    },
    //综合排行
    getRank() {
      axios.post(url.rank).then(data => {
        this.rankData = data.data.data
      })
    },
    toSearch(list) {
      location.href = `search.html?keyword=${list.name}&id=${list.id}`

    }
  },
  components: {
    Foot
  },
  filters: {
    number(price) {
      return price + '.00'
    }
  }
})
