/** guide.js ******************************************************************************************************** */
;(($, App) => {
  return {
    modal: (() => {
      $('.modalBtn').on('click', event => {
        /**
         * closedFocus: 접근성 준수
         ** */

        if (event.target.className.indexOf(' alert') > -1) {
          $('#pop-alert').modal({classes: 'add class test', closedFocus: '.modalBtn.alert'}, e => {
            console.log(e)
          })
        } else if (event.target.className.indexOf(' confirm') > -1) {
          $('#pop-confirm').modal({classes: 'add class test', closedFocus: '.modalBtn.confirm'}, e => {
            console.log(e)
          })
        } else if (event.target.className.indexOf(' modal') > -1) {
          $('#pop-modal').modal({clickToClose: false, closedFocus: '.modalBtn.modal'}, e => {
            console.log(e)
            if (e.type === 'open') {
              e.$modal.find('.modalBtn').on('click', e => {
                // $('#pop-modal').modal('close')
                // $('#pop-alert').modal({closedFocus: '.modalBtn.modal'})
                $('#pop-alert').modal({classes: 'multi', dimmed: false, closedFocus: '#pop-modal .modalBtn'})
              })
            }
          })
        } else if (event.target.className.indexOf(' full') > -1) {
          $('#pop-full').modal({clickToClose: false, closedFocus: '.modalBtn.full'}, e => {
            console.log(e)
            if (e.type === 'open') {
              e.$modal.find('.modalBtn').on('click', e => {
                console.log(e)
                $('#pop-alert').modal({classes: 'multi', closedFocus: '#pop-full .modalBtn'}) // multi: dimmed 삭제 class
              })
            }
          })
        }
      })
    })(),

    loading: (() => {
      $('.loadingBtn').on('click', e => {
        console.log('loading: start')
        $.loading('start')
        setTimeout(() => {
          console.log('loading: end')
          $.loading('stop')
        }, 1000)
      })
    })(),

    dropdown: (() => {
      let $dropdown = $('.js-dropdown')
      $dropdown.dropdown('clear').dropdown({
        activeIndex: 0, // default: -1
        disableIndex: 0
      })
      $dropdown.dropdown('active', 2)
      $dropdown.dropdown('disable', [0, 1])
      $dropdown.on('change', e => {
        console.log('dropdown, type: ' + e.type + ', activeIndex: ' + e.activeIndex)
      })

      $('.dropdown-apply').on('click', e => {
        $('.js-dropdown').dropdown()
      })
      $('.dropdown-clear').on('click', e => {
        $('.js-dropdown').dropdown('clear')
      })
    })(),

    tab: (() => {
      let $tab = $('.js-tab')
      $tab.tab('clear').tab({
        activeIndex: 1 // default: 0
      })
      $tab.tab('active', 1).on('change', e => {
        console.log('tab, type: ' + e.type + ', activeIndex: ' + e.activeIndex)
      })
    })(),

    accordion: (() => {
      let $accordion = $('.js-accordion')
      $accordion.accordion('clear').accordion({
        type: 'multi', // type: single(default), multi
        activeIndex: 2 // default: -1
      })
      $accordion.accordion('active', 0).on('open', e => {
        console.log('accordion, type: ' + e.type + ', activeIndex: ' + e.activeIndex)
      })
    })(),

    paging: (() => {
      let $paging = $('.js-paging')
      $paging.paging('clear').paging({
        offset: 0, // 현재 페이지 (default: 0)
        limit: 10, // 화면에 보여지는 리스트 갯수
        total: 232 // 전체 리스트 갯수
        // pagingLength: 10 // 화면에 보여지는 paging 갯수 (default: 10)
      })
      $paging.paging('set', 0).on('change', e => {
        console.log('paging, type: ' + e.type + ', offset: ' + e.offset + ', total: ' + e.total)
      })
    })(),

    swiper: (() => {
      let swiper = new Swiper('.swiper-container', {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        speed: 300,
        loop: true,
        on: {
          init() {
            console.log('swiper-init', this.realIndex)
          },
          transitionEnd() {
            console.log('swiper-end', this.realIndex)
          },
          slideChange() {
            console.log('swiper-change', this.realIndex)
          },
          resize() {
            console.log('swiper-resize')
          }
        }
      })
    })(),

    countdown: (() => {
      // let $countdown = $('.js-countdown')
      // $countdown.countdown('clear').countdown({
      //   format: 'HH:mm:ss', // default: mm:ss
      //   start: 160 // default: 60
      // })
      // $countdown.countdown('start').on('complete', e => {
      //   console.log('countdown - complete')
      // })
      //
      // $('.countdown-start').on('click', e => {
      //   $('.js-countdown').countdown('start')
      // })
      // $('.countdown-stop').on('click', e => {
      //   $('.js-countdown').countdown('stop')
      // })
      // $('.countdown-apply').on('click', e => {
      //   $('.js-countdown').countdown()
      // })
      // $('.countdown-clear').on('click', e => {
      //   $('.js-countdown').countdown('clear')
      // })
    })(),

    calendar: (() => {
      // $('.js-calendar').calendar('clear').calendar().calendar('setDate', '20200512')
      // $('.js-calendar').on('change', e => {
      //   console.log(e.type, e.value, e.text)
      // })
      // $('.calendar-apply').on('click', e => {
      //   $('.js-calendar').calendar()
      // })
      // $('.calendar-clear').on('click', e => {
      //   $('.js-calendar').calendar('clear')
      // })
    })(),

    textarea: (() => {
      let $textarea = $('.js-textarea')
      $textarea.textarea('clear').textarea({total: 20})
    })(),

    transform: (() => {
      $('.transform.btn').on('click', e => {
        let x = $(window).width() - $('.gsap.obj').width() * 2
        $('.transform.obj').transform({
          transform: `translate3d(${x}px, 0px, 0px) scaleX(1.7) scaleY(1.7)`,
          transition: `1s ${Ease.Cubic.easeInOut} 0s`
        }).on('transition-end', () => {
          console.log('transition-end')
        })
      })
    })(),

    gsap: (() => {
      // $('.gsap.btn').on('click', e => {
      //   gsap.to('.gsap.obj', 1, {left: $(window).width() - $('.gsap.obj').width() * 2, onComplete: () => {
      //       console.log('onComplete')
      //     }})
      // })
    })(),

    swipe: (() => {
      // $(window).touchSwipe({
      //   // direction: 'vertical',
      //   touchstart: function (e) {
      //     console.log('start', e)
      //   },
      //   touchmove: function (e) {
      //     console.log('move', e)
      //   },
      //   touchend: function (e) {
      //     console.log('up', e)
      //   }
      // })
      // window.addEventListener('touchstart', e => {
      //   e.preventDefault()
      // }, {
      //   passive: false
      // })
    })(),

    ajax: (() => {
      // $.ajax({
      //   url: './data/test.html',
      //   data: {},
      //   success: function (result) {
      //     console.log(result)
      //   }
      // })
    })()
  }
})(window.jQuery, window.App)
/** ***************************************************************************************************************** */
