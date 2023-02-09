/** Transform.js ********************************************************************************************************** */
const PLUGIN_NAME = 'transform'

Object.assign(HTMLElement.prototype, {
  transform (options = {}, callback) {
    /**
     * transform
     * @params	{Object}
     * 				  ex) transform: {transform: 'translate(100px, 100px) scaleX(1) scaleY(1)'}
     * 				  ex) transition: '0s ease 0s'
     *          ex) callback: transition-end
     *
     */

    Object.assign(this.style, options)
    this.addEventListener('transitionend', e => {
      callback()
    })
  }
})
/** ****************************************************************************************************************** */
