// @ts-nocheck
import { EventEmitter } from 'events';
import { Data } from '../models';
import { Config } from '../config/config.ts';

class MqttEmitter extends EventEmitter {}
export const mqttEmitter = new MqttEmitter();

const { separators } = Config;

export function updateClusterData(clusterId, body) {
  const datetime = new Date().getTime();
  const data = body.split(separators.item).reduce((acc, item) => {
    const [name, value] = item.split(separators.sensorData);
    return { ...acc, [name]: value };
  }, {});

  const promises = Object.entries(data).map(([sensorId, value]) => {
    return Data.create({ datetime, sensorId, value, clusterId });
  });

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
