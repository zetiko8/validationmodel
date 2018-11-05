module.exports = class Model {

    constructor () {
    }

    validate (keyword, data) {
        if(keyword === 'String') {
            if(data instanceof String) { 
                return true 
            } else {
                return false
            }
        }
    }

}