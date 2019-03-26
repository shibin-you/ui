function ProgressBar(el) {
  var vm = this
  vm.el = el
  vm.progressBtn = el.getElementsByClassName('progress-btn')[0]
  vm.progressEl = el.getElementsByClassName('progress')[0]
  vm.initialed = false
  vm.touch = {}

  el.onclick = function(e) {
    vm.setProgress(e.offsetX)
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
    const deltaX = e.touches[0].pageX - vm.touch.startX
    const offsetWidth = Math.min(Math.max(0, vm.touch.left + deltaX), vm.el.clientWidth - vm.progressBtn.clientWidth)
    vm.setProgress(offsetWidth)
  }
  el.ontouchend = function(e) {
    vm.initialed = false
  }
  vm.setProgress = function(x) {
    if (x < 0) {
      return
    }
    vm.progressEl.style.width = x + 'px'
    vm.progressBtn.style[prefixStyle('transform')] = 'translate3d(' + x + 'px,0,0)'
    var barWidth = vm.el.clientWidth - vm.progressBtn.clientWidth
    vm.percent = vm.progressEl.clientWidth / barWidth
  }
}
var elementStyle = document.createElement('div').style
var vendor = (() => {
  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
