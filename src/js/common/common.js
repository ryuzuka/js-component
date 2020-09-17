/** common.js ******************************************************************************************************** */
;($ => {
  let Common = {
    Common: {
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
    }
  }

  window.App = $.extend(window.App || {}, Common)
})(window.jQuery)
/** ****************************************************************************************************************** */
