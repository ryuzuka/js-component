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
		let pluginId = element.getAttribute('applied-plugin')
		if (!pluginId) return element

		let returnValue = pluginPool[pluginId][method](value)
		if (method === 'clear') {
			delete pluginPool[element.getAttribute('applied-plugin')]
			element.removeAttribute('applied-plugin')
		}

		return returnValue !== undefined ? returnValue : element
	}
}
/** ***************************************************************************************************************** */
