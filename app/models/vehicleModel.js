'use strict'

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let vehicleSchema = new Schema({

    vehicleId: {
        type: String,
        index: true,
        unique: true
    },
    vehicleCode: {
        type: String,
        index: true
    },
    vehicleTypeCode: {
        type: String,
        index: true
    },
    vehicleType: {
        type: String,
        index: true
    },
    vehicleModel: {
        type: String,
        index: true
    },
    vehicleSubType: {
        type: String,
        index: true
    },
    cc: {
        type: String,
        index: true
    },
    vehicleMake: {
        type: String,
        index: true
    }

});

mongoose.model('Vehicle', vehicleSchema)