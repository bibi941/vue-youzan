<template>
   <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a v-for="list in lists" 
      :key="list.id"  
      @click="toEdit(list)" 
      class="block-item js-address-item address-item " 
      :class="{'address-item-default':list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link :to="{name:'form',query: { type: 'add' }}" 
      class="btn btn-blue js-no-webview-block js-add-address-btn" >
            新增地址
        </router-link>
    </div>
  </div>
</template>
  
<script>
export default {
  computed: {
    lists() {
      return this.$store.state.lists
    }
  },
  created() {
    if (!this.lists) {
    this.$store.dispatch('getLists')
    }
  },
  methods: {
    toEdit(list) {
      this.$router.push({
        name: 'form',
        query: { type: 'edit', instance: list }
      })
    }
  }
}
</script>
  
<style lang="scss" scoped>
</style>
