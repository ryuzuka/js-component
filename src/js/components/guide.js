/** guide.js ******************************************************************************************************** */
;($ => {
  return {
    modal: (() => {
      $('.modalBtn').on('click', event => {
        /**
         * closedFocus: 접근성 준수
         * preventScroll: 스크롤 처리 방식
         ** */

        if (event.target.className.indexOf(' alert') > -1) {
          $('#pop-alert').modal({classes: 'add class test', closedFocus: '.modalBtn.alert'}, e => {
            console.log(e)
          })

        } else if (event.target.className.indexOf(' confirm') > -1) {
          $('#pop-confirm').modal({classes: 'add class test', closedFocus: '.modalBtn.confirm', preventScroll: true}, e => {
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
        type: 'single',
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
        // type: 'multi', // type: single(default), multi
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
          init () {
            console.log('swiper-init', this.realIndex)
          },
          transitionEnd () {
            console.log('swiper-end', this.realIndex)
          },
          slideChange () {
            console.log('swiper-change', this.realIndex)
          },
          resize () {
            console.log('swiper-resize')
          }
        }
      })
    })(),

    countdown: (() => {
      let $countdown = $('.js-countdown')
      $countdown.countdown('clear').countdown({
        format: 'HH:mm:ss', // default: mm:ss
        start: 160 // default: 60
      })
      $countdown.countdown('start').on('complete', e => {
        console.log('countdown - complete')
      })

      $('.countdown-start').on('click', e => {
        $('.js-countdown').countdown('start')
      })
      $('.countdown-stop').on('click', e => {
        $('.js-countdown').countdown('stop')
      })
      $('.countdown-apply').on('click', e => {
        $('.js-countdown').countdown()
      })
      $('.countdown-clear').on('click', e => {
        $('.js-countdown').countdown('clear')
      })
    })(),

    swipe: (() => {
      $.bodySwipe({
        // direction: 'horizontal',
        down () {/** console.log('body swipe down') */},
        move () {/** console.log('body swipe move') */},
        up (dir, dis) {console.log('body swipe - up', dir, dis)}
      }).bodySwipe('off')

      $('.zone').swipe({
        // direction: 'vertical',
        down (e) {/** console.log('element down') */},
        move (e) {/** console.log('element move') */},
        up (dir, dis) {console.log('element swipe up', dir, dis)}
      }).swipe('off')

      $('.swipe-on, .swipe-off').on('click', e => {
        let classList = e.target.className

        if (classList.indexOf('body') > -1) {
          if (classList.indexOf('on') > -1) {
            $.preventScroll(true)
            $.bodySwipe('on')
          } else {
            $.bodySwipe('off')
            $.preventScroll(false)
          }

        } else {
          if (classList.indexOf('on') > -1) {
            $.preventScroll(true)
            $('.zone').swipe('on')
          } else {
            $('.zone').swipe('off')
            $.preventScroll(false)
          }
        }
      })
    })(),

    blockBodyScroll: (() => {
      $('.btn.block:not(.scroll)').on('click', e => {
        $.blockBodyScroll(true)
      })
      $('.btn.block.scroll').on('click', e => {
        $.blockBodyScroll(false)
      })
    })(),

    preventScrollEvent: (() => {
      $('.btn.prevent:not(.scroll)').on('click', e => {
        $.preventScroll(true)
      })
      $('.btn.prevent.scroll').on('click', e => {
        $.preventScroll(false)
      })
    })(),

    transform: (() => {
      $('.transform.btn').on('click', e => {
        let left = parseInt($(window).width() - $('.transform.obj').width() * 3)
        $('.transform.obj').transform({
          transform: `translate3d(${left}px, 0px, 0px) scaleX(1.5) scaleY(1.5)`,
          transition: `1s ${$.ease.Expo.easeInOut} 0s`
        }).on('transition-end', () => {
          console.log('transition-end')
        })
      })
    })(),

    gsap: (() => {
      // tween
      let left = parseInt($(window).width() - $('.gsap.obj').width() * 3)
      $('.gsap.btn').on('click', e => {
        gsap.to('.gsap.obj', 1, {
          transform: `translate3d(${left}px, 0px, 0px) scaleX(1.5) scaleY(1.5)`,
          ease: Expo.easeInOut,
          onComplete: () => {
            console.log('onComplete')
          }})
      })

      // timeline
      let timeline = gsap.timeline({
        paused: true,
        // repeat: 1,
        // repeatDelay: 1,
        onStart () {
          console.log('start', this)
        },
        onComplete () {
          console.log('complete', this)
          this.reverse()
        }
      })
      timeline.to('.motion0', 0.5, {transform: `translate3d(${left}px, 0px, 0px) scaleX(1.5) scaleY(1.5)`})
      timeline.to('.motion1', 0.5, {transform: `translate3d(${left}px, 0px, 0px) scaleX(1.5) scaleY(1.5)`})
      timeline.to('.motion2', 0.5, {transform: `translate3d(${left}px, 0px, 0px) scaleX(1.5) scaleY(1.5)`})
      $('.timeline.btn.play').on('click', e => {
        timeline.play()
      })
      $('.timeline.btn.pause').on('click', e => {
        timeline.pause()
      })
      $('.timeline.btn.stop').on('click', e => {
        timeline.clear().kill()
      })
    })(),

    ajax: (() => {
      $.ajax({
        url: '/data/lottie.json',
        data: {},
        success: function (result) {
          console.log(result)
        }
      })
    })(),

    lottie: (() => {
      let _lottie = lottie.loadAnimation({
        container: document.getElementById('lottie'),
        renderer: 'svg',
        // animationData: '', async
        path: '/data/lottie.json',
        loop: false, // default: true
        autoplay: true // default: true
      })

      $('.lottie-start').on('click', e => {
        _lottie.play()
      })
      $('.lottie-pause').on('click', e => {
        _lottie.pause()
      })
      $('.lottie-stop').on('click', e => {
        _lottie.stop()
      })
    })()
  }
})(window.jQuery)
/** ***************************************************************************************************************** */
