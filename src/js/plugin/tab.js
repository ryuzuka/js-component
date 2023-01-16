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
    this.$button = el.querySelectorAll('.tab-list button')
    this.$content = el.querySelectorAll('.content')

    this.options = options
    this.activeIndex = parseInt(options.activeIndex) > -1 ? parseInt(options.activeIndex) : 0
    this.eventHandler = {
      clickTab (e) {
        let idx = [...e.target.parentNode.children].indexOf(e.target)
        if (idx === _this.activeIndex) return

        _this.active(idx)
        e.preventDefault()
      }
    }

    this.$button.forEach($btn => {
      $btn.addEventListener('click', this.eventHandler.clickTab)
    })

    this.active(this.activeIndex)
  }

  active (idx) {
    this.activeIndex = idx
    this.$content.forEach(($el, index) => {
      let isActive = idx === index
      this.$button[isActive ? idx : index].classList[isActive ? 'add' : 'remove']('active')
      this.$button[isActive ? idx : index].setAttribute('aria-selected', isActive ? true : false)
      $el.classList[isActive ? 'add' : 'remove']('active')
      $el.hidden = isActive ? false : true
    })

    this.$tab.dispatchEvent(new CustomEvent('change', {
      detail: {activeIndex: idx}
    }))

    return window.Tab
  }

  clear () {
    this.active(-1)
    this.$button.forEach($btn => {
      $btn.removeEventListener('click', this.eventHandler.clickTab)
    })

    return window.Tab
  }
}
/** ****************************************************************************************************************** */
