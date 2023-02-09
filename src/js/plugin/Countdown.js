/** Tab.js ********************************************************************************************************** */
const PLUGIN_NAME = 'countdown'
const TIME_FORMAT = 'mm:ss'

Object.assign(HTMLElement.prototype, {
  Countdown (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, value)
    } else {
      if (!this.getAttribute('applied-plugin')) {
        window.PLUGIN.add(this, new Countdown(this, options), PLUGIN_NAME)
      }
      return this
    }
  }
})

class Countdown {
  constructor (el, options) {
    this.$countdown = el
    this.$count = el.querySelector('.time')

    this.options = Object.assign({
      format: TIME_FORMAT,
      count: 60
    }, options)

    this.eventHandler = {}

    let minute = String(parseInt(this.options.count / 60)).padStart(2, '0')
    let seconds = String(parseInt(this.options.count % 60)).padStart(2, '0')

    this.interval = null
    this.time = window.moment(minute + ':' + seconds,  TIME_FORMAT)
    this.count = this.options.count || 0

    this.write()
  }

  write () {
    this.$count.innerText = this.time.format(this.options.format)
  }

  start () {
    if (this.interval) return

    this.interval = setInterval(() => {
      this.time.subtract(1, 'seconds').format(this.options.format)
        this.count--
      if (this.count < 0) {
        this.stop()
        this.$countdown.dispatchEvent(new Event('complete'))
      } else {
        this.write()
      }
    }, 1000)
  }

  stop () {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
      this.count = this.options.count
    }
  }

  clear () {
    this.stop()
    this.time = window.moment(0, TIME_FORMAT)
    this.write()
  }
}
/** ****************************************************************************************************************** */
