/** common.js ******************************************************************************************************** */
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

/** document ready */
window.addEventListener('DOMContentLoaded', e => {
  window.$Header = Header(App.depth1Index, App.depth2Index)
  window.$Footer = Footer()
  for (let component in components) {
    window.$[component] = components[component]()
  }
})
/** ***************************************************************************************************************** */
