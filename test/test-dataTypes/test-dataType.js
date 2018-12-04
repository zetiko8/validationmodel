const expect = require('chai').expect

const DataType = require('../../src/dataType')

describe("Constructor invoked function setKeyword", function(){
    it("Should create keywords", function(){
        
    })
})

describe("Create DataType", function () {
    it("Should create new DataType", function(){
        var DType = new DataType('String', 'string')
        expect(DType instanceof Object)
    })
    // it("Should create new DataType with string keywords or object keywords", function(){
    //     var DType = new DataType('String')
    //     expect(DType instanceof Object)
    // })
})