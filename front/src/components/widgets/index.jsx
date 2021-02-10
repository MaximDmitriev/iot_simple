import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker } from '@material-ui/pickers';

import { useStyles } from './style';


export const WidgetContainer = ({ definition, data, updateData }) => {
  const classes = useStyles();

  switch (definition.fieldFormat) {
  case 'text':
    return (
      <TextField
        classes={{ root: classes.textFieldRoot }}
        defaultValue={data}
        onBlur={e => updateData(e, e.target.value, definition.fieldName, definition.fieldFormat)}
        variant='outlined'
        required={definition.required}
        disabled={definition.readonly}
        fullWidth
      />
    );
  case 'combobox':
    return (
      <Autocomplete
        className={definition.readonly ? classes.disabled : ''}
        value={data}
        onChange={(e, value) => updateData(e, value, definition.fieldName, definition.fieldFormat)}
        renderInput={
          props => <TextField
            {...props}
            variant='outlined'
          />
        }
        options={definition.pattern}
        required={definition.required}
        disabled={definition.readonly}
        fullWidth
      />
    );
  case 'datetime':
    return (
      <DateTimePicker
        className={definition.readonly ? classes.disabled : ''}
        value={data}
        onChange={(e, value) => updateData(e, value, definition.fieldName, definition.fieldFormat)}
        format='MM/DD/YYYY HH:mm'
        ampm={false}
        inputVariant='outlined'
        required={definition.required}
        readOnly={definition.readonly}
        fullWidth
      />
    );
  default:
    return (
      <div>{definition.fieldFormat}: {data}</div>
    );
  }
};
