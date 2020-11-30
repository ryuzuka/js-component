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
    _prevScroll: 0,
    _preventScrollHandler (e) {
      e.preventDefault()
      return false
    },

    // url parameter
    urlParam: function (_name) {
      let results = new RegExp('[?&]' + _name + '=([^&#]*)').exec(window.location.href)
      if (results==null) {
        return null
      } else {
        return results[1] || 0
      }
    },

    // body scroll block
    blockBodyScroll(_isBlock) {
      /**
       * block body scroll
       *
       */

      if (_isBlock) {
        this._prevScroll = window.scrollY || window.pageYOffset
        $('body').attr({
          // 'style': `overflow: hidden; min-height: 100%;` // pc
          'style': `position: fixed; overflow: hidden; min-width: 100%; min-height: 100%; margin-top: ${-1 * this._prevScroll}px;` // mo
        })
      } else {
        $('body').removeAttr('style')
        $('html, body').scrollTop(this._prevScroll)
      }
    },

    // touch & scroll event prevent
    preventScroll: function (_isScroll) {
      if (_isScroll) {
        window.addEventListener('touchmove', this._preventScrollHandler, {passive: false})
        window.addEventListener('wheel', this._preventScrollHandler, {passive: false})
      } else {
        window.removeEventListener('touchmove', this._preventScrollHandler)
        window.removeEventListener('wheel', this._preventScrollHandler)
      }
    }
  })

  $.fn.extend({
    transform: function (_options) {
      /**
       * transform
       * @params	{Object}
       * 				  ex) transform: {transform: 'translate(100px, 100px) scaleX(1) scaleY(1)'}
       * 				  ex) transition: '0s ease 0s'
       * @event		transition-end
       *
       */

      let {transform} = _options
      let {transition} = _options

      this.css({'transform': transform, 'transition': transition})
      this.css({'WebkitTransform': transform, 'WebkitTransition': transition})
      this.css({'MozTransform': transform, 'MozTransition': transition})
      this.css({'msTransform': transform, 'msTransition': transition})
      this.css({'OTransform': transform, 'OTransition': transition})
      this.one('transitionend webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd', e => {
        this.triggerHandler({type: 'transition-end'})
      })

      return this
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
