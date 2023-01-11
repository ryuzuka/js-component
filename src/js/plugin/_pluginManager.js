/** pluginManager *************************************************************************************************** */
let pluginPool = {}
let pluginIndex = 0

window['$plugin'] = {
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
		return _return
	}
}

/** document ready - plugin execution */
window.addEventListener('DOMContentLoaded', e => {
	let test = $tab(document.getElementsByClassName('js-tab'))
	console.log(test)
	debugger
})
/** ***************************************************************************************************************** */
