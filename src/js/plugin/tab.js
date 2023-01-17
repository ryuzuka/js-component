/** tab.js ********************************************************************************************************** */
let _pluginName = 'tab'

Object.assign(window, {
  Tab: function (element, options = {}, value) {
    if (typeof options === 'string') {
      let el = element.length > 0 ? element[0] : element
      return $plugin.call(el, options, value)

    } else {
      let plugin = null
      for (let el of element.length > 0 ? element : [element]) {
        if (!el.getAttribute('applied-plugin')) {
          $plugin.add(el, plugin = new Tab(el, options), _pluginName)
        }
      }
      return plugin
    }
  }
})

class Tab {
  constructor (el, options) {
    let _this = this

    this.$tab = el
    this.$list = el.querySelector('.tab-list')
    this.$content = el.querySelectorAll('.content')
    this.$button = el.querySelectorAll('.tab-list > button')

    this.options = options
    this.activeIndex = parseInt(options.activeIndex) > -1 ? parseInt(options.activeIndex) : 0
    this.disabledIndex = parseInt(options.disabledIndex) > -1 ? parseInt(options.disabledIndex) : -1
    this.eventHandler = {
      clickButton (e) {
        let idx = [...e.target.parentNode.children].indexOf(e.target)
        if (idx === _this.activeIndex) return
        _this.active(idx)
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
      $content.hidden = !(idx === index)
    })
    this.$button.forEach(($btn, index) => {
      $btn.classList[idx === index ? 'add' : 'remove']('active')
      $btn.setAttribute('aria-selected', idx === index)
    })
    this.$tab.dispatchEvent(new CustomEvent('change', {
      detail: {activeIndex: idx}
    }))

    return window.Tab
  }

  clear () {
    this.active(-1)
    this.$button.forEach($btn => {
      $btn.disabled = false
      $btn.removeEventListener('click', this.eventHandler.clickButton)
    })

    return window.Tab
  }
}
/** ****************************************************************************************************************** */
