import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core';
import { useStyles } from './style';

const Transition = React.forwardRef((props, ref) => <Slide ref={ref} direction="down" {...props} />);

export const PopupComponent = ({ open, onAccept, onCancel }) => {
  const classes = useStyles();

  return (
    <Dialog
      disableBackdropClick
      keepMounted
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
      aria-labelledby="alert-dialog-slide-title"
      classes={{
        // @ts-ignore
        root: classes.root,
        // @ts-ignore
        scrollPaper: classes.scrollPaper,
      }}
      open={open}
    >
      <DialogTitle id="alert-dialog-slide-title">Удалить запись?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Данная запись будет удалена из базы данных без возможности восстановления
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={onCancel}>
          Отмена
        </Button>
        <Button color="secondary" variant="outlined" onClick={onAccept}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
