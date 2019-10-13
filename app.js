"use strict"

const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');
const http = require('http');

const appConfig = require('./config/appConfig');
const app = express();

const modelsPath = './app/models';
const routesPath = './app/routes';
const handler = require('./app/middlewares/errorhandler')

fs.readdirSync(modelsPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        require(modelsPath + '/' + file);
    }
})

fs.readdirSync(routesPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file)
        route.setRouter(app)
    }
})

app.use(handler.notFoundHandler)

const server = http.createServer(app);

server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    console.log('error while creating server ', error);
}

function onListening() {
    console.log('server on Listening');
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });
}

mongoose.connection.on('error', (err) => {
    console.log('database error ', err);
})

mongoose.connection.on('open', (err) => {
    if (err)
        console.log('database error ', err);
    else
        console.log('db connection open success')
})