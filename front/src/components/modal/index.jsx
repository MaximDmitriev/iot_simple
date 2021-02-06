import React, { useEffect, useMemo, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton'
import { WidgetContainer } from '../widgets';
import { useSnackbar } from 'notistack';
import { PopupComponent } from '../popup';
import dayjs from 'dayjs';
import { fetchService } from '../../services/fetchData';
import { getSuccessMessage, getErrorMessage } from './utils';

import { useStyles } from './style';


export const ModalWrapper = ({ show, act, onClose, title, titleField, tableName, id, height, definition }) => {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [status, setStatus] = useState('loading'); //loaded, error
  const [popupOpen, setPopupOpen] = useState(false);
  const [mode, setMode] = useState(act);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formDefinition = useMemo(() => {
    return mode === 'create'
      ? definition
      : definition.filter(c => !c.onlyCreatedMode);
  }, [mode]);


  useEffect(() => {
    setMode(act);
    if (act === 'create') {
      setStatus('loaded');
    }
  }, [show]);

  useEffect(() => {
      if (mode === 'edit' && id) {
      setStatus('loading');
      fetchService
        .getOneRecord(tableName, id)
        .then(res => {
          setData(res);
          setTimeout(() => {
            setStatus('loaded');
          }, 500);
        })
        .catch(err => {
          console.log(err);
          setStatus('error');
        });
    }
    return () => {
      // console.log('unmount');
    }
  }, [id]);

  const onCloseHandler = () => {
    setStatus('loading');
    setData({});
    onClose();
  }

  const updateRecord = () => {
    fetchService
      .data({id: data.id, fields: data})
      .updateRecord(tableName)
      .then(res => {
        if (res.errors) {
          getErrorMessage(enqueueSnackbar,'update', res.message);
        } else {
          getSuccessMessage(enqueueSnackbar,'update', data[titleField]);
        }
      })
      .catch(err => {
        console.log(err);
        getErrorMessage(enqueueSnackbar,'update', err.message);
      })
  }

  const openPopup = () => {
    setPopupOpen(true);
  }

  const confirmHandle = () => {
    fetchService
      .data({id: data.id})
      .deleteRecord(tableName)
      .then(res => {
        if (res.errors) {
          getErrorMessage(enqueueSnackbar,'delete', res.message);
        } else {
          getSuccessMessage(enqueueSnackbar,'delete', data[titleField]);
          onClose();
        }
      })
      .catch(err => {
        console.log(err);
        getErrorMessage(enqueueSnackbar,'delete', err.message);
      })
    setPopupOpen(false);
  }

  const declineHandler = () => {
    setPopupOpen(false);
  }

  const updateWidgetData = (e, val, fieldName, fieldFormat) => {
    switch (fieldFormat) {
      case 'text':
        setData((data) => ({...data, [fieldName]: val }));
        break;
      case 'datetime':
        setData((data) => ({...data, [fieldName]: dayjs(e).valueOf() }));
        break;
      default:
        setData((data) => ({...data, [fieldName]: val }));
    }
  }

  const createRecord = () => {
    fetchService
      .data(data)
      .createRecord(tableName)
      .then((res) => {
        if (res.errors) {
          getErrorMessage(enqueueSnackbar,'create', res.message);
        } else {
          setData(res);
          setMode('edit');
          getSuccessMessage(enqueueSnackbar,'create', data[titleField]);

        }
      })
      .catch(err => {
        console.log(err);
        getErrorMessage(enqueueSnackbar,'create', err.message);
      })
  }

  return (
    <div>
      <PopupComponent open={popupOpen} onAccept={confirmHandle} onCancel={declineHandler} />
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
                    : mode === 'edit' ? data[titleField] : ''}
                </Typography>
              </div>
              <div className={classes.btnGroup}>
                {mode === 'edit'
                  ? <Button variant='contained' color='secondary' onClick={openPopup}>Удалить запись</Button>
                  : null}
                <Button
                  variant='contained'
                  className={classes.headerBtn}
                  onClick={mode === 'edit' ? updateRecord : createRecord}
                >
                  {mode === 'edit' ? 'Сохранить' : 'Создать'}
                </Button>
              </div>
            </AppBar>
            <div className={classes.grid} style={{height: height + 'px'}}>
              {formDefinition.map((cell, idx) => {
                return (
                  <div
                    key={idx}
                    className={classes.cell}
                    style={{
                      height: cell.height,
                      width: cell.width,
                      top: cell.top,
                      left: cell.left
                    }}
                  >
                    <Typography className={classes.label}>{cell.label}</Typography>
                    {status === 'loading'
                      ? <Skeleton variant="rect" width='100%' height='40px'/>
                      : <WidgetContainer definition={cell} data={data[cell.fieldName] || null} updateData={updateWidgetData}/>}
                  </div>
                )
              })}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  )
}