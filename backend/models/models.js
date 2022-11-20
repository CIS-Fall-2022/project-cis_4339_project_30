const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationDataSchema_id: { type: String }, //LINK FOR ORGANIZATION SCHEMA
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationDataSchema_id: { type: String }, //LINK FOR ORGANIZATION SCHEMA
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }]
}, {
    collection: 'eventData'
});

//collection for Organization
let organizationDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationName: { 
        type: String,
        require: true
    }
}, {
    collection: 'organizationData'
});
//From the collection OrganizationDataSchema we select the _id from it to link it
//to the others collections(primary and event)
//organizationDataSchema_id: { type: String }, //LINK FOR ORGANIZATION SCHEMA

//this is extra brainstorming about how to connect by id or name, however id is unique not name
//organizationDataSchema_id: { type: String, default: uuid.v1 }, reference
//organizationDataSchemaorganizationName: { type: String, require: true} 

// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const organizationdata= mongoose.model('organizationData', organizationDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, organizationdata }
