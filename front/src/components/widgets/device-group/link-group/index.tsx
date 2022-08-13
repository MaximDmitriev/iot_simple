import React from 'react';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Constants } from '../../../../config';
import { useStyles } from './style';

const LinkElement = ({ el, definition, updateData }) => {
  const classes = useStyles();

  return (
    <div className={classes.element}>
      {el.split(Constants.PairSeparator)[0]}
      <div className={classes.closeButton}>
        <BackspaceIcon onClick={() => updateData(null, el, definition.fieldName, definition.fieldFormat)} />
      </div>
    </div>
  );
};
const MemoLinkElement = React.memo(LinkElement);

export const LinkGroup = ({ contents, definition, updateData }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ul className={classes.list}>
        {contents?.map(el => (
          <li key={el} className={classes.listItem}>
            <MemoLinkElement definition={definition} el={el} updateData={updateData} />
          </li>
        ))}
      </ul>
    </div>
  );
};
