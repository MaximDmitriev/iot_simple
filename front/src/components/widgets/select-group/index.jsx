import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';

export const SelectGroup = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Autocomplete
        renderInput={(params) => <TextField {...params} label='Датчик/Механизм' variant='outlined'/>}
        // options={}
        className={classes.select}
      />
      <Button className={classes.button} variant="contained" color="primary">
        Добавить
      </Button>
    </div>
  );
};
