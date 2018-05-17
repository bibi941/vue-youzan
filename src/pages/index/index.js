import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'

//mint-ui
import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

let app = new Vue({
  el: '#app',
  data: {
    lists: null,
    pageNum: 1,
    loading: false,
    loadingOver: false
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.loadingOver) return
      this.loading = true
      axios.post(url.hotLists, {
          pageNum: this.pageNum,
          pageSize: 10
        })
        .then(data => {
          let currentList = data.data.lists
          //全部数据加载完毕
          if (currentList.lenght < 10) {
            this.loadingOver = true
          }
          //渲染数据
          if (this.lists) {
            this.lists = this.lists.concat(currentList)
          } else {
            this.lists = currentList
          }
          this.loading = false
          this.pageNum += 1
        })
    }
  },
  components: {
    Foot
  }
})
