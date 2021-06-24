/** common.js ******************************************************************************************************** */
;($ => {
  let pluginPool = {}
  let pluginIndex = 0

  $.extend({
    /** common */
    common: {
      isMobile: function () {
        let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
        if (!isMobile && navigator.userAgent.indexOf('Safari') > -1) {
          if (navigator.maxTouchPoints > 0) {
            isMobile = true
          }
        }
        return isMobile
      },

      /**
       * url parameter
       *
       */
      urlParam: function (_name) {
        let results = new RegExp('[?&]' + _name + '=([^&#]*)').exec(window.location.href)
        if (results==null) {
          return null
        } else {
          return results[1] || 0
        }
      },

      /**
       * ex) 00-000-0000, 000-0000-0000
       * @param   {String}    number
       * @returns {String}
       */
      telNumberFormat: function (number) {
        return number
          .replace(/[^0-9]/g, '')
          .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, '$1-$2-$3')
          .replace('--', '-')
      },

      /**
       * set localStorage
       * @param {String}    key
       * @param {*}         value
       * @param {Number}    expireMinutes     30 sec = 0.5
       */
      setLocalStorage: function (key, value, expireMinutes) {
        let json = false

        if (expireMinutes) {
          let today = new Date()
          today.setSeconds(today.getSeconds() + expireMinutes * 60)
          expireMinutes = today.getTime()
        }

        if (typeof value === 'object') {
          value = JSON.stringify(value)
          json = true
        }

        localStorage.setItem(
          key,
          JSON.stringify({
            expires: expireMinutes || -1,
            origin: value,
            json: json
          })
        )
      },

      /**
       * get localStorage
       * @param {String}    key
       * @return  {*}
       */
      getLocalStorage: function (key) {
        let value = localStorage.getItem(key)
        let now = new Date().getTime()

        if (value) {
          value = JSON.parse(value)

          if (value.expires === -1 || value.expires >= now) {
            if (value.json) {
              value = JSON.parse(value.origin)
            } else {
              value = value.origin
            }
          } else {
            this.clearLocalStorage(key)
            value = undefined
          }
        } else {
          value = undefined
        }

        return value
      },

      /**
       * LocalStorage Item clear
       * @param    {String}    key
       */
      clearLocalStorage: function (key) {
        localStorage.removeItem(key)
      },

      /**
       * set SessionStorage
       * @param {String}    key
       * @param {*}         value
       * @param {Number}    expireMinutes     30 sec = 0.5
       */
      setSessionStorage: function (key, value, expireMinutes) {
        let json = false

        if (expireMinutes) {
          let today = new Date()
          today.setSeconds(today.getSeconds() + expireMinutes * 60)
          expireMinutes = today.getTime()
        }

        if (typeof value === 'object') {
          value = JSON.stringify(value)
          json = true
        }

        sessionStorage.setItem(
          key,
          JSON.stringify({
            expires: expireMinutes || -1,
            origin: value,
            json: json
          })
        )
      },

      /**
       * get SessionStorage
       * @param {String}    key
       * @return  {*}
       */
      getSessionStorage: function (key) {
        let value = sessionStorage.getItem(key)
        let now = new Date().getTime()

        if (value) {
          value = JSON.parse(value)

          if (value.expires === -1 || value.expires >= now) {
            if (value.json) {
              value = JSON.parse(value.origin)
            } else {
              value = value.origin
            }
          } else {
            this.clearSessionStorage(key)
            value = undefined
          }
        } else {
          value = undefined
        }

        return value
      },

      /**
       * SessionStorage Item clear
       * @param    {String}    key
       */
      clearSessionStorage: function (key) {
        sessionStorage.removeItem(key)
      },

      /**
       * 가로모드 인지 체크하여 반환
       * @returns {Boolean}
       */
      isLandscape: function () {
        return window.innerWidth > window.innerHeight
      }
    },

    /** plugin manager */
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
    },

    /** easing */
    ease: {
      Quad: {
        easeIn: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
        easeOut: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        easeInOut: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'
      },
      Cubic: {
        easeIn: 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
        easeOut: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      },
      Quart: {
        easeIn: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
        easeOut: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
        easeInOut: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
      },
      Quint: {
        easeIn: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
        easeOut: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
        easeInOut: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)'
      },
      Sine: {
        easeIn: 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
        easeOut: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
        easeInOut: 'cubic-bezier(0.445, 0.050, 0.550, 0.950)'
      },
      Expo: {
        easeIn: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
        easeOut: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
        easeInOut: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)'
      },
      Circ: {
        easeIn: 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
        easeOut: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
        easeInOut: 'cubic-bezier(0.785, 0.135, 0.150, 0.860)'
      },
      Back: {
        easeIn: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
        easeOut: 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
        easeInOut: 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
      }
    }
  })

  /** jquery plugins execution */
  $(() => {
    $('.js-accordion').accordion()
    $('.js-dropdown').dropdown()
    $('.js-tab').tab()
  })
})(window.jQuery)
/** ****************************************************************************************************************** */
