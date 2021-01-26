import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Skeleton from '@material-ui/lab/Skeleton'

import FetchData from '../../services/fetchData';

import { useStyles } from './style';


const fetchService = new FetchData();

export const ModalWrapper = ({ show, onClose, title, titleField, tableName, id }) => {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); //loaded, error

  useEffect(() => {
    console.log(title, titleField, id);
    if (id) {
      fetchService
        .getOneRecord(tableName, id)
        .then(res => {
          console.log(res);
          setData(res);
        });
    }
    return () => {
      console.log('unmount');
    }
  }, [id]);

  return (
    <div>
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
                  {status === 'loading' ? <Skeleton variant='text' className={classes.titleMock}/> : 'Admin'}
                </Typography>
              </div>
              <div className={classes.btnGroup}>
                <Button variant='contained' color='secondary'>Удалить запись</Button>
                <Button variant='contained' className={classes.headerBtn}>Сохранить</Button>
              </div>
            </AppBar>
            <div className={classes.grid}>
              content
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  )

}