/** textarea.js ********************************************************************************************************** */
;($ => {
  let pluginName = 'textarea'

  $.fn.extend({
    textarea: function (options = {}, value) {
      if (typeof options === 'string') {
        $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          $.plugin.add($(el), pluginName, new Textarea($(el), options))
        })
      }
      return this
    }
  })

  class Textarea {
    constructor($this, options) {
      this.$textarea = $this.find('textarea')
      this.$current = $this.find('.current-length')
      this.$total = $this.find('.total-length')

      this.options = options
      this.currentLength = 0
      this.totalLength = 100 // default: 100

      this.init()
      this.setEvent()
    }

    init() {
      this.currentLength = this.$textarea.text().length || 0
      if (this.options.total) {
        this.totalLength = this.options.total
      } else {
        this.totalLength = this.$textarea.attr('maxlength') || 100
      }
      this.$textarea.attr('maxlength', this.totalLength)
      this.setText(this.currentLength, this.totalLength)
    }

    setEvent() {
      let _this = this
      this.keyEvent = e => {
        _this.setText(this.$textarea.val().length, this.totalLength)
      }
      this.$textarea.on('keyup keydown', this.keyEvent)
    }

    setText(current, total) {
      this.$total.text(total)
      this.$current.text(current)
    }

    clear() {
      this.currentLength = 0
      this.totalLength = 100
      this.$textarea.off('keyup keydown', this.keyEvent)
      this.setText(this.currentLength, this.totalLength)
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
