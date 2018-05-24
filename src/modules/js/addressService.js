import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Address{

  static lists() {
    return fetch(url.addressLists)
  }

  static add(arg) {
    return fetch(url.addressAdd,arg)
  }

  static remove(id) {
    return fetch(url.addressRemove,id)
  }

  static update(arg) {
    return fetch(url.addressUpdate,arg)
  }

  static setDefault(id) {
    return fetch(url.addressSetDefault,id)
  }
}

export default Address