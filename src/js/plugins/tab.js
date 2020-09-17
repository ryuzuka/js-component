/** tab.js ********************************************************************************************************** */
;($ => {
  let pluginName = 'tab'

  $.fn.extend({
    tab: function (options = {}, value) {
      if (typeof options === 'string') {
        $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Tab($(el), options))
          }
        })
      }
      return this
    }
  })

  class Tab {
    constructor($this, options) {
      this.$tab = $this
      this.$list = this.$tab.find('> .tab-list')
      this.$content = this.$tab.find('> .tab-content')

      this.options = options
      this.options.activeIndex = options.activeIndex || 0
      this.activeIndex = null
      this.init()
    }

    init() {
      this.$list.find('button').on('click', e => {
        let idx = $(e.target).index()
        if (idx === this.activeIndex) return
        this.active(idx)
      })

      if (typeof this.options.activeIndex === 'number') {
        this.active(this.options.activeIndex)
      }
    }

    active(idx) {
      let $btn = this.$list.find('button')
      let $content = this.$content.find('> .content')
      this.activeIndex = idx

      $btn.removeClass('active').attr('aria-selected', false)
      $btn.eq(idx).addClass('active').attr('aria-selected', true)
      $content.prop('hidden', true).removeClass('active')
      $content.eq(idx).prop('hidden', false).addClass('active')

      this.$tab.triggerHandler({type: 'change', activeIndex: this.activeIndex})
    }

    clear() {
      this.$list.find('button').removeClass('active').attr('aria-selected', false)
      this.$content.find('> .content').removeClass('active').prop('hidden', true)
      this.$list.find('button').off()
      this.$tab = null
      this.activeIndex = null
    }
  }
})(window.jQuery)
/** ****************************************************************************************************************** */
