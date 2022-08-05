import mqtt from 'mqtt';
import { Config } from '../config/config.ts';
import { updateSensorData, updateClusterData } from './controllers';

const { separators } = Config;

export const client = mqtt.connect('mqtt://127.0.0.1', {
  username: 'server',
  password: '123',
});

/**
 * Возможные сообщения и их формат:
 *
 * requestAllData - запрос данных со всех устройств,
 * запрос может быть как регулярный автоматический, так и пользовательский. В ответ все устроства должны ответить
 * сообщениями с топиком cluster$>$>$clusterId.
 *
 * Cluster$>$>$clusterId - текущие данные по всем датчикам и механизмам устройства с id == clusterId
 * message составляется следующим образом:
 * first_sensorId:sensor_value||second_sensorId:sensor_value||...||last_sensorId:sensor_value.
 *
 * Sensor$>$>$sensorId - текущие данные по датчику
 * message составляется следующим образом: sensorId:sensor_value.
 *
 * SwitchRelay$>$>$relayId - вкл/выкл исполнительный механизм
 * message составляется следующим образом: 1 или 0
 * в ответ от устройства должно прийти сообщение confirmationOfSwitch.
 *
 * ConfirmationOfSwitch - подтвеждение вкл/выкл механизма и передача состояния всего кластера
 * message составляется следующим образом:
 * first_sensorId:sensor_value||second_sensorId:sensor_value||...||last_sensorId:sensor_value.
 */

client.on('message', (topic, message) => {
  switch (true) {
    case topic.includes('cluster'):
      updateClusterData(topic.split(separators.pair)[1], message.toString());
      break;
    case topic.includes('sensor'):
      updateSensorData(topic.split(separators.pair)[1], message.toString());
      break;
    case topic === 'confirmationOfSwitch':
      updateClusterData(topic.split(separators.pair)[1], message.toString());
      break;
    default:
      const date = new Date();

      console.log(topic, message.toString(), date.toLocaleString());
  }
});

client.on('connect', () => {
  console.log('connect');
  client.subscribe('#', err => {
    if (err) console.log(err);
  });
});

client.on('error', error => {
  console.log('error', error);
});

// setInterval(() => {
//   client.publish('requestAllData', 'allData');
// }, timeout);

// function requestCluster(clusterId, count = 20) {
//   client.publish(clusterId, `${count}`);
// }
//
// function requestSensor(sensorId, count = 20) {
//   client.publish(sensorId, `${count}`);
// }

export function switchRelay(relayId, state) {
  client.publish(`switchRelay${separators.pair}${relayId}`, state.toString());
}
