import { Constants, Names } from '../../config';
import { fetchService } from '../../services/fetchData';

export const getErrorMessage = (alert, type, msg) => {
  const TIME = 8000;

  const getAction = type => {
    switch (type) {
      case 'update':
        return 'сохранить';
      case 'delete':
        return 'удалить';
      case 'create':
        return 'создать';
    }
  };

  alert(`Не удалось ${getAction(type)} запись. ${msg}`, { variant: 'error', autoHideDuration: TIME });
};

export const getSuccessMessage = (alert, type, msg) => {
  const TIME = 5000;

  const getAction = type => {
    switch (type) {
      case 'update':
        return 'сохранена';
      case 'delete':
        return 'удалена';
      case 'create':
        return 'создана';
    }
  };

  alert(`Запись ${msg} успешно ${getAction(type)}`, { variant: 'success', autoHideDuration: TIME });
};

export const createBody = (type, data) => {
  switch (type) {
    case 'update':
      return { id: data.id, fields: data };
    case 'delete':
      return { id: data.id };
    case 'create':
      return data;
  }
};

export const defineMethod = type => {
  switch (type) {
    case 'update':
      return fetchService.updateRecord;
    case 'create':
      return fetchService.createRecord;
    case 'delete':
      return fetchService.deleteRecord;
  }
};

export const updateSensors = (enqueueSnackbar, type, tableName, data) =>
  new Promise<void>(resolve => {
    if (type !== 'delete' && tableName === Names.DevicesTableName && data[Names.SensorsFieldName]) {
      const ids = data[Names.SensorsFieldName].map(name => name.split(Constants.PairSeparator)[1]);

      fetchService
        .data({ cluster: data[Names.ClusterFieldName], ids })
        .setClusterSensors()
        .then(() => resolve())
        .catch(err => {
          console.log(err);
          getErrorMessage(enqueueSnackbar, type, err.message);
        });
    } else {
      resolve();
    }
  });
