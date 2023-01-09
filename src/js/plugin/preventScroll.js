/** preventScroll.js ****************************************************************************************************** */
;($ => {
  let _plugin = null
  $.extend({
    preventScroll: function (isPrevent) {
      _plugin = _plugin || new PreventScroll()
      _plugin.prevent(isPrevent)

      return _plugin
    }
  })

  class PreventScroll {
    constructor () {
      this.isPrevent = false
    }

    preventEventHandler (e) {
      e.preventDefault()
    }

    prevent (isPrevent) {
      if (this.isPrevent === isPrevent) return
      this.isPrevent = isPrevent

      document.body[(isPrevent ? 'add' : 'remove') + 'EventListener']('wheel', this.preventEventHandler, {passive: false})
      document.body[(isPrevent ? 'add' : 'remove') + 'EventListener']('touchmove', this.preventEventHandler, {passive: false})
      document.body.classList[isPrevent ? 'add' : 'remove']('prevent-scroll')
    }
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
