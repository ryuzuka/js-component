/** tab.js ********************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
;(($, _) => {
  let _plugins = []
  let _pluginIndex = 0

  $.fn.extend({
    accordion: function (options = {}, value) {
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
          _plugins[_pluginIndex] = new Accordion($el, options)
          _pluginIndex++
        }
      })
      return this
    }
  })

  class Accordion {
    constructor($this, options) {
      this.$accordion = $this
      this.$btn = this.$accordion.find('.accordion-head > button')
      this.$content = this.$accordion.find('.accordion-content')

      this.options = options
      this.options.type = options.type || 'single'
      this.options.toggle = options.toggle || false
      this.accordionIndex = null

      this.init()
    }

    init() {
      this.$btn.each((index, el) => {
        $(el).attr('btn-index', index)
      })
      this.$btn.on('click', e => {
        let idx = Number($(e.target).attr('btn-index'))
        this.active(idx)
      })

      if (typeof this.options.activeIndex === 'number') {
        this.active(this.options.activeIndex)
      }
    }

    active(idx) {
      let {type} = this.options
      this.accordionIndex = idx

      if (type === 'single') {
        this.$content.each((index, el) => {
          let $btn = this.$btn.eq(index)
          let $content = this.$content.eq(index)

          if (idx === index) {
            if ($btn.hasClass('active')) {
              $btn.removeClass('active').attr('aria-expanded', false)
              $content.removeClass('active').prop('hidden', true)
            } else {
              $btn.addClass('active').attr('aria-expanded', true)
              $content.addClass('active').prop('hidden', false)
            }
          } else {
            $btn.removeClass('active').attr('aria-expanded', false)
            $content.removeClass('active').prop('hidden', true)
          }
        })
      } else if (type === 'multi') {
        if (!this.$btn.eq(idx).hasClass('active')) {
          this.$btn.eq(idx).addClass('active').attr('aria-expanded', true)
          this.$content.eq(idx).addClass('active').prop('hidden', false)
        } else {
          this.$btn.eq(idx).removeClass('active').attr('aria-expanded', false)
          this.$content.eq(idx).removeClass('active').prop('hidden', true)
        }
      }
      this.$accordion.trigger('active', this.accordionIndex)
    }

    clear() {
      this.$btn.off()
      this.$btn.attr('aria-expanded', false).removeClass('active')
      this.$content.prop('hidden', true).removeClass('active')
      this.$accordion = null
      this.accordionIndex = null
    }
  }
})(jQuery, lodash)
/** ****************************************************************************************************************** */
