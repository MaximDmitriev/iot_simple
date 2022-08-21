// @ts-nocheck
import { useEffect, useState } from 'react';
import { PowerOff, Power, Memory } from '@mui/icons-material';
import { AppBar, Button, Skeleton, Typography } from '@mui/material';
import { fetchService } from '../../services/fetch-data';

const StatusText = ({ tableName, state }) => (
  <div>
    {tableName === 'relays' ? (
      <>
        {state ? <Power /> : <PowerOff />}
        <Typography>статус: {state ? 'включен' : 'выключен'}</Typography>
      </>
    ) : (
      <>
        <Memory />
        <Typography>статус: {state || 'неактивирован'}</Typography>
      </>
    )}
  </div>
);

export const ModalHeader = props => {
  const { title, status, data, mode, titleField, tableName, openPopup, changeRecord } = props;
  const [state, setState] = useState(data.state);

  useEffect(() => {
    setState(data.state);
  }, [data.id]);

  const switchRelay = () => {
    const body = { id: data.sensorId, cluster: data.clusterId, state: Number(!state) };

    fetchService
      .data(body)
      .switchRelay()
      .then(res => {
        const relayKey = Object.keys(res)
          .filter(k => k !== 'message')
          .find(k => res[k].sensorId === data.sensorId);

        if (res[relayKey]) {
          setState(res[relayKey].value);
        }
      })
      .catch(err => console.error(err));
    // @TODO при статусе 405 в catch не уходит
  };

  return (
    <AppBar position="static">
      <div>
        <div>
          <Typography>{title}:</Typography>
          <Typography>
            {status === 'loading' || status === 'error' ? (
              <Skeleton variant="text" />
            ) : mode === 'update' ? (
              `${data[titleField]} ${data.sensorId || data.deviceId || ''}`
            ) : (
              ''
            )}
          </Typography>
        </div>
        {['relays', 'sensors'].includes(tableName) && <StatusText state={state} tableName={tableName} />}
      </div>
      <div>
        {mode === 'update' && tableName === 'relays' ? (
          <Button color="primary" variant="contained" onClick={switchRelay}>
            {state ? 'Выключить' : 'Включить'}
          </Button>
        ) : null}
        {mode === 'update' ? (
          <Button color="secondary" variant="contained" onClick={openPopup}>
            Удалить запись
          </Button>
        ) : null}
        <Button variant="contained" onClick={() => changeRecord(mode)}>
          {mode === 'update' ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </AppBar>
  );
};
