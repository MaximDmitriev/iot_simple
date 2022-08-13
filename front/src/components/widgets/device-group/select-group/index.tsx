import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Constants } from '../../../../config';
import { fetchService } from '../../../../services/fetchData';
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
        blurOnSelect
        className={classes.select}
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
      <Button className={classes.button} color="primary" disabled={!value} variant="contained" onClick={onClickHandler}>
        Добавить
      </Button>
    </div>
  );
};
