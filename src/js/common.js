/** common.js ******************************************************************************************************** */
;($ => {
  let Header = (depth1Index, depth2Index) => {
    let _this = {}
    return _this
  }

  let Footer = () => {
    let _this = {}
    return _this
  }

  let components = (() => {
    return {}
  })()

  $(function () {
    window.App.Header = Header($.depth1Index, $.depth2Index)
    window.App.Footer = Footer()
    for (let component in components) {
      components[component]()
    }
  })
})(window.jQuery)
/** ***************************************************************************************************************** */
