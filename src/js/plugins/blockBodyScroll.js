/** blockBodyScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null

  $.extend({
    blockBodyScroll: function (isBlock) {
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
      let style = 'overflow: hidden; width: 100%; min-width: 100%; height: 100%; min-height: 100%;'
      if (navigator.userAgent.indexOf('Mobi') > -1) {
        style += `position: fixed; margin-top: ${-1 * this.prevScroll}px;`
      }
      this.$body.attr('style', style)
    }

    scroll () {
      this.$body.removeAttr('style')
      $(window).scrollTop(this.prevScroll)
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
