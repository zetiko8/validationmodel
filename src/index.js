var Exception = function (e) {
    if (e.invalidProperties) this.invalidProperties = e.invalidProperties
    if (e.missingProperties) this.missingProperties = e.missingProperties
}

var validateTypes = require('./validateTypes')

module.exports = class Model {

    constructor(data) {require('./constructor')(this, data)}

    parse(data) {

        var self = this

        return new Obj(data)

        function Obj(data) {
            for (var dataKey in data) {
                self.compareTypes(this, dataKey, data)
            }

            if (!self.hasAllRequired(this)) throw new Exception()
        }

    }

    compareTypes(obj, dataKey, data) {

        let invalidProperties = []
        for (var modelKey in this) {
            if (dataKey === modelKey) {
                if (validateTypes(this[modelKey].type, data[dataKey])) {
                    obj[dataKey] = data[dataKey]
                } else {
                    invalidProperties.push({ property: dataKey, requiredType: this[modelKey].type })
                }
            }
        }
        if (invalidProperties.length !== 0) {
            throw new Exception({ invalidProperties: invalidProperties })
        }
    }

    hasAllRequired(obj) {

        let missingProperties = []

        for (var modelKey in this) {
            if (this[modelKey].required) {
                if (
                    !obj.hasOwnProperty(modelKey)
                    || obj[modelKey] === undefined
                    || obj[modelKey] === null
                ) {
                    missingProperties.push(modelKey)
                }
            }
        }
        if (missingProperties.length !== 0) return false
        else return true
    }
}



