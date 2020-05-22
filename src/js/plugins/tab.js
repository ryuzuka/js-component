/** tab.js ********************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
;(($, _) => {
  let _plugins = []
  let _pluginIndex = 0

  $.fn.extend({
    tab: function (options = {}, value) {
      _.forEach(this, el => {
        const $el = $(el)
        if (typeof options === 'string') {
          let idx = Number($el.attr('plugin-index'))
          if (_plugins[idx]) {
            _plugins[idx][options](value)
            if (options === 'clear') {
              $el.removeClass('applied-plugin').removeAttr('plugin-index', idx)
              delete _plugins[idx]
            }
          }
        } else {
          if ($el.hasClass('applied-plugin')) return
          $el.addClass('applied-plugin').attr('plugin-index', _pluginIndex)
          _plugins[_pluginIndex] = new Tab($el, options)
          _pluginIndex++
        }
      })
      return this
    }
  })

  class Tab {
    constructor($this, options) {
      this.$tab = $this
      this.$list = this.$tab.find('.tab-list')
      this.$content = this.$tab.find('.tab-content')

      this.options = options
      this.options.activeIndex = options.activeIndex || 0
      this.tabIndex = null
      this.init()
    }

    init() {
      this.$list.find('button').on('click', e => {
        let idx = $(e.target).index()
        if (idx === this.tabIndex) return
        this.active(idx)
      })

      if (typeof this.options.activeIndex === 'number') {
        this.active(this.options.activeIndex)
      }
    }

    active(idx) {
      let $btn = this.$list.find('button')
      let $content = this.$content.find('> .content')
      this.tabIndex = idx

      $btn.removeClass('active').attr('aria-selected', false)
      $btn.eq(idx).addClass('active').attr('aria-selected', true)
      $content.prop('hidden', true).removeClass('active')
      $content.eq(idx).prop('hidden', false).addClass('active')

      this.$tab.trigger('active', this.tabIndex)
    }

    clear() {
      this.$list.find('button').removeClass('active').attr('aria-selected', false)
      this.$content.find('> .content').removeClass('active').prop('hidden', true)
      this.$list.find('button').off()
      this.$tab = null
      this.tabIndex = null
    }
  }
})(jQuery, lodash)
/** ****************************************************************************************************************** */
