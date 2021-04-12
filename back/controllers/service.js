const express = require('express');
const { Sensors } = require('../models/sensors');
const { Relays } = require('../models/sensors');
const { Devices } =require('../models/devices');

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

router.post('/set_cluster_sensors', (req, res) => {
  // @TODO оптимизировать апдейты, возможно через pre() post()
  Devices.findOne({ clusterId: req.body.cluster })
    .then(doc => {
      const ids = doc.content ? doc.content.map(id => id.split('$>$>$')[1]) : [];
      const index2delete = ids.filter(id => !req.body.ids.includes(id));
      if (index2delete.length) {
        Sensors.updateMany({ sensorId: { $in: index2delete } }, { clusterId: undefined }, (err, result) => {
          console.log(result);
        });
        Relays.updateMany({ sensorId: { $in: index2delete } }, { clusterId: undefined }, (err, result) => {
          console.log(result);
        });
      }
      Sensors.updateMany({ sensorId: { $in: req.body.ids } }, { clusterId: req.body.cluster }, (err, result) => {
        console.log(result);
      });
      Relays.updateMany({ sensorId: { $in: req.body.ids } }, { clusterId: req.body.cluster }, (err, result) => {
        console.log(result);
      });
      res.send(JSON.stringify(index2delete));
    });
});

module.exports = router;
