/** preventScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null
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
      let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
      if (!isMobile && navigator.userAgent.indexOf('Safari') > -1) {
        if (navigator.maxTouchPoints > 0) {
          isMobile = true
        }
      }

      if (isMobile) {
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
