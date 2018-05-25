import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//定义路由
const routes = [{
    path: '/',
    component: require('../components/member.vue')
  },
  {
    path: '/address',
    component: require('../components/address.vue'),
    children: [{
      path: '',
      //重定向
      component: require('../components/all.vue')
      // redirect:'all'
    }, {
      path: 'all',
      name: 'all',
      component: require('../components/all.vue'),
    }, {
      path: 'form',
      name: 'form',
      component: require('../components/form.vue')
    }]
  },
]

//创建router实例
const router = new VueRouter({
  routes
})

export default router