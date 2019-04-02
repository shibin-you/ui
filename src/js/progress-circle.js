function ProgressCircle(opts) {
    if (!opts.el) {
        return
    }
    var vm = this

    _init()
    function _init() {
        vm.el = query(opts.el)
        vm.proGressContent = vm.el.getElementsByTagName('svg')[0]
        vm.progressBackground = vm.proGressContent.getElementsByClassName('progress-background')[0]
        vm.progressBar = vm.proGressContent.getElementsByClassName('progress-bar')[0]
        vm.o = opts.width / 2
        vm.r = vm.o - opts.strokeWidth
        vm.girth = Math.PI * 2 * vm.r
        vm.width = opts.width
        vm.setPercentage = setPercentage
        _initStyle(opts)
        vm.setPercentage(opts.percentage)
    }

    function _initStyle(opts) {
        var progressBar = vm.progressBar
        var progressBackground = vm.progressBackground
        var proGressContent = vm.proGressContent
        proGressContent.style.width = vm.width + 'px'
        proGressContent.style.height = vm.width + 'px'
        setAttr(proGressContent,'viewBox',"0 0 " + vm.width + ' ' + vm.width)
        setAttr(progressBar,'r',vm.r)
        setAttr(progressBar,'cx', vm.o)
        setAttr(progressBar,'cy', vm.o)
        setAttr(progressBar,'stroke-dasharray', vm.girth)
        setAttr(progressBackground,'r', vm.r)
        setAttr(progressBackground,'cx', vm.o)
        setAttr(progressBackground,'cy', vm.o)
        progressBackground.style.strokeWidth = opts.strokeWidth + 'px'
        progressBar.style.strokeWidth = opts.strokeWidth + 'px'
        progressBar.style.stroke = opts.color
        progressBackground.style.stroke = opts.background

    }

    function setPercentage(percentage) {
        vm.progressBar.setAttribute('stroke-dashoffset', vm.girth * (1 - percentage / 100))
        vm.percentage = percentage
    }
}
