/** Tab.js ********************************************************************************************************** */
const PLUGIN_NAME = 'tab'

Object.assign(Object.prototype, {
  Tab (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this.length > 0 ? this[0] : this, options, value)
    } else {
      let plugin = null
      for (let $el of this.length > 0 ? Array.from(this) : [this]) {
        if (!$el.getAttribute('applied-plugin')) {
          window.PLUGIN.add($el, plugin = new Tab($el, options), PLUGIN_NAME)
        }
      }
      return plugin
    }
  }
})

class Tab {
  constructor (el, options) {
    this.$tab = el
    this.$content = el.querySelectorAll('.content')
    this.$button = el.querySelectorAll('.tab-list > button')

    this.options = Object.assign({}, options)
    this.activeIndex = parseInt(options.activeIndex) > 0 ? parseInt(options.activeIndex) : 0
    this.disabledIndex = parseInt(options.disabledIndex) > -1 ? parseInt(options.disabledIndex) : -1

    this.eventHandler = {
      clickTab: e => {
        let idx = [...e.target.parentElement.children].indexOf(e.target)
        if (idx === this.activeIndex) return

        this.active(idx)
      }
    }

    this.$button.forEach(($btn, index) => {
      if (this.disabledIndex == index) {
        $btn.disabled = true
        $btn.classList.add('disabled')
      } else {
        $btn.addEventListener('click', this.eventHandler.clickTab)
      }
    })

    this.active(this.activeIndex)
  }

  active (idx) {
    this.activeIndex = idx
    this.$content.forEach(($content, index) => {
      $content.classList[idx === index ? 'add' : 'remove']('active')
      $content.hidden = !(idx === index)
    })
    this.$button.forEach(($btn, index) => {
      $btn.classList[idx === index ? 'add' : 'remove']('active')
      $btn.setAttribute('aria-selected', idx === index)
    })
    this.$tab.dispatchEvent(new CustomEvent('change', {detail: {activeIndex: idx}}))
  }

  clear () {
    this.active(-1)
    this.$content.forEach($content => $content.removeAttribute('hidden'))
    this.$button.forEach($btn => {
      $btn.disabled = false
      $btn.classList.remove('disabled')
      $btn.removeEventListener('click', this.eventHandler.clickTab)
    })
  }
}
/** ****************************************************************************************************************** */
