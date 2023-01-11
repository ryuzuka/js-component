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
          plugin = new Tab(el, options)
          $plugin.add(el, plugin, _pluginName)
        }
      }
      return plugin
    }
  }
})

class Tab {
  constructor ($this, options) {
    // this.$tab = $this
    // this.$list = this.$tab.find('> .tab-list')
    // this.$button = this.$list.find('a, button')
    // this.$content = this.$tab.find('> .tab-content')
    //
    // this.options = options
    // this.activeIndex = (this.options.activeIndex >= 0) ? this.options.activeIndex : 0
    //
    // this.init()
  }

  test () {
    console.log('test')
    return window
  }

  init () {
    this.$button.on('click', e => {
      let idx = $(e.target).index()
      if (idx === this.activeIndex) return
      this.active(idx)
      e.preventDefault()
    })

    if (typeof this.activeIndex === 'number') {
      this.active(this.activeIndex)
    }
  }

  active (idx) {
    let $content = this.$content.find('> .content')
    this.activeIndex = idx

    this.$button.removeClass('active').attr('aria-selected', false)
    this.$button.eq(idx).addClass('active').attr('aria-selected', true)
    $content.prop('hidden', true).removeClass('active')
    $content.eq(idx).prop('hidden', false).addClass('active')

    this.$tab.triggerHandler({type: 'change', activeIndex: this.activeIndex})
  }

  clear () {
    console.log('clear')
    // this.$button.removeClass('active').attr('aria-selected', false).off('click')
    // this.$content.find('> .content').removeClass('active').prop('hidden', true)
  }
}
/** ****************************************************************************************************************** */
