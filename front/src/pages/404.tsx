import { Button, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';
import { useStyles } from './style/404-style';

export const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar title={''} />
      <Paper className={classes.paper} elevation={5}>
        <Typography align={'center'} variant={'h6'}>
          Страница не найдена
        </Typography>
        <Typography align={'center'} className={classes.text} variant={'body1'}>
          Запрашиваемая страница не существует, проверьте правильность адреса
        </Typography>
        <Link to="/report">
          <Button className={classes.button} color="primary" variant="contained">
            На главную
          </Button>
        </Link>
      </Paper>
    </>
  );
};
