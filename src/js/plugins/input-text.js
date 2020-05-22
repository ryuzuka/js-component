/** tab.js ********************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
;(($, _) => {
  let _plugins = []
  let _pluginIndex = 0

  $.fn.extend({
    inputText: function (options = {}, value) {
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
          _plugins[_pluginIndex] = new InputText($el, options)
          _pluginIndex++
        }
      })
      return this
    }
  })

  class InputText {
    constructor($this, options) {
      this.$input = $this

      this.options = options
      this.type = $this.attr('type')

      this.init()
    }

    init() {
      this.$input.addClass('applied-plugin').on('keypress keyup', e => {
        if (this.type === 'number' || this.type === 'tel') {
          e.target.value = e.target.value.replace(/[^0-9]/g, '')
        }
      })
    }

    clear() {
      this.$input.off().val('')
      this.$input = null
    }
  }
})(jQuery, lodash)
/** ***************************************************************************************************************** */
