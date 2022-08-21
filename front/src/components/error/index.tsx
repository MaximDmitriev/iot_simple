import React from 'react';
import { Paper, Typography } from '@mui/material';
// import { Paper, Typography } from '@material-ui/core';

/** Компонент ошибки. */
export const ErrorComponent: React.FC<{ message: string }> = ({ message }) => (
  <Paper elevation={5}>
    <Typography align={'center'} variant={'body1'}>
      {message}
    </Typography>
  </Paper>
);

ErrorComponent.displayName = 'ErrorComponent';
