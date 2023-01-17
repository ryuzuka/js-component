/** Dropdown.js ********************************************************************************************************** */
let _pluginName = 'Dropdown'

Object.assign(window, {
  Dropdown: function (element, options = {}, value) {
    if (typeof options === 'string') {
      let el = element.length > 0 ? element[0] : element
      return $plugin.call(el, options, value)

    } else {
      let plugin = null
      for (let el of element.length > 0 ? element : [element]) {
        if (!el.getAttribute('applied-plugin')) {
          $plugin.add(el, plugin = new Dropdown(el, options), _pluginName)
        }
      }
      return plugin
    }
  }
})

class Dropdown {
  constructor (el, options) {
    this.$dropdown = el
    this.$button = el.querySelector('.dropdown-btn')
    this.$list = el.querySelector('.dropdown-list')
    this.$option = el.querySelectorAll('.dropdown-list > li')

    this.placeholder = (el.dataset.placeholder || '').toString() || null
    let activeIdx = parseInt(options.activeIndex)
    let disabledIdx = parseInt(options.disabledIndex)
    this.activeIndex = activeIdx > -1 ? activeIdx : (this.placeholder === null ? 0 : -1)
    this.disabledIndex = disabledIdx > -1 ? disabledIdx : -1
    this.options = options

    if (this.placeholder) {
      this.$button.innerText = this.placeholder
    }

    this.eventHandler = {
      focusOutDropdown: e => {
        if (e.relatedTarget === null || e.relatedTarget.closest('.js-dropdown') === null) {
          this.toggle(false)
        }
      },
      clickDropdown: e => {
        this.toggle(true)
        e.preventDefault()
      },
      clickOption: e => {
        let idx = [...this.$list.children].indexOf(e.target.parentElement)
        this.active(idx)
        this.toggle(false)
        e.preventDefault()
      }
    }

    this.$dropdown.addEventListener('focusout', this.eventHandler.focusOutDropdown)
    this.$button.addEventListener('click', this.eventHandler.clickDropdown)
    this.$option.forEach(($option, index) => {
      let $btn = $option.firstElementChild
      if (this.disabledIndex == index) {
        $btn.disabled = true
        $btn.classList.add('disabled')
      }
      $btn.addEventListener('click', this.eventHandler.clickOption)
    })

    this.active(this.activeIndex)
  }

  toggle (isOpen) {
    this.$button.setAttribute('aria-expanded', isOpen)
    this.$list.style.display = isOpen ? 'block' : 'none'
  }

  active (idx) {
    this.activeIndex = idx
    this.$option.forEach(($option, index) => {
      let $btn = $option.firstElementChild
      $option.classList[idx === index ? 'add' : 'remove']('active')
      $option.setAttribute('aria-selected', index === idx)
      $btn.classList[idx === index ? 'add' : 'remove']('active')
      if (idx === index) {
        this.$button.innerText = $btn.innerText
      }
    })

    this.$dropdown.dispatchEvent(new CustomEvent('change', {
      detail: {activeIndex: idx}
    }))

    return window.Dropdown
  }

  clear () {
    this.active(-1)
    this.$dropdown.removeEventListener('focusout', this.eventHandler.focusOutDropdown)
    this.$button.removeEventListener('click', this.eventHandler.clickDropdown)
    this.$option.forEach(($option, index) => {
      let $btn = $option.firstElementChild
      $btn.disabled = false
      $btn.classList.remove('disabled')
      $btn.removeEventListener('click', this.eventHandler.clickOption)
      if (index === 0) {
        this.$button.innerText = this.placeholder ? this.placeholder : $btn.innerText
      }
    })

    return window.Dropdown
  }
}
/** ****************************************************************************************************************** */
