/** Postcode.js ********************************************************************************************************** */
const PLUGIN_NAME = 'postcode'

Object.assign(HTMLElement.prototype, {
  Postcode (options = {}, value) {
    if (typeof options === 'string') {
      return window.PLUGIN.call(this, options, value)
    } else {
      if (!this.getAttribute('applied-plugin')) {
        window.PLUGIN.add(this, new Postcode(this, options), PLUGIN_NAME)
      }
      return this
    }
  }
})

class Postcode {
  constructor (el, options) {
    this.$postcode = el
    this.$address = el.querySelector('.address input')
    this.$detail = el.querySelector('.detail input')
    this.$searchBtn = el.querySelector('.btn.btn-search')

    this.options = Object.assign({
      width: 400,
      height: 500
    }, options)
    this.postcode = null

    this.eventHandler = {
      search: e => {
        this.open()
      }
    }

    let _this = this

    this.postcode = new daum.Postcode({
      oncomplete (data) {
        let address = ''
        if (data['userSelectedType'] === 'R') {
          address = data['roadAddress']
          address += data['buildingName'] ? ` (${data['buildingName']})` : ''
          // 도로명
        } else if (data['userSelectedType'] === 'J') {
          address = data['jibunAddress']
          // 지명
        }
        _this.$address.value = address
        _this.$address.setAttribute('value', address)
      },
      onclose (state) {
        if (state === 'COMPLETE_CLOSE') {
          _this.$detail.focus()
          _this.$postcode.dispatchEvent(new CustomEvent('complete-close', {detail: {address: _this.$address.value}}))
        } else if (state === 'FORCE_CLOSE') {
          _this.$postcode.dispatchEvent(new Event('force-close'))
        }
      },
      width: _this.options.width,
      height: _this.options.height
    })

    this.$searchBtn.addEventListener('click', this.eventHandler.search)
  }

  open () {
    this.postcode.open({
      left: (window.screen.width - this.options.width) / 2,
      top: (window.screen.height - this.options.height) / 2
    })
  }

  clear () {
  }
}
/** ****************************************************************************************************************** */
