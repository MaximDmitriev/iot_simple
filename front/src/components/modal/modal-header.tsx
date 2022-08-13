import { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MemoryIcon from '@material-ui/icons/Memory';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import Skeleton from '@material-ui/lab/Skeleton';
import { fetchService } from '../../services/fetchData';
import { useStyles } from './style';

const StatusText = ({ tableName, state }) => {
  const classes = useStyles();

  return (
    <div className={classes.status}>
      {tableName === 'relays' ? (
        <>
          {state ? <PowerIcon /> : <PowerOffIcon />}
          <Typography className={classes.statusText}>статус: {state ? 'включен' : 'выключен'}</Typography>
        </>
      ) : (
        <>
          <MemoryIcon />
          <Typography className={classes.statusText}>статус: {state || 'неактивирован'}</Typography>
        </>
      )}
    </div>
  );
};

export const ModalHeader = props => {
  const { title, status, data, mode, titleField, tableName, openPopup, changeRecord } = props;
  const classes = useStyles();
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
    <AppBar className={classes.appbar} position="static">
      <div className={classes.displayName}>
        <div className={classes.name}>
          <Typography className={classes.title}>{title}:</Typography>
          <Typography className={classes.title}>
            {status === 'loading' || status === 'error' ? (
              <Skeleton className={classes.titleMock} variant="text" />
            ) : mode === 'update' ? (
              `${data[titleField]} ${data.sensorId || data.deviceId || ''}`
            ) : (
              ''
            )}
          </Typography>
        </div>
        {['relays', 'sensors'].includes(tableName) && <StatusText state={state} tableName={tableName} />}
      </div>
      <div className={classes.btnGroup}>
        {mode === 'update' && tableName === 'relays' ? (
          <Button color="primary" variant="contained" onClick={switchRelay}>
            {state ? 'Выключить' : 'Включить'}
          </Button>
        ) : null}
        {mode === 'update' ? (
          <Button className={classes.headerBtn} color="secondary" variant="contained" onClick={openPopup}>
            Удалить запись
          </Button>
        ) : null}
        <Button className={classes.headerBtn} variant="contained" onClick={() => changeRecord(mode)}>
          {mode === 'update' ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </AppBar>
  );
};
