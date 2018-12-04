var expect = require('chai').expect

var Model = require('../../src/index')

describe('Model definition', function () {
    it("Should create a new Model", function () {
        var Event = new Model({
            property: 'String'
        })

        expect(Event instanceof Object)
    })
    it("Created Model should have same properties as data object", function () {
        var data = {
            property1: 'String',
            property2: 'Number',
            property3: 'Object'
        }

        var Event = new Model(data)

        expect(Event.property1 === 'String')
        expect(Event.property2 === 'Number')
        expect(Event.property3 === 'Object')

    })
    it("Should reject models with unknown type declaration, that dont have type declared", function () {
        var data = {
            property2: "String",
            property1: 'Lord'
        }

        expect(() => new Model(data)).to.throw()
    })
    it("Should reject models with unknown type declaration, that have type declared", function () {
        var data = {
            property2: 'String',
            property1: { type: 'Lord', required: false }
        }

        // var Event = new Model(data)
        expect(() => new Model(data)).to.throw()
    })
    it("Should accept models with valid type declaration", function () {
        var data = {
            property2: 'String',
            property1: { type: 'Number', required: false }
        }

        var Event = new Model(data)
        expect(Event.property2.type).to.eql(data.property2)
        expect(Event.property1.type).to.eql(data.property1.type)

        var data = {
            property2: { type: 'String', required: true },
            property1: { type: 'Number', required: false }
        }

        var Event = new Model(data)
        expect(Event.property2.type).to.eql(data.property2.type)
        expect(Event.property1.type).to.eql(data.property1.type)

        var data = {
            property2: { type: 'Number', required: false },
            property1: 'String'
        }

        var Event = new Model(data)
        expect(Event.property2.type).to.eql(data.property2.type)
        expect(Event.property1.type).to.eql(data.property1)

        var data = {
            property2: { type: 'Number', required: false },
            property1: { type: 'Object', required: true },
            property3: { type: 'Array', max: 3 },
            property4: { type: 'String-Array', max: 5, min: 1 },
            property5: { type: 'String', max: 5, min: 1, required: false },
        }

        var Event = new Model(data)
        expect(Event.property2.type).to.eql(data.property2.type)
        expect(Event.property1.type).to.eql(data.property1.type)
        expect(Event.property3.type).to.eql(data.property3.type)
        expect(Event.property4.type).to.eql(data.property4.type)
        expect(Event.property5.type).to.eql(data.property5.type)

    })
    it("Should reject models with no type declaration", function () {
        var data = {
            property2: 'String',
            property1: { required: false }
        }

        expect(() => new Model(data)).to.throw()
    })
    it("Should reject models with invalid required declaration", function () {

        // required = 0
        var data = {
            property1: { type: Number, required: 0 },
            property2: 'String',
        }

        expect(() => new Model(data)).to.throw()

        // required = random
        var data = {
            property1: { type: Number, required: 'b' },
            property2: 'String',
        }

        expect(() => new Model(data)).to.throw()

        // required = undefined
        var data = {
            property1: { type: Number, required: undefined },
            property2: 'String',
        }

        expect(() => new Model(data)).to.throw()

        // required = null
        var data = {
            property1: { type: Number, required: null },
            property2: 'String',
        }

        expect(() => new Model(data)).to.throw()

        // required = 'not'
        var data = {
            property1: { type: Number, required: 'not' },
            property2: 'String',
        }

        expect(() => new Model(data)).to.throw()

        // required = 'false
        var data = {
            property2: 'String',
            property1: { type: Number, required: 'false' },
        }

        expect(() => new Model(data)).to.throw()

    })
    it("Should handle values min and max", function () {

        var data = {
            name: { type: 'String', required: false, min: 3, max: 8 },
        }

        var Event = new Model(data)
        // console.log(Event)

        expect(Event.name).to.haveOwnProperty('min')
        expect(Event.name).to.haveOwnProperty('max')
    })
})