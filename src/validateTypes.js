module.exports = function(keyword, data) {
    if (keyword === 'String') {
        if (typeof data === "string") {
            return true
        } else {
            return false
        }
    }
    if (keyword === 'Number') {
        if (typeof data === "number") {
            return true
        } else {
            return false
        }
    }
    if (keyword === 'Object') {
        if (typeof data === "object") {
            return true
        } else {
            return false
        }
    }
    if (keyword === 'Array') {
        if (Array.isArray(data)) {
            return true
        } else {
            return false
        }
    }
    return true
}