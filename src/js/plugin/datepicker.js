/** datepicker.js ***************************************************************************************************** */
const PLUGIN_NAME = 'datepicker'
const DATE_FORMAT = 'YYYY-MM-DD'

Object.assign(HTMLElement.prototype, {
  datepicker (options = {}, value) {
    if (typeof options === 'string') {
      return PLUGIN.call(this, options, value)
    } else {
      let appliedPlugin = this.getAttribute('applied-plugin')
      if (!appliedPlugin || appliedPlugin.indexOf(PLUGIN_NAME) < 0) {
        PLUGIN.add(this, new Datepicker(this, options), PLUGIN_NAME)
      }
      return this
    }
  }
})

tui.DatePicker.localeTexts['custom'] = {
  titles: {
    MMM: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    MMMM: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    DD: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    D: ['일', '월', '화', '수', '목', '금', '토']
    // MMMM: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // DD: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    // D: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat']
  },
  titleFormat: 'MMMM yyyy',
  todayFormat: 'yyyy년 MMMM d일 DD',
  date: 'Date',
  time: 'Time'
}

export default class Datepicker {
  constructor (el, options) {
    this.$datepicker = el
    this.$input = this.$datepicker.querySelector('input')

    this.options = Object.assign({
      language: 'custom',
      calendar: {
        showToday: false
      },
      input: {
        element: '.js-datepicker input',
        format: 'YYYY-MM-dd'
      },
      showAlways: false,
      autoClose: true,
      openers: []
    }, options)

    this.date = ''
    this.eventHandler = {}

    this.datepicker = new tui.DatePicker('#tui-date-picker-wrapper', this.options)
    this.datepicker.on('change', e => {
      let date = this.datepicker.getDate()
      this.date = {
        formatDate: window.moment(date).format(DATE_FORMAT),
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: (function (day) {
          switch (day) {
            case 0: day = 'Sun'; break;
            case 1: day = 'Mon'; break;
            case 2: day = 'Tue'; break;
            case 3: day = 'Wed'; break;
            case 4: day = 'Thu'; break;
            case 5: day = 'Fir'; break;
            case 6: day = 'Sat'
          }
          return day
        })(date.getDay())}

      this.$datepicker.dispatchEvent(new CustomEvent('change', {detail: this.date}))
    })
    this.datepicker.setDate(new Date())
  }

  show () {
    this.datepicker.open()
  }

  hide () {
    this.datepicker.close()
  }

  enable () {
    this.datepicker.enable()
  }

  disable () {
    this.datepicker.disable()
  }

  get () {
    return this.date
  }

  set (date) {
    this.datepicker.setDate(new Date(window.moment(date).format(DATE_FORMAT)))
  }

  clear () {
    this.datepicker.destroy()
    this.datepicker = null
    this.date = {
      formatDate: '',
      year: '',
      month: '',
      date: '',
      day: ''
    }
    this.$input.value = ''
  }
}
/** ***************************************************************************************************************** */
