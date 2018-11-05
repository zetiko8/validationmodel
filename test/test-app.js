var expect = require('chai').expect

var Model = require('../src/model-lv2')

describe('Model definition', function(){
    it("Should create a new Model", function(){
        var Event = new Model({
            property : 'String'
        })

        expect(Event instanceof Object)
    }),
    it("Created Model should have same properties as data object", function(){
        var data = {
            property1 : 'String',
            property2 : 'Number',
            property3 : 'Object'
        }
        
        var Event = new Model(data)

        expect(Event.property1 === 'String')
        expect(Event.property2 === 'Number')
        expect(Event.property3 === 'Object')

    })
})

describe('Creating model instances', function(){
    it("Should create an instance of created Model", function(){
        var data = {
            name : 'String',
            id : 'Number',
            duration : 'Object'
        }
        
        var Event = new Model(data)

        var eventInstance = Event.parse({
            name : 'Event',
            id : 1,
            duration : new Date()
        })

        expect(eventInstance instanceof Object)
    }),
    it("Created instance should have the same properties as instanceData object", function(){
        var data = {
            name : 'String',
            id : 'Number',
            duration : 'Object'
        }
        
        var Event = new Model(data)
        var instanceData = {
            name : 'Event',
            id : 1,
            duration : new Date()
        }
        var eventInstance = Event.parse(instanceData)

        expect(eventInstance.name === instanceData.name)
        expect(eventInstance.id === instanceData.id)
        expect(eventInstance.duration === instanceData.duration)
    }),
    it("Should reject property type based on created Model", function(){

        var data = {
            name : 'String',
        }
        
        var Event = new Model(data)
        
        expect(Event.parse.bind(Event, { name : 2 })).to.throw()

    }),
    it("Should reject multiple property types based on created Model", function(){

        var data = {
            name : 'String',
            id : 'String',
            duration : 'Object'
        }
        
        var Event = new Model(data)

        var instanceData = {
            name : 'Event',
            id : 1,
            duration : new Date()
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()

    }),
    it("Should reject object with missing required data", function(){
        
        var data = {
            name : { type: 'String', required: true },
            id : 'Number',
            duration : 'Object'
        }
        
        var Event = new Model(data)

        var instanceData = {
            name : 'Event',
            id : 1,
            duration : new Date()
        }

        expect(Event.parse.bind(Event, instanceData)).to.throw()
    })
})

describe("Invalid properties handling", function(){
    it("Should list the invalid property")
})