/** Modal.js ********************************************************************************************************** */
let _modal = {}

Object.assign(Object.prototype, {
  Modal (options = {}, callback) {
    let id = this.id
    if (typeof options === 'string') {
      _modal[id][options](callback)
    } else {
      _modal[id] = _modal[id] || new Modal(this, options)
      _modal[id].open()
    }
    return this
  }
})

class Modal {
  constructor (el, options) {
    this.$modal = el
    this.id = el.id

    this.options = Object.assign({
      classes: '',
      dimmed: true,
      clickToClose: false,
      closedFocus: ''
    }, options)


  }

  open () {}

  close () {}
}
/** ****************************************************************************************************************** */
