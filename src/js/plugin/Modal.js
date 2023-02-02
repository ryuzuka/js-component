/** Modal.js ******************************************************************************************************** */
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
    this.$button = el.querySelectorAll('.button-wrap > button.btn')

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
      },
      clickDimmedClose: e => {
        if (!this.options.clickToClose) return

        if (e.target.id === this.$modal.id && e.target.className.indexOf('layer') > -1) {
          this.close()
        }
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

    this.$modal.addEventListener('click', this.eventHandler.clickDimmedClose)
    this.$close.addEventListener('click', this.eventHandler.clickClose)
    this.$button.forEach($btn => {
      $btn.addEventListener('click', e => {
        let idx = [...e.target.parentElement.children].indexOf(e.target)
        this.close(idx)
      })
    })
  }

  open () {
    window.BlockScroll('block')
    this.$modal.style.display = 'block'
    this.callback({type: 'open', $modal: this.$modal})
  }

  close (idx) {
    let params = idx === undefined ? {} : {closedIndex: idx}

    this.callback(Object.assign({type: 'before-close', $modal: this.$modal}, params))
    this.$modal.style.display = 'none'
    window.BlockScroll('scroll')
    this.callback(Object.assign({type: 'close', $modal: this.$modal}, params))
  }

  clear () {
    this.$modal.classList.remove('dimmed')
    this.$close.removeEventListener('click', this.eventHandler.clickClose)
  }
}
/** ***************************************************************************************************************** */
