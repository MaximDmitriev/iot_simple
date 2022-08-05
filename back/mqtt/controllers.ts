import { EventEmitter } from 'events';
import { Config } from '../config/config.ts';
import { Data } from '../models';

class MqttEmitter extends EventEmitter {}
export const mqttEmitter = new MqttEmitter();

const { separators } = Config;

export function updateClusterData(clusterId, body) {
  const datetime = Date.now();
  const data = body.split(separators.item).reduce((acc, item) => {
    const [name, value] = item.split(separators.sensorData);

    return { ...acc, [name]: value };
  }, {});

  const promises = Object.entries(data).map(([sensorId, value]) => Data.create({ datetime, sensorId, value, clusterId }));

  Promise.all(promises)
    .then(res => {
      mqttEmitter.emit('clusterUpdated', res);
    })
    .catch(err => console.error(err));
}

export function updateSensorData(sensorId, body) {
  console.log(sensorId, body);
}

export function confirmationSwitch(relayId, body) {}
