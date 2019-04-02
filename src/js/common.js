var elementStyle = document.createElement('div').style

var vendor = (function () {
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
function query(el) {
    if (typeof el === 'string') {
        const selected = document.querySelector(el)
        if (!selected) {
            return document.createElement('div')
        }
        return selected
    } else {
        return el
    }
}
function setAttr(el, key, val) {
    el.setAttribute(key, val)
}
function getAttr(el, key) {
    el.getAttribute(key)
}
function proxy(target, sourcekey, key) {
    sharedPropertyDefinition.get = function() {
        return target[sourcekey][key]
    }
    sharedPropertyDefinition.set = function(val) {
        target[sourcekey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}