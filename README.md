# vue-移动端有赞商城

> A Vue.js project

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

基于Vue框架实现了移动端有赞商城，[预览](http://bibi94.gitee.io/vue-youzan/dist/index.html)。使用了Rap接口，github由于不支持http,所以这个pages是在码云上

基本实现了原网站中商城首页、分类页、商品详情页、购物车页以及地址管理页的大部分功能，利用Rap+mock.js接口管理平台模拟数据，使用mint-ui、swiper、velocity-animate等插件实现轮播图以及购物车商品左滑删除功能，并在地址管理页使用Vue-router实现了新增地址、地址编辑的页面路由。

- 首页    

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c00810dfc6?w=250&h=432&f=png&s=56255)

抽离了底部导航组件，利用mint-ui插件的无限滚动组件实现下拉加载新数据，利用swiper插件实现了顶部轮播图组件并抽离出作为单独的组件。

- 分类页

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c007ff7342?w=250&h=432&f=png&s=35806)

使用了抽离的底部导航组件，通过Rap接口平台获取模拟数据，渲染至页面。点击综合排行中的热销商品会跳转至商品详情页，点击其他分类栏中的品牌会跳转至搜索页面，留意url的变化，通过url携带keyword和id。

- 商品详情页

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c007e73da5?w=250&h=432&f=png&s=63017)

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0e1c7e03033?w=250&h=432&f=png&s=23506)

头部使用了抽离的轮播组件，点击选择规格、加入购物车和立即购买实现相应的浮层效果，可对商品数量增减

- 搜索页

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c00a27af4f?w=250&h=432&f=png&s=38239)

理论上通过url携带的keyword和id，请求相应的数据，渲染值页面，当然这里我用的是自己编写的模拟数据。

- 购物车页

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c00a5f4ebb?w=250&h=432&f=png&s=36856)


本页实现了：
 1. 普通状态下，购物车商品的选择状态显示、店铺选择状态显示：单商品选择状态、店铺下所有商品选择后店铺选择状态、店铺选择后店铺下所有商品的选择状态以及全选   状态的切换
 2. 编辑状态下，只有编辑的店铺处于编辑状态，可对商品进行数量增减或删除操作，当店铺下的最后一件商品被删除，店铺也被删除
 3. 所有选中商品总价的计算
 4. 普通状态下左滑可删除商品功能。

- 地址管理页(个人中心页)

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c00a431e0a?imageView2/2/h/432)

该页面只做了收货地址管理功能

![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c04c39ca0d?w=250&h=432&f=png&s=18295)
![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c032638327?w=250&h=432&f=png&s=11278)
![](https://user-gold-cdn.xitu.io/2018/6/10/163ea0c02b5f985a?w=250&h=432&f=png&s=19642)

利用vue-router配置路由，实现了修改和新增两个不同功能的页面展示



 购物车的编辑和预览数据和逻辑是两套

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
