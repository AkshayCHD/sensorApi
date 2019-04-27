const express = require('express')
const app = express();
const PORT=5000
var airQualitySensor = require('./sensors/air-quality-sensor.js')
var temperatureSensor = require('./sensors/temperature-sensor.js')
var vibrationsSensor = require('./sensors/vibrations-sensor.js')

app.get('/sendAirQuality', async function(req, res) {
    console.log("send Air Quality endpoint hit")
    var response = await airQualitySensor.storeAirQuality();
    if(response == true) {
        console.log("store successfull");
    } else {
        console.log("unsuccessful");
    }
    return res.send(response);
});

app.get('/sendTemperature', async function(req, res) {
    console.log("send Temperature endpoint hit")
    console.log("The temperature is " + req.query.temp);
    var response = await temperatureSensor.storeTemperature();
    if(response == true) {
        console.log("store successfull");
    } else {
        console.log("unsuccessful");
    }
    return res.send(response);
});

app.get('/sendVibrations', async function(req, res) {
    console.log("send Vibrations endpoint hit")
    var response = await vibrationsSensor.storeVibration();
    if(response == true) {
        console.log("store successfull");
    } else {
        console.log("unsuccessful");
    }
    return res.send(response);
});

app.listen(process.env.PORT || PORT, ()=> {
    console.log("##########################Listening to port 5000###########################")
})


