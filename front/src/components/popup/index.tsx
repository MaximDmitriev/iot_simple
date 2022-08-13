import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';

import { useStyles } from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export const PopupComponent = ({ open, onAccept, onCancel }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      classes={{
        // @ts-ignore
        root: classes.root,
        // @ts-ignore
        scrollPaper: classes.scrollPaper,
      }}
      // @ts-ignore
      TransitionComponent={Transition}
      disableBackdropClick
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Удалить запись?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Данная запись будет удалена из базы данных без возможности восстановления
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='primary' variant='outlined'>
          Отмена
        </Button>
        <Button onClick={onAccept} color='secondary' variant='outlined'>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
