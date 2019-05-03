const express = require('express')
const app = express();
const PORT=5000
var airQualitySensor = require('./sensors/air-quality-sensor.js')
var temperatureSensor = require('./sensors/temperature-sensor.js')
var vibrationsSensor = require('./sensors/vibrations-sensor.js')

//get mongodb library
var mongodb = require('mongodb');

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
    var response = await temperatureSensor.storeTemperature(req.query.temp);
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


//display temperatureSensor table

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/sensorDatabase';

MongoClient.connect(url, function(err, db)
{
    if(err)
    {
        console.log('error occurred');
    }
    else
    {
        console.log('Connection estabelished');
        var collection = db.collection('temperatureSensor');
        collection.find({}).toArray(function(err, result)
        {
            if(err)
            {
                console.log('database error');
            }
            else
            {
                console.log(result.length);
            }

            db.close();
        }
        );
    }
});

//

// add new data

/*var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/sensorDatabase';

MongoClient.connect(url, function(err, db)
{
    if(err)
    {
        console.log('error occurred');
    }
    else
    {
        console.log('Connection estabelished');
        var collection = db.collection('temperatureSensor');
        var tempData = {value : 123.4, timestamp : 1234};

        collection.insert(tempData, function(err, result)
        {
            if(err)
            {
                console.log('Error inserting data');
            }
            else
            {
                console.log('Data added');
            }
            db.close();
        }
        );
    }
});*/

//
