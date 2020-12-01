/** plugins ********************************************************************************************************* */
;($ => {
  /** ************************************************** */
  let pluginPool = {}
  let pluginIndex = 0

  $.extend({
    /**
     * plugin manager
     *
     */
    plugin: {
      add($el, _pluginName, _plugin) {
        if ($el.attr('applied-plugin')) {
          return
        }
        let pluginId = _pluginName + pluginIndex
        $el.attr('applied-plugin', pluginId)
        pluginPool[pluginId] = _plugin
        pluginIndex++
      },
      remove($el) {
        delete pluginPool[$el.attr('applied-plugin')]
        $el.removeAttr('applied-plugin')
      },
      call($el, _method, _value) {
        let pluginId = $el.attr('applied-plugin')
        if (!pluginId) {
          return
        }
        pluginPool[pluginId][_method](_value)
        if (_method === 'clear') {
          this.remove($el)
        }
      }
    }
  })

  /** common plugins */
  $.extend({
    // url parameter
    urlParam: function (_name) {
      let results = new RegExp('[?&]' + _name + '=([^&#]*)').exec(window.location.href)
      if (results==null) {
        return null
      } else {
        return results[1] || 0
      }
    }
  })



  /** execution */
  $(() => {
    $('.js-tab').tab()
    $('.js-dropdown').dropdown()
    $('.js-accordion').accordion()

  })
})(window.jQuery)
/** ***************************************************************************************************************** */
