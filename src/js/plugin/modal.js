/** modal.js ******************************************************************************************************** */
const PLUGIN_NAME = 'modal'

Object.assign(HTMLElement.prototype, {
  modal (options = {}, value) {
    if (typeof options === 'string') {
      return PLUGIN.call(this, options, value)
    } else {
      let appliedPlugin = this.getAttribute('applied-plugin')
      if (!appliedPlugin || appliedPlugin.indexOf(PLUGIN_NAME) < 0) {
        PLUGIN.add(this, new Modal(this, options, value), PLUGIN_NAME)
      }
      return this
    }
  }
})

class Modal {
  constructor (el, options) {
    this.$modal = el
    this.$close = el.querySelector('.close')
    this.$button = el.querySelectorAll('.button-wrap > button.btn')
    this.$focusEl = el.querySelectorAll('a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]')
    this.focusElLength = this.$focusEl.length

    this.options = Object.assign({
      classes: '',
      html: '',
      text: '',
      buttonText: [],
      clickToClose: false
    }, options)

    this.options.classes = this.options.classes.split(' ').filter(className => {
      if (className !== '' ) {
        this.$modal.classList.add(className)
        return className
      }
    })
    if (this.options.html !== '') {
      this.$modal.querySelector('.layer-content').innerHTML = this.options.html
    }
    if (this.options.text !== '') {
      this.$modal.querySelector('.layer-content').innerText = this.options.text
    }

    this.eventHandler = {
      close: e => {
        if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 27)) {
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
      },
      keydown: e => {
        this.$focusEl.forEach(($el, idx) => {
          let arrFocusEl = Array.from(this.$focusEl)
          console.log(e.currentTarget, idx)
        })
      }
    }

    this.$focusEl.forEach(($el, idx) => $el.setAttribute('data-focus-idx', idx))

    this.$modal.addEventListener('keydown', this.eventHandler.close)
    this.$modal.addEventListener('click', this.eventHandler.clickToClose)
    this.$button.forEach(($btn, index) => {
      if (this.options.buttonText.length > 0) {
        $btn.innerText = this.options.buttonText[index]
      }
      $btn.addEventListener('click', this.eventHandler.clickButtonClose)
    })
    if (this.$close) {
      this.$close.addEventListener('click', this.eventHandler.close)
    }
    // a11y focus
    this.$focusEl.forEach(($el, idx) => {
      $el.addEventListener('keydown', e => {
        if (e.keyCode === 9) {
          if (e.shiftKey && idx === 0) {
            Array.from(this.$focusEl)[this.focusElLength - 1].focus()
            e.preventDefault()
          } else if (idx === this.focusElLength - 1) {
            Array.from(this.$focusEl)[0].focus()
            e.preventDefault()
          }
        }
      })
    })
  }

  open () {
    setTimeout(() => this.$modal.focus(), 1)
    
    document.body.blockScroll()
    this.$modal.style.display = 'block'
    this.$modal.dispatchEvent(new CustomEvent('open', {detail: {type: 'open', $modal: this.$modal}}))
  }

  close (idx) {
    let params = {$modal: this.$modal}
    params = idx === undefined ? params : Object.assign(params, {closedIndex: idx})
    this.$modal.dispatchEvent(new CustomEvent('before-close', {detail: Object.assign({type: 'before-close'}, params)}))

    document.body.blockScroll(false)
    this.$modal.style.display = 'none'
    setTimeout(() => {
      document.querySelector('[aria-controls="' + this.$modal.id + '"]').focus()
      this.$modal.dispatchEvent(new CustomEvent('close', {detail: Object.assign({type: 'close'}, params)}))
    }, 0)
  }

  clear () {
    this.$modal.removeEventListener('keydown', this.eventHandler.close)
    this.$modal.removeEventListener('click', this.eventHandler.clickToClose)
    this.$button.forEach($btn => {
      $btn.removeEventListener('click', this.eventHandler.clickButtonClose)
    })
    if (this.$close) {
      this.$close.removeEventListener('click', this.eventHandler.close)
    }
    this.$focusEl.forEach(($el, idx) => {
      $el.removeEventListener('keydown', e => {

      })
    })
  }
}
/** ***************************************************************************************************************** */
