<template>
  <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model.trim="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model.trim="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select v-model.trim="provinceValue" class="js-province-selector">
              <option value="-1">选择省份</option>
              <option v-for="p in addressData.list" :value="p.value">{{p.label}}</option>
            </select>
            <select v-model.trim="cityValue" class="js-city-selector">
              <option value="-1">选择城市</option>
               <option v-for="city in cityLists" :value="city.value">{{city.label}}</option>
            </select>
            <select v-model.trim="districtValue" class="js-county-selector" name="area_code" data-code="">
              <option value="-1">选择地区</option>
               <option v-for="d in districtLists" :value="d.value">{{d.label}}</option>              
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model.trim="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div @click="add" class="block-item c-blue center">保存</div>
    </div>
    <div v-if="type==='edit'" class="block section js-delete  block-control-btn">
      <div @click="remove" class="block-item c-red center">删除</div>
    </div>
    <div v-if="type==='edit'"  class="block stick-bottom-row center js-save-default ">
      <button @click="setDefault" class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>
  
<script >
import Address from 'js/addressService.js'

export default {
  data() {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityLists: '',
      districtLists: '',
      // instance: JSON.parse(sessionStorage.getItem('instance'))
    }
  },
  created() {
    //接受路由的传参
    this.type = this.$route.query.type
    this.instance= this.$route.query.instance
    //编辑状态定位三级列表
    if (this.type === 'edit') {
      let address = this.instance
      this.provinceValue = +address.provinceValue
      this.name = address.name
      this.tel = address.tel
      this.address = address.address
      this.id = address.id
    }
  },
  watch: {
    lists(){
      this.$router.go(-1)
    },
    provinceValue(val) {
      if (val === -1) return
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.cityLists = list[index].children
      this.cityValue = -1
      this.districtValue = -1
      if (this.type==='edit') {
        this.cityValue= +this.instance.cityValue
      }
    },
    cityValue(val) {
      if (val === -1) return
      let list = this.cityLists
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.districtLists = list[index].children
      this.districtValue = -1
      if (this.type==='edit') {
        this.districtValue= +this.instance.districtValue
      }
    }
  },
  computed:{
    lists(){
      return this.$store.state.lists
    }
  },
  methods: {
    add() {
      let{name,tel,provinceValue,districtValue,address,cityValue,}=this
      let data={name,tel,provinceValue,districtValue,address,cityValue}
      if (this.type==='add') {
      this.$store.dispatch('addAction',data)
      }
       if (this.type==='edit') {
         data.id = this.id
       this.$store.dispatch('updateAction',data)
      }
    },
    remove(){
      if (confirm('确认删除？')) {
        this.$store.dispatch('removeAction',this.id)
      }
    },
    setDefault(){
       this.$store.dispatch('setDefaultAction',this.id)      
    }
  }
}
</script>
  
<style lang="scss" scoped>
</style>
