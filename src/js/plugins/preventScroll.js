/** preventScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null
  console.log($.common.isMobile())
  $.extend({
    preventScroll: function (isPrevent) {
      _plugin = _plugin || new PreventScroll()

      let method = isPrevent ? 'add' : 'remove'
      _plugin[method]()

      return _plugin
    }
  })

  class PreventScroll {
    constructor () {
      if ($.common.isMobile()) {
        this.scrollEvent = 'touchmove'
      } else {
        this.scrollEvent = 'wheel'
      }
    }

    preventScrollEventHandler (e) {
      e.preventDefault()
      return false
    }

    add () {
      window.addEventListener(this.scrollEvent, this.preventScrollEventHandler, {passive: false})
    }

    remove () {
      window.removeEventListener(this.scrollEvent, this.preventScrollEventHandler)
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
