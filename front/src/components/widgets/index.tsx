// @ts-nocheck
import { Autocomplete, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DeviceGroup } from './device-group';
import { ImagePicker } from './image-picker';

export const WidgetContainer = ({ definition, data, updateData }) => {
  switch (definition.fieldFormat) {
    case 'text':
      return (
        <TextField
          fullWidth
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
          format="MM/DD/YYYY HH:mm"
          inputVariant="outlined"
          readOnly={definition.readonly}
          required={definition.required}
          value={data}
          onChange={(e, value) => updateData(e, value, definition.fieldName, definition.fieldFormat)}
        />
      );
    case 'textarea':
      return <textarea defaultValue={data} onBlur={e => updateData(e, e.target.value, definition.fieldName, definition.fieldFormat)} />;
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
