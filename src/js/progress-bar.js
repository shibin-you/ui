function ProgressBar(el, cb) {
  var vm = this
  vm.el = el
  vm.progressBtn = el.getElementsByClassName('progress-btn')[0]
  vm.progressEl = el.getElementsByClassName('progress')[0]
  vm.initialed = false
  vm.touch = {}
  el.onclick = function(e) {
    vm.setProgressByLen(e.offsetX)
    vm._cb()
  }
  el.ontouchstart = function(e) {
    vm.initialed = true
    vm.touch.startX = e.touches[0].pageX
    vm.touch.left = vm.progressEl.clientWidth
  }
  el.ontouchmove = function(e) {
    e.preventDefault()
    if (!vm.initialed) {
      return
    }
    vm.touch.move = true
    const deltaX = e.touches[0].pageX - vm.touch.startX
    const offsetWidth = Math.min(Math.max(0, vm.touch.left + deltaX), vm.el.clientWidth - vm.progressBtn.clientWidth)
    vm.setProgressByLen(offsetWidth)
  }
  el.ontouchend = function(e) {
    if (vm.touch.move) {
      vm._cb()
    }

    vm.initialed = false
    vm.touch.move = false
  }
  vm.setProgressByLen = function(x) {
    if (x < 0) {
      return
    }
    vm.progressEl.style.width = x + 'px'
    vm.progressBtn.style[prefixStyle('transform')] = 'translate3d(' + x + 'px,0,0)'
    var barWidth = vm.el.clientWidth - vm.progressBtn.clientWidth
    vm.percent = vm.progressEl.clientWidth / barWidth
  }
  vm.setProgress = function(percent) {
    var len = percent * vm.el.clientWidth
    vm.setProgressByLen(len)
  }
  vm._cb = function() {
    if (cb && typeof cb === 'function') {
      cb.call(vm, vm.percent)
    }
  }
}
