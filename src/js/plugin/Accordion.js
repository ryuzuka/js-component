/** Accordion.js ********************************************************************************************************** */
const PLUGIN_NAME = 'Accordion'

Object.assign(Object.prototype, {
  Accordion (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this.length > 0 ? this[0] : this, options, value)
    } else {
      for (let $el of this.length > 0 ? Array.from(this) : [this]) {
        if (!$el.getAttribute('applied-plugin')) {
          window.PLUGIN.add($el, new Accordion($el, options), PLUGIN_NAME)
        }
      }
      return this
    }
  }
})

class Accordion {
  constructor (el, options) {
    this.$accordion = el
    this.$content = el.querySelectorAll('.accordion-content')
    this.$button = el.querySelectorAll('.accordion-section > button')

    this.options = Object.assign({}, options)
    this.activeIndex = parseInt(options.activeIndex) > -1 ? parseInt(options.activeIndex) : -1
    this.disabledIndex = parseInt(options.disabledIndex) > -1 ? parseInt(options.disabledIndex) : -1

    this.eventHandler = {
      clickAccordion: e => {
        let idx = [...this.$accordion.children].indexOf(e.target.parentElement)
        this.active(idx === this.activeIndex ? -1 : idx)
      }
    }

    this.$button.forEach(($btn, index) => {
      if (this.disabledIndex == index) {
        $btn.disabled = true
        $btn.classList.add('disabled')
      } else {
        $btn.addEventListener('click', this.eventHandler.clickAccordion)
      }
    })

    this.active(this.activeIndex)
  }

  active (idx) {
    this.activeIndex = idx
    this.$content.forEach(($content, index) => {
      $content.parentElement.classList[idx === index ? 'add' : 'remove']('active')
      $content.hidden = !(idx === index)
    })
    this.$button.forEach(($btn, index) => {
      $btn.setAttribute('aria-expanded', idx === index)
    })
    this.$accordion.dispatchEvent(new CustomEvent('change', {detail: {activeIndex: idx}}))
  }

  get () {
    return {index: this.activeIndex}
  }

  clear () {
    this.active(-1)
    this.$content.forEach($content => $content.removeAttribute('hidden'))
    this.$button.forEach($btn => {
      $btn.disabled = false
      $btn.classList.remove('disabled')
      $btn.removeEventListener('click', this.eventHandler.clickAccordion)
    })
  }
}
/** ****************************************************************************************************************** */
