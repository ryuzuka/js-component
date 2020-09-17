/** dropdown.js ****************************************************************************************************** */
;($ => {
  let pluginName = 'dropdown'

  $.fn.extend({
    dropdown: function (options = {}, value) {
      if (typeof options === 'string') {
        $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Dropdown($(el), options))
          }
        })
      }
      return this
    }
  })

  class Dropdown {
    constructor($this, options) {
      this.$dropdown = $this
      this.$button = this.$dropdown.find('.dropdown-btn')
      this.options = options
      this.activeIndex = -1

      this.init()
    }

    init() {
      this.$button.text(this.$dropdown.attr('placeholder'))
      this.$button.on('click', e => {
        $(e.target).attr('aria-expanded', true)
        this.toggle(true)
      })

      this.$dropdown.find('.dropdown-list li button').on('click', e => {
        if ($(e.currentTarget).hasClass('disabled')) {
          return false
        }
        let idx = $(e.currentTarget).parent().index()
        if (idx !== this.activeIndex) {
          this.active(idx)
          this.$button.attr('aria-expanded', false)
        }
        this.toggle(false)
      })

      this.$dropdown.find('.dropdown-btn, .dropdown-list').on('focusout', e => {
        if (e.relatedTarget === null || $(e.relatedTarget).closest('.js-dropdown').length < 1) {
          this.toggle(false)
        }
      })

      if (typeof this.options.activeIndex === 'number') {
        this.active(this.options.activeIndex)
      }

      if (typeof this.options.disableIndex === 'number') {
        this.disable([this.options.disableIndex])
      } else if (typeof this.options.disableIndex === 'object') {
        this.disable(this.options.disableIndex)
      }
    }

    toggle(isOpen) {
      if (isOpen) {
        this.$dropdown.find('.dropdown-list').addClass('active')
      } else {
        this.$dropdown.find('.dropdown-list').removeClass('active')
      }

      return this.$dropdown
    }

    active(idx) {
      this.$dropdown.find('.dropdown-list li').each((index, el) => {
        if (idx === index) {
          this.activeIndex = index
          $(el).addClass('active').attr('aria-selected', true)
          this.$button.text($(el).find('button').text()).addClass('active')
          this.$dropdown.triggerHandler({type: 'change', activeIndex: this.activeIndex, value: $(el).find('button').data('value')})
        } else {
          $(el).removeClass('active').attr('aria-selected', false)
        }
      })
    }

    disable(index) {
      // index[type: number or Array]
      if (typeof (index) === 'number') {
        this.$dropdown.find('.dropdown-list li').eq(index).find('button').addClass('disabled', true)
      } else {
        index.forEach(val => {
          this.$dropdown.find('.dropdown-list li').eq(val).find('button').addClass('disabled', true)
        })
      }
    }

    clear() {
      this.$button.off()
      this.$dropdown.find('.dropdown-list li button').removeClass('disabled').off()
      this.activeIndex = null
      this.$button = null
    }
  }
})(jQuery)
/** ****************************************************************************************************************** */
