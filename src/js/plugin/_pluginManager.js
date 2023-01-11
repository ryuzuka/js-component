/** pluginManager *************************************************************************************************** */
let pluginPool = {}
let pluginIndex = 0

window.$plugin = {
	add (element, plugin, pluginName) {
		console.log('plugin add')
      let pluginId = pluginName + pluginIndex
			element.setAttribute('applied-plugin', pluginId)
      pluginPool[pluginId] = plugin
      pluginIndex++
	},
  remove (element) {
    delete pluginPool[element.getAttribute('applied-plugin')]
	  element.removeAttribute('applied-plugin')
  },
	call (element, method, value) {
		let pluginId = element.getAttribute('applied-plugin')
		if (!pluginId) {
			return
		}
		if (method === 'clear') this.remove(element)
		return pluginPool[pluginId][method](value)
	}
}
/** ***************************************************************************************************************** */
