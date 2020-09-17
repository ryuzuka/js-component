/** app.js ******************************************************************************************************** */
;($ => {
  const App = {
    DATE_FORMAT: 'YYYYMMDD'
  }
  window.App = $.extend(window.App || {}, App)

  document.addEventListener('touchmove', e => {
    if (e.scale !== 1 && e.scale !== undefined) {
      e.preventDefault()
    }
  }, {passive: false})

  // double tab prevent
  let lastTouchEnd = 0
  document.documentElement.addEventListener('touchend', e => {
    const now = new Date().getTime()
    if (now - lastTouchEnd <= 200) {
      e.preventDefault()
    }
    lastTouchEnd = now
  }, {passive: false})
})(window.jQuery)
/** ***************************************************************************************************************** */
