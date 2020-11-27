/** swipe.js ********************************************************************************************************** */
;($ => {
  let pluginName = 'swipe'

  $.extend({
    bodySwipe: function (options) {
      $(document).find('body').swipe()
    }
  })

  $.fn.extend({
    swipe: function (_options = {}, _value) {
      if (typeof _options === 'string') {
        $.plugin.call(this, _options, _value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Swipe($(el), _options))
          }
        })
      }
      return this
    }
  })

  class Swipe {
    constructor($this, options) {
      this.target = $this.get(0)

      this.isTouchPad = (/hp-tablet/gi).test(navigator.appVersion)
      this.hasTouch = 'ontouchstart' in window && !this.isTouchPad
      this.DOWN_EV = this.hasTouch ? 'touchstart' : 'mousedown'
      this.MOVE_EV = this.hasTouch ? 'touchmove' : 'mousemove'
      this.UP_EV = this.hasTouch ? 'touchend' : 'mouseup'

      this.check = false
      this.dragDir = 2 // 드래그방향 : 0 - 아래 , 1 - 위
      this.DOWNY = 0
      this.DOWNX = 0
      this.dragDist = 0

      this.init()
    }

    init () {
      let eventHandler = this.eventHandler()
      this.target.addEventListener(this.DOWN_EV, eventHandler.down)
      this.target.addEventListener(this.MOVE_EV, eventHandler.move)
      this.target.addEventListener(this.UP_EV,   eventHandler.up)
    }

    eventHandler () {
      return {
        down: function () {
        },
        move: function () {
        },
        up: function () {
        }
      }
    }
  }
})(window.jQuery)
/** ****************************************************************************************************************** */
