/** index.js ******************************************************************************************************** */
;($ => {
  const App = {
    DATE_FORMAT: 'YYYYMMDD',
    DEVICE: navigator.userAgent
  }
  window.App = $.extend(window.App || {}, App)

  // pinch zoom prevent
  document.addEventListener('touchmove', e => {
    if (e.scale !== 1 && e.scale !== undefined) {
      e.preventDefault()
    }
  }, {passive: false})

  // double tab prevent
  let lastTouchEnd = 0
  document.documentElement.addEventListener('touchend', e => {
    let now = new Date().getTime()
    if (now - lastTouchEnd <= 200) {
      e.preventDefault()
    }
    lastTouchEnd = now
  }, {passive: false})

  // before unload
  // window.onbeforeunload = () => window.scrollTo(0, 0)

  /** jquery plugins execution */
  $(function () {
    $('.js-accordion').accordion()
    $('.js-dropdown').dropdown()
    $('.js-tab').tab()
  })
})(window.jQuery)
/** ***************************************************************************************************************** */
