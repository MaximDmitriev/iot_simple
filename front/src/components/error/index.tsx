import { Paper, Typography } from '@material-ui/core';
import { useStyles } from './style';

export const ErrorComponent = ({ message }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={5}>
      <Typography align={'center'} variant={'body1'}>
        {message}
      </Typography>
    </Paper>
  );
};
