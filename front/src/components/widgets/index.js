import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker } from '@material-ui/pickers';
import dayjs from 'dayjs';

import { useStyles } from './style';


export const WidgetContainer = ({ definition, data, updateData }) => {
  const classes = useStyles();
  const [val, setVal] = useState(data);

  const onChangeHandler = (e, value) => {
    if (definition.fieldFormat === 'datetime') {
      setVal(dayjs(e).valueOf());
    } else {
      setVal(value);
    }
  }

  const onBlurHandler = (e) => {
    setVal(e.target.value);
  }

  switch (definition.fieldFormat) {
    case 'text':
      return (
        <TextField
          classes={{root: classes.textFieldRoot}}
          defaultValue={val}
          onBlur={onBlurHandler}
          variant='outlined'
          required={definition.required}
          disabled={definition.readonly}
          fullWidth
        />
      )
    case 'combobox':
      return (
        <Autocomplete
          className={definition.readonly ? classes.disabled : ''}
          value={val}
          onChange={onChangeHandler}
          renderInput={
            (props) => <TextField
              {...props}
              variant='outlined'
            />
          }
          options={definition.pattern}
          required={definition.required}
          disabled={definition.readonly}
          fullWidth
        />
      )
    case 'datetime':
      return (
        <DateTimePicker
          className={definition.readonly ? classes.disabled : ''}
          value={val}
          onChange={onChangeHandler}
          format='MM/DD/YYYY HH:mm'
          ampm={false}
          inputVariant='outlined'
          required={definition.required}
          readOnly={definition.readonly}
          fullWidth
        />
      )
    default:
      return (
        <div>{definition.fieldFormat}: {val}</div>
      )
  }
}