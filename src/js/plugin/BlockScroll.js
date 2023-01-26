/** BlockScroll.js ****************************************************************************************************** */
let _plugin = null

Object.assign(window, {
  BlockScroll: function (isBlock) {
    _plugin = _plugin || new BlockScroll()

    return _plugin.block(isBlock)
  }
})

class BlockScroll {
  constructor () {
    this.isBlock = false
  }

  block (isBlock = this.isBlock) {
    if (this.isBlock === isBlock) return this.isBlock
    document.body.classList[isBlock ? 'add' : 'remove']('block-scroll')

    return this.isBlock = isBlock
  }
}
/** ***************************************************************************************************************** */
