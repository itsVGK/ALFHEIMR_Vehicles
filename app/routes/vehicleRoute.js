"use strict"
const express = require('express');

const appConfig = require('./../../config/appConfig');
const vehicleController = require('./../controllers/vehicleController');

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/vehicle`;

    app.get(`${baseUrl}/pushVehicleJson`, vehicleController.pushVehicleDataFromJson)

    app.get(`${baseUrl}/getAllManufacturers`, vehicleController.getAllVehicleManufacturer)

    app.get(`${baseUrl}/getModelforMake/:make`, vehicleController.getAllModelForManufacturer)
}