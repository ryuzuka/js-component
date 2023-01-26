/** PreventScroll.js ****************************************************************************************************** */
let _plugin = null

Object.assign(window, {
  PreventScroll: function (isPrevent) {
    _plugin = _plugin || new PreventScroll()

    return _plugin.prevent(isPrevent)
  }
})

class PreventScroll {
  constructor () {
    this.isPrevent = false
  }

  prevent (isPrevent = this.isPrevent) {
    if (this.isPrevent === isPrevent) return this.isPrevent
    document.body[(isPrevent ? 'add' : 'remove') + 'EventListener']('wheel', this.preventEventHandler, {passive: false})
    document.body[(isPrevent ? 'add' : 'remove') + 'EventListener']('touchmove', this.preventEventHandler, {passive: false})
    document.body.classList[isPrevent ? 'add' : 'remove']('prevent-scroll')

    return this.isPrevent = isPrevent
  }

  preventEventHandler (e) {
    e.preventDefault()
  }
}
/** ***************************************************************************************************************** */
