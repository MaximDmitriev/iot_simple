// @ts-nocheck
import { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { Constants } from '../../../../config';
import { fetchService } from '../../../../services/fetch-data';

export const SelectGroup = ({ contents, updateData, definition }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    let active = true;

    if (open) {
      (async () => {
        const res = await fetchService.getFreeSensors();

        if (active) {
          const pickedValues = contents || [];

          setOptions(res.filter(o => !pickedValues.includes(o)));
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [open]);

  const onClickHandler = () => {
    updateData(null, value, definition.fieldName, definition.fieldFormat);
    setValue(null);
  };

  return (
    <div>
      <Autocomplete
        blurOnSelect
        clearText="очистить"
        closeText="закрыть"
        getOptionLabel={o => o.split(Constants.PairSeparator)[0]}
        noOptionsText="нет доступных элементов"
        openText="открыть"
        options={options}
        renderInput={params => <TextField {...params} label="Элемент" variant="outlined" />}
        value={value}
        onChange={(_, v) => setValue(v)}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
      <Button color="primary" disabled={!value} variant="contained" onClick={onClickHandler}>
        Добавить
      </Button>
    </div>
  );
};
