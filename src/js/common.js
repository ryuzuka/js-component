/** common.js ******************************************************************************************************** */
let Header = (_depth1Index, _depth2Index) => {
  let _this = {}
  return _this
}

let Footer = () => {
  let _this = {}
  return _this
}

let components = {}

/** document ready */
window.addEventListener('DOMContentLoaded', e => {
  window.APP.Header = Header(APP.depth1Index, APP.depth2Index)
  window.APP.Footer = Footer()
  for (let component in components) {
    window['$' + component] = components[component]()
  }
})
/** ***************************************************************************************************************** */
