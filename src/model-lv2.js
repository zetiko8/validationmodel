var ArchModel = require('./model')

var Exception = function (e) {
    if ( e.invalidProperties ) this.invalidProperties = e.invalidProperties
    if ( e.missingProperties ) this.missingProperties = e.missingProperties
}

module.exports = class Model extends ArchModel {

    constructor(data) {
        super()

        for (var key in data) {

            if(!data[key].type) {
                this[key] = { type : data[key] }
            } else {
                this[key] = data[key]
            }
        }

    }

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

    validate(keyword, data) {
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
        if (keyword === 'Object') {
            if (typeof data === "object") {
                return true
            } else {
                return false
            }
        }
        return true
    }

    compareTypes(obj, dataKey, data) {

        let invalidProperties = []
        for(var modelKey in this){
            if( dataKey === modelKey ) {
                if(this.validate(this[modelKey].type, data[dataKey])){
                    obj[dataKey] = data[dataKey]
                } else {
                    invalidProperties.push(dataKey)
                }
            }
        }
        if( invalidProperties.length !== 0 ) {
            throw new Exception('invalidProperties')
        }
    }

    hasAllRequired (obj) {

        let missingProperties = []

        for(var modelKey in this) {
            if(this[modelKey].required) {
                if(
                    !obj.hasOwnProperty(modelKey)
                    || obj[modelKey] === undefined
                    || obj[modelKey] === null
                ) {
                    missingProperties.push(modelKey)
                }
            }
        }
        if ( missingProperties.length !== 0 ) return false
        else return true
    }
}

