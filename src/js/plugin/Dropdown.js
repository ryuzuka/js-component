/** Dropdown.js ********************************************************************************************************** */
let PLUGIN_NAME = 'Dropdown'

Object.assign(Object.prototype, {
  Dropdown (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, value)
    } else {
      let plugin = null
      for (let $el of this.length > 0 ? Array.from(this) : new Array(this)) {
        if (!$el.getAttribute('applied-plugin')) {
          window.PLUGIN.add($el, plugin = new Dropdown($el, options), PLUGIN_NAME)
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

    this.options = options
    this.placeholder = el.dataset.placeholder || '선택하세요.'
    this.activeIndex = parseInt(options.activeIndex) > -1 ? parseInt(options.activeIndex) : -1
    this.disabledIndex = parseInt(options.disabledIndex) > -1 ? parseInt(options.disabledIndex) : -1
    this.val = ''

    if (this.placeholder) {
      this.$button.innerText = this.placeholder
    }

    this.eventHandler = {
      clickDropdown: e => this.toggle(true),
      focusOutDropdown: e => {
        if (e.relatedTarget === null || e.relatedTarget.closest('.js-dropdown') === null) {
          this.toggle(false)
        }
      },
      clickOption: e => {
        let idx = [...this.$list.children].indexOf(e.target.parentElement)

        this.active(idx)
        this.toggle(false)
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

    return this.$dropdown
  }

  active (idx) {
    this.activeIndex = idx
    this.$option.forEach(($option, index) => {
      let $btn = $option.firstElementChild
      $option.setAttribute('aria-selected', index === idx)
      $option.classList[index === idx ? 'add' : 'remove']('active')
      $btn.classList[index === idx ? 'add' : 'remove']('active')
      if (index === idx) {
        this.val = $btn.dataset.value
        this.$button.innerText = $btn.innerText
      }
    })
    this.$dropdown.dispatchEvent(new CustomEvent('change', {detail: {activeIndex: idx, value: this.val}}))
  }

  get () {
    return this.val
  }

  clear () {
    this.active(-1)
    this.$button.innerText = this.placeholder
    this.$option.forEach($option => {
      let $btn = $option.firstElementChild
      $btn.disabled = false
      $btn.classList.remove('disabled')
      $btn.removeEventListener('click', this.eventHandler.clickOption)
      $option.setAttribute('aria-selected', false)
    })
    this.$dropdown.removeEventListener('focusout', this.eventHandler.focusOutDropdown)
    this.$button.removeEventListener('click', this.eventHandler.clickDropdown)
  }
}
/** ****************************************************************************************************************** */
