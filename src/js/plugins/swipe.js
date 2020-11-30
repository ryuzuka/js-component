/** swipe.js ********************************************************************************************************** */
;($ => {
  let pluginName = 'swipe'

  $.extend({
    bodySwipe: function (_options = {}, _value) {
      let $documentBody= $(document).find('body')

      if (typeof _options === 'string') {
        $.plugin.call($documentBody, _options, _value)
      } else {
        _options.direction = _options.direction || 'vertical'
        $documentBody.swipe(_options)
      }
      return this
    }
  })

  $.fn.extend({
    swipe: function (_options = {}, _value) {
      if (typeof _options === 'string') {
        $.plugin.call(this, _options, _value)
      } else {
        this.each((_index, _el) => {
          if (!$(_el).attr('applied-plugin')) {
            _options.direction = _options.direction || 'horizontal'
            $.plugin.add($(_el), pluginName, new Swipe($(_el), _options))
          }
        })
      }
      return this
    }
  })

  class Swipe {
    constructor($this, _options) {
      this.target = $this.get(0)
      this.direction = _options.direction // horizontal, vertical
      this.callback = {
        down: _options.down,
        move: _options.move,
        up: _options.up
      }

      this.isTouchPad = (/hp-tablet/gi).test(navigator.appVersion)
      this.hasTouch = 'ontouchstart' in window && !this.isTouchPad

      this.DOWN_EV = this.hasTouch ? 'touchstart' : 'mousedown'
      this.MOVE_EV = this.hasTouch ? 'touchmove' : 'mousemove'
      this.UP_EV = this.hasTouch ? 'touchend' : 'mouseup'

      this.init()
    }

    init () {
      this.DOWNX = 0
      this.DOWNY = 0
      this.dragDist = 0
      this.dragDir = -1

      this.eventHandler = {
        down: this.eventHandlers().down,
        move: this.eventHandlers().move,
        up: this.eventHandlers().up
      }

      this.on()
    }

    eventHandlers () {
      return {
        down: e => {
          this.target.addEventListener(this.MOVE_EV, this.eventHandler.move)
          this.target.addEventListener(this.UP_EV, this.eventHandler.up)

          this.dragDist = 0
          let point = this.hasTouch ? e.touches[0] : e

          if (this.direction === 'horizontal') {
            this.DOWNX = point.clientX
            this.DOWNY = point.clientY
          } else if (this.direction === 'vertical') {
            this.DOWNX = point.clientY
            this.DOWNY = point.clientX
          }

          if (this.callback.down) {
            this.callback.down()
          }
        },
        move: e => {
          let point = this.hasTouch ? e.touches[0] : e

          if (this.direction === 'horizontal') {
            if (Math.abs(point.clientY - this.DOWNY) < Math.abs(point.clientX - this.DOWNX)) {
              this.dragDist = point.clientX - this.DOWNX
            }
          } else if (this.direction === 'vertical') {
            if (Math.abs(point.clientX - this.DOWNY) < Math.abs(point.clientY - this.DOWNX)) {
              this.dragDist = point.clientY - this.DOWNX
            }
          }

          if (this.callback.move) {
            this.callback.move()
          }
        },
        up: e => {
          this.target.removeEventListener(this.MOVE_EV, this.eventHandler.move)
          this.target.removeEventListener(this.UP_EV, this.eventHandler.up)

          if (Math.abs(this.dragDist) < 80) return false

          if (this.dragDist < 0) {
            this.dragDir = 0
          } else {
            this.dragDir = 1
          }

          if (this.callback.up) {
            this.callback.up(this.dragDir, this.dragDist)
          }
        }
      }
    }

    on () {
      this.target.addEventListener(this.DOWN_EV, this.eventHandler.down)
    }

    off () {
      this.target.removeEventListener(this.DOWN_EV, this.eventHandler.down)
      this.target.removeEventListener(this.MOVE_EV, this.eventHandler.move)
      this.target.removeEventListener(this.UP_EV, this.eventHandler.up)
    }
  }
})(window.jQuery)
/** ****************************************************************************************************************** */
