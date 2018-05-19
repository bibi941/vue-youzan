import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'

let {
  keyword,
  id
} = qs.parse(location.search.substring(1))

new Vue({
  el: '.container',
  data: {
    serachList: '',
    keyword,
    gotoTopAble: false

  },
  created() {
    this.getSearchList()

  },
  methods: {
    getSearchList() {
      axios.post(url.serachList, {
          keyword,
          id
        })
        .then((data) => {
          this.serachList = data.data.list
        })
    },
    move() {
      let leaTop = document.documentElement.scrollTop
      if (leaTop > 100) {
        this.gotoTopAble = true
      } else {
        this.gotoTopAble = false
      }
    },
    toTop() {
      
    }
  },
  mixins: [mixin]
})
