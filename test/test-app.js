var expect = require('chai').expect

var Model = require('../src/index')

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
    it("Should reject models with unknown type declaration", function (){
        var Event = new Model({
            property2: "String",
            property1 : 'Lord' 
        })
    })
    it("Should handle values min and max", function () {

        var data = {
            name: { type: 'String', required: false, min: 3, max: 8 },
        }

        var Event = new Model(data)

        expect(Event.name).to.haveOwnProperty('min')
        expect(Event.name).to.haveOwnProperty('max')
    })
})

describe('Creating model instances', function () {
    it("Should create an instance of created Model", function () {
        var data = {
            name: 'String',
            id: 'Number',
            duration: 'Object'
        }

        var Event = new Model(data)

        var eventInstance = Event.parse({
            name: 'Event',
            id: 1,
            duration: new Date()
        })

        expect(eventInstance instanceof Object)
    })
    it("Created instance should have the same properties as instanceData object", function () {
        var data = {
            name: 'String',
            id: 'Number',
            duration: 'Object'
        }

        var Event = new Model(data)
        var instanceData = {
            name: 'Event',
            id: 1,
            duration: new Date()
        }
        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.name).to.eql(instanceData.name)
        expect(eventInstance.id).to.eql(instanceData.id)
        expect(eventInstance.duration).to.eql(instanceData.duration)

    })
    it("Should reject property type based on created Model", function () {

        var data = {
            name: 'String',
        }

        var Event = new Model(data)

        expect(Event.parse.bind(Event, { name: 2 })).to.throw()

    })
    it("Should reject multiple property types based on created Model", function () {

        var data = {
            name: 'String',
            id: 'String',
            duration: 'Object'
        }

        var Event = new Model(data)

        var instanceData = {
            name: 'Event',
            id: 1,
            duration: new Date()
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()

    })
    it("Should reject object with missing required data", function () {

        var data = {
            name: { type: 'String', required: true },
            id: 'Number',
            duration: 'Object'
        }

        var Event = new Model(data)

        var instanceData = {
            id: 1,
            duration: new Date()
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
    it("Should'nt reject object with missing non-required data", function () {

        var data = {
            name: { type: 'String', required: false },
            id: 'Number',
            duration: 'Object'
        }

        var Event = new Model(data)

        var instanceData = {
            id: 1,
            duration: new Date()
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance).to.not.haveOwnProperty('name')
        expect(eventInstance.id).to.eql(instanceData.id)
        expect(eventInstance.duration).to.eql(instanceData.duration)
    })
})
describe("Different type comparison", function () {
    it("Should reject non-strings on keyword String", function () {
        var modelData = {
            property: 'String'
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 6
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()

    })
    it("Should accept Strings on keyword String", function () {
        var modelData = {
            property: 'String'
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 'Event'
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject non-numbers on keyword Number", function () {
        var modelData = {
            property: 'Number'
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 'Event'
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
    it("Should accept numbers on keyword Number", function () {
        var modelData = {
            property: 'Number'
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 6
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject non-Objects on keyword Object", function () {
        var modelData = {
            property: 'Object'
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 5
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
    it("Should accept Objects on keyword Object", function () {
        var modelData = {
            property: 'Object'
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: new Date()
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject non-Arrays on keyword Array", function () {
        var Event = new Model({
            property: 'Array'
        })

        var instanceData = {
            property: 3
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
    it("Should accept Arrays on keyword Array", function () {
        var Event = new Model({
            property: 'Array'
        })

        var instanceData = {
            property: [3]
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject non-String Arrays on keyword String-Array", function () {
        var Event = new Model({
            property: 'String-Array'
        })

        var instanceData = {
            property: [
                1, "string", 3
            ]
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
    it("Should accept all-String Arrays on keyword String-Array", function () {
        var Event = new Model({
            property: 'String-Array'
        })

        var instanceData = {
            property: [
                "string", "string", "string"
            ]
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject numbers smaller then specified number"),
        it("Should reject non-CustomObjects on keyword <CustomObject>", function () {
            function Car(color, brand) {
                this.color = color,
                    this.brand = brand
            }

            var Event = new Model({
                property: Car
            })

            var instanceData = {
                property: 3
            }

            expect(Event.parse.bind(Event, instanceData)).to.throw()
        })
    it("Should accept CustomObjects on keyword <CustomObject>", function () {
        function Car(color, brand) {
            this.color = color,
                this.brand = brand
        }

        var Event = new Model({
            property: Car
        })

        var instanceData = {
            property: new Car('red', 'bmw')
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject non-strings on keyword String()", function () {
        var modelData = {
            property: String
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 6
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()

    })
    it("Should accept strings on keyword String()", function () {
        var modelData = {
            property: String
        }

        var Event = new Model(modelData)

        var instanceData = {
            property: 'string'
        }

        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.property).to.eql(instanceData.property)
    })
    it("Should reject non-numbers on keyword Number()")
    it("Should reject non-arrays on keyword Array()")
    it("Should reject non-strings on keyword String()")
    it("Should reject non-strings on keyword String()")
})
describe("Invalid model creation handling", function () {
    it("Should list the invalid property", function () {
        var Event = new Model({
            property: 'String-Array'
        })

        var instanceData = {
            property: [
                1, "string", 3
            ]
        }

        try {
            var eventInstance = Event.parse(instanceData)
            expect.fail("This should throw an error")
        } catch (error) {
            expect(error.invalidProperties[0].property).to.equal('property')
            expect(error.invalidProperties[0].requiredType).to.equal('String-Array')
        }


        // expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
    it("Should list the missing required property")
})