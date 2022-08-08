import type { Request, Response } from 'express';
import { Devices, Relays, Sensors, Table, User } from '../models';

export const getAllRecords = (req: Request, res: Response) => {
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
    default:
      data = null;
  }

  Promise.all([metadata, data])
    .then(response => {
      const [metadataResponse, dataResponse] = response;

      res.json({ metadataResponse, dataResponse });
    })
    .catch(err => console.log(err));
};
