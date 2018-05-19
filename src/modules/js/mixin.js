let mixin = {
  filters: {
    currency(price) {
      return price + '.00'
    }
  }
}

export default mixin