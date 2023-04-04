/** components.js ******************************************************************************************************* */
const Components = {}

Components.Header = function () {
  let _this = {}
  return _this
}

Components.Footer = function () {
  let _this = {}
  return _this
}

/** document ready */
window.addEventListener('DOMContentLoaded', e => {
  App.Header = new Components.Header()
  App.Footer = new Components.Footer()

  for (let component in Components) {
    App[component] = Components[component]()
  }
})
/** ***************************************************************************************************************** */
