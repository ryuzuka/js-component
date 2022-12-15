/** components.js ******************************************************************************************************** */
;(($, _) => {
  let Header = (_depth1Index, _depth2Index) => {
    let _this = {}
    return _this
  }

  let Footer = () => {
    let _this = {}
    return _this
  }

  let components = (() => {
    return {
    }
  })()

  $(function () {
    $.App.Header = Header($.App.depth1Index, $.App.depthI2ndex)
    $.App.Footer = Footer()
    for (let component in components) {
      $.App[component] = components[component]()
    }
  })
})(window.jQuery, window._)
/** ***************************************************************************************************************** */
