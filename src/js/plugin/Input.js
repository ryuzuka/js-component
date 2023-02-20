/** Input.js ********************************************************************************************************** */
const PLUGIN_NAME = 'input'

Object.assign(HTMLElement.prototype, {
  Input (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, value)
    } else {
      let appliedPlugin = this.getAttribute('applied-plugin')
      if (!appliedPlugin || appliedPlugin.indexOf(PLUGIN_NAME) < 0) {
        window.PLUGIN.add(this, new Input(this, options), PLUGIN_NAME)
      }
      return this
    }
  }
})

class Input {
  constructor (el, options) {
    this.$input = el.querySelector('input')
    this.type = this.$input.type
    this.options = Object.assign({}, options)

    this.eventHandler = {}

    if (this.type === 'text') {
      this.text()
      if ([...this.$input.classList].indexOf('number') > -1) {
        this.number()
      } else if ([...this.$input.classList].indexOf('tel') > -1) {
        this.tel()
      }
    } else if (this.type === 'checkbox') {
      this.checkbox()
    }
  }

  checkbox () {
    Object.assign(this.eventHandler, {
      checkbox: e => {
        e.target.setAttribute('checked', e.target.checked)
      }
    })

    this.$input.addEventListener('change', this.eventHandler.checkbox)
  }

  text () {
    Object.assign(this.eventHandler, {
      focus: e => e.target.classList[e.type === 'focus' ? 'add' : 'remove']('focus')
    })

    this.$input.addEventListener('focus', this.eventHandler.focus)
    this.$input.addEventListener('blur', this.eventHandler.focus)
  }

  number () {
    let {classList} = this.$input
    this.isComma = [...classList].indexOf('comma') > -1

    Object.assign(this.eventHandler, {
      number: e => {
        let value = e.target.value.replace(/[^\d]+/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1')
        e.target.value = this.isComma ? window.UTILS.numberFormat.comma(value) : value
      }
    })

    this.$input.addEventListener('keydown', this.eventHandler.number)
    this.$input.addEventListener('keyup', this.eventHandler.number)
  }

  tel () {
    Object.assign(this.eventHandler, {
      tel: e => {
        e.target.value = window.UTILS.numberFormat.tel(e.target.value)
      }
    })

    this.$input.addEventListener('keydown', this.eventHandler.tel)
    this.$input.addEventListener('keyup', this.eventHandler.tel)
  }

  clear () {
    this.$input.removeEventListener('change', this.eventHandler.checkbox)
    this.$input.removeEventListener('keydown', this.eventHandler.tel)
    this.$input.removeEventListener('keyup', this.eventHandler.tel)
    this.$input.removeEventListener('keydown', this.eventHandler.number)
    this.$input.removeEventListener('keyup', this.eventHandler.number)
    this.$input.removeEventListener('focus', this.eventHandler.focus)
    this.$input.removeEventListener('blur', this.eventHandler.focus)
  }
}
/** ****************************************************************************************************************** */
