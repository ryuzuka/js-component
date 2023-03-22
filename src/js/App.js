/** App.js ******************************************************************************************************** */
window.App = Object.assign(window.App || {}, {
  DEVICE: window.navigator.userAgent,
  MOBILE_WIDTH: 1024,
  DATE_FORMAT: 'YYYY-MM-DD',
  TIME_FORMAT: 'HH:mm:ss'
})

// before unload
// window.onbeforeunload = () => window.scrollTo(0, 0)

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
/** ***************************************************************************************************************** */
