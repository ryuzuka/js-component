/** Calendar.js ********************************************************************************************************** */
const PLUGIN_NAME = 'calendar'

Object.assign(HTMLElement.prototype, {
  Calendar (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, value)
    } else {
      if (!this.getAttribute('applied-plugin')) {
        window.PLUGIN.add(this, new Calendar(this, options), PLUGIN_NAME)
      }
      return this
    }
  }
})

class Calendar {
  constructor (el, options) {
    this.$calendar = el
    this.$datepicker = el.querySelector('input')

    this.options = Object.assign({
      dateFormat: 'yy-mm-dd',
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      showMonthAfterYear: true,
      yearSuffix: '년',
      onSelect: (date, datepicker) => {
        this.selectedDate = date
        this.$datepicker.setAttribute('value', date)
        this.$calendar.dispatchEvent(new CustomEvent('change', {detail: {date, datepicker}}))
      }
    }, options)
    this.selectedDate = ''
    this.eventHandler = {
    }

    window.jQuery(this.$datepicker).datepicker(this.options)
  }

  show () {
    window.jQuery(this.$datepicker).datepicker('show')
  }

  hide () {
    window.jQuery(this.$datepicker).datepicker('hide')
  }

  get () {
    return this.selectedDate
  }

  set (date) {
    this.selectedDate = window.moment(date).format(window.App.DATE_FORMAT)
    window.jQuery(this.$datepicker).datepicker('setDate', this.selectedDate)
    this.$datepicker.setAttribute('value', this.selectedDate)
  }

  clear () {
    window.jQuery(this.$datepicker).datepicker('destroy')
    this.$datepicker.value = ''
    this.$datepicker.removeAttribute('value')
    this.selectedDate = ''
  }
}
/** ****************************************************************************************************************** */
