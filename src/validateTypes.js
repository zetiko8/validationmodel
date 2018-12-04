const _u = require('underscore')

module.exports = function (keyword, data) {
    if (keyword === 'String' || keyword.prototype === String.prototype) {
        if (typeof data === "string") {
            return true
        } else {
            return false
        }
    } else
    if (keyword === 'Number') {
        if (typeof data === "number") {
            return true
        } else {
            return false
        }
    } else
    if (keyword === 'Object') {
        if (typeof data === "object") {
            return true
        } else {
            return false
        }
    } else
    if (keyword === 'Array') {
        if (Array.isArray(data)) {
            return true
        } else {
            return false
        }
    } else
    if (keyword === 'String-Array') {
        if (Array.isArray(data) && _u.every(data, function (i) { return typeof i === "string" })) {
            return true
        } else {
            return false
        }
    } else     
    if(typeof keyword === 'function'){
        if(Object.getPrototypeOf(data) === keyword.prototype) {
            return true
        } else {
            return false
        }
    }
    return true
}

