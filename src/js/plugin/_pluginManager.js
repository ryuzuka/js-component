/** pluginManager *************************************************************************************************** */
let pluginPool = {}
let pluginIndex = 0

window.PLUGIN = {
	add (element, plugin, pluginName) {
    let pluginId = pluginName + pluginIndex
		element.setAttribute('applied-plugin', pluginId)
    pluginPool[pluginId] = plugin
    pluginIndex++
	},
	call (element, method, value) {
		let pluginId = element.getAttribute('applied-plugin')
		if (!pluginId) {
			return
		}

		let _return = pluginPool[pluginId][method](value)
		if (method === 'clear') {
			element.removeAttribute('applied-plugin')
			delete pluginPool[element.getAttribute('applied-plugin')]
		}
		return _return ? _return : element
	}
}

/** document ready - plugin execution */
window.addEventListener('DOMContentLoaded', e => {
	document.getElementsByClassName('js-tab').Tab()
	document.getElementsByClassName('js-accordion').Accordion()
	document.getElementsByClassName('js-dropdown').Dropdown()
	document.getElementsByClassName('js-textarea').Textarea()
})
/** ***************************************************************************************************************** */
