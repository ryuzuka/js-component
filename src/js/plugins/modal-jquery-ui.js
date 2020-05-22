/** modal.js ******************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
import 'jquery-ui/ui/widgets/dialog'
;(($, _) => {
  let _dialogPlugin = null
  let _modalPlugin = null

  $.extend({
    jQueryUiDialog(options = {}, callback) {
      let $dialog = $('<div id="dialog" style="display: none"></div>')
      if (typeof options === 'string') {
        const method = options
        const value = callback
        _dialogPlugin[method](value)
      } else {
        if (_dialogPlugin) return
        $('body').append($dialog)
        options.type = 'dialog'
        _dialogPlugin = new Modal($dialog, options, callback)
      }
      return $dialog
    }
  })

  $.fn.extend({
    jQueryUiModal(options = {}, callback) {
      if (typeof options === 'string') {
        const method = options
        const value = callback
        _modalPlugin[method](value)
      } else {
        if (_modalPlugin) return
        options.type = 'modal'
        _modalPlugin = new Modal(this, options, callback)
      }
      return this
    }
  })

  class Modal {
    constructor($this, options, callback = () => {}) {
      this.$modal = $this
      this.$modalContainer = null
      this.$dimmed = null
      this.options = options
      this.callback = callback

      this.init()
    }

    init() {
      this.$modal.dialog(this.setOptions(this.options))
    }

    setOptions(opts) {
      let _this = this
      this.options = {
        type: opts.type,
        modal: opts.size !== 'full', // overlay
        title: opts.title || '',
        size: opts.size || '',
        classes: {'ui-dialog': opts.classes || ''},
        buttons: opts.buttons || [],
        html: opts.html || '',
        width: opts.width || (opts.size === 'full' ? '100%' : '88.88%'),
        height: opts.height || 'auto',
        clickToClose: opts.clickToClose || false
      }
      _.extend(this.options, {
        open: () => {
          _this.open()
          _this.callback('open', _this.$modal)
        },
        close: () => {
          _this.callback('before-close', _this.$modal)
          _this.close()
        }
      })
      return this.options
    }

    open() {
      $.blockScroll(true)
      this.$modal.scrollTop(0)

      this.$modalContainer = this.$modal.closest('.ui-dialog')
      this.$dimmed = this.$modalContainer.siblings('.ui-front')

      // title
      if (this.options.title) {
        this.$modal.siblings('.ui-dialog-titlebar').show()
      } else {
        this.$modal.siblings('.ui-dialog-titlebar').hide()
      }

      // dialog || modal
      if (this.options.type === 'dialog') {
        this.$modalContainer.addClass('dialog')
        this.$modal.html('').html(this.options.html)
      } else if (this.options.type === 'modal') {
        if (this.options.size === 'full') {
          this.$modalContainer.addClass('full').css({
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          })
        }
      }

      // dimmed click close
      if (this.options.clickToClose) {
        this.$dimmed.on('click', e => {
          if (e.target.className.indexOf('ui-front') > 0) {
            this.close()
          }
        })
      }

      // resize - center position
      this.centerPosition()
      $(window).on('resize', e => {
        this.centerPosition()
      })
    }

    close() {
      $(window).off('resize')
      if (this.$dimmed) {
        this.$dimmed.off()
      }
      this.$modal.dialog('destroy')
      if (this.options.type === 'dialog') {
        this.$modal.remove()
      }
      if (this.options.type === 'dialog') {
        _dialogPlugin = null
      } else {
        _modalPlugin = null
      }
      if (!_dialogPlugin && !_modalPlugin) {
        $.blockScroll(false)
      }
    }

    centerPosition() {
      if (this.options.size === 'full') return

      const winW = $(window).width()
      const winH = window.innerHeight
      const modalW = this.$modalContainer.outerWidth()
      const modalH = this.$modalContainer.outerHeight()
      const left = (winW - modalW) / 2
      const top = (winH - modalH) / 2

      this.$modalContainer.css({left: left, top: top + $(window).scrollTop()})
    }
  }
})(jQuery, lodash)
/** ***************************************************************************************************************** */
