/** paging.js ********************************************************************************************************** */
let _pluginName = 'paging'

Object.assign(window, {
  Paging: function (element, options = {}, value) {
    if (typeof options === 'string') {
      let el = element.length > 0 ? element[0] : element
      return window.PLUGIN.call(el, options, value)

    } else {
      let plugin = null
      for (let el of element.length > 0 ? element : [element]) {
        if (!el.getAttribute('applied-plugin')) {
          window.PLUGIN.add(el, plugin = new Paging(el, options), _pluginName)
        }
      }
      return plugin
    }
  }
})

class Paging {
  constructor (el, options) {
    this.$paging = el
    this.$pagingContainer = el.querySelector('.paging-list')

    this.options = options
    this.offset = options.offset || 0                                           // 현재 페이지 번호
    this.total = options.total                                                  // 전체 리스트 갯수
    this.limit = options.limit || 10                                            // 화면에 보여지는 리스트 갯수
    this.totalPage = Math.ceil(this.total / this.limit)                         // 전체 페이지 갯수
    this.pagingLength = options.pagingLength || 10                              // 화면에 보여지는 paging button 갯수
    this.pagingGroup = []
    this.pagingGroupLength = Math.ceil(this.totalPage / this.pagingLength)
    this.groupIndex = 0

    this.eventHandler = {
      clickPaging: e => {
        e.preventDefault()
      },
      clickButton: e => {
        let {className} = e.currentTarget
        let currentIdx = 0

        if (className.indexOf('first') > 0) {
          this.groupIndex = 0
          currentIdx = 0
        } else if (className.indexOf('prev') > 0) {
        } else if (className.indexOf('next') > 0) {
        } else if (className.indexOf('last') > 0) {
          this.groupIndex = this.pagingGroup.length - 1
          currentIdx = this.totalPage - 1
        }
        e.preventDefault()
      }
    }

    this.set(this.offset)
    this.draw(this.offset, this.groupIndex)
    this.active(this.offset)

    this.$paging.querySelectorAll('button').forEach($btn => {
      $btn.addEventListener('click', this.eventHandler.clickButton)
    })
    this.$paging.querySelectorAll('a').forEach($btn => {
      $btn.addEventListener('click', this.eventHandler.clickPaging)
    })
  }

  set (offset) {
    let length = this.pagingLength
    let total = this.totalPage

    this.pagingGroup = []
    for (let i = 0; i < this.pagingGroupLength; ++i) {
      this.pagingGroup.push([])

      let pagingLength = total - i * length > length ? length : total - i * length
      for (let j = 0; j < pagingLength; ++j) {
        this.pagingGroup[i][j] = {
          index: j,
          pagingIndex: this.pagingLength * i + j,
          text: this.pagingLength * i + j + 1,
          current: false
        }
        if (offset === this.pagingLength * i + j) {
          this.groupIndex = i
        }
      }
    }
  }

  draw (offset, groupIndex) {
    this.$pagingContainer.innerHTML = this.pagingGroup[groupIndex].map(paging => `<a href="#" data-index="${paging.pagingIndex}">${paging.text}</a>`).join('')

    let $first = this.$paging.querySelector('.paging-first')
    let $prev = this.$paging.querySelector('.paging-prev')
    let $next = this.$paging.querySelector('.paging-next')
    let $last = this.$paging.querySelector('.paging-last')

    let paging = this.pagingGroup[this.groupIndex]
    let pagingLength = paging.length - 1
    let lastPaging = this.pagingGroup[this.pagingGroupLength - 1]
    let lastPagingLength = lastPaging.length - 1

    this.$paging.querySelectorAll('button').forEach($btn => {
      $btn.disabled = false
    })

    if (offset === this.pagingGroup[0][0].pagingIndex) {
      $first.disabled = true
    }
    if (offset === paging[0].pagingIndex) {
      $prev.disabled = true
    }
    if (offset === paging[pagingLength].pagingIndex) {
      $next.disabled = true
    }
    if (offset === lastPaging[lastPagingLength].pagingIndex) {
      $last.disabled = true
    }
  }


  active (offset) {

  }

  clear () {
    return window.Paging
  }
}
/** ****************************************************************************************************************** */
