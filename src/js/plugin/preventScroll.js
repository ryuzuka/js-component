/** preventScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null
  $.extend({
    preventScroll: function (isPrevent) {
      _plugin = _plugin || new PreventScroll()
      _plugin[isPrevent ? 'add' : 'remove']()

      return _plugin
    }
  })

  class PreventScroll {
    constructor () {
      this.scrollEvent = $.utils.isMobile() ? 'touchmove' : 'wheel'
    }

    preventScrollEventHandler (e) {
      e.preventDefault()
      return false
    }

    add () {
      window.addEventListener(this.scrollEvent, this.preventScrollEventHandler, {passive: false})
      $('body').addClass('prevent-scroll')
    }

    remove () {
      window.removeEventListener(this.scrollEvent, this.preventScrollEventHandler)
      $('body').removeClass('prevent-scroll')
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
