import { LinkGroup } from './link-group';
import { SelectGroup } from './select-group';
import { useStyles } from './style';

export const DeviceGroup = ({ data, updateData, definition }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <LinkGroup contents={data} definition={definition} updateData={updateData} />
      <SelectGroup contents={data} definition={definition} updateData={updateData} />
    </div>
  );
};
