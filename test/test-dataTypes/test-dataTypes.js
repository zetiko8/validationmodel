const expect = require('chai').expect

const DataTypes = require('../../src/dataTypes/dataTypes')

describe("Create DataTypes", function () {
    it("Should create new DataTypes", function(){
        var DTypes = new DataTypes()
        expect(DTypes instanceof Object)
    })
})

describe("Method isValidDataType", function(){
    it("Should reject invalid String dataTypes", function(){
        var DTypes = new DataTypes()

        expect( DTypes.isValidDataType('SString') ).to.equal(false)
    })
    it("Should accept valid String dataTypes", function(){
        var DTypes = new DataTypes()
        expect( DTypes.isValidDataType('String') ).to.equal(true)
    })
    it("Should accept Constructor() - (String(), Number(), Array(), Object(), <CustomObject> dataTypes", function(){
        var DTypes = new DataTypes()
        expect( DTypes.isValidDataType(String) ).to.equal(true)
        expect( DTypes.isValidDataType(Number) ).to.equal(true)
        expect( DTypes.isValidDataType(Array) ).to.equal(true)
        expect( DTypes.isValidDataType(Object) ).to.equal(true)
        function Car(){}
        expect( DTypes.isValidDataType(Car) ).to.equal(true)
    })
})