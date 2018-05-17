//Rap的mock数据
let url = {
  hotLists: '/index/hotList',
  banner: '/index/banner',
  topList: '/category/topList',
  subList: '/category/subList',
  rank: '/category/rank'
}
//开发环境和真是环境切换
// let host=""
let host = 'http://rapapi.org/mockjsdata/34279'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
