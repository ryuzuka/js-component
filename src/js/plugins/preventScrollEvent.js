/** preventScrollEvent.js ****************************************************************************************************** */
;($ => {
  let _plugin = null

  $.extend({
    preventScrollEvent: function (isPrevent) {
      _plugin = _plugin || new preventScrollEvent()

      let method = isPrevent ? 'add' : 'remove'
      _plugin[method]()

      return _plugin
    }
  })

  class preventScrollEvent {
    constructor () {
      if (navigator.userAgent.indexOf('Mobi') > -1) {
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
