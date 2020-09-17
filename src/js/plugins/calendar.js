/** calendar.js ***************************************************************************************************** */
// import './datepicker/datepicker'
;(($, $moment) => {
  let pluginName = 'calendar'

  $.fn.extend({
    calendar: function (options = {}, value) {
      if (typeof options === 'string') {
        $.plugin.call(this, options, value)
      } else {
        this.each((index, el) => {
          if (!$(el).attr('applied-plugin')) {
            $.plugin.add($(el), pluginName, new Calendar($(el), options))
          }
        })
      }
      return this
    }
  })

  class Calendar {
    constructor($this, options) {
      this.$calendar = $this

      this.options = options
      this.selectedDate = $moment(new Date()).format(window.App.DATE_FORMAT)

      this.init()
    }

    init() {
      let _this = this
      this.$calendar.addClass('applied-plugin').datepicker({
        dateFormat: 'yymmdd',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',
        // showOn: 'button',
        // buttonText: '<span class="blind">달력</span>',
        onSelect(date) {
          _this.selectedDate = date
          _this.selectTrigger(date)
        }
      })
    }

    selectTrigger(date) {
      function getDateText(dateValue) {
        let arrDate = []
        arrDate[0] = dateValue.slice(0, 4)
        arrDate[1] = dateValue.slice(4, 6)
        arrDate[2] = dateValue.slice(6, 8)

        let text = arrDate.map((val, idx) => {
          if (idx === 0) {
            return val + '년'
          } else if (idx === 1) {
            return val + '월'
          } else if (idx === 2) {
            return val + '일'
          }
        })
        return text
      }

      setTimeout(() => {
        this.$calendar.triggerHandler({
          type: 'change',
          value: date,
          text: getDateText(date).join(' ')
        })
      }, 1)
    }

    setDate(date) {
      this.selectedDate = date
      this.$calendar.datepicker('setDate', date)
      this.selectTrigger(this.selectedDate)
    }

    clear() {
      this.$calendar.datepicker('destroy').val('')
      this.$calendar = null
      this.selectedDate = ''
    }
  }
})(window.jQuery, window.moment)
/** ***************************************************************************************************************** */
