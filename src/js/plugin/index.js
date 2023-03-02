/** pluginManager *************************************************************************************************** */
let pluginPool = {}
let pluginIndex = 0

window.PLUGIN = {
	add (element, plugin, pluginName) {
    let pluginId = pluginName + pluginIndex
		element.setAttribute('applied-plugin', pluginId)
    pluginPool[pluginId] = plugin
    pluginIndex++

		return plugin
	},
	call (element, method, value) {
		if (method === 'clear') return this.remove(element, method, value)

		let pluginId = element.getAttribute('applied-plugin')
		if (!pluginId) return element

		return pluginPool[pluginId][method](value) || element
	},
	remove (element, method, value) {
		let pluginId = element.getAttribute('applied-plugin')
		if (!pluginId) return element

		pluginPool[pluginId]['clear'](value)
		delete pluginPool[element.getAttribute('applied-plugin')]
		element.removeAttribute('applied-plugin')

		return element
	}
}

/** document ready */
window.addEventListener('DOMContentLoaded', e => {
	// plugin execution
	Array.from(document.getElementsByClassName('js-accordion')).forEach($Accordion => $Accordion.accordion())
	Array.from(document.getElementsByClassName('js-dropdown')).forEach($dropdown => $dropdown.dropdown())
	Array.from(document.getElementsByClassName('js-tab')).forEach($tab => $tab.tab())
	Array.from(document.getElementsByClassName('js-textarea')).forEach($textarea => $textarea.textarea())
	Array.from(document.getElementsByClassName('js-input')).forEach($input => $input.input())
})
/** ***************************************************************************************************************** */
