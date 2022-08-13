import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DateTimePicker } from '@material-ui/pickers';
import { DeviceGroup } from './device-group';
import { ImagePicker } from './image-picker';
import { useStyles } from './style';

export const WidgetContainer = ({ definition, data, updateData }) => {
  const classes = useStyles();

  switch (definition.fieldFormat) {
    case 'text':
      return (
        <TextField
          fullWidth
          classes={{ root: classes.textFieldRoot }}
          defaultValue={data}
          disabled={definition.readonly}
          required={definition.required}
          variant="outlined"
          onBlur={e => updateData(e, e.target.value, definition.fieldName, definition.fieldFormat)}
        />
      );
    case 'combobox':
      return (
        <Autocomplete
          fullWidth
          className={definition.readonly ? classes.disabled : ''}
          disabled={definition.readonly}
          options={definition.pattern}
          renderInput={props => <TextField {...props} variant="outlined" />}
          required={definition.required}
          value={data}
          onChange={(e, value) => updateData(e, value, definition.fieldName, definition.fieldFormat)}
        />
      );
    case 'datetime':
      return (
        <DateTimePicker
          fullWidth
          ampm={false}
          // @ts-ignore
          className={definition.readonly ? classes.disabled : ''}
          format="MM/DD/YYYY HH:mm"
          inputVariant="outlined"
          readOnly={definition.readonly}
          required={definition.required}
          value={data}
          onChange={(e, value) => updateData(e, value, definition.fieldName, definition.fieldFormat)}
        />
      );
    case 'textarea':
      return (
        <textarea
          className={classes.textArea}
          defaultValue={data}
          onBlur={e => updateData(e, e.target.value, definition.fieldName, definition.fieldFormat)}
        />
      );
    case 'image':
      return <ImagePicker />;
    case 'deviceGroup':
      return <DeviceGroup data={data} definition={definition} updateData={updateData} />;
    default:
      return (
        <div>
          {definition.fieldFormat}: {data}
        </div>
      );
  }
};
