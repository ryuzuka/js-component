/** BlockScroll.js ****************************************************************************************************** */
let _windowPlugin = null
let _bodyPlugin = null

Object.assign(window, {
  BlockScroll: function (isBlock) {
    _windowPlugin = _windowPlugin || new BlockScroll(this)

    return _windowPlugin.block(isBlock)
  }
})

Object.assign(document.body, {
  BlockScroll: function (isBlock) {
    _bodyPlugin = _bodyPlugin || new BlockScroll(this)

    return _bodyPlugin.block(isBlock)
  }
})

class BlockScroll {
  constructor ($target) {
    this.$target = $target
    this.isBlock = false
  }

  block (isBlock = this.isBlock) {
    if (isBlock === this.isBlock) return this.isBlock

    if (this.$target === document.body) {
      this.$target.classList[isBlock ? 'add' : 'remove']('block-scroll')

    } else if (this.$target === window) {
      this.$target[(isBlock ? 'add' : 'remove') + 'EventListener']('wheel', this.blockEventHandler, {passive: false})
      this.$target[(isBlock ? 'add' : 'remove') + 'EventListener']('touchmove', this.blockEventHandler, {passive: false})
      document.body.classList[isBlock ? 'add' : 'remove']('block-scroll-event')
    }

    return this.isBlock = isBlock
  }

  blockEventHandler (e) {
    e.preventDefault()
  }
}
/** ***************************************************************************************************************** */
