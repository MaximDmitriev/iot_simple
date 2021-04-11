const express = require('express');
const { Sensors } = require('../models/sensors');
const { Relays } = require('../models/sensors');

const router = express.Router();

router.get('/get_free_sensors', (req, res) => {
  const sensors = Sensors.find({ clusterId: { $in: [undefined, ''] } });
  const relays = Relays.find({ clusterId: { $in: [undefined, ''] } });
  Promise.all([sensors, relays])
    .then(doc => {
      const data = [...doc[0], ...doc[1]].map(s => (`${s.sensorname} (${s.sensorId})$>$>$${s.sensorId}`));
      res.send(JSON.stringify(data));
    })
    .catch(err => console.log(err));
});

module.exports = router;
