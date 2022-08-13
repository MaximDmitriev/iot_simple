import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import { fetchService } from '../../../../services/fetchData';
import { Constants } from '../../../../config';

import { useStyles } from './style';

export const SelectGroup = ({ contents, updateData, definition }) => {
  const classes = useStyles();
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
    <div className={classes.wrapper}>
      <Autocomplete
        renderInput={params => <TextField {...params} label="Элемент" variant="outlined" />}
        options={options}
        clearText="очистить"
        closeText="закрыть"
        openText="открыть"
        noOptionsText="нет доступных элементов"
        className={classes.select}
        blurOnSelect={true}
        // @ts-ignore
        getOptionLabel={o => o.split(Constants.PairSeparator)[0]}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={(_, v) => setValue(v)}
      />
      <Button className={classes.button} variant="contained" color="primary" onClick={onClickHandler} disabled={!value}>
        Добавить
      </Button>
    </div>
  );
};
