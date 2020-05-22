/** plugins ********************************************************************************************************* */
import jQuery from 'jquery'
import 'ixsnack'
import './modal-jquery-ui'
import './modal'
import './loading'
import './calendar'
import './input-text'
import './dropdown'
import './tab'
import './accordion'
;($ => {
  /** ************************************************** */
  // block scroll
  $.extend({
    blockScroll(isBlock) {
      if (isBlock) {
        $('body').addClass('v--modal-block-scroll')
      } else {
        $('body').removeClass('v--modal-block-scroll')
      }
    }
  })

  /** execution */
  // $.modal()
  // $.loading()
  $('input.js-input-text').inputText()
  $('.js-calendar').calendar()
  $('.js-dropdown').dropdown()
  $('.js-accordion').accordion()
  $('.js-tab').tab()
  $('.js-slide').ixSlideMax()
})(jQuery)
/** ***************************************************************************************************************** */
