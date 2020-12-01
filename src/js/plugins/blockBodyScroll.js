/** blockBodyScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null

  $.extend({
    blockBodyScroll (isBlock) {
      _plugin = _plugin || new BlockBodyScroll()
      let method = isBlock ? 'block' : 'scroll'

      _plugin[method]()
      return _plugin
    }
  })

  class BlockBodyScroll {
    constructor () {
      this.prevScroll = 0
      this.$body = $('body')
    }

    block () {
      this.prevScroll = window.scrollY || window.pageYOffset
      let style = ''
      if (navigator.userAgent.indexOf('Mobi') > -1) {
        style = `position: fixed; overflow: hidden; min-width: 100%; min-height: 100%; margin-top: ${-1 * this.prevScroll}px;`
      } else {
        style = `overflow: hidden; min-height: 100%;`
      }
      this.$body.attr('style', style)
    }

    scroll () {
      this.$body.removeAttr('style')
      $('html, body').scrollTop(this.prevScroll)
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
