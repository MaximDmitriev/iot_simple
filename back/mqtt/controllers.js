const EventEmitter = require('events');
const { Data } = require('../models/data');
const { Config: { separators } } = require('../config/config');


class MqttEmitter extends EventEmitter {}
const mqttEmitter = new MqttEmitter();

function updateClusterData(clusterId, body) {
  const datetime = new Date().getTime();
  const data = body
    .split(separators.item)
    .reduce((acc, item) => {
      const [name, value] = item.split(separators.sensorData);
      return { ...acc, [name]: value };
    }, {});

  const promises = Object.entries(data).map(([sensorId, value]) => {
    return Data.create({ datetime, sensorId, value, clusterId });
  });

  Promise
    .all(promises)
    .then(res => {
      mqttEmitter.emit('clusterUpdated', res);
    })
    .catch(err => console.error(err));
}

function updateSensorData(sensorId, body) {
  console.log(sensorId, body);
}

function confirmationSwitch(relayId, body) {

}

module.exports = { updateClusterData, updateSensorData, confirmationSwitch, mqttEmitter };
