/** Modal.js ********************************************************************************************************** */
const PLUGIN_NAME = 'Modal'

Object.assign(Object.prototype, {
  Modal (options = {}, callback = function () {}) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, callback)
    } else {
      let plugin = null
      if (!this.getAttribute('applied-plugin')) {
        window.PLUGIN.add(this, plugin = new Modal(this, options, callback), PLUGIN_NAME)
      }
      return plugin
    }
  }
})

class Modal {
  constructor (el, options, callback) {
    this.$modal = el
    this.$close = el.querySelector('.close')
    this.$button = el.querySelectorAll('.button-wrap button.btn')

    this.callback = callback
    this.options = Object.assign({
      classes: [], // Array
      dimmed: true,
      clickToClose: false,
      closedFocus: ''
    }, options)

    this.eventHandler = {
      clickClose: e => {
        this.close()
      }
    }

    if (this.options.dimmed) {
      this.options.classes.push('dimmed')
    }

    if (this.options.classes.length > 0) {
      this.options.classes.forEach(className => {
        this.$modal.classList.add(className)
      })
    }

    this.$close.addEventListener('click', this.eventHandler.clickClose)
    this.$button.forEach($btn => {
      $btn.addEventListener('click', this.eventHandler.clickClose)
    })
  }

  open () {
    window.BlockScroll('block')
    this.$modal.style.display = 'block'
    this.callback({type: 'open', $modal: this.$modal})
  }

  close () {
    this.callback({type: 'before-close', $modal: this.$modal})

    this.$modal.style.display = 'none'
    window.BlockScroll('scroll')

    this.callback({type: 'close', $modal: this.$modal})
  }

  clear () {
    this.$close.removeEventListener('click', this.eventHandler.clickClose)
  }
}
/** ****************************************************************************************************************** */
