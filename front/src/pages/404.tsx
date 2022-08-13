// @ts-nocheck
import { Link } from 'react-router-dom';
import { Button, Paper, Typography } from '@material-ui/core';
import Navbar from '../components/navbar';
import { useStyles } from './style/404-style';


export const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar title={''} />
      <Paper elevation={5} className={classes.paper}>
        <Typography variant={'h6'} align={'center'}>
          Страница не найдена
        </Typography>
        <Typography className={classes.text} variant={'body1'} align={'center'}>
          Запрашиваемая страница не существует, проверьте правильность адреса
        </Typography>
        <Link to="/report">
          <Button className={classes.button} color="primary" variant="contained" >На главную</Button>
        </Link>
      </Paper>
    </>
  );
};
