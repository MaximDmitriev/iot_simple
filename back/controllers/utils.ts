// @ts-nocheck
import { Devices, Definition, Relays, Sensors, Table, User } from '../models';

export function getAllRecords(req, res) {
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
      res.json({ metadata, data });
    })
    .catch(err => console.log(err));
}
