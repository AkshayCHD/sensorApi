var pressureStore = require("./sensorsStore/pressure-sensor.js")
var soundStore = require("./sensorsStore/sound-sensor.js")
var temperatureStore = require("./sensorsStore/temperature-sensor.js")
const constants = require('./projectConstants.js')

var updateMessage = {
    sensorType: 0,
    sensorIndex: 0,
    data: {}
}

function updatePressure(sensorIndex, currentPressure) {
    pressureStore.setCurrentPressure(sensorIndex, currentPressure)
    updateMessage.data = pressureStore.getCurrentPressure(sensorIndex);
    if(updateMessage.data == false)
        return false;
    updateMessage.sensorType = constants.sensorType.PRESSURE;
    updateMessage.sensorIndex = sensorIndex;
    return updateMessage;
}

function updateSound(sensorIndex, currentSound) {
    soundStore.setCurrentSound(sensorIndex, currentSound)
    updateMessage.data = soundStore.getCurrentSound(sensorIndex);
    if(updateMessage.data == false)
        return false;
    updateMessage.sensorType = constants.sensorType.SOUND;
    updateMessage.sensorIndex = sensorIndex;
    return updateMessage;
}

function updateTemperature(sensorIndex, currentTemperature) {
    temperatureStore.setCurrentTemperature(sensorIndex, currentTemperature)
    updateMessage.data = temperatureStore.getCurrentTemperature(sensorIndex);
    if(updateMessage.data == false)
        return false;
    updateMessage.sensorType = constants.sensorType.TEMPERATURE;
    updateMessage.sensorIndex = sensorIndex;
    return updateMessage;
}

module.exports.updatePressure = updatePressure;
module.exports.updateSound = updateSound;
module.exports.updateTemperature = updateTemperature;