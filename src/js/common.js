/** common.js ******************************************************************************************************** */
;($ => {
  let Header = () => {
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
    window.App.Header = Header()
    window.App.Footer = Footer()
    for (let component in components) {
      components[component]()
    }
  })
})(window.jQuery)
/** ***************************************************************************************************************** */
