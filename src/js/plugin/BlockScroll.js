/** BlockScroll.js ****************************************************************************************************** */
let _plugin = null
let _isBlock = null

Object.assign(window, {
  BlockScroll: function (isBlock) {
    _plugin = _plugin || new BlockScroll()

    return _plugin.block(isBlock)
  }
})

class BlockScroll {
  constructor () {
    _isBlock = false
  }

  block (isBlock = _isBlock) {
    if (_isBlock === isBlock) return _isBlock
    document.body.classList[isBlock ? 'add' : 'remove']('block-body-scroll')

    return _isBlock = isBlock
  }
}
/** ***************************************************************************************************************** */
