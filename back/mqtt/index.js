const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1', {
  username: 'server',
  password: '123',
});


client.on('message', function (topic, message) {
  console.log(topic);
  const val = message.toString();
  const [name, value] = val.split(':');
  const date = new Date();
  console.log(name, value, date.toLocaleTimeString());
});

client.on('connect', () => {
  console.log('connect');
  client.subscribe('#', (err) => {
    if (err) console.log(err);
  });
});

client.on('error', (error) => {
  console.log('error', error);
});

module.exports = client;
