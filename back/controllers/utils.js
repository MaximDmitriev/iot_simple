const { Definition } = require('../models/definitions');
const { Devices } = require('../models/devices');
const { Relays } = require('../models/sensors');
const { Sensors } = require('../models/sensors');
const { Table } = require('../models/tables');
const { User } = require('../models/user');


const configResponse = response => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', '*');
  response.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authortization');
  response.type('application/json');
};

function getAllRecords(req, res) {
  const name = req.baseUrl.split('/')[2];
  const metadata = Table.findOne({ tablename: name }).populate('definition');
  let data;
  switch (name) {
    case 'devices':
      data = Devices.find({});
      break;
    case 'relays':
      data = Relays.find({});
      break;
    case 'sensors':
      data = Sensors.find({});
      break;
    case 'users':
      data = User.find({});
      break;
  }

  Promise.all([metadata, data])
    .then(response => {
      const [metadata, data] = response;
      configResponse(res);
      res.json({ metadata, data });
    })
    .catch(err => console.log(err));
}

module.exports = { getAllRecords, configResponse };
