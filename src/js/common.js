/** common.js ******************************************************************************************************** */
const Header = () => {
  let _this = {}
  return _this
}

const Footer = () => {
  let _this = {}
  return _this
}

const Components = {}

/** document ready */
window.addEventListener('DOMContentLoaded', e => {
  // plugin execution
  Array.from(document.getElementsByClassName('js-accordion')).forEach($Accordion => $Accordion.Accordion())
  Array.from(document.getElementsByClassName('js-dropdown')).forEach($dropdown => $dropdown.Dropdown())
  Array.from(document.getElementsByClassName('js-tab')).forEach($tab => $tab.Tab())
  Array.from(document.getElementsByClassName('js-textarea')).forEach($textarea => $textarea.Textarea())

  window.App.Header = new Header()
  window.App.Footer = new Footer()

  for (let component in Components) {
    window.App[component] = Components[component]()
  }
})
/** ***************************************************************************************************************** */
