/** common.js ******************************************************************************************************* */
const Header = function () {
  let _this = {}
  return _this
}

const Footer = function () {
  let _this = {}
  return _this
}

const Components = {}

/** document ready */
window.addEventListener('DOMContentLoaded', e => {
  App.Header = new Header()
  App.Footer = new Footer()

  for (let component in Components) {
    App[component] = Components[component]()
  }
})
/** ***************************************************************************************************************** */
