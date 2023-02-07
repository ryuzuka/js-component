/** Modal.js ******************************************************************************************************** */
const PLUGIN_NAME = 'Modal'

Object.assign(Object.prototype, {
  Modal (options = {}, callback = () => {}) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, callback)
    } else {
      if (!this.getAttribute('applied-plugin')) {
        window.PLUGIN.add(this, new Modal(this, options, callback), PLUGIN_NAME)
      }
      return this
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
      classes: '',
      clickToClose: false
    }, options)

    this.options.classes = this.options.classes.split(' ').filter(className => {
      if (className !== '' ) {
        this.$modal.classList.add(className)
        return className
      }
    })

    this.eventHandler = {
      close: e => this.close(),
      keydownClose: e => {
        if (e.keyCode === 27) {
          this.close()
        }
      },
      clickToClose: e => {
        if (!this.options.clickToClose) return
        if (e.target.id === this.$modal.id && e.target.className.indexOf('layer') > -1) {
          this.close()
        }
      },
      clickButtonClose: e => {
        let idx = [...e.target.parentElement.children].indexOf(e.target)
        this.close(idx)
      }
    }

    this.$modal.addEventListener('keydown', this.eventHandler.keydownClose)
    this.$modal.addEventListener('click', this.eventHandler.clickToClose)
    this.$button.forEach($btn => {
      $btn.addEventListener('click', this.eventHandler.clickButtonClose)
    })
    if (this.$close) {
      this.$close.addEventListener('click', this.eventHandler.close)
    }
  }

  open () {
    setTimeout(() => this.$modal.querySelectorAll('button')[0].focus(), 1)
    window.BlockScroll('block')
    this.$modal.style.display = 'block'

    this.callback({type: 'open', $modal: this.$modal})
  }

  close (idx) {
    let params = idx === undefined ? {} : {closedIndex: idx}
    this.callback(Object.assign({type: 'before-close', $modal: this.$modal}, params))

    window.BlockScroll('scroll')
    this.$modal.style.display = 'none'
    this.callback(Object.assign({type: 'close', $modal: this.$modal}, params))

    document.querySelector('[aria-controls="' + this.$modal.id + '"]').focus()
  }

  clear () {
    this.$modal.removeEventListener('keydown', this.eventHandler.keydownClose)
    this.$modal.removeEventListener('click', this.eventHandler.clickToClose)
    this.$button.forEach($btn => {
      $btn.removeEventListener('click', this.eventHandler.clickButtonClose)
    })
    if (this.$close) {
      this.$close.removeEventListener('click', this.eventHandler.close)
    }

    this.callback = () => {}
    this.options = {
      classes: '',
      clickToClose: false
    }
  }
}
/** ***************************************************************************************************************** */
