/** Accordion.js ********************************************************************************************************** */
let _pluginName = 'Accordion'

Object.assign(window, {
  Accordion: function (element, options = {}, value) {
    if (typeof options === 'string') {
      let el = element.length > 0 ? element[0] : element
      return $plugin.call(el, options, value)

    } else {
      let plugin = null
      for (let el of element.length > 0 ? element : [element]) {
        if (!el.getAttribute('applied-plugin')) {
          $plugin.add(el, plugin = new Accordion(el, options), _pluginName)
        }
      }
      return plugin
    }
  }
})

class Accordion {
  constructor (el, options) {
  }

  active (idx) {
    return window.Accordion
  }

  clear () {

    return window.Accordion
  }
}
/** ****************************************************************************************************************** */
