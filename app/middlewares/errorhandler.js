"use strict"

const response = require('./../Libs/responseLib');

let notFoundHandler = (req, res, next) => {
    let apiResponse = response.generate(true, 'Route not found in the application', 404, null)
    res.send(apiResponse)
}

module.exports = {
    notFoundHandler: notFoundHandler
}