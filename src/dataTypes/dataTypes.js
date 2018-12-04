module.exports = class {
    constructor() {
        this.dataTypes = [
            'String',
            'Number',
            'Object',
            'Array',
            'String-Array'
        ]  
    }

    isValidDataType (dataType) {
        for(let validDataType of this.dataTypes) {
            if(dataType === validDataType) return true
        }
        if(typeof dataType === 'function') return true
        return false
    }
}