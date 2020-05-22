/** dropdown.js ****************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
;(($, _) => {
  let _plugins = []
  let _pluginIndex = 0

  $.fn.extend({
    dropdown: function (options = {}, value) {
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
          _plugins[_pluginIndex] = new Dropdown($el, options)
          _pluginIndex++
        }
      })
      return this
    }
  })

  class Dropdown {
    constructor($this, options) {
      this.$dropdown = $this
      this.$btn = this.$dropdown.find('.dropdown-btn')
      this.$list = this.$dropdown.find('.dropdown-list')

      this.options = options
      this.activeIndex = null

      this.init()
    }

    init() {
      this.$btn.on('click blur', e => {
        let isOpen = true
        if (e.type === 'blur') {
          if ($(e.relatedTarget).closest('.dropdown-list').length === 0) {
            isOpen = false
          }
        }
        $(e.target).attr('aria-expanded', isOpen)
        this.toggle(isOpen)
      })

      this.$list.find('li a').on('click', e => {
        e.preventDefault()
        let idx = $(e.target).parent().index()
        this.active(idx)
        this.toggle(false)
        this.$btn.attr('aria-expanded', false)
      })
    }

    active(idx) {
      this.$list.find('li').each((index, el) => {
        if (idx === index) {
          this.activeIndex = index
          $(el).addClass('active').attr('aria-selected', true)
          this.$btn.text($(el).find('a').text())
          this.$dropdown.trigger('change', this.activeIndex)
        } else {
          $(el).removeClass('active').attr('aria-selected', false)
        }
      })
    }

    toggle(isOpen) {
      if (isOpen) {
        this.$list.addClass('active')
      } else {
        this.$list.removeClass('active')
      }
    }

    clear() {
      this.$btn.off()
      this.$list.find('li a').off()
      this.activeIndex = null
      this.$btn = null
      this.$list = null
    }
  }
})(jQuery, lodash)
/** ****************************************************************************************************************** */
