/** tab.js ********************************************************************************************************** */
let _pluginName = 'textarea'

Object.assign(window, {
  Textarea: function (element, options = {}, value) {
    if (typeof options === 'string') {
      let el = element.length > 0 ? element[0] : element
      return window.PLUGIN.call(el, options, value)

    } else {
      let plugin = null
      for (let el of element.length > 0 ? element : [element]) {
        if (!el.getAttribute('applied-plugin')) {
          window.PLUGIN.add(el, plugin = new Textarea(el, options), _pluginName)
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
    this.maxlength = parseInt(this.$textarea.getAttribute('maxlength'))
    this.value = this.$textarea.value

    this.eventHandler = {
      typingTextarea: e => {
        let value = e.target.value
        this.value = value
        this.$current.innerText = UTILS.numberFormat.comma(value.length)
      }
    }

    this.$current.innerText = this.value.length
    this.$total.innerText = UTILS.numberFormat.comma(this.maxlength)
    this.$textarea.addEventListener('keydown', this.eventHandler.typingTextarea)
    this.$textarea.addEventListener('keyup', this.eventHandler.typingTextarea)
  }

  clear () {
    this.$textarea.removeEventListener('keydown', this.eventHandler.typingTextarea)
    this.$textarea.removeEventListener('keyup', this.eventHandler.typingTextarea)

    return window.Textarea
  }
}
/** ****************************************************************************************************************** */
