import { SelectGroup } from './select-group';
import { LinkGroup } from './link-group';

import { useStyles } from './style';

export const DeviceGroup = ({ data, updateData, definition }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <LinkGroup contents={data} updateData={updateData} definition={definition} />
      <SelectGroup contents={data} updateData={updateData} definition={definition} />
    </div>
  );
};
