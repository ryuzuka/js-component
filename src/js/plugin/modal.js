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
      // click close, esc
      close: e => {
        if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 27)) {
          this.close()
        }
      },
      // click dimmed
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
        if (e.keyCode === 27) {
          this.close()

        } else if (e.keyCode === 9) {
          let focusIdx = parseInt(e.target.dataset.focusIdx)
          if (e.shiftKey && focusIdx === 0) {
            this.$focusEl[this.focusElLength - 1].focus()
            e.preventDefault()
            
          } else if (focusIdx === this.focusElLength - 1) {
            this.$focusEl[0].focus()
            e.preventDefault()
          }
        }
      }
    }

    if (this.$close) this.$close.addEventListener('click', this.eventHandler.close)
    this.$modal.addEventListener('keydown', this.eventHandler.keydown)
    this.$modal.addEventListener('click', this.eventHandler.clickToClose)
    this.$button.forEach(($btn, index) => {
      if (this.options.buttonText.length > 0) {
        $btn.innerText = this.options.buttonText[index]
      }
      $btn.addEventListener('click', this.eventHandler.clickButtonClose)
    })

    this.$focusEl.forEach(($el, idx) => {
      $el.setAttribute('data-focus-idx', idx)
    })
  }

  open () {
    document.body.blockScroll()
    this.$modal.style.display = 'block'
    this.$modal.dispatchEvent(new CustomEvent('open', {detail: {type: 'open', $modal: this.$modal}}))
    this.$modal.focus()
  }

  close (idx) {
    let params = {$modal: this.$modal}
    params = idx === undefined ? params : Object.assign(params, {closedIndex: idx})
    this.$modal.dispatchEvent(new CustomEvent('before-close', {detail: Object.assign({type: 'before-close'}, params)}))
    this.$modal.style.display = 'none'
    this.$modal.dispatchEvent(new CustomEvent('close', {detail: Object.assign({type: 'close'}, params)}))
    document.querySelector('[aria-controls="' + this.$modal.id + '"]').focus()
    document.body.blockScroll(false)
  }

  clear () {
    if (this.$close) this.$close.removeEventListener('click', this.eventHandler.close)
    this.$button.forEach($btn => $btn.removeEventListener('click', this.eventHandler.clickButtonClose))
    this.$modal.removeEventListener('keydown', this.eventHandler.keydown)
    this.$modal.removeEventListener('click', this.eventHandler.clickToClose)
  }
}
/** ***************************************************************************************************************** */
