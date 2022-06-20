/** increaseNumber.js ********************************************************************************************************** */
;($ => {
  $.extend({
    increaseNumber: function ($target, options = {}) {
      /**
       * transform
       * @params	{Object}
       * 				  ex) start: Number
       * 				  ex) end: Number
       * @event		transition-end
       *
       */

      $({num: Number(options.start) }).animate({num: Number(options.end)}, {
        step: function() {
          let num = numberWithCommas(Math.floor(this.num))
          writeNumber($target, num)
        },
        duration: 500,
        complete: function() {
          let num = numberWithCommas(Math.floor(this.num))
          writeNumber($target, num)
        }
      })

      function writeNumber ($target, num) {
        if ($target[0].tagName === 'INPUT') {
          $target.val(num)
        } else {
          $target.text(num)
        }
      }

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }
  })
})(window.jQuery)
/** ****************************************************************************************************************** */
