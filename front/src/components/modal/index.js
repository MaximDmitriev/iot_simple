import React, { useEffect, useState } from 'react';
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
import FetchData from '../../services/fetchData';

import { useStyles } from './style';


const fetchService = new FetchData();

export const ModalWrapper = ({ show, onClose, title, titleField, tableName, id, height, definition }) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); //loaded, error
  const [popupOpen, setPopupOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (id) {
      setStatus('loading');
      fetchService
        .getOneRecord(tableName, id)
        .then(res => {
          setData(res);
          setTimeout(() => {
            // enqueueSnackbar(`Запись id: ${id} получена`, {
            //   variant: 'success'
            // });
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

  const addAlert = () => {
    enqueueSnackbar('Test snackbar', {
      variant: 'success'
    });
  }

  const openPopup = () => {
    setPopupOpen(true);
  }

  const confirmHandle = () => {
    setPopupOpen(false);
    console.log('agree');
  }

  const declineHandler = () => {
    setPopupOpen(false);
    console.log('cancel');
  }

  return (
    <div>
      <PopupComponent open={popupOpen} onAccept={confirmHandle} onCancel={declineHandler} />
      <Modal
        open={show}
        onClose={onClose}
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
                    : data[titleField]}
                </Typography>
              </div>
              <div className={classes.btnGroup}>
                <Button variant='contained' color='secondary' onClick={openPopup}>Удалить запись</Button>
                <Button
                  variant='contained'
                  className={classes.headerBtn}
                  onClick={addAlert}
                >
                  Сохранить
                </Button>
              </div>
            </AppBar>
            <div className={classes.grid} style={{height: height + 'px'}}>
              {definition.map((cell, idx) => {
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
                      : <WidgetContainer definition={cell} data={data[cell.fieldName]}/>}
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