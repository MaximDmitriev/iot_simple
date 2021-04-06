import React from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CancelIcon from '@material-ui/icons/Cancel';
import CollectionsIcon from '@material-ui/icons/Collections';

import { useStyles } from './style';


export const ImagePicker = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}>
        <ul className={classes.list}>
          <li className={classes.listItem}><CollectionsIcon className={classes.icon}/> Выбрать готовую</li>
          <li className={classes.listItem}><AddPhotoAlternateIcon className={classes.icon}/> Загрузить новую</li>
          <li className={classes.listItem}><CancelIcon className={classes.icon}/> Удалить</li>
        </ul>
      </div>
    </div>
  );
};
