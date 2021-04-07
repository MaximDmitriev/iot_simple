import React from 'react';
import BackspaceIcon from '@material-ui/icons/Backspace';

import { useStyles } from './style';

const LinkElement = () => {
  const classes = useStyles();

  return (
    <div className={classes.element}>
      Датчик света: 001/fr-364
      <div className={classes.closeButton}>
        <BackspaceIcon />
      </div>
    </div>
  );
};

export const LinkGroup = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
        <li className={classes.listItem}>
          <LinkElement />
        </li>
      </ul>
    </div>
  );
};
