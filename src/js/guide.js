/** guide.js ******************************************************************************************************** */
import jQuery from 'jquery'
import lodash from 'lodash'
;(($, _) => {
  return {
    modal: (() => {
      $('.modalBtn').on('click', e => {
        if (e.target.className.indexOf(' alert') > -1) {
          $('#pop-alert').modal()
          $('#pop-alert').on('open', (e, params) => {
            console.log('open', params)
          })
          $('#pop-alert').on('before-close', (e, params) => {
            console.log('before-close', params)
          })
        } else if (e.target.className.indexOf(' confirm') > -1) {
          $('#pop-confirm').modal()
          $('#pop-confirm').on('open', (e, params) => {
            console.log('open', params)
          })
          $('#pop-confirm').on('before-close', (e, params) => {
            console.log('before-close', params)
          })
        } else if (e.target.className.indexOf(' modal') > -1) {
          $('#pop-modal').modal({clickToClose: false})
          $('#pop-modal').on('open', (e, params) => {
            console.log('open', params)
            params.$modal.find('.modalBtn').on('click', e => {
              $('#pop-modal').modal('close')
              $('#pop-alert').modal()
            })
          })
          $('#pop-modal').on('before-close', (e, params) => {
            console.log('before-close', params)
          })
        } else if (e.target.className.indexOf(' full') > -1) {
          $('#pop-full').modal()
          $('#pop-full').on('open', (e, params) => {
            console.log('open', params)
            params.$modal.find('.modalBtn').on('click', e => {
              $('#pop-alert').modal({classes: 'multi'})
            })
          })
          $('#pop-full').on('before-close', (e, params) => {
            console.log('before-close', params)
          })
        }
      })
    })(),

    loading: (() => {
      $('.loadingBtn').on('click', e => {
        console.log('loading: start')
        $.loading('start')
        setTimeout(() => {
          $.loading('stop', () => {
            console.log('loading: end')
          })
        }, 1000)
      })
    })(),

    ixSlideMax: (() => {
      $('.js-slide').ixSlideMax('clear').ixSlideMax()
      $('.js-slide').on('ixSlideMax:change', e => {
        console.log('ixSlideMax - index:' + e.currentIndex, ' total:' + e.totalLength)
      })
      $(window).on('resize', e => {
        $('.js-slide').ixSlideMax('resize')
      })
    })(),

    dropdown: (() => {
      $('.js-dropdown').dropdown('clear').dropdown().dropdown('active', 1)
      $('.js-dropdown').on('change', (e, index) => {
        console.log('dropdown: ', index)
      })
    })(),

    calendar: (() => {
      $('.js-calendar').calendar('clear').calendar().calendar('setDate', '20200512')
      $('.js-calendar').on('change', (e, date) => {
        console.log('calendar: ', date)
      })
      $('.calendar-apply').on('click', (e, date) => {
        $('.js-calendar').calendar()
      })
      $('.calendar-clear').on('click', (e, date) => {
        $('.js-calendar').calendar('clear')
      })
    })(),

    inputText: (() => {
      $('input.js-input-text').inputText('clear').inputText()
    })(),

    tab: (() => {
      $('.js-tab').tab('clear').tab()
      $('.js-tab').on('active', (e, index) => {
        console.log('tabIndex: ', index)
      })
    })(),

    accordion: (() => {
      let $accordion = $('.js-accordion')
      $accordion.accordion('clear').accordion({
        type: 'single',
        // type: 'multi',
        activeIndex: 1
      })
      $accordion.accordion('active', 0).on('active', (e, index) => {
        console.log('accordionIndex: ', index)
      })
    })()
  }
})(jQuery, lodash)
/** ***************************************************************************************************************** */
