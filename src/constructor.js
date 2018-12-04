const DataTypes = new (require('./dataTypes/dataTypes'))()
// const DataTypes = new DataTypesConstructor()

function Exception(e) {
    this.invalidDataTypes = e.invalidDataTypes 
    this.invalidRequires = e.invalidRequires
}

module.exports = function(self, data) {

    var invalidDataTypes = []
    var invalidRequires = []
    for (var key in data) {
        

        // Če je property samo { prop: "String" }
        if (!data[key].type) {
            if(DataTypes.isValidDataType(data[key])) self[key] = { type: data[key] }
            else invalidDataTypes.push({ property : key, keyword: data[key]})
        }
        // Če je property kompleksna { prop: { type: "String", required: false, max: 3 }}
        else {

            // Validate type
            if(!DataTypes.isValidDataType(data[key].type)) invalidDataTypes.push({ property : key, keyword: data[key]})

            // Validate require
            if(data[key].hasOwnProperty('required')) {
                if( typeof data[key].required !== 'boolean' ) {
                    invalidRequires.push({ property: key, required: data[key].required }) 
                } 
            }

            self[key] = data[key]

        }
    }
    if(invalidDataTypes.length > 0) throw new Exception({ invalidDataTypes: invalidDataTypes})
    // console.log(invalidRequires)
    if(invalidRequires.length > 0) {
        // console.log("Throwing exception")
        throw new Exception({ invalidRequires: invalidRequires })
    } 
}