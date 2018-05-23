import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//定义路由
const routes = [{
    path: '/',
    component: require('./components/member.vue')
  },
  {
    path: '/address',
    component: require('./components/address.vue'),
    children: [{
      path: '',
      //重定向
      component: require('./components/all.vue')
    }, {
      path: 'all',
      component: require('./components/all.vue')
    }, {
      path: 'form',
      component: require('./components/form.vue')
    }]
  },
]

//创建router实例
const router = new VueRouter({
  routes
})

//根组件注入
new Vue({
  el: '#app',
  router
})
