const assert = require('assert');
var storeTemperature = async function(db, updateMessage) {
    const temperatureCollection = db.collection('temperature');
    // Insert some documents
    var today = new Date();
    temperatureCollection.insertOne({
            date: today,
            temperature : updateMessage.data.currentTemperature
        }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted document into the collection");
        console.log("Temperature stored")
    });
    return true;
};

var findTemperature = (db) => {
    return new Promise((resolve, reject) => { 
        const temperatureCollection = db.collection('temperature');    
        temperatureCollection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log(docs)
            resolve(docs)
        });
    });
};

exports.storeTemperature = storeTemperature;
exports.findTemperature = findTemperature;
