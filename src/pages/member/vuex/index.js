import Vue from 'vue'
import Vuex from 'vuex'
import Address from 'js/addressService.js'
import {list} from 'postcss'
Vue.use(Vuex)

// 创建vuex实例
const store = new Vuex.Store({
  state: {
    lists: '',
  },
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    add(state, instance) {
      state.lists.push(instance)
    },
    remove(state, id) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists.splice(index, 1)
    },
    update(state, instance) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists[index] = instance
    },
    setDefault(state, id) {
      let lists = state.lists
      lists.map(item => {
        item.isDefault = item.id === id ? true:false
      })
    }
  },
  actions: {
    getLists({commit}) {
      Address.lists().then(data => {
        commit('init', data.data.lists)
      })
    },
    addAction({commit}, instance) {
      Address.add(instance).then(data => {
        //模拟后台返回id
        instance.id= +Math.random()*10000
        commit('add', instance)
      })
    },
    removeAction({commit}, id) {
      Address.remove(id).then(data => {
        commit('remove', id)
      })
    },
    updateAction({ commit }, instance) {
      Address.update(instance).then(data => {
        commit('update',instance)
      })
    },
    setDefaultAction({ commit }, id) {
      Address.setDefault(id).then(data => {
        commit('setDefault', id)
      })
    },
  }
})

export default store
