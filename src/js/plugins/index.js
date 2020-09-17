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
      add($el, pluginName, plugin) {
        if ($el.attr('applied-plugin')) {
          return
        }
        let pluginId = pluginName + pluginIndex
        $el.attr('applied-plugin', pluginId)
        pluginPool[pluginId] = plugin
        pluginIndex++
      },
      remove($el) {
        delete pluginPool[$el.attr('applied-plugin')]
        $el.removeAttr('applied-plugin')
      },
      call($el, method, value) {
        let pluginId = $el.attr('applied-plugin')
        if (!pluginId) {
          return
        }
        pluginPool[pluginId][method](value)
        if (method === 'clear') {
          this.remove($el)
        }
      }
    }
  })

  /** common plugins */
  $.extend({
    blockScroll(isBlock) {
      /**
       * block scroll
       *
       */

      if (isBlock) {
        $('body').addClass('block-scroll')
      } else {
        $('body').removeClass('block-scroll')
      }
    }
  })

  $.fn.extend({
    transform: function (options) {
      /**
       * transform
       * @params	{Object}
       * 				  ex) transform: {transform: 'translate(100px, 100px) scaleX(1) scaleY(1)'}
       * 				  ex) transition: '0s ease 0s'
       * @event		transition-end
       *
       */

      let {transform} = options
      let {transition} = options

      this.css({transform: transform, transition: transition})
        .css({WebkitTransform: transform, WebkitTransition: transition})
        .css({MozTransform: transform, MozTransition: transition})
        .css({msTransform: transform, msTransition: transition})
        .css({OTransform: transform, OTransition: transition})
        .one('transitionend webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd', e => {
          this.triggerHandler({type: 'transition-end'})
        })
      return this
    }
  })

  /** execution */
  $('.js-dropdown').dropdown()
  $('.js-tab').tab()
  $('.js-accordion').accordion()
  $('.js-textarea').textarea()
})(window.jQuery)
/** ***************************************************************************************************************** */
