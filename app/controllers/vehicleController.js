const fs = require('fs')
const shortId = require('shortid');
const mongoose = require('mongoose');

const VehicleModel = mongoose.model('Vehicle');

const check = require('./../Libs/checkLib');
const response = require('./../Libs/responseLib');

let pushVehicleDataFromJson = (req, res) => {

    mongoose.connection.db.dropCollection('vehicles');
    let vehicleData = fs.readFileSync('app/data/vehicle_datadump.json');
    let vehicles = JSON.parse(vehicleData);
    for (let data in vehicles) {
        let vehicle = new VehicleModel({
            vehicleId: shortId.generate(),
            vehicleCode: vehicles[data].VEHICLE_CODE,
            vehicleTypeCode: vehicles[data].VEHICLE_TYPE_CODE,
            vehicleType: vehicles[data].VEHICLE_TYPE,
            vehicleModel: vehicles[data].VEHICLE_MODEL,
            vehicleSubType: vehicles[data].VEHICLE_SUBTYPE,
            cc: vehicles[data].CC,
            vehicleMake: vehicles[data].VEHICLE_MAKE
        })
        vehicle.save((err, result) => {
            if (err) {
                // console.log('Failed')
            } else if (check.isEmpty(result)) {
                // console.log('unable to save')
            } else {
                // console.log('success ')
            }
        })
    }
    res.send(response.generate(false, 'process has been completed', 200, 'success'))
}

let getAllVehicleManufacturer = (req, res) => {
    VehicleModel.find()
        .distinct('vehicleMake')
        .exec((err, data) => {
            if (err) {
                res.send(response.generate(true, 'Error while retrieving vehicle data', 404, null));
            } else if (check.isEmpty(data)) {
                res.send(response.generate(true, 'no vehicle details were available', 400, null))
            } else {
                res.send(response.generate(false, 'Details retrieved successfully', 200, data));
            }
        })
}

let getAllModelForManufacturer = (req, res) => {
    if (req.params.make != null) {
        let make = req.params.make;
        VehicleModel.find({ 'vehicleMake': make.toUpperCase() })
            .distinct('vehicleModel')
            .exec((err, data) => {
                if (err) {
                    res.send(response.generate(true, 'Error while retrieving vehicle data', 404, null));
                } else if (check.isEmpty(data)) {
                    res.send(response.generate(true, 'no vehicle details were available', 400, null))
                } else {
                    res.send(response.generate(false, 'Details retrieved successfully', 200, data));
                }
            })
    }
}

module.exports = {
    pushVehicleDataFromJson: pushVehicleDataFromJson,
    getAllVehicleManufacturer: getAllVehicleManufacturer,
    getAllModelForManufacturer: getAllModelForManufacturer
}