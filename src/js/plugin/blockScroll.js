/** blockScroll.js ************************************************************************************************** */
let _blockScroll = null
let _blockScrollEvent = null

Object.assign(HTMLBodyElement.prototype, {
  blockScroll(isScroll = true) {
    _blockScroll = _blockScroll || new BlockScroll('block-scroll')
    return _blockScroll[isScroll ? 'block' : 'scroll'](this)
  },
  blockScrollEvent (isScroll = true) {
    _blockScrollEvent = _blockScrollEvent || new BlockScroll('block-scroll-event')
    return _blockScrollEvent[isScroll ? 'block' : 'scroll'](this)
  }
})

class BlockScroll {
  constructor (event) {
    this.eventType = event
    this.isBlock = false
  }

  block ($documentBody) {
    if (this.isBlock) return this.isBlock
    this.isBlock = true

    $documentBody.classList.add(this.eventType)
    if (this.eventType === 'block-scroll-event') {
      $documentBody.addEventListener('wheel', this.blockScrollEventHandler, {passive: false})
      $documentBody.addEventListener('touchmove', this.blockScrollEventHandler, {passive: false})
      $documentBody.addEventListener('keydown', this.blockScrollEventHandler)
    }

    return $documentBody
  }

  scroll ($documentBody) {
    if (!this.isBlock) return this.isBlock
    this.isBlock = false

    $documentBody.classList.remove(this.eventType)
    if (this.eventType === 'block-scroll-event') {
      $documentBody.removeEventListener('wheel', this.blockScrollEventHandler, {passive: false})
      $documentBody.removeEventListener('touchmove', this.blockScrollEventHandler, {passive: false})
      $documentBody.removeEventListener('keydown', this.blockScrollEventHandler)
    }

    return $documentBody
  }

  blockScrollEventHandler (e) {
    if (e.type === 'keydown') {
      if (e.keyCode === 37 ||e.keyCode === 38 ||e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault()
      }
    } else {
      e.preventDefault()
    }
  }
}
/** ***************************************************************************************************************** */
