import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { useStyles } from './style';

export const ErrorComponent = ({ message }) => {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <Typography variant={'body1'} align={'center'}>
        {message}
      </Typography>
    </Paper>
  );
};
