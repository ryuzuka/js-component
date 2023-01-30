/** BlockScroll.js ****************************************************************************************************** */
let blockScroll = null
let blockScrollEvent = null

Object.assign(Window.prototype, {
  BlockScroll(method = 'block') {
    if (!method) method = 'scroll'
    blockScroll = blockScroll || new BlockScroll('block-scroll')
    return blockScroll[method]()
  },
  BlockScrollEvent (method = 'block') {
    if (!method) method = 'scroll'
    blockScrollEvent = blockScrollEvent || new BlockScroll('block-scroll-event')
    return blockScrollEvent[method]()
  }
})

class BlockScroll {
  constructor (event) {
    this.eventType = event
    this.isBlock = false
  }

  block () {
    if (this.isBlock) return this.isBlock

    this.isBlock = true
    document.body.classList.add(this.eventType)
    if (this.eventType === 'block-scroll-event') {
      document.body.addEventListener('wheel', this.blockEventHandler, {passive: false})
      document.body.addEventListener('touchmove', this.blockEventHandler, {passive: false})
    }

    return this.isBlock
  }

  scroll () {
    if (!this.isBlock) return this.isBlock

    this.isBlock = false
    document.body.classList.remove(this.eventType)
    if (this.eventType === 'block-scroll-event') {
      document.body.removeEventListener('wheel', this.blockEventHandler)
      document.body.removeEventListener('touchmove', this.blockEventHandler)
    }

    return this.isBlock
  }

  blockEventHandler (e) {
    e.preventDefault()
  }
}
/** ***************************************************************************************************************** */
