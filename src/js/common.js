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
  Array.from(document.getElementsByClassName('js-input')).forEach($input => $input.Input())

  App.Header = new Header()
  App.Footer = new Footer()

  for (let component in Components) {
    App[component] = Components[component]()
  }
})
/** ***************************************************************************************************************** */
