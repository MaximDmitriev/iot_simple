import { EventEmitter } from 'events';
import { Config } from '../config/config';
import { SensorData } from '../models';

class MqttEmitter extends EventEmitter {}
export const mqttEmitter = new MqttEmitter();

const { separators } = Config;

export const updateClusterData = (clusterId, body: string) => {
  const datetime = Date.now();
  const data = body.split(separators.item).reduce((acc, item) => {
    const [name, value] = item.split(separators.sensorData);

    return { ...acc, [name]: value };
  }, {});

  const promises = Object.entries(data).map(([sensorId, value]) => SensorData.create({ datetime, sensorId, value, clusterId }));

  Promise.all(promises)
    .then(res => {
      mqttEmitter.emit('clusterUpdated', res);
    })
    .catch(err => console.error(err));
};

export const updateSensorData = (sensorId, body) => {
  console.log(sensorId, body);
};

// @ts-expect-error implement function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const confirmationSwitch = (relayId, body) => {};
