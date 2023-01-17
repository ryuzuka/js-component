/** Accordion.js ********************************************************************************************************** */
let _pluginName = 'Accordion'

Object.assign(window, {
  Accordion: function (element, options = {}, value) {
    if (typeof options === 'string') {
      let el = element.length > 0 ? element[0] : element
      return $plugin.call(el, options, value)

    } else {
      let plugin = null
      for (let el of element.length > 0 ? element : [element]) {
        if (!el.getAttribute('applied-plugin')) {
          $plugin.add(el, plugin = new Accordion(el, options), _pluginName)
        }
      }
      return plugin
    }
  }
})

class Accordion {
  constructor (el, options) {
    let _this = this

    this.$accordion = el
    this.$content = el.querySelectorAll('.accordion-section')
    this.$button = el.querySelectorAll('.accordion-section > button')

    this.options = options
    this.activeIndex = parseInt(options.activeIndex) > -1 ? parseInt(options.activeIndex) : -1
    this.disabledIndex = parseInt(options.disabledIndex) > -1 ? parseInt(options.disabledIndex) : -1
    this.eventHandler = {
      clickButton (e) {
        let idx = [..._this.$accordion.children].indexOf(e.target.parentNode)
        _this.active(idx === _this.activeIndex ? -1 : idx)
        e.preventDefault()
      }
    }
    this.$button.forEach(($btn, index) => {
      if (this.disabledIndex == index) {
        $btn.disabled = true
      }
      $btn.addEventListener('click', this.eventHandler.clickButton)
    })

    this.active(this.activeIndex)
  }

  active (idx) {
    this.activeIndex = idx
    this.$content.forEach(($content, index) => {
      $content.classList[idx === index ? 'add' : 'remove']('active')
      $content.lastElementChild.hidden = !(idx === index)
    })
    this.$button.forEach(($btn, index) => {
      $btn.setAttribute('aria-expanded', idx === index)
    })
    this.$accordion.dispatchEvent(new CustomEvent('change', {
      detail: {activeIndex: idx}
    }))

    return window.Accordion
  }

  clear () {
    this.active(-1)
    this.$button.forEach($btn => {
      $btn.disabled = false
      $btn.removeEventListener('click', this.eventHandler.clickButton)
    })

    return window.Accordion
  }
}
/** ****************************************************************************************************************** */
