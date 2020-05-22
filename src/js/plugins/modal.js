/** modal.js ******************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
;(($, _) => {
  let _modalPlugin = {}

  $.fn.extend({
    modal(options = {}, value) {
      const id = this.attr('id')
      if (typeof options === 'string') {
        const method = options
        _modalPlugin[id][method](value)
      } else {
        _modalPlugin[id] = new Modal(this, options)
      }
      return this
    }
  })

  class Modal {
    constructor($this, options) {
      this.$modal = $this
      this.options = options
      this.options.clickToClose = options.clickToClose !== false
      this.options.classes = options.classes || ''

      this.init()
    }

    init() {
      this.$modal.addClass(this.options.classes)
      let $form = this.$modal.find('button, input, select, textarea')
      let $firstForm = null
      setTimeout(() => {
        $form.each((index, el) => {
          if (index === 0) {
            $firstForm = $(el)
            el.focus()
          } else if (index === $form.length - 1) {
            $(el).on('focusout', e => {
              $firstForm.focus()
            })
          }
        })
      }, 1)

      // button
      this.$modal.find('.button-wrap button').on('click', e => {
        let idx = $(e.target).index()
        this.close({buttonIndex: idx})
      })

      // dimmed close
      this.$modal.on('click', e => {
        let $target = $(e.target)
        if ($target.attr('id') === this.$modal.attr('id') && $target.hasClass('layer')) {
          if (!this.options.clickToClose) return
          this.close()
        }
      })

      // close
      this.$modal.on('keydown', e => {
        if (e.keyCode === 27) {
          this.close()
        }
      })
      this.$modal.find('.close').on('click', e => {
        this.close()
      })

      // open
      this.open()
    }

    open() {
      this.$modal.show()
      this.trigger('open', {type: 'open', $modal: this.$modal})
    }

    close(params = {}) {
      params = _.extend(params, {type: 'before-close', $modal: this.$modal})
      this.$modal.trigger('before-close', params).removeClass(this.options.classes).hide().off()
      this.$modal.find('button, input, select, textarea').off()
    }

    trigger(type, params = {}) {
      setTimeout(() => {
        this.$modal.trigger(type, params)
      }, 1)
    }
  }
})(jQuery, lodash)
/** ***************************************************************************************************************** */
