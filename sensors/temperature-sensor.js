var mongodb = require('mongodb');

var storeTemperature = async function(temperature) {

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
            var temperatureVal = parseInt(temperature);
            var currentTimestamp = Date.now();
            var tempData = {value : temperatureVal, timestamp : currentTimestamp};

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
    });


    console.log("Temperature stored");
    return true;
}

exports.storeTemperature = storeTemperature;
