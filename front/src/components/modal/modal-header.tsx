import { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import MemoryIcon from '@material-ui/icons/Memory';
import { fetchService } from '../../services/fetchData';

import { useStyles } from './style';

const StatusText = ({ tableName, state }) => {
  const classes = useStyles();
  return (
    <div className={classes.status}>
      {tableName === 'relays'
        ? (
          <>
            {state ? <PowerIcon /> : <PowerOffIcon />}
            <Typography className={classes.statusText}>статус: {state ? 'включен' : 'выключен'}</Typography>
          </>
        )
        : (
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
        const relayKey = Object
          .keys(res)
          .filter(k => k !== 'message')
          .find(k => res[k].sensorId === data.sensorId);
        // @ts-ignore
        if (res[relayKey]) {
          // @ts-ignore
          setState(res[relayKey].value);
        }
      })
      .catch(err => console.error(err));
    // @TODO при статусе 405 в catch не уходит
  };

  return (
    <AppBar position='static' className={classes.appbar}>
      <div className={classes.displayName}>
        <div className={classes.name}>
          <Typography className={classes.title}>
            {title}:
          </Typography>
          <Typography className={classes.title}>
            {status === 'loading' || status ==='error'
              ? <Skeleton variant='text' className={classes.titleMock}/>
              : mode === 'update' ? `${data[titleField]} ${data.sensorId || data.deviceId || ''}` : ''}
          </Typography>
        </div>
        {['relays', 'sensors'].includes(tableName) && <StatusText tableName={tableName} state={state}/>}
      </div>
      <div className={classes.btnGroup}>
        {mode === 'update' && tableName === 'relays'
          ? (
            <Button variant='contained' color='primary' onClick={switchRelay}>
              {state ? 'Выключить' : 'Включить'}
            </Button>
          )
          : null}
        {mode === 'update'
          ? <Button
            variant='contained'
            color='secondary'
            className={classes.headerBtn}
            onClick={openPopup}
          >
            Удалить запись
          </Button>
          : null}
        <Button
          variant='contained'
          className={classes.headerBtn}
          onClick={() => changeRecord(mode)}
        >
          {mode === 'update' ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </AppBar>
  );
};
