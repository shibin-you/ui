function Scroll(opts) {
  var u = this
  if (!opts.el) {
    this.el = window
  } else {
    this.el = opts.el
  }
  this.el.onscroll = function() {
    var oldY = this.scrollY
    this.scrollY = u._getNowTop.call(u)
    if (typeof opts.scroll === 'function') {
      opts.scroll.call(u)
    }
    if (typeof opts.scrollBottom === 'function' && this.scrollY > oldY) {
      var el = u.el
      if (el === window) {
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        if (this.scrollY + windowHeight+10 >= scrollHeight) {
          opts.scrollBottom.call(u)
        }
      } else {
        if (el.scrollHeight <= el.clientHeight + el.scrollTop) {
          opts.scrollBottom.call(u)
        }
      }
    }
  }
  this.scrollTo = function(position, time, num) {
    if (time === 0) {
      this.el.scrollTo(0, position)
      return
    }
    if (!time) {
      time = 300
    }
    if (!num) {
      num = 20
    }
    var nowTop = this._getNowTop()
    var spacingInex = time / num
    var everTop = (position - nowTop) / spacingInex;
    var scrollTimer = setInterval(function() {
      if (spacingInex > 0) {
        spacingInex--
        nowTop += everTop
        u.el.scrollTo(0, nowTop)
      } else {
        clearInterval(scrollTimer); // 清除计时器
        if (u.endCallback) {
          u.endCallback()
        }
      }
    }, num)
  }
  this._getNowTop = function() {
    return u.el === window ? document.body.scrollTop + document.documentElement.scrollTop : this.el.scrollTop
  }
  this.scrollToEl = function(el, time, num) {
    u.scrollTo(el.offsetTop, time, num)
  }
  this.scrollTop = function(time, num) {
    u.scrollTo(0, time, num)
  }
  this.scrollToBottom = function(time, num) {
    var to = u.el === window ? document.body.scrollHeight : this.el.scrollHeight
    this.scrollTo(to, time, num)
  }
  this.scrollEnd = function(cb) {
    if (typeof cb === 'function') {
      this.endCallback = cb
      return
    }
    this.endCallback = null
  }
}


function scrollTop() {
  window.scrollTo(0, 0)
}

function fnSroll() {
  a.scrollToEl(document.getElementById('wrap'))
  a.scrollEnd(function() {})

}

function fnSrollTop() {
  a.scrollTop()
}
