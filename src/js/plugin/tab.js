/** tab.js ********************************************************************************************************** */
let _pluginName = 'tab'

Object.assign(window, {
  $tab: function (element, options = {}, value) {
    if (typeof options === 'string') {
      return $plugin.call(element, options, value)
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

    this.options = options
    this.activeIndex = parseInt(options.activeIndex) > -1 ? parseInt(options.activeIndex) : 0

    this.$tab = el
    this.$list = el.querySelector('.tab-list')
    this.$button = el.querySelectorAll('.tab-list button')
    this.$content = el.querySelectorAll('.content')

    this.eventHandler = {
      clickTab (e) {
        let idx = [...e.target.parentNode.children].indexOf(e.target)
        if (idx === _this.activeIndex) return

        _this.active(idx)
        e.preventDefault()
      }
    }

    this.$button.forEach(($el, idx) => {
      $el.addEventListener('click', this.eventHandler.clickTab)
    })

    if (this.activeIndex > -1) {
      this.active(this.activeIndex)
    }
  }

  active (idx) {
    this.activeIndex = idx
    this.$content.forEach(($el, index) => {
      this.$button[idx === index ? idx : index].classList[idx === index ? 'add' : 'remove']('active')
      this.$button[idx === index ? idx : index].setAttribute('aria-selected', idx === index ? true : false)
      $el.classList[idx === index ? 'add' : 'remove']('active')
      $el.hidden = idx === index ? false : true
    })

    this.$tab.dispatchEvent(new CustomEvent('change', {
      detail: {activeIndex: idx}
    }))
  }

  clear () {
    this.active(-1)
    this.$button.forEach(($el, idx) => {
      $el.removeEventListener('click', this.eventHandler.clickTab)
    })
    return $tab
  }
}
/** ****************************************************************************************************************** */
