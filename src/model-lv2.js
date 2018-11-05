var ArchModel = require('./model')

var Exception = function (e) {
    this.notValidProperty = 3
}

module.exports = class Model extends ArchModel {

    constructor(data) {
        super()

        for(var key in data){
            this[key] = data[key] 
        } 

    }

    parse (data) {

        var  self = this

        return new Obj(data)

        function Obj (data) {
            for(var dataKey in data){
 
            }   
        }

    }

    validate (keyword, data) {
        if(keyword === 'String') {
            if(typeof data === "string") { 
                return true 
            } else {
                return false
            }
        }
        return true
    }

    isPropertyComplex () {

    }

    validateAgainstModelPropertyComplex (obj, dataKey, data) {
        console.log(this)
        // for(var modelKey in self){
        //     if(dataKey === modelKey) {
        //         if(self.validate(self[modelKey], data[dataKey])){
        //             this[dataKey] = data[dataKey]
        //         } else {
        //             throw new Exception
        //         }
        //     }
        // }
    }
}

