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

    // mobile body swipe (scroll)
    bodySwipex: function (_options) {
      let isTouchPad = (/hp-tablet/gi).test(navigator.appVersion)
      let hasTouch = 'ontouchstart' in window && !isTouchPad
      let DOWN_EV = hasTouch ? 'touchstart' : 'mousedown'
      let MOVE_EV = hasTouch ? 'touchmove' : 'mousemove'
      let UP_EV = hasTouch ? 'touchend' : 'mouseup'

      let target = document.body
      let check = false
      let dragDir = 2 // 드래그방향 : 0 - 아래 , 1 - 위
      let DOWNY = 0
      let DOWNX = 0
      let dragDist = 0

      target.addEventListener(DOWN_EV, mDown)
      target.addEventListener(MOVE_EV, mMove)
      target.addEventListener(UP_EV, mUp)

      function mDown (e) {
        check = true
        dragDist = 0
        let point = hasTouch ? e.touches[0] : e
        DOWNY = point.clientX
        DOWNX = point.clientY
        if (_options.down) {
          _options.down()
        }
      }

      function mMove (e) {
        if(check) {
          let point = hasTouch ? e.touches[0] : e
          if (Math.abs(point.clientX - DOWNY) < Math.abs(point.clientY - DOWNX)) {
            dragDist = point.clientY - DOWNX
          }
          if (_options.move) {
            _options.move()
          }
        }
      }
      function mUp (e) {
        check = false
        if (Math.abs(dragDist) > 50) {
          if (dragDist > 0) {
            dragDir = 0
          } else {
            dragDir = 1
          }
          if (_options.up) {
            _options.up(dragDir) // 0 - 아래, 1 - 위
          }
        } else {
          dragDir = 2
        }
      }

      return {
        on: function () {
          target.addEventListener(DOWN_EV, mDown)
          target.addEventListener(MOVE_EV, mMove)
          target.addEventListener(UP_EV, mUp)
        },
        off: function () { //이벤트 제거
          target.removeEventListener(DOWN_EV, mDown)
          target.removeEventListener(MOVE_EV, mMove)
          target.removeEventListener(UP_EV, mUp)
        }
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
    $('.js-textarea').textarea()
    $('.js-accordion').accordion()

    $.bodySwipe()
  })
})(window.jQuery)
/** ***************************************************************************************************************** */
