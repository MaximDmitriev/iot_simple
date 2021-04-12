import React, { useEffect, useMemo, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton';
import { WidgetContainer } from '../widgets';
import { useSnackbar } from 'notistack';
import { PopupComponent } from '../popup';
import dayjs from 'dayjs';
import { fetchService } from '../../services/fetchData';
import { getSuccessMessage, getErrorMessage, createBody, defineMethod, updateSensors } from './utils';

import { useStyles } from './style';


export const ModalWrapper = ({ show, act, onClose, title, titleField, tableName, id, height, definition }) => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [status, setStatus] = useState('loading'); // loaded, error
  const [popupOpen, setPopupOpen] = useState(false);
  const [mode, setMode] = useState(act);
  const { enqueueSnackbar } = useSnackbar();

  const formDefinition = useMemo(() => {
    return mode === 'create'
      ? definition
      : definition.filter(c => !c.onlyCreatedMode);
  }, [mode, definition]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const onCloseHandler = () => {
    setStatus('loading');
    setData({});
    onClose();
  };

  const declineHandler = () => {
    setPopupOpen(false);
  };

  const updateWidgetData = (e, val, fieldName, fieldFormat) => {
    switch (fieldFormat) {
      case 'text':
        setData(data => ({ ...data, [fieldName]: val }));
        break;
      case 'datetime':
        setData(data => ({ ...data, [fieldName]: dayjs(e).valueOf() }));
        break;
      case 'deviceGroup':
        if (!data[fieldName]) {
          setData(data => ({ ...data, [fieldName]: [val] }));
        } else if (data[fieldName].includes(val)) {
          const idx = data[fieldName].findIndex(v => v === val);
          const values = [...data[fieldName].slice(0, idx), ...data[fieldName].slice(idx + 1)];
          setData(data => ({ ...data, [fieldName]: values }));
        } else {
          setData(data => ({ ...data, [fieldName]: data[fieldName].concat(val) }));
        }
        break;
      default:
        setData(data => ({ ...data, [fieldName]: val }));
    }
  };

  useEffect(() => {
    setMode(act);
    if (act === 'create') {
      setStatus('loaded');
    }
  }, [show]);

  useEffect(() => {
    if (mode === 'update' && id) {
      setStatus('loading');
      readRecord();
    }
    return () => {
      // console.log('unmount');
    };
  }, [id]);

  const readRecord = () => {
    fetchService
      .getOneRecord(tableName, id)
      .then(res => {
        setData(res);
        setTimeout(() => { // setTimeout для лоадера
          setStatus('loaded');
        }, 500);
      })
      .catch(err => {
        console.log(err);
        setStatus('error');
      });
  };

  const changeRecord = type => {
    const body = createBody(type, data);
    const method = defineMethod(type);
    updateSensors(enqueueSnackbar, type, tableName, data).then(() => {
      fetchService.data(body);
      method.call(fetchService, tableName)
        .then(res => {
          if (res.errors) {
            getErrorMessage(enqueueSnackbar, type, res.message);
          } else {
            if (type === 'create') {
              setData(res);
              setMode('update');
            } else if (type === 'delete') {
              setStatus('loading');
              setData({});
              onClose();
            }
            getSuccessMessage(enqueueSnackbar, type, data[titleField]);
          }
        })
        .catch(err => {
          console.log(err);
          getErrorMessage(enqueueSnackbar, type, err.message);
        });
      if (type === 'delete') setPopupOpen(false);
    });
  };


  return (
    <div>
      <PopupComponent open={popupOpen} onAccept={() => changeRecord('delete')} onCancel={declineHandler} />
      <Modal
        open={show}
        onClose={onCloseHandler}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction='down' in={show} mountOnEnter unmountOnExit>
          <div className={classes.container}>
            <AppBar position='static' className={classes.appbar}>
              <div className={classes.displayName}>
                <Typography className={classes.title}>
                  {title}:
                </Typography>
                <Typography className={classes.title}>
                  {status === 'loading' || status ==='error'
                    ? <Skeleton variant='text' className={classes.titleMock}/>
                    : mode === 'update' ? `${data[titleField]} ${data.sensorId || data.deviceId || ''}` : ''}
                </Typography>
              </div>
              <div className={classes.btnGroup}>
                {mode === 'update' && tableName === 'relays'
                  ? <Button variant='contained' color='primary'>Включить</Button>
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
            <div className={classes.grid} style={{ height: height + 'px' }}>
              {formDefinition.map((cell, idx) => {
                return (
                  <div
                    key={idx}
                    className={classes.cell}
                    style={{
                      height: cell.height,
                      width: cell.width,
                      top: cell.top,
                      left: cell.left,
                    }}
                  >
                    <Typography className={classes.label}>{cell.label}</Typography>
                    {status === 'loading'
                      ? <Skeleton variant="rect" width='100%' height='40px'/>
                      : <WidgetContainer
                        definition={cell}
                        data={data[cell.fieldName] || null}
                        updateData={updateWidgetData}
                      />}
                  </div>
                );
              })}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};
