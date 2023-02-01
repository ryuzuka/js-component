/** Textarea.js ********************************************************************************************************** */
let PLUGIN_NAME = 'textarea'

Object.assign(Object.prototype, {
  Textarea (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this.length > 0 ? this[0] : this, options, value)
    } else {
      let plugin = null
      for (let $el of this.length > 0 ? Array.from(this) : [this]) {
        if (!$el.getAttribute('applied-plugin')) {
          window.PLUGIN.add($el, plugin = new Textarea($el, options), PLUGIN_NAME)
        }
      }
      return plugin
    }
  }
})

class Textarea {
  constructor (el, options) {
    this.$textarea = el.querySelector('textarea')
    this.$current = el.querySelector('.current-length')
    this.$total = el.querySelector('.total-length')

    this.options = Object.assign({}, options)
    this.maxlength = parseInt(this.$textarea.getAttribute('maxlength'))
    this.value = this.$textarea.value

    this.$current.innerText = this.value.length
    this.$total.innerText = UTILS.numberFormat.comma(this.maxlength)

    this.eventHandler = {
      typingTextarea: e => {
        let value = e.target.value
        this.value = value
        this.$current.innerText = UTILS.numberFormat.comma(value.length)
      }
    }

    this.$textarea.addEventListener('keydown', this.eventHandler.typingTextarea)
    this.$textarea.addEventListener('keyup', this.eventHandler.typingTextarea)
  }

  get () {
    return parseInt(this.$current.innerText)
  }
}
/** ****************************************************************************************************************** */
