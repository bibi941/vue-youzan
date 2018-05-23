<template>
   <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a @click="toEdit" class="block-item js-address-item address-item " >
        <div class="address-title">tony 13112345678</div>
        <p>广东省珠海市香洲区南方软件园</p>
        <a class="address-edit">修改</a>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link to="/address/form" class="btn btn-blue js-no-webview-block js-add-address-btn" >
            新增地址
        </router-link>
    </div>
  </div>
</template>
  
<script>
export default {
  methods:{
    toEdit(){
      this.$router.push({path:'./address/form'})
    }
  }
}
</script>
  
<style lang="scss" scoped>
  
</style>
